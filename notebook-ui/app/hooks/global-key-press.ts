import { useEffect, useRef } from "react";

type KeyLike = string | string[];
type EventType = "keydown" | "keyup" | "keypress";

interface Options {
  eventType?: EventType;
  disabled?: boolean;
  capture?: boolean;
  requireAll?: boolean;
}

export default function useGlobalKeyPress(
  keys: KeyLike | undefined,
  handler: (e: KeyboardEvent) => void,
  opts: Options = {},
) {
  const {
    eventType = "keydown",
    disabled = false,
    capture = false,
    requireAll = false,
  } = opts;
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const keysRef = useRef<string[] | null>(
    Array.isArray(keys) ? keys : keys ? [keys] : null,
  );
  useEffect(() => {
    keysRef.current = Array.isArray(keys) ? keys : keys ? [keys] : null;
  }, [keys]);

  // track currently pressed keys
  const activeKeys = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (disabled) return;

    const onDown = (e: KeyboardEvent) => {
      activeKeys.current.add(e.key);
    };
    const onUp = (e: KeyboardEvent) => {
      activeKeys.current.delete(e.key);
    };

    window.addEventListener("keydown", onDown, { capture });
    window.addEventListener("keyup", onUp, { capture });
    return () => {
      window.removeEventListener("keydown", onDown, { capture });
      window.removeEventListener("keyup", onUp, { capture });
    };
  }, [disabled, capture]);

  // main listener that decides when to call handler
  useEffect(() => {
    if (disabled) return;

    const listener = (e: KeyboardEvent) => {
      const ks = keysRef.current;
      if (!ks) {
        handlerRef.current(e);
        return;
      }

      // compute the effective set for this event (include the key for keydown,
      // exclude for keyup) so the check catches the simultaneous press on the event that changes state
      const current = new Set(activeKeys.current);
      if (e.type === "keydown") current.add(e.key);
      if (e.type === "keyup") current.delete(e.key);

      if (requireAll) {
        const allDown = ks.every((k) => current.has(k));
        if (allDown) handlerRef.current(e);
      } else {
        const anyDown = ks.some((k) => current.has(k));
        if (anyDown) handlerRef.current(e);
      }
    };

    window.addEventListener(eventType, listener as EventListener, { capture });
    return () => {
      window.removeEventListener(eventType, listener as EventListener, {
        capture,
      });
    };
  }, [eventType, disabled, capture, requireAll]);
}
