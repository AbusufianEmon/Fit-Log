"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { toast } from "react-toastify";
import { usePlan } from "@/context/PlanContext";
import { IGymItem } from "@/Types/GymTypes";

interface ExerciseActionsProps {
  exercise: IGymItem;
}

const ExerciseActions = ({ exercise }: ExerciseActionsProps) => {
  const { planItems, savedItems, addToPlan, addToSaved } = usePlan();

  const handleAddToPlan = () => {
    const alreadyAdded = planItems.some((item) => item.id === exercise.id);

    if (alreadyAdded) {
      toast.info("Already added");
      return;
    }

    const added = addToPlan(exercise);
    if (added) {
      toast.success("Added to today's plan");
    } else {
      toast.error("Plan is full (5 lifts)");
    }
  };

  const handleSave = () => {
    const alreadySaved = savedItems.some((item) => item.id === exercise.id);

    if (alreadySaved) {
      toast.info("Already saved");
      return;
    }

    addToSaved(exercise);
    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-col sm:flex-row mt-5 gap-3">
      <button
        onClick={handleAddToPlan}
        className="flex items-center justify-center gap-2 rounded-2xl bg-lime-400 text-gray-900 px-6 py-3"
      >
        <CalendarPlus className="w-5 h-5" />
        Add to today&apos;s plan
      </button>
      <button
        onClick={handleSave}
        className="flex items-center justify-center gap-2 border rounded-2xl border-white px-5 py-3"
      >
        <Bookmark className="w-5 h-5" />
        Save for later
      </button>
    </div>
  );
};

export default ExerciseActions;
