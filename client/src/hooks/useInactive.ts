import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const whitelist = ["/login"];

type UseInactiveProps = {
  onInactiveUser: () => void;
};
export const useInactive = ({ onInactiveUser }: UseInactiveProps) => {
  const router = useLocation();
  let timeout: NodeJS.Timeout | null = null;

  const restartAutoReset = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      onInactiveUser();
    }, 2000 * 60);
  };

  const onMouseMove = () => {
    restartAutoReset();
  };

  useEffect(() => {
    // Whitelist certain pages
    let preventReset = false;
    for (const path of whitelist) {
      if (path === router.pathname) {
        preventReset = true;
      }
    }

    if (preventReset) {
      return;
    }

    // initiate timeout
    restartAutoReset();

    // listen for mouse events
    window.addEventListener("mousemove", onMouseMove);

    // cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        window.removeEventListener("mousemove", onMouseMove);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return {};
};

export default useInactive;
