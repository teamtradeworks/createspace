"use client";

import { useEffect } from "react";

export default function ClarityAnalytics({ projectId }: { projectId: string }) {
  useEffect(() => {
    const init = () => {
      import("@microsoft/clarity").then((mod) => mod.default.init(projectId));
    };

    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(init);
    } else {
      setTimeout(init, 2000);
    }
  }, [projectId]);

  return null;
}
