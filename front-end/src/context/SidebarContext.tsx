import React, { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <SidebarContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
