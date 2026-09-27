"use client";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { useState } from "react";
import PlanListItem from "@/components/shared/PlanListItem";

const TodayPlanPage = () => {
  const { planItems, savedItems, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const activeList = activeTab === "plan" ? planItems : savedItems;

  const stats = [
    { label: "Exercises", value: activeList.length, highlight: true },
    {
      label: "Minutes",
      value: activeList.reduce((sum, item) => sum + item.duration, 0),
      highlight: false,
    },
    {
      label: "Calories",
      value: activeList.reduce((sum, item) => sum + item.caloriesBurned, 0),
      highlight: false,
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-extrabold tracking-tight">MY PLAN</h1>
      <p className="bg-base-300 text-gray-300 text-sm mt-3 px-3 py-1">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 bg-base-100 rounded-2xl mt-8">
        {stats.map((stat) => (
          <div key={stat.label} className="px-8 py-6">
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p
              className={`text-3xl font-bold ${
                stat.highlight ? "text-lime-400" : "text-white"
              }`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
        <div className="inline-flex bg-base-200 rounded-full p-1 w-fit">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === "plan"
                ? "bg-base-300 text-lime-400 font-semibold"
                : "text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === "saved"
                ? "bg-base-300 text-lime-400 font-semibold"
                : "text-gray-400"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300 whitespace-nowrap">
            Sort By
          </span>
          <select className="select select-bordered bg-base-100 rounded-full">
            <option>Duration</option>
            <option>Calories</option>
            <option>Difficulty</option>
          </select>
        </div>
      </div>

      <div className="bg-base-200 rounded-2xl mt-6 py-20 px-6 text-center">
        {activeList.length === 0 ? (
          <>
            <h2 className="text-lg font-bold tracking-wide">
              NOTHING HERE YET
            </h2>
            <p className="text-gray-400 mt-3">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/">
              <button className="mt-6 bg-lime-400 text-black font-semibold px-6 py-3 rounded-full">
                Go to workouts
              </button>
            </Link>
          </>
        ) : (
          <div className="text-left space-y-3">
            {activeList.map((item) => (
              <PlanListItem
                key={item.id}
                item={item}
                showMarkDone={activeTab === "plan"}
                onMarkDone={markAsDone}
                onRemove={
                  activeTab === "plan" ? removeFromPlan : removeFromSaved
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayPlanPage;
