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
import NameInputModal from '@/components/form/BasicInformation/NameInput/NameInputModal';
import ResultDisplay from '@/components/display/ResultDisplay';
import useImageStore from '@/store/useImageStore';
import { useS3Image } from '@/hooks/useS3Image';
import { getInvitationAction, useUpdateInvitationStore } from '@/actions/invitationAction';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';
import { InvitationDetiail, NoticeDetail } from '@/types/invitationType';
import PreviewButton from '@/components/common/CreateInvitation/PreviewButton';
import { useDebouncedInputStore } from '@/store/useDebouncedInputStore';
import logo from '@/assets/woogyeol/logo_light.png';
import { S3Props } from '@/services/imageService';
import { useInvitationStore } from '@/store/useInvitaionStore';
import ReusableModal from '@/components/common/Modal/ReusableModal';

const sliceRanges = [[0, 3], [3, 13], [13]];

const CreateInvitationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [steps, setSteps] = useState(1);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoSaveModal, setAutoSaveModal] = useState(false)
  const [cancelModal, setCancelModal] = useState(false)
  const details = getInvitationAction();
  const { optionalItems } = useAccordionStore();
  const { invitations } = useGetInvitation(parseInt(id!));
  const { items, initializeItems, moveItem } = useAccordionStore();
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { uploadedImageFile } = useImageStore();
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

  const uploadToS3 = async ({ imageFiles, directory }: S3Props) => {
    const { imageUrls } = await s3Mutate(imageFiles.length ? { imageFiles, directory } : { imageFiles: [], directory });
    return imageUrls;
  };

  const updateSetup = async () => {
    await flushAll()
    const [thumbnail, gallery, ...noticeS3ImageList] = await Promise.all([
      uploadToS3(uploadedImageFile ? { imageFiles: [uploadedImageFile], directory: 'thumbnail' } : { imageFiles: [], directory: 'thumbnail' }),
      uploadToS3(galleryFiles ? { imageFiles: galleryFiles, directory: 'gallery' } : { imageFiles: [], directory: 'gallery' }),
      ...noticeImages.map((imageFile) => uploadToS3(imageFile ? { imageFiles: [imageFile], directory: "notice" } : { imageFiles: [], directory: 'notice' })),
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
      imgUrl: thumbnail.length > 0 ? thumbnail[0] : '',
      galleries: [
        { images: gallery, grid, isActive: selectedOptionalFeatures.gallery },
      ],
      notices: noticeList,
    })
  }

  //FIX: TITLE DISAPPEAR 
  useEffect(() => {
    if (invitations?.title) {
      setInvitationTitle(invitations?.title)
    }
  }, [invitations?.title])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await flushAll()
      // if (!validateBrideGroomNames(brideGroom)) {
      //   console.log(!validateBrideGroomNames(brideGroom), brideGroom[0].name, brideGroom[1].name)
      //   setIsModalOpen(true);
      //   return
      // }
      setAutoSaveModal(true);
      updateSetup()
      useUpdateInvitationStore(invitations as InvitationDetiail);
      setTimeout(() => {
        setAutoSaveModal(false);
        setIsModalOpen(false)
      }, 3000); // 모달 인터벌
    }, 25000); // 임시저장 인터벌
    return () => {
      clearInterval(intervalId); // 컴포넌트 unmount 시 cleanup
    };
  }, [updateMutate]);
  useEffect(() => {
    const [start, end] = sliceRanges[steps - 1];
    initializeItems(start, end);
  }, [steps, initializeItems]);

  useEffect(() => {
    useUpdateInvitationStore(invitations as InvitationDetiail);
  }, []);
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
    navigate('/dashboard');
    setCancelModal(true)
  };
  const handleConfirmCancel = () => {
    resetAllStores();
    navigate('/dashboard');
  };
  const handleSave = async () => {
    updateSetup()
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="page-container">
        <div className="create-section relative">
          {autoSaveModal &&
            <div className='fixed flex flex-row gap-4  top-10 right-10 z-20 bg-purple-200/60 text-white px-2 py-2 rounded-md'>
              <img alt="WooGyeol" src={logo} className="w-6 animate-spin" />
              auto-saving....</div>
          }
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
          <div className="absolute bottom-16 right-4">
            <PreviewButton id={id} isSaving={autoSaveModal} update={updateSetup} />
          </div>
        </div>
        <div className="preview-section">
          <ResultDisplay />
        </div>
      </div>
      <NameInputModal
        isOpen={isModalOpen}
        onConfirm={() => setIsModalOpen(false)}
      />
      <ReusableModal isOpen={cancelModal} title={"작성 중인 내용이 삭제됩니다"} confirmText={'저장하지 않고 나가면 입력한 내용이 모두 삭제돼요. 계속하시겠어요?'} onConfirm={handleConfirmCancel} onCancel={() => setCancelModal(false)}></ReusableModal>
    </DndProvider>
  );
};

export default CreateInvitationPage;
