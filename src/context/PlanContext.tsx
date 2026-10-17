"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
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
const PLAN_KEY = "planItems";
const SAVED_KEY = "savedItems";
const EMPTY = "[]";

// ---- localStorage store (read with useSyncExternalStore) ----

const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
};

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const readRaw = (key: string): string => {
  try {
    return localStorage.getItem(key) ?? EMPTY;
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
    return EMPTY;
  }
};

const parseItems = (raw: string): IGymItem[] => {
  try {
    return JSON.parse(raw) as IGymItem[];
  } catch {
    return [];
  }
};

const writeItems = (key: string, items: IGymItem[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Failed to save ${key}:`, error);
  }
  emitChange();
};

const getServerSnapshot = () => EMPTY;

// ---- Provider ----

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  // The server and the first client render both use EMPTY, so they always match.
  // After hydration, React switches to the real localStorage value.
  const planRaw = useSyncExternalStore(
    subscribe,
    () => readRaw(PLAN_KEY),
    getServerSnapshot,
  );
  const savedRaw = useSyncExternalStore(
    subscribe,
    () => readRaw(SAVED_KEY),
    getServerSnapshot,
  );

  const planItems = useMemo(() => parseItems(planRaw), [planRaw]);
  const savedItems = useMemo(() => parseItems(savedRaw), [savedRaw]);

  const addToPlan = (item: IGymItem) => {
    const current = parseItems(readRaw(PLAN_KEY));
    if (current.length >= PLAN_CAP) return false;
    if (current.some((p) => p.id === item.id)) return false;
    writeItems(PLAN_KEY, [...current, item]);
    return true;
  };

  const addToSaved = (item: IGymItem) => {
    const current = parseItems(readRaw(SAVED_KEY));
    if (current.some((s) => s.id === item.id)) return;
    writeItems(SAVED_KEY, [...current, item]);
  };

  const removeFromPlan = (id: number) => {
    const current = parseItems(readRaw(PLAN_KEY));
    writeItems(
      PLAN_KEY,
      current.filter((item) => item.id !== id),
    );
  };

  const removeFromSaved = (id: number) => {
    const current = parseItems(readRaw(SAVED_KEY));
    writeItems(
      SAVED_KEY,
      current.filter((item) => item.id !== id),
    );
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