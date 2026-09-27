import { IGymItem } from "@/Types/GymTypes";
import Image from "next/image";
import React from "react";
import ExerciseActions from "@/components/shared/ExerciseActions";
import { notFound } from "next/navigation";

interface IExerciseProps {
  params: Promise<{
    id: string;
  }>;
}

const getData = async (): Promise<IGymItem[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const IdPage = async ({ params }: IExerciseProps) => {
  const { id } = await params;

  const gymData = await getData();

  const exerciseData = gymData.find((data: IGymItem) => String(data.id) === id);

if (!exerciseData) {
  notFound();
}

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 container mx-auto max-w-7xl mt-10">
        <figure className="relative w-full h-full min-h-[600px]">
          <Image
            src={exerciseData.image}
            alt={exerciseData.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
          />
        </figure>

        <div className="">
          <div>
            <h2 className="text-3xl font-bold mb-4">{exerciseData.name}</h2>
            <p className="text-gray-400 mb-4">{exerciseData.description}</p>
            <div className="flex mb-4">
              {exerciseData.muscleGroups.map((muscle) => (
                <div
                  key={muscle}
                  className="badge badge-lg rounded-2xl bg-lime-400 text-gray-900"
                >
                  {muscle}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-base-100 rounded-box divide-y divide-base-content/10">
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm tracking-wide text-base-content font-bold">
                EQUIPMENT
              </span>
              <span className="text-base">{exerciseData.equipment}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm tracking-wide text-base-content font-bold">
                DIFFICULTY
              </span>
              <span className="text-base">{exerciseData.difficulty}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm tracking-wide text-base-content font-bold">
                SETS
              </span>
              <span className="text-base">{exerciseData.sets}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm tracking-wide text-base-content font-bold">
                REPS
              </span>
              <span className="text-base">{exerciseData.reps}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm tracking-wide text-base-content font-bold">
                DURATION
              </span>
              <span className="text-base">{exerciseData.duration} min</span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm tracking-wide text-base-content font-bold">
                CALORIES
              </span>
              <span className="text-base">
                {exerciseData.caloriesBurned} kcal
              </span>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm tracking-wide text-base-content font-bold">
                RATING
              </span>
              <span className="text-base">{exerciseData.rating}</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold tracking-wide mb-3">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-3">
              {exerciseData.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="flex items-center justify-center text-lg font-semibold">
                    {index + 1}.
                  </span>
                  <span className="text-lg">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <ExerciseActions exercise={exerciseData} />
        </div>
      </div>
    </div>
  );
};

export default IdPage;
