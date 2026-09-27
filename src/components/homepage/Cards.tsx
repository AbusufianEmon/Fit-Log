import React from "react";
import GymCard from "../shared/GymCard";
import { IGymItem } from "@/Types/GymTypes";


const getData = async (): Promise<IGymItem[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const Cards = async () => {
  const gymData = await getData();

  return (
    <div id="library" className="container mx-auto md:max-w-7xl mt-20">

      <div>
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">THE LIBRARY</h2>
        <p className="text-gray-300">Twelve lifts covering every major muscle group.</p>
      </div>

      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {gymData.map((gym: IGymItem) => {
          
          return <GymCard key={gym.id} gym = {gym}/>
          
        }
        
      )}
      </div>
    </div>
  );
};

export default Cards;
