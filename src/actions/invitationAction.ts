import useBrideGroomStore from '../store/useBrideGroomStore';
import useGreetingStore from '../store/useGreetingStore';
import useThemeStore from '../store/useThemeStore';
import { useWeddingStore } from '../store/useWeddingStore';
import useContactStore from '../store/useContactStore';
import useAddressStore from '../store/useAddressStore';
import useImageStore from '../store/useImageStore';
import { InvitationDetiail } from '../types/invitationType';

export const getInvitationAction = (): InvitationDetiail => {
  const { address } = useAddressStore();
  const { weddingDate, weddingTime } = useWeddingStore();
  const { greeting } = useGreetingStore();

  const { uploadedImage } = useImageStore();
  const contacts = useContactStore((state) => state.contacts);
  const { brideGroom } = useBrideGroomStore();

  const { font, weight, backgroundColor } = useThemeStore();
  const groom = contacts.find((person) => person.role === '신랑');
  const bride = contacts.find((person) => person.role === '신부');
  return {
    groomName: brideGroom[0].name,
    brideName: brideGroom[1].name,
    groomContact: groom?.contact as string,
    brideContact: bride?.contact as string,
    date: weddingDate?.toString() as string,
    location: address as string,
    imgUrl: uploadedImage as string,
    contentType: '제목',
    content: greeting,
    groomFatherName: brideGroom[0].family.father.name,
    groomMotherName: brideGroom[0].family.mother.name,
    brideFatherName: brideGroom[1].family.father.name,
    brideMotherName: brideGroom[1].family.mother.name,
    groomFatherContact: groom?.fatherContact as string,
    groomMotherContact: groom?.motherContact as string,
    brideFatherContact: bride?.fatherContact as string,
    brideMotherContact: bride?.motherContact as string,
    weddingTime: weddingTime as string,
    groomFatherAlive: !brideGroom[0].family.father.isDeceased,
    groomMotherAlive: !brideGroom[0].family.mother.isDeceased,
    brideFatherAlive: !brideGroom[1].family.father.isDeceased,
    brideMotherAlive: !brideGroom[1].family.mother.isDeceased,
    font: font,
    weight: weight,
    backgroundColor: backgroundColor,
  };
};

// export const updateInvitaionStore = (details: InvitationDetiail) => {
//   const { setAddress, setJibunAddress, setCoords } = useAddressStore();
//   const { setWeddingDate, setWeddingTime } = useWeddingStore();
//   const { setGreeting, setTitle, setSelectedSample } = useGreetingStore();
//   const { setUploadedImage } = useImageStore();
//   const contacts = useContactStore((state) => state.updateContact);
//   const { updateBrideGroom, updateFamily } = useBrideGroomStore();
//   const { setFont, setBackgroundColor, setWeight } = useThemeStore();
//   return () => {
//     setAddress('주소', '짚코드');
//     setJibunAddress('');
//     setCoords(0, 0);
//     setWeddingDate(new Date(details.date));
//     setWeddingTime(details.weddingTime);
//     setGreeting(details.content);
//     setTitle(details.contentType);
//     setSelectedSample('');
//     setUploadedImage(details.imgUrl);

//     contacts(0, 'fatherContact', details.brideFatherContact);
//     contacts(0, 'motherContact', details.brideMotherContact);
//     contacts(1, 'fatherContact', details.groomFatherContact);
//     contacts(1, 'motherContact', details.groomMotherContact);
//     contacts(0, 'contact', details.brideContact);
//     contacts(1, 'contact', details.groomContact);

//     updateBrideGroom(0, 'name', details.brideName);
//     updateBrideGroom(1, 'name', details.groomName);

//     updateFamily(0, 'father', 'name', details.brideFatherName);
//     updateFamily(0, 'mother', 'name', details.brideMotherName);
//     updateFamily(0, 'father', 'isDeceased', details.brideFatherAlive);
//     updateFamily(0, 'mother', 'isDeceased', details.brideMotherAlive);
//     updateFamily(1, 'father', 'name', details.groomFatherName);
//     updateFamily(1, 'mother', 'name', details.groomMotherName);
//     updateFamily(1, 'father', 'isDeceased', details.groomFatherAlive);
//     updateFamily(1, 'mother', 'isDeceased', details.groomMotherAlive);

//     setFont(details.font);
//     setBackgroundColor(details.backgroundColor);
//     setWeight(details.weight);
//   };
// };
