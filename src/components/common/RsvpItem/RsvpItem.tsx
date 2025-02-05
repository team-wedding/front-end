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
    <div className="flex flex-row justify-between text-gray-700 items-center py-3 px-2 border border-gray-300 rounded-lg bg-white">
      <div
        className={`flex flex-col items-start ${total && 'p-2 text-xl'}`}
      >
        {title}
        {description && <div className="text-sm mt-1">{description}</div>}
      </div>
      <div
        className={`flex flex-row gap-2 ${bride == undefined ? 'text-gray-700' : bride ? 'text-red-400' : 'text-blue-400'} ${total ? 'text-xl font-medium pr-2' : 'text-base font-semibold pr-2'}`}
      >
        {attend}
        {
          unattend !== undefined && <div className="text-xs text-gray-600 self-center">
            {' '}
            {`/ ${unattend}`}
          </div>
        }
      </div>
    </div>
  );
}
