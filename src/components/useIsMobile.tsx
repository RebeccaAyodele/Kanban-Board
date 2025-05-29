import { useEffect, useState } from "react";

const useIsMobile = (breakpoint: number = 800): boolean => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    };

    checkMobile()
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);
  return isMobile ?? false;
}

export default useIsMobile