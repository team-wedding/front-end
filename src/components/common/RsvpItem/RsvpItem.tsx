interface RsvpDetail {
  title: string;
  description?: string;
  attend: number;
  unattend?: number;
  bride?: boolean;
  total?: boolean;
}

export default function RsvpItem({
  total,
  title,
  description,
  attend,
  unattend,
  bride,
}: RsvpDetail) {
  return (
    <div className="flex flex-row justify-between text-gray-700 items-center p-2 shadow-md border border-gray-100 rounded-lg bg-white">
      <div
        className={`flex flex-col items-start ${total && 'font-semibold p-3 text-2xl'}`}
      >
        {title}
        {description && <div className="text-sm mt-1">{description}</div>}
      </div>
      <div
        className={`flex flex-row   gap-2 ${bride == undefined ? 'text-gray-700' : bride ? 'text-red-400' : 'text-blue-400'} ${total ? 'text-3xl font-semibold pr-10' : 'text-base font-bold pr-2'}`}
      >
        {attend}
        {unattend && (
          <div className=" text-xs text-gray-600  self-center ">
            {' '}
            {`/ ${unattend}`}
          </div>
        )}
      </div>
    </div>
  );
}
