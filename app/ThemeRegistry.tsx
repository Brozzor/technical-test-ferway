"use client";

import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "./theme";
import { ReactNode } from "react";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AppRouterCacheProvider options={{ key: "css" }}>
        {children}
      </AppRouterCacheProvider>
    </ThemeProvider>
  );
}