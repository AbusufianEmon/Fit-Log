"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IGymItem } from "@/Types/GymTypes";

interface PlanContextType {
  planItems: IGymItem[];
  savedItems: IGymItem[];
  addToPlan: (item: IGymItem) => boolean;
  addToSaved: (item: IGymItem) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const PLAN_CAP = 5;

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [planItems, setPlanItems] = useState<IGymItem[]>([]);
  const [savedItems, setSavedItems] = useState<IGymItem[]>([]);

  const addToPlan = (item: IGymItem) => {
    if (planItems.length >= PLAN_CAP) return false;
    if (planItems.some((p) => p.id === item.id)) return false;
    setPlanItems((prev) => [...prev, item]);
    return true;
  };

  const addToSaved = (item: IGymItem) => {
    if (savedItems.some((s) => s.id === item.id)) return;
    setSavedItems((prev) => [...prev, item]);
  };

  const removeFromPlan = (id: number) => {
    setPlanItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const markAsDone = (id: number) => {
    // simplest version: treat "done" as removed from the active plan
    removeFromPlan(id);
  };

  return (
    <PlanContext.Provider
      value={{
        planItems,
        savedItems,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};