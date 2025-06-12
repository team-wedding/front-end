import { ChangeEvent, useEffect, useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import CloseIcon from '@icons/CloseIcon';
import CloudArrowIcon from '@icons/CloudArrowIcon';
import { useCreatePhototalk, useUpdatePhototalk } from '@/hooks/usePhototalk';
import { useParams } from 'react-router';
import { useS3Image } from '@/hooks/useS3Image';
import TipTapEditor from '@/components/common/Editor/TiptapEditor';
import { USER_MODE, UserMode } from '@/types/users';
// import { useUserStore } from '@/store/useUserStore';

interface PhotoTalkEditorProps {
  userMode: UserMode;
  isEditorOpen: boolean;
  closeEditor: () => void;
  refetch?: () => void;
}

const PhotoTalkEditor = ({
  userMode,
  isEditorOpen,
  closeEditor,
  refetch,
}: PhotoTalkEditorProps) => {
  const { userId, invitationId } = useParams();
  const { editingPhotoTalk, resetFields } = usePhotoTalkStore();
  const createPhototalk = useCreatePhototalk();
  const updatePhototalk = useUpdatePhototalk();
  const { mutateAsync: s3Mutate } = useS3Image();
  // const { mutate: updateS3Image } = useUpdatePhototalkS3Image();

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
  }, [isEditorOpen, editingPhotoTalk]);

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

  // const handleReplaceImage = async (
  //   e: ChangeEvent<HTMLInputElement>,
  //   index: number,
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (!file || !editingPhotoTalk) return;

  //   const newPreviewUrl = URL.createObjectURL(file);
  //   const newImageUrls = [...form.imageUrl];
  //   newImageUrls[index] = newPreviewUrl;

  //   setForm({
  //     ...form,
  //     imageUrl: newImageUrls,
  //   });
  // };

  const handleCloseEditor = () => {
    resetFields();
    setForm({
      name: '',
      message: '',
      password: '',
      imageUrl: [],
      imageFile: [],
    });
    closeEditor();
  };

  const handleSubmit = async () => {
    if (userMode === USER_MODE.PREVIEW) {
      alert('예시 페이지입니다.');
      return;
    }

    if (!form.name || !form.message || !form.password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    const { imageUrls: photoTalkImageUrls } = await s3Mutate({
      imageFiles: form.imageFile,
      directory: 'phototalk',
    });
    if (editingPhotoTalk) {
      // await updateS3Image({
      //   id: editingPhotoTalk.id,
      //   index: ,
      //   newImageFile: photoTalkImageUrls
      // })

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
            refetch?.();
            handleCloseEditor();
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
            refetch?.();
            handleCloseEditor();
          },
        },
      );
    }
  };

  return (
    isEditorOpen && (
      <div className="flex-center fixed inset-0 z-50 bg-black bg-opacity-50 max-w-[520px] m-auto">
        <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-custom backdrop-blur-3xl w-[80%] p-2">
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-2">
              <div className="text-base text-label dark:text-label-dark">
                {editingPhotoTalk ? '포토톡 편집하기' : '포토톡 작성하기'}
              </div>
              <button onClick={handleCloseEditor}>
                <CloseIcon className="size-6 text-label dark:text-label-dark" />
              </button>
            </div>

            <div className="flex flex-col gap-2 px-3 py-4">
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
              {/* <textarea
                name="message"
                placeholder="내용을 입력해주세요"
                value={form.message}
                rows={4}
                onChange={handleChange}
                className="formInput w-full mb-2"
              /> */}
              <TipTapEditor
                content={form.message}
                onChange={(value) => {
                  setForm((prev) => ({ ...prev, message: value }));
                }}
              />

              <label className="label w-full flex items-center gap-2">
                사진 추가
                <span className="font-extralight text-label-secondary/80 dark:text-label-secondary-dark/80 flex-center gap-1">
                  <span>사진은 최대 10장까지 추가할 수 있습니다.</span>
                  <span className="text-black font-light dark:text-white">
                    ( {imageUrls.length} / 10 )
                  </span>
                </span>
              </label>

              {imageUrls.length === 0 ? (
                <div className="flex-center w-full mb-2">
                  <label className="column-center w-full py-10 border border-dashed border-border dark:border-border-dark rounded-2xl cursor-pointer bg-surface-muted dark:bg-surface-muted-dark">
                    <div className="column-center">
                      <CloudArrowIcon />
                      <p className="text-sm text-label-secondary/60 dark:text-label-secondary-dark/60">
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
                  <div className="flex-center w-20 h-20 border-2 border-border dark:border-border-dark border-dashed rounded-lg cursor-pointer bg-surface-muted dark:bg-surface-muted-dark flex-shrink-0">
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
                    <div key={index} className="relative flex-shrink-0">
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
                className={`bg-black text-white hover:bg-black/90 p-4 rounded-2xl shrink-0 text-xs`}
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
