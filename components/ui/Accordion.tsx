"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import "./faq-accordion.css";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: readonly AccordionItem[];
};

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d={direction === "up" ? "M3.5 9 7 5.5 10.5 9" : "M3.5 5 7 8.5 10.5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={`faq-accordion__item${isOpen ? " faq-accordion__item--open" : ""}`}
          >
            <button
              type="button"
              className="faq-accordion__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="faq-accordion__question">{item.question}</span>
              <span className="faq-accordion__toggle" aria-hidden>
                <ChevronIcon direction={isOpen ? "up" : "down"} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={
                    prefersReducedMotion ? false : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    prefersReducedMotion ? undefined : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="faq-accordion__answer">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
