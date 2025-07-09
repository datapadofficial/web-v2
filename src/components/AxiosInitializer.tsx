"use client";

import { useEffect } from "react";
import { initializeAxiosConfigurations } from "@/lib/axios-setup";

export function AxiosInitializer() {
  useEffect(() => {
    initializeAxiosConfigurations();
  }, []);

  return null; // This component doesn't render anything
}
