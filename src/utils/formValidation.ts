// Form validation utilities

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  email?: boolean;
  maxLength?: number;
  pattern?: RegExp;
}

export const validateField = (
  fieldName: string,
  value: string,
  rules: ValidationRules
): string | null => {
  if (rules.required && (!value || value.trim().length === 0)) {
    return `${fieldName} is required`;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `${fieldName} must be no more than ${rules.maxLength} characters`;
  }

  if (rules.email && value && !isValidEmail(value)) {
    return `${fieldName} must be a valid email address`;
  }

  if (rules.pattern && value && !rules.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }

  return null;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
