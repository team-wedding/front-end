import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import DebouncedInput, {
  DebouncedInputHandle,
} from '@/components/common/DebounceInput/DebounceInput';
import useRSVPStore from '@/store/useRSVPStore';
import { useRef } from 'react';

const RsvpExample = () => {
  const { rsvpTitle, rsvpDescription, setRSVPTitle, setRSVPDescription } =
    useRSVPStore();
  const rsvpDesciptionInputRef = useRef<DebouncedInputHandle>(null);

  return (
    <div className="mx-4 my-6 text-xs">
      <InformationItem
        messages={[
          '결혼식 당일의 구체적인 계획에 도움을 받을 수 있습니다.',
          '제출된 답변은 마이페이지에서 확인할 수 있습니다.',
        ]}
      />
      <hr />
      <div className="flex flex-col gap-5 my-10">
        <div className="flex flex-col gap-2">
          <label htmlFor="rsvpTitle" className="label w-full">
            제목
          </label>
          <DebouncedInput
            type="text"
            id="rsvpTitle"
            ref={rsvpDesciptionInputRef}
            onDebouncedChange={(value: string) => setRSVPTitle(value)}
            value={rsvpTitle}
            placeholder="제목을 입력해주세요"
            className="formInput w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="rsvpContent" className="label w-full">
            내용
          </label>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setRSVPDescription(e.currentTarget.value);
            }}
            name="rsvpDescription"
            value={rsvpDescription}
            rows={4}
            className="formInput w-full"
            placeholder="내용을 입력해주세요"
          />

          {/*
          TODO: FIX THIS INTO TEXT AREA
          <DebouncedInput
            type='text'
            ref={rsvpDesciptionInputRef}
            onDebouncedChange={(value: string) => setRSVPD(value)}
            name="rsvpDescription"
            value={rsvpDescription}
            rows={4}
            className="formInput w-full"
            placeholder="내용을 입력해주세요"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default RsvpExample;
