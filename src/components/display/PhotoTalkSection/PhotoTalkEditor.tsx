import { ChangeEvent, useEffect, useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import CloseIcon from '@icons/CloseIcon';
import CloudArrowIcon from '@icons/CloudArrowIcon';

interface UploadedImage {
  id: string;
  url: string;
  file?: File;
}

const PhotoTalkEditor = () => {
  const { isOpen, closeEditor, addPhotoTalk, editPhotoTalk, editingPhotoTalk } =
    usePhotoTalkStore();

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);

  const closeAndReset = () => {
    setName('');
    setContent('');
    setPassword('');
    setImages([]);
    closeEditor();
  };

  useEffect(() => {
    if (editingPhotoTalk) {
      setName(editingPhotoTalk.name);
      setContent(editingPhotoTalk.content);
      setPassword(editingPhotoTalk.password);
      setImages(
        editingPhotoTalk.images.map((url) => ({
          id: url,
          url,
        })),
      );
    }
  }, [editingPhotoTalk]);

  if (!isOpen) return null;

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 30));
  };

  const handleRemoveImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const handleSubmit = () => {
    if (!name || !content || !password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const newPhotoTalk = {
      id: editingPhotoTalk ? editingPhotoTalk.id : String(Date.now()),
      name,
      content,
      password,
      images: images.map((img) => img.url),
    };

    if (editingPhotoTalk) {
      editPhotoTalk(editingPhotoTalk.id, newPhotoTalk);
    } else {
      addPhotoTalk(newPhotoTalk);
    }

    closeAndReset();
  };

  return (
    <div
      onClick={closeAndReset}
      className="page-container fixed inset-0 z-50 bg-black bg-opacity-50"
    >
      <div className="preview-section p-20">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-md h-3/4 min-h-fit"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 border-b rounded-t">
              <div className="text-base font-semibold text-gray-900">
                {editingPhotoTalk ? '포토톡 편집하기' : '포토톡 작성하기'}
              </div>
              <button onClick={closeAndReset}>
                <CloseIcon className="size=[20px]" />
              </button>
            </div>

            <div className="flex flex-col gap-2 p-4">
              <label className="label w-full">이름</label>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="formInput w-full mb-2"
              />
              <label className="label w-full">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="formInput w-full mb-2"
              />
              <label className="label w-full">내용</label>
              <textarea
                placeholder="내용을 입력해주세요"
                value={content}
                rows={4}
                onChange={(e) => setContent(e.target.value)}
                className="formInput w-full mb-2"
              />
              <label className="label w-full">
                사진 추가
                <span className="ml-2 font-light text-gray-500">
                  사진은 최대 30장까지 추가할 수 있습니다.
                </span>
              </label>
              {images.length === 0 ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full py-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center">
                      <CloudArrowIcon />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{' '}
                        or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-nowrap gap-2 overflow-x-auto py-2">
                  <div className="flex w-20 h-20 items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 flex-shrink-0">
                    <label className="size-[24px]">
                      <CloudArrowIcon />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {images.map((image, index) => (
                    <div key={image.id} className="relative flex-shrink-0">
                      <img
                        src={image.url}
                        alt={`Uploaded ${index}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <button
                        onClick={() => handleRemoveImage(image.id)}
                        className="absolute top-1 right-1 bg-gray-800 text-white rounded-full p-1"
                      >
                        <CloseIcon className="size-[12px]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="border py-2 rounded-lg w-full border-gray-300 hover:bg-gray-100"
              >
                {editingPhotoTalk ? '편집하기' : '등록하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoTalkEditor;
