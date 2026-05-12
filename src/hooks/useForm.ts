
import { useState, useCallback, useMemo } from "react";
import { validateField } from "@/utils/formValidation";

export const useForm = <T extends Record<string, string>>(
  initialValues: T,
  validationRules?: Partial<
    Record<keyof T, { required?: boolean; minLength?: number; email?: boolean }>
  >
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(
    (name: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    if (!validationRules) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const fieldKey = key as keyof T;
      const rules = validationRules[fieldKey];
      const value = values[fieldKey];

      if (rules) {
        const error = validateField(String(fieldKey), value, rules);
        if (error) {
          newErrors[fieldKey] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (onSubmit: (values: T) => Promise<void> | void) => {
      setIsSubmitting(true);

      if (validateForm()) {
        try {
          await onSubmit(values);
          reset();
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }

      setIsSubmitting(false);
    },
    [values, validateForm, reset]
  );

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    setValue,
    validateForm,
    handleSubmit,
    reset,
  };
};

export const useContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    message: "",
  } as const;

  const validationRules = {
    name: { required: true, minLength: 2 },
    email: { required: true, email: true },
    message: { required: true, minLength: 10 },
  };

  return useForm(initialValues, validationRules);
};

export const useFormField = (
  name: string,
  value: string,
  onChange: (value: string) => void,
  error?: string
) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const fieldProps = useMemo(
    () => ({
      id: name,
      name,
      value,
      onChange: handleChange,
      "aria-invalid": !!error,
      "aria-describedby": error ? `${name}-error` : undefined,
    }),
    [name, value, handleChange, error]
  );

  return {
    fieldProps,
    hasError: !!error,
    errorId: `${name}-error`,
  };
};
