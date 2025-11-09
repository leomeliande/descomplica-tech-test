import React, { createContext, useState, useContext, ReactNode } from "react";

export type ViewType = "list" | "add" | "edit";

interface AppViewContextType {
  view: ViewType;
  editingStudentId: string | null;
  setView: (view: ViewType) => void;
  setEditingStudentId: (id: string | null) => void;
}

const AppViewContext = createContext<AppViewContextType | undefined>(undefined);

export const AppViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<ViewType>("list");
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  return (
    <AppViewContext.Provider
      value={{ view, editingStudentId, setView, setEditingStudentId }}
    >
      {children}
    </AppViewContext.Provider>
  );
};

export const useAppView = () => {
  const context = useContext(AppViewContext);
  if (!context) {
    throw new Error("useAppView must be used within AppViewProvider");
  }
  return context;
};
