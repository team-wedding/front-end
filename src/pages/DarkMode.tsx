import React from 'react';

const DarkMode = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          id="light"
          name="theme"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          defaultChecked
        />
        <label
          htmlFor="light"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          라이트 모드
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input type="radio" id="dark" name="theme" />
        <label
          htmlFor="dark"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          다크 모드
        </label>
      </div>
      <div className="flex items-center">
        <input type="radio" id="system" name="theme" />
        <label
          htmlFor="system"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          시스템 기본 설정
        </label>
      </div>
    </div>
  );
};

export default DarkMode;
