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
import useRSVPStore from '@/store/useRSVPStore';
import { useAccordionStore } from '@/store/useAccordionStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';

export const getInvitationAction = (): InvitationDetiail => {
  //웨딩 정보
  const { address } = useAddressStore();
  const { optionalItems } = useAccordionStore();
  const findOrder = (feature: string) => {
    if (!feature) return undefined; // feature가 없으면 undefined 반환
    const result = optionalItems.find((value) => value.feature === feature);
    return result?.order;
  };

  const { selectedOptionalFeatures } = useOptionalFeatureStore();

  // FIX: 웨딩 시간을 문자열로 처리 할지 아니면 따로 숫자로 처리할지
  const { weddingTime, formattedDate } = useWeddingStore();
  const { greetingTitle, greetingContent } = useGreetingStore();
  const { uploadedImage } = useImageStore();

  const { contacts } = useContactStore();

  const { brideGroom } = useBrideGroomStore();

  const { invitationtitle } = useInvitationStore();

  const { rsvpTitle, rsvpDescription, rsvpIncludeMeal, rsvpIncludePopulation } =
    useRSVPStore();

  const { subCalendarFeatures } = useCalendarFeatureStore();

  const { images, grid } = useGallaryStore();

  const { accounts } = useAccountStore();
  const accountList: AccountDetail[] = accounts.flatMap((item) => [
    { order: findOrder('account'), ...item.accountInfo },
    { order: findOrder('account'), ...item.fatherAccountInfo },
    { order: findOrder('account'), ...item.motherAccountInfo },
  ]);

  const { selectedMusic } = useMusicFeatureStore();

  const { font } = useThemeStore();

  const { subFeatures: transportData, transportationInputs } =
    useLocationFeatureStore();

  const { notices } = useNoticeStore();
  const noticeList: NoticeDetail[] = notices.map((value) => {
    return { order: findOrder('notice'), ...value };
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
    greetingTitle: greetingTitle,
    greetingContent: greetingContent,
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

    //FIX : BackGround Color 추가
    backgroundColor: '',
    attendanceTitle: rsvpTitle,
    attendanceContent: rsvpDescription,
    attendanceIsDining: rsvpIncludeMeal,
    attendance: rsvpIncludePopulation,
    font: font,

    calendars: selectedOptionalFeatures.calendar
      ? [
          {
            order: findOrder('calendar')!,
            calendar: subCalendarFeatures.calendar,
            dDay: subCalendarFeatures.dday,
            countdown: subCalendarFeatures.countdown,
          },
        ]
      : undefined,
    maps: selectedOptionalFeatures.location
      ? [
          {
            order: findOrder('location')!,
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
        ]
      : [],
    galleries: selectedOptionalFeatures.gallery
      ? [
          {
            order: findOrder('gallery')!,
            images: images,
            grid: grid,
          },
        ]
      : [],
    accounts: selectedOptionalFeatures.account ? accountList : [],
    contacts: selectedOptionalFeatures.contact
      ? [
          {
            //FIX: 널값 예외처리
            order: findOrder('contact')!,
            brideContact: contacts[0].contact,
            groomContact: contacts[1].contact,
            brideFatherContact: contacts[0].fatherContact,
            brideMotherContact: contacts[0].motherContact,
            groomFatherContact: contacts[1].fatherContact,
            groomMotherContact: contacts[1].motherContact,
          },
        ]
      : [],
    notices: selectedOptionalFeatures.notice ? noticeList : [],
    audio: selectedMusic?.id,
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

  const { toggleOptionalFeature } = useOptionalFeatureStore();
  const { updateAccountInfo } = useAccountStore();
  const { replaceNotice } = useNoticeStore();
  const { setRSVPDetails, setRSVPIncludeMeal, setRSVPIncludePopulation } =
    useRSVPStore();
  const { toggleSubFeature: calendarToggle } = useCalendarFeatureStore();
  console.log(details?.accounts);

  useEffect(() => {
    if (details) {
      //청첩장 제몫
      setInvitationTitle(details.title);
      //가족이름
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

      //FIX: 주소 어떻게 받을지 처리
      setAddress('주소', '짚코드');
      setJibunAddress('');
      setCoords(0, 0);
      //웨딩 날짜
      setWeddingDate(details.date === '' ? new Date() : new Date(details.date));

      //FIX: 시간 처리
      setWeddingTime(12, 0);

      //청첩장 제목/내용
      setGreetingTitle(details.greetingTitle);
      setGreetingContent(details.greetingContent);

      //FIX : SAMPLE 처리
      setSelectedSample('');
      //대표이미지
      setUploadedImage(details.imgUrl);
      //연락처
      contacts(
        0,
        'fatherContact',
        details.contacts ? details?.contacts[0]?.brideFatherContact : '',
      );
      contacts(
        0,
        'motherContact',
        details.contacts ? details?.contacts[0]?.brideMotherContact : '',
      );
      contacts(
        1,
        'fatherContact',
        details.contacts ? details?.contacts[0]?.groomFatherContact : '',
      );
      contacts(
        1,
        'motherContact',
        details.contacts ? details?.contacts[0]?.groomMotherContact : '',
      );
      contacts(
        0,
        'contact',
        details.contacts ? details?.contacts[0]?.brideContact : '',
      );
      contacts(
        1,
        'contact',
        details.contacts ? details?.contacts[0]?.groomContact : '',
      );

      //RSVP Modal
      setRSVPDetails({
        rsvpTitle: details.attendanceTitle,
        rsvpDescription: details.attendanceContent,
      });
      setRSVPIncludeMeal(details.attendanceIsDining);
      setRSVPIncludePopulation(details.attendance);
      //갤러리
      setGrid(details.galleries ? details.galleries[0]?.grid : false);
      setImages(details.galleries ? details.galleries[0]?.images : []);
      // Theme 설정 업데이트
      setFont(details.font);
      //교통수단
      //TODO: CanMove 처리
      transportToggle('canMoveMap', false);
      setTransportSubFeature(
        'subway',
        details.maps ? details.maps[0]?.subwayContent : '',
      );
      setTransportSubFeature(
        'bus',
        details.maps ? details.maps[0]?.busContent : '',
      );
      setTransportSubFeature(
        'car',
        details.maps ? details.maps[0]?.personalCarContent : '',
      );
      transportToggle(
        'navigationKakao',
        details.maps ? details.maps[0]?.kakaoMap : false,
      );
      transportToggle(
        'navigationNaver',
        details.maps ? details.maps[0]?.naverMap : false,
      );
      transportToggle(
        'navigationTmap',
        details.maps ? details.maps[0]?.tMap : false,
      );
      transportToggle(
        'transportationCar',
        details.maps ? details.maps[0]?.personalCar : false,
      );

      transportToggle(
        'transportationBus',
        details.maps ? details.maps[0]?.bus : false,
      );

      transportToggle(
        'transportationSubway',
        details.maps ? details.maps[0]?.subway : false,
      );

      replaceNotice(details.notices ? details?.notices : []);

      //FIX Account 꼬임...
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
          ? details.accounts[1]
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
          ? details.accounts[1]
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
          ? details.accounts[1]
          : {
              accountHolderName: '',
              bankName: '',
              accountNumber: '',
              kakaoUrl: '',
            },
      );

      //FIX: undefined 처리
      calendarToggle(
        'calendar',
        details.calendars ? details?.calendars[0]?.calendar : false,
      );
      calendarToggle(
        'dday',
        details.calendars ? details?.calendars[0]?.dDay : false,
      );
      calendarToggle(
        'countdown',
        details.calendars ? details?.calendars[0]?.countdown : false,
      );

      toggleOptionalFeature('calendar', details?.calendars?.length !== 0);
      toggleOptionalFeature('location', details?.maps?.length !== 0);
      toggleOptionalFeature('gallery', details?.galleries?.length !== 0);
      toggleOptionalFeature('account', details?.accounts?.length !== 0);
      toggleOptionalFeature('contact', details?.contacts?.length !== 0);
      toggleOptionalFeature('notice', details?.notices?.length !== 0);

      //FIX: MUSIC
      // musicSubFeatures();
      selectMusic(details.audio);
      musicToggle('music', !!details.audio); //수정 필요

      const data = [
        details.calendars,
        details.maps,
        details.galleries,
        details.notices,
        details.accounts,
        details.contacts,
      ];

      let extractedData: { name: string; order: number }[] = [];
      data.forEach((section, index) => {
        if (Array.isArray(section)) {
          section.forEach((item) => {
            if (item.order !== undefined) {
              extractedData.push({
                order: item.order,
                name: Object.keys(details)[index],
              });
            }
          });
        }
      });
      extractedData.sort((a, b) => a.order - b.order);
      console.log(extractedData);
    }
  }, [details]); // details 변경 시 실행
};
