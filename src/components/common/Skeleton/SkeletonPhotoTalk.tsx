const SkeletonPhotoTalk = () => {
  return (
    <div className="flex-center bg-white dark:bg-gray-800 w-full rounded-2xl relative mb-3 shadow-custom h-[220px] pb-3 animate-pulse">
      <div className="w-full grid grid-cols-2 place-content-center gap-4 p-4 h-[200px]">
        <div className="w-full h-40 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col justify-center h-full">
          <div className="h-2 w-4/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-5/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-3/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-4/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>
      </div>
      <div className="flex justify-end w-full px-4 py-2 absolute bottom-1 right-1">
        <div className="h-2 w-1/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonPhotoTalk;
