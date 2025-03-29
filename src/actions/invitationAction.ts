import useBrideGroomStore from '@store/useBrideGroomStore';
import useGreetingStore from '@store/useGreetingStore';
import useThemeStore from '@store/useThemeStore';
import { useWeddingStore } from '@store/useWeddingStore';
import useContactStore from '@store/useContactStore';
import useAddressStore from '@store/useAddressStore';
import useImageStore from '@store/useImageStore';
import { AccountDetail, InvitationDetiail } from '../types/invitationType';
import { useEffect } from 'react';
import { useInvitationStore } from '@/store/useInvitaionStore';
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

export const getInvitationAction = (): Omit<
  InvitationDetiail,
  'imgUrl' | 'galleries' | 'notices'
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
  const { invitationtitle } = useInvitationStore();
  const { rsvpTitle, rsvpDescription, rsvpIncludeMeal, rsvpIncludePopulation } =
    useRSVPStore();
  const { accounts } = useAccountStore();
  const accountList: AccountDetail[] = accounts.flatMap((item) => [
    {
      order: findOrder('account'),
      isActive: selectedOptionalFeatures.account,
      ...item.accountInfo,
    },
    {
      order: findOrder('account'),
      isActive: selectedOptionalFeatures.account,
      ...item.fatherAccountInfo,
    },
    {
      order: findOrder('account'),
      isActive: selectedOptionalFeatures.account,
      ...item.motherAccountInfo,
    },
  ]);
  const { selectedMusic } = useMusicFeatureStore();
  const { font } = useThemeStore();
  const { subCalendarFeatures } = useCalendarFeatureStore();
  const { subFeatures: transportData, transportationInputs } =
    useLocationFeatureStore();

  return {
    title: invitationtitle,
    groomName: brideGroom[0].name,
    brideName: brideGroom[1].name,
    date: [formattedDate.year, formattedDate.month, formattedDate.day],
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

    weddingTime: [weddingTime.hour!, weddingTime.minute!],
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
        //FIX: 널값 예외처리
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
    audio: selectedMusic?.id,
  };
};

