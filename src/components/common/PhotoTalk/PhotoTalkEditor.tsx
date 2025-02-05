import { ChangeEvent, useEffect, useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import CloseIcon from '@icons/CloseIcon';
import CloudArrowIcon from '@icons/CloudArrowIcon';
import { useCreatePhototalk, useUpdatePhototalk } from '@/hooks/usePhototalk';
import { useParams } from 'react-router';
import { useS3Image } from '@/hooks/useS3Image';
// import { useUserStore } from '@/store/useUserStore';

interface PhotoTalkEditorProps {
  isOpen: boolean;
  closeEditor: () => void;
}

const PhotoTalkEditor = ({ isOpen, closeEditor }: PhotoTalkEditorProps) => {
  const { userId, invitationId } = useParams();
  const { editingPhotoTalk, resetFields } = usePhotoTalkStore();
  const createPhototalk = useCreatePhototalk();
  const updatePhototalk = useUpdatePhototalk();

  // const [isDragging, setIsDragging] = useState(false);
  const [form, setForm] = useState({
    name: '',
    message: '',
    password: '',
    imageUrl: [] as string[],
    imageFile: [] as File[],
  });

  const imageUrls = Array.isArray(form.imageUrl)
    ? form.imageUrl
    : typeof form.imageUrl === 'string'
      ? JSON.parse(form.imageUrl)
      : [];

  useEffect(() => {
    if (editingPhotoTalk) {
      setForm({
        ...editingPhotoTalk,
        imageUrl: Array.isArray(editingPhotoTalk.imageUrl)
          ? editingPhotoTalk.imageUrl
          : typeof editingPhotoTalk.imageUrl === 'string'
            ? JSON.parse(editingPhotoTalk.imageUrl)
            : [],
        imageFile: [],
      });
    } else {
      resetFields();
      setForm({
        name: '',
        message: '',
        password: '',
        imageUrl: [] as string[],
        imageFile: [],
      });
    }
  }, [isOpen, editingPhotoTalk]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setForm({
      ...form,
      imageUrl: [...imageUrls, ...newImages].slice(0, 30),
      imageFile: files,
    });
  };

  const handleRemoveImage = (image: string, index: number) => {
    setForm({
      ...form,
      imageUrl: imageUrls.filter((img: string) => img !== image),
      imageFile: form.imageFile.filter((_, i) => i !== index),
    });
  };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const files = e.dataTransfer.files;
  //   if (files && files.length > 0) {
  //     handleImageUpload(files);
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutateAsync: s3Mutate } = useS3Image();
  const handleSubmit = async () => {
    if (!form.name || !form.message || !form.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    const { imageUrls: photoTalkImageUrls } = await s3Mutate(form.imageFile);
    if (editingPhotoTalk) {
      updatePhototalk.mutate(
        {
          id: editingPhotoTalk.id!,
          photoTalkData: {
            ...form,
            userId: Number(userId),
            invitationId: Number(invitationId),
            password: form.password,
            imageUrl: photoTalkImageUrls,
          },
        },
        {
          onSuccess: () => {
            resetFields();
            closeEditor();
          },
        },
      );
    } else {
      createPhototalk.mutate(
        {
          ...form,
          userId: Number(userId),
          invitationId: Number(invitationId),
          imageUrl: photoTalkImageUrls,
        },
        {
          onSuccess: () => {
            resetFields();
            closeEditor();
          },
        },
      );
    }
  };

  return (
    isOpen && (
      <div className="flex-center fixed inset-0 z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg w-80 shadow-sm h-3/4 min-h-fit">
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-3 border-b rounded-t">
              <div className="text-base font-medium text-gray-900">
                {editingPhotoTalk ? '포토톡 편집하기' : '포토톡 작성하기'}
              </div>
              <button onClick={closeEditor}>
                <CloseIcon className="size=[12px]" />
              </button>
            </div>

            <div className="flex flex-col gap-3 px-3 pt-4">
              <label className="label w-full">이름</label>
              <input
                type="text"
                name="name"
                placeholder="이름을 입력해주세요"
                value={form.name}
                onChange={handleChange}
                className="formInput w-full mb-2"
              />

              <label className="label w-full">비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={form.password}
                onChange={handleChange}
                className="formInput w-full mb-2"
              />

              <label className="label w-full">내용</label>
              <textarea
                name="message"
                placeholder="내용을 입력해주세요"
                value={form.message}
                rows={4}
                onChange={handleChange}
                className="formInput w-full mb-2"
              />

              <label className="label w-full">
                사진 추가
                <span className="ml-2 font-light text-gray-500">
                  사진은 최대 10장까지 추가할 수 있습니다.
                </span>
              </label>

              {imageUrls.length === 0 ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full py-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center">
                      <CloudArrowIcon />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{' '}
                        or drag and drop
                      </p>
                    </div>
                    <input
                      name="file"
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
                        name="file"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {form.imageUrl.map((image, index) => (
                    <div key={image} className="relative flex-shrink-0">
                      <img
                        src={image}
                        alt={`Uploaded ${index}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <button
                        onClick={() => handleRemoveImage(image, index)}
                        className="absolute top-1 right-1 bg-gray-700 text-white rounded-full p-1"
                      >
                        <CloseIcon className="size-[12px]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="bg-button bg-opacity-80 text-white hover:bg-rose-200 px-4 py-3 rounded-xl shrink-0 text-xs"
              >
                {editingPhotoTalk ? '편집하기' : '등록하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PhotoTalkEditor;
