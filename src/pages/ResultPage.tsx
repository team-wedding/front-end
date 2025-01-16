import ResultDisplay from '../components/display/ResultDisplay';
import useBrideGroomStore from '../store/useBrideGroomStore';
import useGreetingStore from '../store/useGreetingStore';
import useThemeStore from '../store/useThemeStore';
import { useWeddingStore } from '../store/useWeddingStore';
import useContactStore from '../store/useContactStore';
import useAddressStore from '../store/useAddressStore';
import useImageStore from '../store/useImageStore';
import { useEffect } from 'react';
import { useGetInvitation } from '../hooks/useInvitation';
import { useLocation } from 'react-router';

const ResultPage = () => {
  const { setAddress, setJibunAddress, setCoords } = useAddressStore();
  const { setWeddingDate, setWeddingTime } = useWeddingStore();
  const { setGreeting, setTitle, setSelectedSample } = useGreetingStore();
  const { setUploadedImage } = useImageStore();
  const contacts = useContactStore((state) => state.updateContact);
  const { updateBrideGroom, updateFamily } = useBrideGroomStore();
  const { setFont, setBackgroundColor, setWeight } = useThemeStore();
  const path = useLocation().pathname.split('/')
  const invitation = useGetInvitation(parseInt(path[2]))


  useEffect(() => {
    if (invitation) {
      setAddress('주소', '짚코드');
      setJibunAddress('');
      setCoords(0, 0);
      setWeddingDate(new Date(invitation.date));
      setWeddingTime(invitation.weddingTime);
      setGreeting(invitation.content);
      setTitle(invitation.contentType);
      setSelectedSample('');
      setUploadedImage(invitation.imgUrl);

      contacts(0, 'fatherContact', invitation.brideFatherContact);
      contacts(0, 'motherContact', invitation.brideMotherContact);
      contacts(1, 'fatherContact', invitation.groomFatherContact);
      contacts(1, 'motherContact', invitation.groomMotherContact);
      contacts(0, 'contact', invitation.brideContact);
      contacts(1, 'contact', invitation.groomContact);

      updateBrideGroom(0, 'name', invitation.brideName);
      updateBrideGroom(1, 'name', invitation.groomName);

      updateFamily(0, 'father', 'name', invitation.brideFatherName);
      updateFamily(0, 'mother', 'name', invitation.brideMotherName);
      updateFamily(0, 'father', 'isDeceased', invitation.brideFatherAlive);
      updateFamily(0, 'mother', 'isDeceased', invitation.brideMotherAlive);
      updateFamily(1, 'father', 'name', invitation.groomFatherName);
      updateFamily(1, 'mother', 'name', invitation.groomMotherName);
      updateFamily(1, 'father', 'isDeceased', invitation.groomFatherAlive);
      updateFamily(1, 'mother', 'isDeceased', invitation.groomMotherAlive);

      setFont(invitation.font);
      setBackgroundColor(invitation.backgroundColor);
      setWeight(invitation.weight);
    }
  }, [invitation])

  return (
    <div className="bg-slate-300 w-full min-h-screen flex-center">
      <ResultDisplay />
    </div>
  );
};

export default ResultPage;
