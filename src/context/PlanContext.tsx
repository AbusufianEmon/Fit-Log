"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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

const getStoredItems = (key: string): IGymItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as IGymItem[]) : [];
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    return [];
  }
};

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [planItems, setPlanItems] = useState<IGymItem[]>(() =>
    getStoredItems("planItems"),
  );
  const [savedItems, setSavedItems] = useState<IGymItem[]>(() =>
    getStoredItems("savedItems"),
  );

  useEffect(() => {
    localStorage.setItem("planItems", JSON.stringify(planItems));
  }, [planItems]);

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

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