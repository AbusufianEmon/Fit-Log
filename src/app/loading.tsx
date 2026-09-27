const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <span className="loading loading-spinner text-lime-400"></span>
      <p className="text-gray-400">Loading workouts…</p>
    </div>
  );
};

export default Loading;