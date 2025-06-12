const SkeletonPhotoTalk = () => {
  return (
    <div className="flex-center bg-white dark:bg-gray-800 w-full rounded-2xl relative mb-3 py-4 px-2  shadow-custom h-[14rem] animate-pulse border dark:border-black">
      <div className="w-full grid grid-cols-2 place-content-center gap-1 p-2">
        <div className="w-full h-[10rem] rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col justify-center items-center h-full">
          <div className="h-2 w-4/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-5/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-3/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 w-4/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </div>
      </div>
      <div className="flex justify-end w-full px-4 py-2 absolute bottom-0 right-2">
        <div className="h-2 w-1/6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SkeletonPhotoTalk;
