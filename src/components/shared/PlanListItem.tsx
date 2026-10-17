"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock4, Flame, Star, X } from "lucide-react";
import { IGymItem } from "@/Types/GymTypes";

interface PlanListItemProps {
  item: IGymItem;
  onRemove: (id: number) => void;
  onMarkDone?: (id: number) => void;
  showMarkDone?: boolean;
}

const PlanListItem = ({
  item,
  onRemove,
  onMarkDone,
  showMarkDone = false,
}: PlanListItemProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-base-100 rounded-2xl p-3 sm:p-4">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="relative w-24 h-20 sm:w-28 shrink-0 rounded-2xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold wrap-break-word">
            {item.name}
          </h3>
          <p className="text-base lg:text-lg text-gray-400">{item.equipment}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm">
            <span className="inline-flex items-center gap-1">
              <Clock4 className="text-lime-400 size-4" />
              {item.duration} min
            </span>
            <span className="inline-flex items-center gap-1">
              <Flame className="text-lime-400 size-4" />
              {item.caloriesBurned} kcal
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="text-lime-400 size-4" />
              {item.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full lg:w-auto lg:shrink-0">
        <Link
          href={`/Exercise/${item.id}`}
          className="btn btn-outline btn-sm sm:btn-md rounded-full flex-1 sm:flex-none"
        >
          View Details
        </Link>
        {showMarkDone && onMarkDone && (
          <button
            onClick={() => onMarkDone(item.id)}
            className="btn btn-sm sm:btn-md bg-lime-400 text-gray-900 rounded-full flex-1 whitespace-nowrap px-3 sm:px-4 sm:flex-none"
          >
            <Check className="size-4" />
            Mark as Done
          </button>
        )}
        <button
          onClick={() => onRemove(item.id)}
          className="rounded-full shrink-0 p-1 ml-auto lg:ml-0"
        >
          <X className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default PlanListItem;