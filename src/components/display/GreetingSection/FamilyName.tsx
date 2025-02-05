import useBrideGroomStore from '@store/useBrideGroomStore';
import deceasedImage from '@assets/deceased.png';

const FamilyName = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);

  return (
    <div className="column-center text-sm gap-2 tracking-normal">
      {brideGroom.map((person, index) => {
        const fatherName = person.family.father.name || '아버지';
        const fatherIsDeceased = person.family.father.isDeceased;
        const motherName = person.family.mother.name || '어머니';
        const motherIsDeceased = person.family.mother.isDeceased;
        const personName = person.name || 'ㅇㅇㅇ';
        return (
          <div key={index} className="flex items-center">
            <div className="flex items-center">
              {fatherIsDeceased && (
                <img src={deceasedImage} alt="故" className="w-4 h-4 mr-1" />
              )}
              {fatherName}
            </div>
            {motherName && <span className="mx-1.5">&#183;</span>}
            <div className="flex items-center">
              {motherIsDeceased && (
                <img src={deceasedImage} alt="故" className="w-4 h-4 mr-1" />
              )}
              {motherName}
            </div>
            <div className="text-gray-500 mx-[2px] text-[13px]">
              의 {person.relation}
            </div>
            <div className="mx-1">{personName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FamilyName;
