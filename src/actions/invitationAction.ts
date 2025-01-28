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

  // FIX: 웨딩 시간을 문자열로 처리 할지 아니면 따로 숫자로 처리할지
  const { weddingTime, formattedDate } = useWeddingStore();
  const { greetingTitle, greetingContent } = useGreetingStore();
  const { uploadedImage } = useImageStore();

  const { contacts } = useContactStore();

  const { brideGroom } = useBrideGroomStore();

  const { invitationtitle } = useInvitationStore();

  const { subCalendarFeatures } = useCalendarFeatureStore();

  const { images, grid } = useGallaryStore();

  const { accounts } = useAccountStore();
  const accountList: AccountDetail[] = accounts.flatMap((item) => [
    { order: 7, ...item.accountInfo },
    { order: 7, ...item.fatherAccountInfo },
    { order: 7, ...item.motherAccountInfo },
  ]);

  const { selectedMusic } = useMusicFeatureStore();

  const { font } = useThemeStore();

  const { subFeatures: transportData, transportationInputs } =
    useLocationFeatureStore();

  const { notices } = useNoticeStore();
  const noticeList: NoticeDetail[] = notices.map((value) => {
    return { order: 1, ...value };
  });

  return {
    title: invitationtitle,
    groomName: brideGroom[0].name,
    brideName: brideGroom[1].name,

    //FIX: 백엔드에서 데이터 늘려줘야됨
    // date: `${formattedDate.year}년 ${formattedDate.month}월 ${formattedDate.day}일`,
    date: '',

    location: [address as string],
    //FIX: S3 구현되면 수정
    imgUrl: '',
    // imgUrl: uploadedImage as string,

    //FIX: 백엔드 이름 수정 예정
    contentType: greetingTitle,
    content: greetingContent,
    //FIX: 수정
    weddingTime: `${weddingTime.hour}, ${weddingTime.minute}`,

    groomFatherName: brideGroom[0].family.father.name,
    groomMotherName: brideGroom[0].family.mother.name,
    brideFatherName: brideGroom[1].family.father.name,
    brideMotherName: brideGroom[1].family.mother.name,

    groomFatherAlive: !brideGroom[0].family.father.isDeceased,
    groomMotherAlive: !brideGroom[0].family.mother.isDeceased,
    brideFatherAlive: !brideGroom[1].family.father.isDeceased,
    brideMotherAlive: !brideGroom[1].family.mother.isDeceased,

    backgroundColor: '',

    //FIX: 참석여부 모달 스토어
    attendanceTitle: '참석 여부 제목',
    attendanceContent: '참석 여부 설명',
    attendanceIsDining: true,
    attendance: true,
    font: font,

    calendars: [
      {
        order: 1,
        calendar: subCalendarFeatures.calendar,
        dDay: subCalendarFeatures.dday,
        countdown: subCalendarFeatures.countdown,
      },
    ],
    maps: [
      {
        order: 2,
        tMap: transportData.navigationTmap,
        naverMap: transportData.navigationNaver,
        kakaoMap: transportData.navigationKakao,
        personalCar: transportData.transportationCar,
        subway: transportData.transportationSubway,
        bus: transportData.transportationBus,
        personalCarContent: transportationInputs.car,
        subwayContent: transportationInputs.subway,
        busContent: transportationInputs.bus,
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
        //FIX: 널값 예외처리
        order: 4,
        groomContact: contacts[0].contact,
        brideContact: contacts[1].contact,
        groomFatherContact: contacts[0].fatherContact,
        groomMotherContact: contacts[0].motherContact,
        brideFatherContact: contacts[1].fatherContact,
        brideMotherContact: contacts[1].motherContact,
      },
    ],
    notices: noticeList,

    audio: selectedMusic.id,
  };
};

export const useUpdateInvitationStore = (details: InvitationDetiail) => {
  const { setInvitationTitle } = useInvitationStore();
  const { setAddress, setJibunAddress, setCoords } = useAddressStore();
  const { setWeddingDate, setWeddingTime } = useWeddingStore();
  const { setGreetingContent, setGreetingTitle, setSelectedSample } =
    useGreetingStore();
  const { setUploadedImage } = useImageStore();
  const contacts = useContactStore((state) => state.updateContact);
  const { updateBrideGroom, updateFamily } = useBrideGroomStore();
  const { setFont } = useThemeStore();
  const { setGrid, setImages } = useGallaryStore();
  const {
    updateTransportationInput: setTransportSubFeature,
    toggleSubFeature: transportToggle,
  } = useLocationFeatureStore();
  const { selectMusic, toggleSubFeature: musicToggle } = useMusicFeatureStore();
  const { updateAccountInfo } = useAccountStore();
  const { replaceNotice } = useNoticeStore();

  useEffect(() => {
    if (details) {
      setInvitationTitle(details.title);

      //FIX: 주소 어떻게 받을지 처리
      setAddress('주소', '짚코드');
      setJibunAddress('');
      setCoords(0, 0);

      setWeddingDate(new Date(details.date));

      //FIX: 시간 처리
      setWeddingTime(0, 0);

      setGreetingContent(details.content);
      setGreetingTitle(details.contentType);
      //FIX : SAMPLE 처리
      setSelectedSample('');

      setUploadedImage(details.imgUrl);

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

      updateBrideGroom(0, 'name', details.brideName);
      updateBrideGroom(1, 'name', details.groomName);

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

      //TODO: NOTICE
      //TODO: Calendars
      //TODO: maps
      //TODO : 참석의사 스토어
      //FIX: MUSIC

      // musicSubFeatures();
      selectMusic(details.audio);
      musicToggle('music', false); //수정 필요
    }
  }, [details]); // details 변경 시 실행
};
