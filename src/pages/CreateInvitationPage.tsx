import { useEffect, useState } from 'react';
import PageLayout from '@layout/PageLayout';
import HeaderButton from '@common/Header/HeaderButton';
import { useNavigate, useParams } from 'react-router';
import { Accordion } from '@common/CreateInvitation/Accordion';
import { Stepper } from '@common/CreateInvitation/Stepper';
import { StepNavigation } from '@common/CreateInvitation/StepNavigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAccordionStore } from '@store/useAccordionStore';
import { useGetInvitation, useUpdateInvitation } from '@hooks/useInvitation';
import resetAllStores from '@/store/resetStore';
import ResultDisplay from '@/components/display/ResultDisplay';
import useImageStore from '@/store/useImageStore';
import { useS3Image } from '@/hooks/useS3Image';
import {
  getInvitationAction,
  useUpdateInvitationStore,
} from '@/actions/invitationAction';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';
import {
  InvitationDetail,
  NoticeDetail,
  S3UploadRequest,
} from '@/types/invitationTypes';
import PreviewButton from '@/components/common/CreateInvitation/PreviewButton';
import { useDebouncedInputStore } from '@/store/useDebouncedInputStore';
import { useInvitationStore } from '@/store/useInvitaionStore';
import ReusableModal from '@/components/common/Modal/ReusableModal';
import useToast from '@/hooks/useToast';
import Toast from '@/components/common/Toast';
import PreviewDisplay from '@/components/display/PreviewDisplay';
import BackIcon from '@/components/icons/BackIcon';

const sliceRanges = [[0, 3], [3, 13], [13]];
// const AUTO_SAVE_MODAL_DURATION_MS = 3000;
// const AUTO_SAVE_INTERVAL_MS = 5000;

const CreateInvitationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [steps, setSteps] = useState(1);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const details = getInvitationAction();
  const { optionalItems } = useAccordionStore();
  const { invitations } = useGetInvitation(parseInt(id!));
  const { items, initializeItems, moveItem } = useAccordionStore();
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { uploadedImageFile, uploadedImageUrl } = useImageStore();
  const { galleryFiles, grid } = useGalleryStore();
  const { invitationtitle, setInvitationTitle } = useInvitationStore();
  const { notices } = useNoticeStore();
  const noticeImages = notices.flatMap((value) => {
    if (value.imgFile) {
      return value.imgFile;
    } else return null;
  });

  const { mutateAsync: updateMutate } = useUpdateInvitation(parseInt(id!));
  const { mutateAsync: s3Mutate } = useS3Image();

  const flushAll = useDebouncedInputStore((s) => s.flushAll);

  const findOrder = (feature: string) => {
    if (!feature) return undefined; // feature가 없으면 undefined 반환
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
        { images: gallery, grid, isActive: selectedOptionalFeatures.gallery },
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
    useUpdateInvitationStore(invitations as InvitationDetail);
  }, [invitations]);

  useEffect(() => {
    const [start, end] = sliceRanges[steps - 1];
    initializeItems(start, end);
  }, [steps, initializeItems]);

  // useEffect(() => {
  //   const intervalId = setInterval(async () => {
  //     await flushAll()
  //     setAutoSaveModal(true);
  //     await saveInvitationData()
  //     // useUpdateInvitationStore(invitations as InvitationDetail);
  //     setTimeout(() => {
  //       setAutoSaveModal(false);
  //       setIsModalOpen(false)
  //     }, AUTO_SAVE_MODAL_DURATION_MS); // 모달 인터벌
  //   }, AUTO_SAVE_INTERVAL_MS); // 임시저장 인터벌
  //   return () => {
  //     clearInterval(intervalId); // 컴포넌트 unmount 시 cleanup
  //   };
  // }, [updateMutate]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  const handleStepClick = (step: number) => {
    if (step > 0 && step <= sliceRanges.length) {
      setSteps(step);
    }
  };
  const handleNext = () => {
    if (steps < sliceRanges.length) {
      handleStepClick(steps + 1);
    }
  };
  const handlePrev = () => {
    if (steps > 1) {
      handleStepClick(steps - 1);
    }
  };
  const handleCancel = () => {
    resetAllStores();
    setCancelModal(true);
  };
  const handleConfirmCancel = () => {
    resetAllStores();
    navigate('/dashboard');
  };

  const { message, showToast } = useToast();

  const handleSave = async () => {
    saveInvitationData();
    showToast('청첩장이 성공적으로 저장되었습니다.');
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="page-container overflow-hidden flex flex-row justify-center">
          <div className="create-section relative w-full sm:w-1/2">
            <PageLayout
              title={invitationtitle}
              leftButton={
                <HeaderButton
                  onClick={handleCancel}
                  className="text-sm text-gray-600 mx-6 hover:text-black active:text-rose-400"
                >
                  취소
                </HeaderButton>
              }
              rightButton={
                <HeaderButton
                  onClick={handleSave}
                  className="text-sm text-gray-600 mx-6 hover:text-black active:text-rose-400"
                >
                  저장
                </HeaderButton>
              }
              customFooter={
                <StepNavigation
                  currentStep={steps}
                  totalSteps={sliceRanges.length}
                  onPrev={handlePrev}
                  onNext={handleNext}
                />
              }
            >
              <Stepper
                steps={['기본 정보 입력', '기능 선택', '테마 선택']}
                currentStep={steps}
                onStepClick={handleStepClick}
              />
              <div className="bg-background/10 min-h-screen font-Pretendard">
                <Accordion
                  items={items}
                  expandedIds={expandedIds}
                  toggleExpand={toggleExpand}
                  moveItem={moveItem}
                />
              </div>
            </PageLayout>
            <div className="absolute bottom-16 right-4 sm:hidden">
              <PreviewButton
                update={saveInvitationData}
                setPreviewModal={setPreviewModal}
              />
            </div>
          </div>
          <div className="preview-section sm:h-screen w-1/2 hidden sm:block">
            <ResultDisplay />
          </div>
          <section
            className={`sm:hidden absolute top-0 left-0 w-full h-screen overflow-scroll backdrop-blur-lg pt-2 bg-grey-600 z-30 transform ease-in-out duration-700 ${previewModal ? 'translate-x-0`' : 'translate-x-full'}`}
          >
            <header className="fixed top-2 left-0 right-0 px-10 z-50 m-auto max-w-[520px] flex-between h-12 bg-transparent ">
              <button
                onClick={() => setPreviewModal(false)}
                aria-label="뒤로가기"
                className="p-3 text-black "
              >
                <BackIcon />
              </button>
            </header>
            <PreviewDisplay />
          </section>
        </div>
        <ReusableModal
          isOpen={cancelModal}
          title={'작성 중인 내용이 삭제됩니다'}
          confirmText={
            '저장하지 않고 나가면 입력한 내용이 모두 삭제돼요. 계속하시겠어요?'
          }
          onConfirm={handleConfirmCancel}
          onCancel={() => setCancelModal(false)}
        ></ReusableModal>
      </DndProvider>
      {message && <Toast key={message} message={message} />}
    </>
  );
};

export default CreateInvitationPage;
