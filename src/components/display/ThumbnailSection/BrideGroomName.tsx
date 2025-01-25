import useBrideGroomStore from '@store/useBrideGroomStore';

const BrideGroomName = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);

  const groom =
    brideGroom.find((person) => person.role === '신랑')?.name || '김세모';
  const bride =
    brideGroom.find((person) => person.role === '신부')?.name || '이네모';

  return (
    <div>
      <div className="flex-center gap-3 tracking-wider">
        <div>{groom}</div>
        <div>.</div>
        <div>{bride}</div>
      </div>
    </div>
  );
};

export default BrideGroomName;
