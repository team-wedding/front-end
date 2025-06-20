import DOMPurify from 'dompurify';
import React from 'react';

const PhotoTalkMessage = ({
  message,
  hasImage,
}: {
  message: string;
  hasImage: boolean;
}) => {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
      className={`text-gray-900 dark:text-label-dark text-sm text-ellipsis break-keep leading-relaxed text-center ${hasImage ? 'p-3' : 'px-8 py-4 mt-3'}`}
    ></p>
  );
};

export default React.memo(PhotoTalkMessage);
