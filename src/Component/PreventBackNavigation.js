import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PreventBackNavigation = () => {
  const location = useLocation();

  useEffect((e) => {
    // e.preventDefault();
    const handlePopState = () => {
      window.history.pushState(null, null, location.pathname);
    };

    window.history.pushState(null, null, location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);

  return null;
};
export default  PreventBackNavigation ;