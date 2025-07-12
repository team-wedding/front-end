import DebouncedInput, {
  DebouncedInputHandle,
} from '@/components/common/DebounceInput/DebounceInput';
import { useCompletionTracker } from '@/hooks/useCompletionTracker';
import useBrideGroomStore from '@store/useBrideGroomStore';
import { useRef } from 'react';

const NameInput = () => {
  const nameInputRef = useRef<DebouncedInputHandle>(null);
  const motherNameInputRef = useRef<DebouncedInputHandle>(null);
  const fatherNameInputRef = useRef<DebouncedInputHandle>(null);

  const brideGroom = useBrideGroomStore((state) => state.brideGroom);
  const updateBrideGroom = useBrideGroomStore(
    (state) => state.updateBrideGroom,
  );
  const updateFamily = useBrideGroomStore((state) => state.updateFamily);
  const namesFilled = brideGroom.every((person) => person.name.trim());

  useCompletionTracker({
    feature: 'nameInput',
    isCompleted: namesFilled,
    deps: [brideGroom],
  });

  return (
    <>
      {brideGroom.map((person, index) => (
        <div key={index}>
          <div className="py-3 border-b border-gray-200">
            <label htmlFor={`${person.role}-name`} className="label">
              {person.role} *
            </label>
            <DebouncedInput
              type="text"
              ref={nameInputRef}
              value={person.name}
              onDebouncedChange={(value) =>
                updateBrideGroom(index, 'name', value)
              }
              onChange={(value) => updateBrideGroom(index, 'name', value)}
              placeholder="성함을 입력해주세요"
              className="formInput"
            />
          </div>

          <div className="py-3 border-b border-gray-200">
            <label htmlFor={`${person.role}-fatherName`} className="label">
              아버지
            </label>
            <div className="flex items-center gap-3">
              <DebouncedInput
                type="text"
                ref={fatherNameInputRef}
                value={person.family.father.name}
                onDebouncedChange={(value) =>
                  updateFamily(index, 'father', 'name', value)
                }
                placeholder="성함을 입력해주세요"
                className="formInput"
                id={`${person.role}-fatherName`}
              />
              <label
                htmlFor={`${person.role}-fatherDeceased`}
                className="flex items-center gap-2 glass-checkbox-container"
              >
                <input
                  type="checkbox"
                  id={`${person.role}-fatherDeceased`}
                  checked={person.family.father.isDeceased}
                  onChange={(e) =>
                    updateFamily(
                      index,
                      'father',
                      'isDeceased',
                      e.target.checked,
                    )
                  }
                  className="glass-checkbox"
                />
                <span className="text-sm text-slate-600 cursor-pointer select-none">
                  故
                </span>
              </label>
            </div>
          </div>

          <div className="py-3">
            <label htmlFor={`${person.role}-motherName`} className="label">
              어머니
            </label>
            <div className="flex items-center gap-3">
              <DebouncedInput
                type="text"
                ref={motherNameInputRef}
                value={person.family.mother.name}
                onDebouncedChange={(value) =>
                  updateFamily(index, 'mother', 'name', value)
                }
                placeholder="성함을 입력해주세요"
                className="formInput"
                id={`${person.role}-motherName`}
              />
              <label
                htmlFor={`${person.role}-motherDeceased`}
                className="flex items-center gap-2 glass-checkbox-container"
              >
                <input
                  type="checkbox"
                  id={`${person.role}-motherDeceased`}
                  checked={person.family.mother.isDeceased}
                  onChange={(e) =>
                    updateFamily(
                      index,
                      'mother',
                      'isDeceased',
                      e.target.checked,
                    )
                  }
                  className="glass-checkbox"
                />
                <span className="text-sm text-slate-600 cursor-pointer select-none">
                  故
                </span>
              </label>
            </div>
          </div>

          {index < brideGroom.length - 1 && (
            <div className="px-6 py-3">
              <div className="h-px bg-gray-200"></div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NameInput;
