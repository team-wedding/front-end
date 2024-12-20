import useBrideGroomStore from '../store/useBrideGroomStore';
import useGreetingStore from '../store/useGreetingStore';
// import useImageStore from '../store/useImageStore';
import useThemeStore from '../store/useThemeStore';
import { useWeddingStore } from '../store/useWeddingStore';
import useContactStore from '../store/useContactStore';
import useAddressStore from '../store/useAddressStore';
export const getInvitationDetail = () => {
  const { address } = useAddressStore();
  const { weddingDate, weddingTime } = useWeddingStore();
  const { title, greeting } = useGreetingStore();
  const contacts = useContactStore((state) => state.contacts);
  const { brideGroom } = useBrideGroomStore();
  const { font, weight, backgroundColor } = useThemeStore();
  const groom = contacts.find((person) => person.role === '신랑');
  const bride = contacts.find((person) => person.role === '신부');

  return {
    groomName: brideGroom[0].name,
    brideName: brideGroom[1].name,
    groomContact: groom?.contact,
    brideContact: bride?.contact,
    date: weddingDate?.toString(),
    location: address,
    imgUrl: '',
    contentType: '제목',
    content: greeting,
    groomFatherName: brideGroom[0].family.father.name,
    groomMotherName: brideGroom[0].family.mother.name,
    brideFatherName: brideGroom[1].family.father.name,
    brideMotherName: brideGroom[1].family.mother.name,
    groomFatherContact: groom?.fatherContact,
    groomMotherContact: groom?.motherContact,
    brideFatherContact: bride?.fatherContact,
    brideMotherContact: bride?.motherContact,
    weddingTime: weddingTime,
    groomFatherAlive: !brideGroom[0].family.father.isDeceased,
    groomMotherAlive: !brideGroom[0].family.mother.isDeceased,
    brideFatherAlive: !brideGroom[1].family.father.isDeceased,
    brideMotherAlive: !brideGroom[1].family.mother.isDeceased,
    font: font,
    weight: weight,
    backgroundColor: backgroundColor,
  };
};
