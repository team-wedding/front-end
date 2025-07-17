import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Accordion } from '@common/CreateInvitation/Accordion';
import { Stepper } from '@common/CreateInvitation/Stepper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAccordionStore } from '@store/useAccordionStore';
import { useGetInvitation, useUpdateInvitation } from '@hooks/useInvitation';
import resetAllStores from '@/store/resetStore';
import useImageStore from '@/store/useImageStore';
import { useS3Image } from '@/hooks/useS3Image';
import {
  getInvitationAction,
  updateInvitationStore,
} from '@/actions/invitationAction';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';
import { NoticeDetail } from '@/types/invitationTypes';
import PreviewButton from '@/components/common/CreateInvitation/PreviewButton';
import { useDebouncedInputStore } from '@/store/useDebouncedInputStore';
import { useInvitationStore } from '@/store/useInvitaionStore';
import useToast from '@/hooks/useToast';
import Toast from '@/components/common/Toast';
import { S3UploadRequest } from '@/types/s3Type';
import PreviewDisplay from '@/components/display/PreviewDisplay';
import { ChevronLeft, X } from 'lucide-react';
import BasicInformationButton from '@/components/common/CreateInvitation/BasicInformationButton';
// import { StepNavigation } from '@common/CreateInvitation/StepNavigation';

const STEP_RANGES = [[0, 3], [3, 13], [13]];
const STEP_ITEM = ['기본 정보', '기능 선택', '테마 선택'];
// const AUTO_SAVE_MODAL_DURATION_MS = 3000;
// const AUTO_SAVE_INTERVAL_MS = 5000;

const CreateInvitationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [basicInfo, setBasicInfo] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const { message, showToast } = useToast();

  const details = getInvitationAction();
  const { invitations } = useGetInvitation(parseInt(id!));
  const { mutateAsync: updateMutate } = useUpdateInvitation(parseInt(id!));
  const { mutateAsync: s3Mutate } = useS3Image();

  const { invitationtitle, setInvitationTitle } = useInvitationStore();
  const items = useAccordionStore((s) => s.items);
  const initializeItems = useAccordionStore((s) => s.initializeItems);
  const moveItem = useAccordionStore((s) => s.moveItem);
  const optionalItems = useAccordionStore((s) => s.optionalItems);

  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { uploadedImageFile, uploadedImageUrl } = useImageStore();
  const { galleryFiles, grid } = useGalleryStore();
  const { notices } = useNoticeStore();

  const flushAll = useDebouncedInputStore((s) => s.flushAll);

  const noticeImages = notices.flatMap((value) => {
    if (value.imgFile) {
      return value.imgFile;
    } else return null;
  });

  const findOrder = (feature: string) => {
    if (!feature) return undefined;
    const result = optionalItems.find((value) => value.feature === feature);
    return result?.order;
  };

  const uploadToS3 = async ({ imageFiles, directory }: S3UploadRequest) => {
    const { imageUrls } = await s3Mutate(
      imageFiles.length
        ? { imageFiles, directory }
        : { imageFiles: [], directory },
    );
    return imageUrls;
  };

  const saveInvitationData = async () => {
    await flushAll();
    const [thumbnail, gallery, ...noticeS3ImageList] = await Promise.all([
      uploadToS3(
        uploadedImageFile
          ? { imageFiles: [uploadedImageFile], directory: 'thumbnail' }
          : { imageFiles: [], directory: 'thumbnail' },
      ),
      uploadToS3(
        galleryFiles
          ? { imageFiles: galleryFiles, directory: 'gallery' }
          : { imageFiles: [], directory: 'gallery' },
      ),
      ...noticeImages.map((imageFile) =>
        uploadToS3(
          imageFile
            ? { imageFiles: [imageFile], directory: 'notice' }
            : { imageFiles: [], directory: 'notice' },
        ),
      ),
    ]);
    const s3ImageList = [thumbnail, gallery, ...noticeS3ImageList];
    const noticeList: NoticeDetail[] = notices.map((value, index) => {
      return {
        ...value,
        order: findOrder('notice'),
        isActive: selectedOptionalFeatures.notice,
        image: s3ImageList[index][0],
      };
    });
    await updateMutate({
      ...details,
      imgUrl: thumbnail.length > 0 ? thumbnail[0] : uploadedImageUrl,
      galleries: [
        {
          images: gallery,
          grid,
          isActive: selectedOptionalFeatures.gallery,
          order: findOrder('gallery'),
        },
      ],
      notices: noticeList,
    });
  };

  useEffect(() => {
    if (invitations?.title) {
      setInvitationTitle(invitations?.title);
    }
  }, [invitations?.title]);

  useEffect(() => {
    if (invitations) {
      updateInvitationStore(invitations);
    }
  }, [invitations]);

  useEffect(() => {
    const [start, end] = STEP_RANGES[currentStep];
    initializeItems(start, end);
  }, [currentStep, initializeItems]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleStepClick = (step: number) => {
    if (step >= 0 && step < STEP_RANGES.length) {
      setCurrentStep(step);
    }
  };

  const handleCancel = () => {
    setCancelModal(true);
  };

  const handleConfirmCancel = () => {
    resetAllStores();
    useAccordionStore.getState().reset();
    navigate('/dashboard');
  };

  const handleSave = async () => {
    saveInvitationData();
    showToast('저장되었습니다');
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main
          className="min-h-screen relative bg-white dark:bg-[#1C1C1E] text-label dark:text-label-dark"
          style={{
            background: 'linear-gradient(135deg, #CEDFFF 0%, #f8e2ea 100%)',
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-16 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-32 left-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-200/25 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <header className="glass-nav sticky top-0 z-30">
            <div className="md:max-w-4xl max-w-md mx-auto px-4">
              <div className="flex items-center justify-between h-12">
                <div className="flex items-center space-x-4 md:space-x-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center p-0 h-auto text-slate-800 rounded-md hover:bg-white/30 transition-colors"
                  >
                    <X className="size-4 mr-2" strokeWidth="2" />
                    취소
                  </button>
                  <div className="h-4 w-px bg-slate-400"></div>
                  <h1 className="text-lg rounded-sm font-medium text-gray-900 ">
                    {invitationtitle}
                  </h1>
                </div>

                <div className="flex items-center space-x-4">
                  <PreviewButton
                    update={saveInvitationData}
                    setPreviewModal={setPreviewModal}
                  />

                  <button
                    onClick={handleSave}
                    className="flex items-center text-base rounded-md text-slate-800 p-0 h-auto hover:bg-white/30  transition-colors"
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>
          </header>

          <section className="md:max-w-4xl md:mx-auto py-4 px-2 md:px-4 md:py-6 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 transition-all duration-300">
              <div className="md:col-span-3 md:my-2">
                <Stepper
                  stepItem={STEP_ITEM}
                  currentStep={currentStep}
                  onStepClick={handleStepClick}
                />

                {currentStep === 0 && (
                  <BasicInformationButton
                    basicInfo={basicInfo}
                    setBasicInfo={setBasicInfo}
                  />
                )}

                <Accordion
                  items={items}
                  expandedIds={expandedIds}
                  toggleExpand={toggleExpand}
                  moveItem={moveItem}
                />
              </div>

              <article className="hidden md:col-span-4 md:block">
                <div className="glass-preview-card h-[calc(100vh-6rem)] overflow-y-auto sticky z-30 top-[4.5rem] p-4 scrollbar-hide">
                  <PreviewDisplay />
                </div>
              </article>
            </div>
          </section>
        </main>

        <section
          className={`fixed top-0 left-0 max-w-4xl w-full mx-auto h-screen overflow-scroll md:hidden backdrop-blur-xl z-50 transform ease-in-out duration-700  ${previewModal ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* <header className="sticky top-0 left-0 right-0 z-50 m-auto "> */}
          <button
            onClick={() => setPreviewModal(false)}
            aria-label="뒤로가기"
            className="text-black sticky top-0 left-0 right-0 z-50 p-3"
          >
            <ChevronLeft className="w-8" />
          </button>
          {/* </header> */}

          <div className="max-w-lg mx-auto px-6">
            <PreviewDisplay />
          </div>
        </section>

        {/* 
        <StepNavigation
          currentStep={currentStep}
          totalSteps={STEP_RANGES.length}
          onPrev={handlePrevStep}
          onNext={handleNextStep}
        /> */}

        {cancelModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center h-screen bg-black/20 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 mb-4 space-y-2">
              <div className="glass-modal overflow-hidden">
                <div className="p-4 text-center border-b border-white/30">
                  <h3 className="font-medium text-slate-800">
                    작성을 취소하시겠습니까?
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    저장하지 않은 내용은 삭제됩니다.
                  </p>
                </div>
                <button
                  onClick={handleConfirmCancel}
                  className="w-full py-3 text-red-500 font-medium hover:bg-white/20"
                >
                  나가기
                </button>
              </div>
              <button
                onClick={() => setCancelModal(false)}
                className="glass-modal w-full py-3 text-slate-800 font-semibold"
              >
                계속 작성하기
              </button>
            </div>
          </div>
        )}
      </DndProvider>

      {message && <Toast key={message} message={message} />}
    </>
  );
};

export default CreateInvitationPage;
