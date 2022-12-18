import { useEffect, useRef } from "react";

type Event = globalThis.MouseEvent | globalThis.TouchEvent;
// hooks: cuando da click fuera del elemento
const useOnClickOutside = ({ callBack }: { callBack: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callBack();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callBack]);

  return {
    ref,
  };
};

export default useOnClickOutside;