export const useUpdateInvitationStore = (details: InvitationDetiail) => {
  const { setInvitationTitle } = useInvitationStore();
  const {
    setAddress,
    setJibunAddress,
    setCoords,
    setWeddingHallName,
    setWeddingHallDetail,
  } = useAddressStore();
  const { setWeddingDate, setWeddingTime } = useWeddingStore();
  const { setGreetingContent, setGreetingTitle } = useGreetingStore();
  const { setUploadedImageUrl } = useImageStore();
  const contacts = useContactStore((state) => state.updateContact);
  const { updateBrideGroom, updateFamily } = useBrideGroomStore();
  const { setFont } = useThemeStore();
  const { setGrid, setImages } = useGalleryStore();
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

  useEffect(() => {
    if (details) {
      //청첩장 제목
      setInvitationTitle(details.title);
      //가족이름
      updateBrideGroom(0, 'name', details.brideName);
      updateBrideGroom(1, 'name', details.groomName);
      updateFamily(0, 'father', 'name', details.brideFatherName);
      updateFamily(0, 'mother', 'name', details.brideMotherName);
      updateFamily(0, 'father', 'isDeceased', !details.brideFatherAlive);
      updateFamily(0, 'mother', 'isDeceased', !details.brideMotherAlive);
      updateFamily(1, 'father', 'name', details.groomFatherName);
      updateFamily(1, 'mother', 'name', details.groomMotherName);
      updateFamily(1, 'father', 'isDeceased', !details.groomFatherAlive);
      updateFamily(1, 'mother', 'isDeceased', !details.groomMotherAlive);
      //FIX: 주소 어떻게 받을지 처리
      setAddress(details.location[0], details.location[1]);
      setJibunAddress(details.location[2]);
      try {
        // 배열 길이 확인 후 3번째 요소 존재 여부 체크
        if (details.location.length <= 3) {
          throw new Error('details.location[3]이 존재하지 않습니다.');
        }
        // JSON 문자열인지 확인 후 파싱 시도
        const locationData = details.location[3];
        if (typeof locationData !== 'string') {
          throw new Error('details.location[3]은 문자열이 아닙니다.');
        }
        const { lat, lng } = JSON.parse(locationData);
        setCoords(lat, lng);
      } catch (error) {
        console.error('주소 불러오는데 에러 발생:', error);
      }

      setWeddingHallName(details.location[4]);
      setWeddingHallDetail(details.location[5]);

      try {
        //  비어 있는 경우, 현재 날짜 설정
        if (details.date.length === 0) {
          setWeddingDate(new Date());
        } else {
          //조인후 DATE 포멧 확인
          const dateStr = details.date.join('-');
          const parsedDate = new Date(dateStr);
          if (isNaN(parsedDate.getTime())) {
            throw new Error(`잘못된 날짜 형식: ${dateStr}`);
          }
          setWeddingDate(parsedDate);
        }
      } catch (error) {
        console.error('에러 발생: 날짜 불러오는데 에러 발생 ', error);
        setWeddingDate(new Date());
      }

      // setWeddingTime(details.weddingTime[0], details.weddingTime[1]);

      //청첩장 제목/내용
      setGreetingTitle(details.greetingTitle);
      setGreetingContent(details.greetingContent);
      //대표이미지
      setUploadedImageUrl(details.imgUrl);
      //연락처
      contacts(0, 'contact', details?.contacts[0]?.brideContact || '');
      contacts(1, 'contact', details?.contacts[0]?.groomContact || '');
      contacts(
        0,
        'fatherContact',
        details?.contacts[0]?.brideFatherContact || '',
      );
      contacts(
        0,
        'motherContact',
        details?.contacts[0]?.brideMotherContact || '',
      );
      contacts(
        1,
        'fatherContact',
        details?.contacts[0]?.groomFatherContact || '',
      );
      contacts(
        1,
        'motherContact',
        details?.contacts[0]?.groomMotherContact || '',
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

      setFont(
        details.font,
        fonts.findIndex((value) => value.font == details.font) || 0,
      );
      //교통수단
      //TODO: CanMove 처리
      transportToggle('canMoveMap', false);
      setTransportSubFeature('subway', details.maps[0]?.subwayContent || '');
      setTransportSubFeature('bus', details.maps[0]?.busContent || '');
      setTransportSubFeature('car', details.maps[0]?.personalCarContent || '');
      transportToggle('navigationKakao', details.maps[0]?.kakaoMap || false);
      transportToggle('navigationNaver', details.maps[0]?.naverMap || false);
      transportToggle('navigationTmap', details.maps[0]?.tMap || false);
      transportToggle(
        'transportationCar',
        details.maps[0]?.personalCar || false,
      );

      transportToggle('transportationBus', details.maps[0]?.bus || false);

      transportToggle('transportationSubway', details.maps[0]?.subway || false);

      const modifiedNotice: Notice[] = details.notices.map((value) => {
        return {
          noticeId: value.id!,
          title: value.title!,
          content: value.content as string,
          image: value.image as string,
          imgFile: null,
        };
      });
      replaceNotice(modifiedNotice || []);

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

      [0, 1].forEach((index) => {
        accountKeys.forEach((key, keyIndex) => {
          const accountData =
            Array.isArray(details.accounts) &&
            details.accounts.length > index * 3 + keyIndex
              ? details.accounts[index * 3 + keyIndex]
              : defaultAccount;
          updateAccountInfo(index, key, accountData);
        });
      });

      //FIX: undefined 처리
      calendarToggle(
        'calendar',
        (details.calendars.length !== 0 && details.calendars[0]?.calendar) ||
          false,
      );
      calendarToggle(
        'dday',
        (details.calendars.length !== 0 && details.calendars[0]?.dDay) || false,
      );
      calendarToggle(
        'countdown',
        (details.calendars.length !== 0 && details.calendars[0]?.countdown) ||
          false,
      );

      const features = [
        { key: 'calendar', list: details.calendars },
        { key: 'location', list: details.maps },
        { key: 'gallery', list: details.galleries },
        { key: 'account', list: details.accounts },
        { key: 'contact', list: details.contacts },
        { key: 'notice', list: details.notices },
      ];

      features.forEach(({ key, list }) => {
        const isActive =
          Array.isArray(list) && list.length > 0 && list[0].isActive;
        toggleOptionalFeature(key, isActive);
      });

      //FIX: MUSIC
      selectMusic(details.audio);
      musicToggle('music', !!details.audio); //수정 필요
    }
  }, [details]); // details 변경 시 실행
};
