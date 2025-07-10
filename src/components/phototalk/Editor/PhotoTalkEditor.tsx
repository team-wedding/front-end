import { ChangeEvent, useEffect, useState } from 'react';
import usePhotoTalkStore from '@store/usePhotoTalkStore';
import CloseIcon from '@icons/CloseIcon';
import { useCreatePhototalk, useUpdatePhototalk } from '@/hooks/usePhototalk';
import { useParams } from 'react-router';
import { useS3Image } from '@/hooks/useS3Image';
import TipTapEditor from '@/components/common/Editor/TiptapEditor';
import PhotoTalkImageUpload from '@/components/phototalk/Editor/PhotoTalkImageUpload';
import Toast from '@/components/common/Toast';
import useToast from '@/hooks/useToast';
import { createPortal } from 'react-dom';
import { UserMode } from '@/types/photoTalkUserTypes';
import { USER_MODE } from '@/constants/photoTalkUserConstants';

interface PhotoTalkEditorProps {
  userMode: UserMode;
  closeEditor: () => void;
  refetch?: () => void;
}

const MAX_IMAGE_COUNT = 10;

const PhotoTalkEditor = ({
  userMode,
  closeEditor,
  refetch,
}: PhotoTalkEditorProps) => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    throw new Error(
      'Modal root element not found. Make sure <div id="modal-root" /> exists in index.html.',
    );
  }

  const [form, setForm] = useState({
    name: '',
    password: '',
    message: '',
  });

  const [originImageUrls, setOriginImagUrls] = useState<string[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  const { userId, invitationId } = useParams();
  const { editingPhotoTalk, resetFields } = usePhotoTalkStore();
  const createPhototalk = useCreatePhototalk();
  const updatePhototalk = useUpdatePhototalk();
  const { mutateAsync: uploadS3Mutate } = useS3Image();
  const { showToast, message } = useToast();

  const parseImageUrls = (imageUrl: string[]) => {
    return Array.isArray(imageUrl)
      ? imageUrl
      : typeof imageUrl === 'string'
        ? JSON.parse(imageUrl)
        : [];
  };

  useEffect(() => {
    if (editingPhotoTalk) {
      setForm({
        ...editingPhotoTalk,
      });

      const parsedUrls = parseImageUrls(editingPhotoTalk.imageUrl);
      setOriginImagUrls(parsedUrls);
    } else {
      resetFields();
      setForm({
        name: '',
        password: '',
        message: '',
      });
    }
    setPreviewImageUrls([]);
    setNewImageFiles([]);
  }, [editingPhotoTalk]);

  const isOverImageLimit = (newFiles: File[]) => {
    return (
      originImageUrls.length + newImageFiles.length + newFiles.length >
      MAX_IMAGE_COUNT
    );
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (isOverImageLimit(files)) {
      showToast('최대 10장까지만 업로드 가능합니다.');
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImageUrls((prev) => [...prev, ...previews]);
    setNewImageFiles((prev) => [...prev, ...files]);
  };

  const handleImageRemove = (index: number) => {
    if (index < originImageUrls.length) {
      setOriginImagUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      const previewIndex = index - originImageUrls.length;
      setPreviewImageUrls((prev) => prev.filter((_, i) => i !== previewIndex));
      setNewImageFiles((prev) => prev.filter((_, i) => i !== previewIndex));
    }
  };

  // const [isDragging, setIsDragging] = useState(false);

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

  const handleCloseEditor = () => {
    resetFields();
    setForm({
      name: '',
      password: '',
      message: '',
    });
    setOriginImagUrls([]);
    setPreviewImageUrls([]);
    setNewImageFiles([]);

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

    const { imageUrls: uploadedUrls } = await uploadS3Mutate({
      imageFiles: newImageFiles,
      directory: 'celebration',
    });

    const finalImageUrls = [...originImageUrls, ...uploadedUrls];

    const photoTalkData = {
      ...form,
      userId: Number(userId),
      invitationId: Number(invitationId),
      imageUrl: finalImageUrls,
    };

    if (editingPhotoTalk) {
      updatePhototalk.mutate(
        {
          id: editingPhotoTalk.id!,
          photoTalkData,
        },
        {
          onSuccess: () => {
            refetch?.();
            handleCloseEditor();
          },
        },
      );
    } else {
      createPhototalk.mutate(photoTalkData, {
        onSuccess: () => {
          refetch?.();
          handleCloseEditor();
        },
      });
    }
  };

  return createPortal(
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="photoTalkEditorTitle"
      className="flex-center fixed inset-0 z-50 bg-black bg-opacity-60 max-w-[520px] m-auto"
    >
      <article className="bg-surface dark:bg-surface-dark rounded-2xl shadow-custom backdrop-blur-3xl w-[80%] h-[40rem] p-2 overflow-auto">
        <header className="flex items-center justify-between p-2">
          <h2
            id="photoTalkEditorTitle"
            className="text-base font-medium text-label dark:text-label-dark"
          >
            {editingPhotoTalk ? '포토톡 편집하기' : '포토톡 작성하기'}
          </h2>
          <button aria-label="닫기" onClick={handleCloseEditor}>
            <CloseIcon className="size-6 text-label dark:text-label-dark" />
          </button>
        </header>

        <div className="flex flex-col gap-1 px-3 py-2">
          <label htmlFor="name" className="label w-full">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            value={form.name}
            onChange={handleChange}
            className="formInput w-full mb-2"
          />
          <label htmlFor="password" className="label w-full">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={form.password}
            onChange={handleChange}
            className="formInput w-full mb-2"
          />
          <label className="label w-full">내용</label>
          <div className="mb-2">
            <TipTapEditor
              content={form.message}
              onChange={(value) => {
                setForm((prev) => ({ ...prev, message: value }));
              }}
            />
          </div>

          <PhotoTalkImageUpload
            imageUrls={[...originImageUrls, ...previewImageUrls]}
            handleImageUpload={handleImageUpload}
            handleImageRemove={handleImageRemove}
          />

          <button
            aria-label={editingPhotoTalk ? '편집하기' : '등록하기'}
            onClick={handleSubmit}
            className={`bg-black text-white hover:bg-black/90 p-4 rounded-2xl shrink-0 text-xs`}
          >
            {editingPhotoTalk ? '편집하기' : '등록하기'}
          </button>
        </div>
      </article>

      {message && <Toast message={message} />}
    </section>,
    modalRoot,
  );
};

export default PhotoTalkEditor;
