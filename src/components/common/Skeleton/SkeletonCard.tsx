const SkeletonCard = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full rounded-xl shadow-md animate-pulse">
      <div className="relative w-full">
        <div className="w-full h-full rounded-xl aspect-[3/4] bg-gray-200 dark:bg-gray-600" />
        <div className="absolute bottom-0 w-full h-14 bg-gray-300 dark:bg-gray-700 rounded-b-xl px-4 py-2 flex justify-between items-center">
          <div className="w-full flex flex-col items-start justify-center">
            <div className="h-2.5 w-3/6 mb-2 bg-gray-200 dark:bg-gray-600 rounded-full" />
            <div className="h-2 w-4/6 bg-gray-200 dark:bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonCard;
