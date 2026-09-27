import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useSafeNav() {
  const navigate = useNavigate();

  return useCallback((href) => {
    if (!href || href === "#") return;

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
      sessionStorage.setItem("pendingHash", href);
      navigate("/");
    }
  }, [navigate]);
}