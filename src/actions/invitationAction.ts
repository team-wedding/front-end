import useBrideGroomStore from '@store/useBrideGroomStore';
import useGreetingStore from '@store/useGreetingStore';
import useThemeStore from '@store/useThemeStore';
import { useWeddingStore } from '@store/useWeddingStore';
import useContactStore from '@store/useContactStore';
import useAddressStore from '@store/useAddressStore';
import useImageStore from '@store/useImageStore';
import {
  AccountDetail,
  InvitationDetiail,
  NoticeDetail,
} from '../types/invitationType';
import { useEffect } from 'react';
import { useInvitationStore } from '@/store/useInvitaionStore';
import { useCalendarFeatureStore } from '@/store/OptionalFeature/useCalendarFeatureStore';
import useGallaryStore from '@/store/useGallaryStore';
import useAccountStore from '@/store/useAccountStore';
import { useMusicFeatureStore } from '@/store/OptionalFeature/useMusicFeatureStore';
import useNoticeStore from '@/store/useNoticeStore';
import { useLocationFeatureStore } from '@/store/OptionalFeature/useLocationFeatureStore';

export const getInvitationAction = (): InvitationDetiail => {
  //웨딩 정보
  const { address } = useAddressStore();
  const { weddingTime, formattedDate } = useWeddingStore();
  const { greetingTitle, greetingContent } = useGreetingStore();
  //대표이밎
  const { uploadedImage } = useImageStore();
  //신랑/신부 정보
  const contacts = useContactStore((state) => state.contacts);
  const { brideGroom } = useBrideGroomStore();
  //청첩장 제목
  const { invitationtitle } = useInvitationStore();
  //캘린더
  const { subCalendarFeatures } = useCalendarFeatureStore();
  //갤러리
  const { images, grid } = useGallaryStore();
  //축의금
  const { accounts } = useAccountStore();
  const accountList: AccountDetail[] = accounts.flatMap((item) => [
    { order: 7, ...item.accountInfo },
    { order: 7, ...item.fatherAccountInfo },
    { oreder: 7, ...item.motherAccountInfo },
  ]);
  //배경음악
  const { selectedMusic } = useMusicFeatureStore();
  //폰트
  const { font } = useThemeStore();
  //공지사항
  const { notices } = useNoticeStore();
  const noticeList: NoticeDetail[] = notices.map((value) => {
    return { order: 1, ...value };
  });
  return {
    //청첩장 정보
    title: invitationtitle,

    //결혼식 정보
    // date: `${formattedDate.year} 년 ${formattedDate.month}월 ${formattedDate.day}일`,
    date: '',
    weddingTime: `${weddingTime.hour}시 ${weddingTime.minute}분`,
    location: [address as string],
    // imgUrl: uploadedImage as string,
    imgUrl: '',
    contentType: greetingTitle,
    content: greetingContent,

    //신부/신랑측 정보
    groomName: brideGroom[0].name,
    brideName: brideGroom[1].name,

    groomFatherName: brideGroom[0].family.father.name,
    groomMotherName: brideGroom[0].family.mother.name,
    brideFatherName: brideGroom[1].family.father.name,
    brideMotherName: brideGroom[1].family.mother.name,

    groomFatherAlive: !brideGroom[0].family.father.isDeceased,
    groomMotherAlive: !brideGroom[0].family.mother.isDeceased,
    brideFatherAlive: !brideGroom[1].family.father.isDeceased,
    brideMotherAlive: !brideGroom[1].family.mother.isDeceased,

    //청첩장 스타일 정보
    font: font,
    backgroundColor: '',
    audio: selectedMusic.id,

    //참석여부
    attendanceTitle: '참석 여부 제목',
    attendanceContent: '참석 여부 설명',
    attendanceIsDining: true,
    attendance: true,
    //선택기능 정보
    calendars: [
      {
        order: 1,
        calendar: subCalendarFeatures.calendar,
        dDay: subCalendarFeatures.dday,
        countdown: subCalendarFeatures.countdown,
      },
    ],
    galleries: [
      {
        order: 2,
        images: images,
        grid: grid,
      },
    ],
    accounts: accountList,
    contacts: [
      {
        //여기 널값 조심
        order: 4,
        groomContact: contacts[0].contact as string,
        brideContact: contacts[1].contact as string,
        groomFatherContact: contacts[0].fatherContact as string,
        groomMotherContact: contacts[0].motherContact as string,
        brideFatherContact: contacts[1].fatherContact as string,
        brideMotherContact: contacts[1].motherContact as string,
      },
    ],
    notices: noticeList,
  };
};

