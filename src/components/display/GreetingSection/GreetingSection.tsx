import useBrideGroomStore from '@/store/useBrideGroomStore';
import FamilyName from './FamilyName';
import Greeting from './Greeting';

const GreetingSection = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);

  const allNamesFilled = brideGroom.every(
    (person) =>
      person.name.trim() !== '' &&
      person.family.father.name.trim() !== '' &&
      person.family.mother.name.trim() !== '',
  );

  return (
    <div className="column-center py-20 gap-16">
      <Greeting />
      {allNamesFilled && <FamilyName />}
    </div>
  );
};

export default GreetingSection;
