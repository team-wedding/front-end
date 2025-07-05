import {
  AccountDetail,
  CalendarDetail,
  GalleryDetail,
  InvitationDetail,
  MapDetail,
  NoticeDetail,
} from '@/types/invitationType';
import useBrideGroomStore from '@store/useBrideGroomStore';
import useGreetingStore from '@store/useGreetingStore';
import useThemeStore from '@store/useThemeStore';
import { useWeddingStore } from '@store/useWeddingStore';
import useContactStore from '@store/useContactStore';
import useAddressStore from '@store/useAddressStore';
import useImageStore from '@store/useImageStore';
import { useCalendarFeatureStore } from '@/store/OptionalFeature/useCalendarFeatureStore';
import { useMusicFeatureStore } from '@/store/OptionalFeature/useMusicFeatureStore';
import { useLocationFeatureStore } from '@/store/OptionalFeature/useLocationFeatureStore';
import useRSVPStore from '@/store/useRSVPStore';
import { useAccordionStore } from '@/store/useAccordionStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useAccountStore from '@/store/OptionalFeature/useAccountFeatureStore';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import useNoticeStore, {
  Notice,
} from '@/store/OptionalFeature/useNoticeFeatureStore';
import fonts from '@/constants/fonts';

const defaultCoord = { lat: 37.5086, lng: 127.0397 };
// const today = new Date();

