import { useEffect, useRef } from "react";

export function useCapture(handleFunc, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleCapturePhase(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handleFunc?.();
        }
      }

      document.addEventListener("click", handleCapturePhase, listenCapturing); //true prevents to buble-up

      return () =>
        document.removeEventListener(
          "click",
          handleCapturePhase,
          listenCapturing
        );
    },
    [handleFunc, listenCapturing]
  );
  return ref;
}
