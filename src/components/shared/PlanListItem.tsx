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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-100 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <div className="relative w-28 h-20 shrink-0 rounded-2xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{item.name}</h3>
          <p className="text-lg text-gray-400">{item.equipment}</p>
          <div className="flex items-center gap-4 mt-1 text-sm">
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

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/Exercise/${item.id}`}
          className="btn btn-outline rounded-full"
        >
          View Details
        </Link>
        {showMarkDone && onMarkDone && (
          <button
            onClick={() => onMarkDone(item.id)}
            className="btn bg-lime-400 text-gray-900 rounded-full"
          >
            <Check className="size-4" />
            Mark as Done
          </button>
        )}
        <button
          onClick={() => onRemove(item.id)}
          className="rounded-full"
        >
          <X className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default PlanListItem;