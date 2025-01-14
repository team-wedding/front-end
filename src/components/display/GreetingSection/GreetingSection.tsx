import FamilyName from './FamilyName';
import Greeting from './Greeting';

const GreetingSection = () => {
  return (
    <div className="column-center gap-8">
      <Greeting />
      <FamilyName />
    </div>
  );
};

export default GreetingSection;
