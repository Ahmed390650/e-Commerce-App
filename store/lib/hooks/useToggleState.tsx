import { useState, useCallback } from "react";

export function useToggleState(initial: boolean = false) {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const setOn = useCallback(() => setState(true), []);
  const setOff = useCallback(() => setState(false), []);

  return { state, toggle, setOn, setOff, setState };
}
