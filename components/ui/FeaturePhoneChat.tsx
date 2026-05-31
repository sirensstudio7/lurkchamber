"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { featurePhoneChat } from "@/lib/content";
import "./feature-phone-chat.css";

const VISIBILITY_THRESHOLD = 0.35;
const MESSAGE_EASE = [0.22, 1, 0.36, 1] as const;

type FeaturePhoneChatProps = {
  className?: string;
};

function delay(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = window.setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        window.clearTimeout(id);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

export function FeaturePhoneChat({ className }: FeaturePhoneChatProps) {
  const { clientName, studioName, messages } = featurePhoneChat;
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(messages.length);
    }
  }, [prefersReducedMotion, messages.length]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = useCallback(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= VISIBILITY_THRESHOLD
          ) {
            setHasStarted(true);
            observer.disconnect();
          }
        }
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 0.6, 1] },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    const controller = new AbortController();

    const runChat = async () => {
      try {
        await delay(450, controller.signal);

        for (let index = 0; index < messages.length; index++) {
          const message = messages[index];

          if (message.from === "lurk") {
            setIsTyping(true);
            scrollToBottom();
            await delay(1100 + index * 80, controller.signal);
            setIsTyping(false);
          } else if (index > 0) {
            await delay(750, controller.signal);
          }

          setVisibleCount(index + 1);
          await delay(50, controller.signal);
          scrollToBottom();

          if (index < messages.length - 1) {
            await delay(message.from === "lurk" ? 650 : 850, controller.signal);
          }
        }
      } catch {
        // Aborted on unmount.
      }
    };

    void runChat();

    return () => controller.abort();
  }, [hasStarted, messages, prefersReducedMotion, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [visibleCount, isTyping, scrollToBottom]);

  const visibleMessages = messages.slice(0, visibleCount);
  const headerStatus = isTyping ? "Typing…" : "Active now";

  return (
    <div
      ref={containerRef}
      className={`feature-phone-chat ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="feature-phone-chat__stage">
        <div className="feature-phone-chat__device">
          <div className="feature-phone-chat__bezel">
            <div className="feature-phone-chat__notch" />
            <div className="feature-phone-chat__screen">
              <div className="feature-phone-chat__status">
                <span>9:41</span>
                <span className="feature-phone-chat__status-icons">
                  <span />
                  <span />
                  <span />
                </span>
              </div>

              <div className="feature-phone-chat__header">
                <div className="feature-phone-chat__avatar" aria-hidden>
                  L
                </div>
                <div className="feature-phone-chat__header-text">
                  <span className="feature-phone-chat__header-name">
                    {studioName}
                  </span>
                  <span
                    className={`feature-phone-chat__header-status ${isTyping ? "feature-phone-chat__header-status--typing" : ""}`}
                  >
                    {headerStatus}
                  </span>
                </div>
              </div>

              <div ref={messagesRef} className="feature-phone-chat__messages">
                <AnimatePresence initial={false}>
                  {visibleMessages.map((message, index) => {
                    const isLurk = message.from === "lurk";

                    return (
                      <motion.div
                        key={`${message.from}-${index}`}
                        className={`feature-phone-chat__row ${isLurk ? "feature-phone-chat__row--lurk" : "feature-phone-chat__row--client"}`}
                        initial={
                          prefersReducedMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 12,
                                scale: 0.88,
                              }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.38,
                          ease: MESSAGE_EASE,
                        }}
                        style={{
                          transformOrigin: isLurk ? "right bottom" : "left bottom",
                        }}
                      >
                        {!isLurk ? (
                          <div
                            className="feature-phone-chat__avatar feature-phone-chat__avatar--small"
                            aria-hidden
                          >
                            {clientName.charAt(0)}
                          </div>
                        ) : null}
                        <p
                          className={`feature-phone-chat__bubble ${isLurk ? "feature-phone-chat__bubble--lurk" : "feature-phone-chat__bubble--client"}`}
                        >
                          {message.text}
                        </p>
                      </motion.div>
                    );
                  })}

                  {isTyping ? (
                    <motion.div
                      key="typing"
                      className="feature-phone-chat__row feature-phone-chat__row--lurk"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.94 }}
                      transition={{ duration: 0.25, ease: MESSAGE_EASE }}
                      style={{ transformOrigin: "right bottom" }}
                    >
                      <div
                        className="feature-phone-chat__typing"
                        aria-hidden
                      >
                        <span />
                        <span />
                        <span />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
