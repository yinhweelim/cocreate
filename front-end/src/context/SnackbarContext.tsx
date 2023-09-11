import React, { createContext, useContext } from "react";

// export const SnackbarContext = createContext({});

// export function useSnackbar() {
//   return useContext(SnackbarContext);
// }

interface SnackbarContextProps {
  showSnackbar: (message: string, severity: "success" | "warning") => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error(
      "useSnackbar must be used within a SnackbarContextProvider"
    );
  }
  return context;
}
