import { useRef, useEffect, useCallback } from "react";
import { TYPING_CONFIG, TYPING_TEXTS } from "@/constants/hero";

interface UseTypingAnimationProps {
  typingRef: React.RefObject<HTMLSpanElement | null>;
}

export const useTypingAnimation = ({ typingRef }: UseTypingAnimationProps) => {
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const erasingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const eraseText = useCallback((
    text: string,
    charIndex: number,
    onComplete: () => void
  ) => {
    if (typingRef.current) {
      if (charIndex > 0) {
        typingRef.current.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        erasingTimeoutRef.current = setTimeout(
          () => eraseText(text, charIndex, onComplete),
          TYPING_CONFIG.eraseSpeed
        );
      } else {
        onComplete();
      }
    }
  }, [typingRef]);

  const typeText = useCallback((
    text: string,
    charIndex: number,
    onComplete: () => void
  ) => {
    if (typingRef.current) {
      if (charIndex < text.length) {
        typingRef.current.textContent += text.charAt(charIndex);
        charIndex++;
        typingTimeoutRef.current = setTimeout(
          () => typeText(text, charIndex, onComplete),
          TYPING_CONFIG.typeSpeed
        );
      } else {
        erasingTimeoutRef.current = setTimeout(
          () => eraseText(text, charIndex - 1, onComplete),
          TYPING_CONFIG.displayTime
        );
      }
    }
  }, [eraseText, typingRef]);

  const startTypingCycle = useCallback(() => {
    let index = 0;

    const cycle = () => {
      if (index < TYPING_TEXTS.length) {
        typeText(TYPING_TEXTS[index], 0, () => {
          index = (index + 1) % TYPING_TEXTS.length;
          typingTimeoutRef.current = setTimeout(
            cycle,
            TYPING_CONFIG.pauseTime
          );
        });
      }
    };

    if (typingRef.current) {
      typingRef.current.textContent = "";
      cycle();
    }
  }, [typeText, typingRef]);

  useEffect(() => {
    startTypingCycle();

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (erasingTimeoutRef.current) clearTimeout(erasingTimeoutRef.current);
    };
  }, [startTypingCycle]);

  return {
    startTypingCycle,
  };
};
