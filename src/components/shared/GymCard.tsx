import React from "react";
import Image from "next/image";
import { IGymItem } from "@/Types/GymTypes";
import { Clock4, Flame, Star } from "lucide-react";
import Link from "next/link";

interface IGymItemProps {
  gym: IGymItem;
}

const GymCard = ({ gym }: IGymItemProps) => {
  return (
    <div key={gym.id}>
      <Link href={`/Exercise/${gym.id}`}>
        <div className="card bg-base-100 shadow-sm border-2 border-transparent rounded-2xl transition-colors duration-300 hover:border-lime-400">
          <figure className="h-56 overflow-hidden">
            <Image
              src={gym.image}
              alt={gym.name}
              width={500}
              height={200}
              style={{ objectFit: "cover" }}
            />
          </figure>
          <div className="card-body">
            <div className="card-actions">
              {gym.muscleGroups.map((muscle) => (
                <div
                  key={muscle}
                  className="badge rounded-2xl bg-lime-400 text-gray-900"
                >
                  {muscle}
                </div>
              ))}
            </div>
            <h2 className="card-title font-bold text-2xl">{gym.name}</h2>
            <p className="text-gray-400">{gym.equipment}</p>
            <div className="card-actions gap-4">
              <div className="inline-flex items-center gap-1">
                <Clock4 className="text-lime-400 w-4 h-4" />
                {gym.duration}
              </div>
              <div className="inline-flex items-center gap-1">
                <Flame className="text-lime-400 w-4 h-4" />
                {gym.caloriesBurned}
                <p> kcal</p>
              </div>
              <div className="inline-flex items-center gap-1">
                <Star className="text-lime-400 w-4 h-4" />
                {gym.rating}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GymCard;