export const useUpdateInvitationStore = (details: InvitationDetiail) => {
  //지도
  const { setAddress, setJibunAddress, setCoords } = useAddressStore();
  const { setWeddingDate, setWeddingTime } = useWeddingStore();
  const { setGreetingContent, setGreetingTitle, setSelectedSample } =
    useGreetingStore();
  const { setUploadedImage } = useImageStore();
  const contacts = useContactStore((state) => state.updateContact);
  const { updateBrideGroom, updateFamily } = useBrideGroomStore();
  const { setFont } = useThemeStore();
  //선택기능
  const { setGrid, setImages } = useGallaryStore();
  //교통수단
  const {
    updateTransportationInput: setTransportSubFeature,
    toggleSubFeature: transportToggle,
  } = useLocationFeatureStore();
  //배경음악
  const { selectMusic, toggleSubFeature: musicToggle } = useMusicFeatureStore();
  //축의금
  const { updateAccountInfo } = useAccountStore();

  const { replaceNotice } = useNoticeStore();

  useEffect(() => {
    if (details) {
      // Address 업데이트
      setAddress('주소', '짚코드');
      setJibunAddress('');
      setCoords(0, 0);
      // Wedding 정보 업데이트
      setWeddingDate(new Date(details.date));
      setWeddingTime(0, 0);
      // Greeting 업데이트
      setGreetingContent(details.content);
      setGreetingTitle(details.contentType);
      setSelectedSample('');
      // 이미지 업데이트
      setUploadedImage(details.imgUrl);
      // Contacts 업데이트
      contacts(
        0,
        'fatherContact',
        details.contacts ? details.contacts[0].brideFatherContact : '',
      );
      contacts(
        0,
        'motherContact',
        details.contacts ? details.contacts[0].brideMotherContact : '',
      );
      contacts(
        1,
        'fatherContact',
        details.contacts ? details.contacts[0].groomFatherContact : '',
      );
      contacts(
        1,
        'motherContact',
        details.contacts ? details.contacts[0].groomMotherContact : '',
      );
      contacts(
        0,
        'contact',
        details.contacts ? details.contacts[0].brideContact : '',
      );
      contacts(
        1,
        'contact',
        details.contacts ? details.contacts[0].groomContact : '',
      );

      // BrideGroom 업데이트
      updateBrideGroom(0, 'name', details.brideName);
      updateBrideGroom(1, 'name', details.groomName);

      // Family 정보 업데이트
      updateFamily(0, 'father', 'name', details.brideFatherName);
      updateFamily(0, 'mother', 'name', details.brideMotherName);
      updateFamily(0, 'father', 'isDeceased', details.brideFatherAlive);
      updateFamily(0, 'mother', 'isDeceased', details.brideMotherAlive);
      updateFamily(1, 'father', 'name', details.groomFatherName);
      updateFamily(1, 'mother', 'name', details.groomMotherName);
      updateFamily(1, 'father', 'isDeceased', details.groomFatherAlive);
      updateFamily(1, 'mother', 'isDeceased', details.groomMotherAlive);

      //갤러리
      setGrid(details.galleries ? details.galleries[0]?.grid : false);
      setImages(details.galleries ? details.galleries[0].images : []);
      // Theme 설정 업데이트
      setFont(details.font);
      //교통수단
      setTransportSubFeature(
        'subway',
        details.maps ? details.maps[0].subwayContent : '',
      );
      setTransportSubFeature(
        'bus',
        details.maps ? details.maps[0].busContent : '',
      );
      setTransportSubFeature(
        'car',
        details.maps ? details.maps[0].personalCarContent : '',
      );
      transportToggle('canMoveMap', true);
      transportToggle(
        'navigationKakao',
        details.maps ? details.maps[0].kakaoMap : false,
      );
      transportToggle(
        'navigationNaver',
        details.maps ? details.maps[0].naverMap : false,
      );
      transportToggle(
        'navigationTmap',
        details.maps ? details.maps[0].tMap : false,
      );
      transportToggle(
        'transportationCar',
        details.maps ? details.maps[0].personalCar : false,
      );

      transportToggle(
        'transportationBus',
        details.maps ? details.maps[0].bus : false,
      );

      transportToggle(
        'transportationSubway',
        details.maps ? details.maps[0].subway : false,
      );

      replaceNotice(details.notices ? details.notices : []);

      updateAccountInfo(
        0,
        'accountInfo',
        details.accounts
          ? details.accounts[0]
          : {
              accountHolderName: '',
              bankName: '',
              accountNumber: '',
              kakaoUrl: '',
            },
      );
      updateAccountInfo(
        0,
        'fatherAccountInfo',
        details.accounts
          ? details.accounts[0]
          : {
              accountHolderName: '',
              bankName: '',
              accountNumber: '',
              kakaoUrl: '',
            },
      );
      updateAccountInfo(
        0,
        'motherAccountInfo',
        details.accounts
          ? details.accounts[0]
          : {
              accountHolderName: '',
              bankName: '',
              accountNumber: '',
              kakaoUrl: '',
            },
      );
      updateAccountInfo(
        1,
        'accountInfo',
        details.accounts
          ? details.accounts[0]
          : {
              accountHolderName: '',
              bankName: '',
              accountNumber: '',
              kakaoUrl: '',
            },
      );
      updateAccountInfo(
        1,
        'fatherAccountInfo',
        details.accounts
          ? details.accounts[0]
          : {
              accountHolderName: '',
              bankName: '',
              accountNumber: '',
              kakaoUrl: '',
            },
      );
      updateAccountInfo(
        1,
        'motherAccountInfo',
        details.accounts
          ? details.accounts[0]
          : {
              accountHolderName: '',
              bankName: '',
              accountNumber: '',
              kakaoUrl: '',
            },
      );

      // musicSubFeatures();
      selectMusic(details.audio);
      musicToggle('music', false); //Change
    }
  }, [details]); // details 변경 시 실행
};
