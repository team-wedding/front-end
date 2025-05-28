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
    <div className="flex flex-row justify-between text-gray-700 items-center p-3">
      <div className={`flex flex-col items-start text-sm ${total && ''}`}>
        {title}
        {description && (
          <div className="text-[10px] mt-1 text-gray-400">{description}</div>
        )}
      </div>
      <div
        className={`flex gap-2 px-2 ${bride == undefined ? 'text-gray-700' : bride ? 'text-red-400' : 'text-blue-400'} ${total ? 'text-xl font-medium' : 'text-base font-semibold'}`}
      >
        {attend}
        {unattend !== undefined && (
          <div className="text-xs text-gray-600 self-center">
            {' '}
            {`/ ${unattend}`}
          </div>
        )}
      </div>
    </div>
  );
}