export const defaultInvitationValues: Omit<InvitationDetail, 'title'> = {
  createdAt: '',
  groomName: '',
  brideName: '',
  date: [null, null, null],
  weddingTime: [null, null],
  //[주소, 우편번호,지분주소, 좌표, 홀이름, 홀상세주소]
  location: ['', '', '', '', '', ''],
  greetingTitle: '',
  greetingContent: '',
  groomFatherName: '',
  groomMotherName: '',
  brideFatherName: '',
  brideMotherName: '',
  groomFatherAlive: true,
  groomMotherAlive: true,
  brideFatherAlive: true,
  brideMotherAlive: true,
  backgroundColor: '',
  attendanceTitle: '',
  attendanceContent: '',
  attendanceIsDining: false,
  attendance: false,
  font: 'font-Paperlog',
  fontSize: false,
  calendars: [
    {
      order: 1,
      calendar: false,
      isActive: false,
      dDay: false,
      countdown: false,
    },
  ],
  maps: [
    {
      order: 2,
      isActive: false,
      tMap: false,
      naverMap: false,
      kakaoMap: false,
      personalCar: false,
      subway: false,
      bus: false,
      personalCarContent: '',
      subwayContent: '',
      busContent: '',
    },
  ],
  accounts: [
    {
      order: 4,
      isActive: false,
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    {
      order: 4,
      isActive: false,
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    {
      order: 4,
      isActive: false,
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    {
      order: 4,
      isActive: false,
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    {
      order: 4,
      isActive: false,
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
    {
      order: 4,
      isActive: false,
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    },
  ],
  contacts: [
    {
      order: 5,
      isActive: false,
      brideContact: '',
      groomContact: '',
      brideFatherContact: '',
      brideMotherContact: '',
      groomFatherContact: '',
      groomMotherContact: '',
    },
  ],
  notices: [
    {
      order: 6,
      isActive: false,
      noticeId: 0,
      title: '',
      content: '',
      image: '',
    },
  ],
  audio: null,
  imgUrl: '',
  galleries: [{ order: 3, isActive: false, images: [], grid: false }],
};

export const getInvitationAction = (): Omit<
  InvitationDetail,
  'imgUrl' | 'galleries' | 'notices' | 'title'
> => {
  //웨딩 정보
  const {
    address,
    jibunAddress,
    zonecode,
    weddingHallName,
    weddingHallDetail,
    coords,
  } = useAddressStore();
  const { optionalItems } = useAccordionStore();
  const findOrder = (feature: string) => {
    if (!feature) return undefined; // feature가 없으면 undefined 반환
    const result = optionalItems.find((value) => value.feature === feature);
    return result?.order;
  };
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { weddingTime, formattedDate } = useWeddingStore();
  const { greetingTitle, greetingContent } = useGreetingStore();
  const { contacts } = useContactStore();
  const { brideGroom } = useBrideGroomStore();
  const { rsvpTitle, rsvpDescription, rsvpIncludeMeal, rsvpIncludePopulation } =
    useRSVPStore();
  const { accounts } = useAccountStore();
  const accountList: AccountDetail[] = accounts.flatMap((item) => [
    {
      ...item.accountInfo,
      order: findOrder('account'),
      isActive: selectedOptionalFeatures.account,
    },
    {
      ...item.fatherAccountInfo,
      order: findOrder('account'),
      isActive: selectedOptionalFeatures.account,
    },
    {
      ...item.motherAccountInfo,
      order: findOrder('account'),
      isActive: selectedOptionalFeatures.account,
    },
  ]);
  const { selectedMusic } = useMusicFeatureStore();
  const { font } = useThemeStore();
  const { subCalendarFeatures } = useCalendarFeatureStore();
  const { subFeatures: transportData, transportationInputs } =
    useLocationFeatureStore();

  return {
    groomName: brideGroom[0].name,
    brideName: brideGroom[1].name,
    date: [
      formattedDate?.year ?? null,
      formattedDate?.month ?? null,
      formattedDate?.day ?? null,
    ],
    weddingTime: [weddingTime.hour ?? null, weddingTime.minute ?? null],
    //[주소, 우편번호,지분주소, 좌표, 홀이름, 홀상세주소]
    location: [
      address,
      zonecode.toString(),
      jibunAddress,
      JSON.stringify(coords),
      weddingHallName,
      weddingHallDetail,
    ],
    greetingTitle: greetingTitle,
    greetingContent: greetingContent,
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
    fontSize: false,
    calendars: [
      {
        order: findOrder('calendar')!,
        calendar: subCalendarFeatures.calendar,
        isActive: selectedOptionalFeatures.calendar,
        dDay: subCalendarFeatures.dday,
        countdown: subCalendarFeatures.countdown,
      },
    ],
    maps: [
      {
        order: findOrder('location')!,
        isActive: selectedOptionalFeatures.location,
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
    accounts: accountList,
    contacts: [
      {
        order: findOrder('contact')!,
        isActive: selectedOptionalFeatures.contact,
        brideContact: contacts[0].contact,
        groomContact: contacts[1].contact,
        brideFatherContact: contacts[0].fatherContact,
        brideMotherContact: contacts[0].motherContact,
        groomFatherContact: contacts[1].fatherContact,
        groomMotherContact: contacts[1].motherContact,
      },
    ],
    // notices: noticeList,
    audio: selectedMusic?.id || 1,
  };
};

export const useUpdateInvitationStore = (details: InvitationDetail) => {
  const {
    setAddress,
    setJibunAddress,
    setCoords,
    setWeddingHallName,
    setWeddingHallDetail,
  } = useAddressStore.getState();
  const { setWeddingDate, setWeddingTime } = useWeddingStore.getState();
  const { setGreetingContent, setGreetingTitle } = useGreetingStore.getState();
  const { setUploadedImageUrl } = useImageStore.getState();
  const updateContact = useContactStore.getState().updateContact;
  const { updateBrideGroom, updateFamily } = useBrideGroomStore.getState();
  const { setFont } = useThemeStore.getState();
  const { setGrid, setImages } = useGalleryStore.getState();
  const {
    updateTransportationInput: setTransportSubFeature,
    toggleSubFeature: transportToggle,
  } = useLocationFeatureStore.getState();
  const { selectMusic, toggleSubFeature: musicToggle } =
    useMusicFeatureStore.getState();
  const { toggleOptionalFeature } = useOptionalFeatureStore.getState();
  const { updateAccountInfo } = useAccountStore.getState();
  const { replaceNotice } = useNoticeStore.getState();
  const { setRSVPDetails, setRSVPIncludeMeal, setRSVPIncludePopulation } =
    useRSVPStore.getState();
  const { toggleSubFeature: calendarToggle } =
    useCalendarFeatureStore.getState();

  if (details) {
    updateBrideGroom(0, 'name', details.groomName);
    updateBrideGroom(1, 'name', details.brideName);
    updateFamily(1, 'father', 'name', details.brideFatherName);
    updateFamily(1, 'mother', 'name', details.brideMotherName);
    updateFamily(0, 'father', 'isDeceased', !details.brideFatherAlive);
    updateFamily(0, 'mother', 'isDeceased', !details.brideMotherAlive);
    updateFamily(0, 'father', 'name', details.groomFatherName);
    updateFamily(0, 'mother', 'name', details.groomMotherName);
    updateFamily(1, 'father', 'isDeceased', !details.groomFatherAlive);
    updateFamily(1, 'mother', 'isDeceased', !details.groomMotherAlive);

    const locationData =
      typeof details.location == 'string'
        ? JSON.parse(details.location)
        : Array.from(details.location);
    try {
      setAddress(locationData[0], locationData[1]);
      setJibunAddress(locationData[2]);
      setWeddingHallName(locationData[4]);
      setWeddingHallDetail(locationData[5]);
      // JSON 문자열인지 확인 후 파싱 시도
      //비어있으면 ..
      if (locationData[3].trim() !== '') {
        const { lat, lng } = JSON.parse(locationData[3]);
        setCoords(lat, lng);
      } else {
        //초기값
        const { lat, lng } = defaultCoord;
        setCoords(lat, lng);
      }
    } catch {
      alert(
        `'location Coord가 이상함',
        ${typeof locationData} ,
        ${typeof locationData[3]},
        ${locationData},
        ${locationData[3]},
        `,
      );
    }

    // 웨딩 일시
    try {
      const weddingDateRaw =
        typeof details.date === 'string'
          ? JSON.parse(details.date)
          : details.date;

      const [year, month, day] = Array.isArray(weddingDateRaw)
        ? weddingDateRaw
        : [null, null, null];

      if (year !== null && month !== null && day !== null) {
        const parsedDate = new Date(year, month - 1, day);
        setWeddingDate(parsedDate);
      } else {
        setWeddingDate(undefined);
      }
    } catch (error) {
      throw new Error(`에러 발생: 날짜 불러오는데 에러 발생 :${error}`);
    }
    try {
      const weddingTimeRaw =
        typeof details.weddingTime === 'string'
          ? JSON.parse(details.weddingTime)
          : details.weddingTime;

      const [hour, minute] = Array.isArray(weddingTimeRaw)
        ? weddingTimeRaw
        : [null, null];

      if (hour !== null && minute !== null) {
        setWeddingTime(hour, minute);
      } else {
        setWeddingTime(null, null);
      }
    } catch {
      console.log(
        `잘못된 시간 값입니다: 날짜:${details.weddingTime}  타입:${typeof details.weddingTime}  결과:${details.weddingTime[0]} ${details.weddingTime[1]}`,
      );
    }

    //청첩장 제목/내용
    setGreetingTitle(details.greetingTitle);
    setGreetingContent(details.greetingContent);
    //대표이미지
    setUploadedImageUrl(details.imgUrl);
    const contactInfo =
      typeof details.contacts == 'string'
        ? JSON.parse(details.contacts)
        : Array.from(details.contacts);
    //연락처
    updateContact(0, 'contact', contactInfo[0].brideContact || '');
    updateContact(1, 'contact', contactInfo[0].groomContact || '');
    updateContact(0, 'fatherContact', contactInfo[0].brideFatherContact || '');
    updateContact(0, 'motherContact', contactInfo[0].brideMotherContact || '');
    updateContact(1, 'fatherContact', contactInfo[0].groomFatherContact || '');
    updateContact(1, 'motherContact', contactInfo[0].groomMotherContact || '');

    //RSVP Modal
    setRSVPDetails({
      rsvpTitle: details.attendanceTitle,
      rsvpDescription: details.attendanceContent,
    });
    setRSVPIncludeMeal(details.attendanceIsDining);
    setRSVPIncludePopulation(details.attendance);

    //갤러리;
    const galleryData: GalleryDetail[] =
      typeof details.galleries == 'string'
        ? JSON.parse(details.galleries)
        : typeof details.galleries == 'object'
          ? Array.from(details.galleries)
          : details.galleries;
    setGrid(galleryData[0].grid);
    const galleryImagesData =
      typeof galleryData[0].images == 'string'
        ? JSON.parse(galleryData[0].images)
        : typeof galleryData[0].images == 'object'
          ? Array.from(galleryData[0].images)
          : galleryData[0].images;
    setImages(galleryImagesData);

    //폰트
    setFont(
      details.font,
      fonts.findIndex((value) => value.font == details.font) || 0,
    );

    //Trnasportation
    const mapData: MapDetail =
      typeof details.maps == 'string'
        ? JSON.parse(details.maps)[0]
        : Array.from(details.maps)[0];
    transportToggle('canMoveMap', false);

    try {
      setTransportSubFeature('subway', mapData.subwayContent || '');
    } catch (error) {
      console.error('subwayContent 처리 중 오류 발생:', error);
      setTransportSubFeature('subway', '');
    }

    try {
      setTransportSubFeature('bus', mapData.busContent || '');
    } catch (error) {
      console.error('busContent 처리 중 오류 발생:', error);
      setTransportSubFeature('bus', '');
    }

    try {
      setTransportSubFeature('car', mapData.personalCarContent || '');
    } catch (error) {
      console.error('personalCarContent 처리 중 오류 발생:', error);
      setTransportSubFeature('car', '');
    }

    try {
      transportToggle('navigationKakao', mapData.kakaoMap || false);
    } catch (error) {
      console.error('kakaoMap 처리 중 오류 발생:', error);
      transportToggle('navigationKakao', false);
    }

    try {
      transportToggle('navigationNaver', mapData.naverMap || false);
    } catch (error) {
      console.error('naverMap 처리 중 오류 발생:', error);
      transportToggle('navigationNaver', false);
    }

    try {
      transportToggle('navigationTmap', mapData.tMap || false);
    } catch (error) {
      console.error('tMap 처리 중 오류 발생:', error);
      transportToggle('navigationTmap', false);
    }

    try {
      transportToggle('transportationCar', mapData.personalCar || false);
    } catch (error) {
      console.error('personalCar 처리 중 오류 발생:', error);
      transportToggle('transportationCar', false);
    }

    try {
      transportToggle('transportationBus', mapData.bus || false);
    } catch (error) {
      console.error('bus 처리 중 오류 발생:', error);
      transportToggle('transportationBus', false);
    }

    try {
      transportToggle('transportationSubway', mapData.subway || false);
    } catch (error) {
      console.error('subway 처리 중 오류 발생:', error);
      transportToggle('transportationSubway', false);
    }

    const noticesData: NoticeDetail[] =
      typeof details.notices == 'string'
        ? JSON.parse(details.notices)
        : Array.from(details.notices);
    const modifiedNotice: Notice[] = noticesData.map((value) => {
      return {
        noticeId: value.id!,
        title: value.title!,
        content: value.content as string,
        image: value.image as string,
        imgFile: null,
      };
    });
    replaceNotice(modifiedNotice);

    //계좌
    const defaultAccount = {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      kakaoUrl: '',
    };

    const accountKeys = [
      'accountInfo',
      'fatherAccountInfo',
      'motherAccountInfo',
    ] as const;
    const accountsData: AccountDetail[] =
      typeof details.accounts == 'string'
        ? JSON.parse(details.accounts)
        : Array.from(details.accounts);
    [0, 1].forEach((index) => {
      accountKeys.forEach((key, keyIndex) => {
        const accountData =
          Array.isArray(accountsData) &&
          accountsData.length > index * 3 + keyIndex
            ? accountsData[index * 3 + keyIndex]
            : defaultAccount;
        updateAccountInfo(index, key, accountData);
      });
    });

    const calendarsData: CalendarDetail[] =
      typeof details.calendars == 'string'
        ? JSON.parse(details.calendars)
        : Array.from(details.calendars);
    calendarToggle(
      'calendar',
      (calendarsData.length !== 0 && calendarsData[0].calendar) || false,
    );
    calendarToggle(
      'dday',
      (calendarsData.length !== 0 && calendarsData[0].dDay) || false,
    );
    calendarToggle(
      'countdown',
      (calendarsData.length !== 0 && calendarsData[0].countdown) || false,
    );

    const features = [
      { key: 'calendar', list: calendarsData },
      { key: 'location', list: [mapData] },
      { key: 'gallery', list: galleryData },
      { key: 'account', list: accountsData },
      { key: 'contact', list: contactInfo },
      { key: 'notice', list: noticesData },
    ];
    features.forEach(({ key, list }) => {
      const isActive =
        Array.isArray(list) && list.length > 0 && list[0].isActive;
      toggleOptionalFeature(key, isActive);
    });

    if (details.audio !== null) {
      selectMusic(details.audio);
    }
    musicToggle('music', !!details.audio); //수정 필요
  }
};
