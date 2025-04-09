
import DebouncedInput, { DebouncedInputHandle } from '@/components/common/DebounceInput/DebounceInput';
import useBrideGroomStore from '@store/useBrideGroomStore';
import { useRef } from 'react';

const NameInput = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);
  const updateBrideGroom = useBrideGroomStore(
    (state) => state.updateBrideGroom,
  );
  const updateFamily = useBrideGroomStore((state) => state.updateFamily);

  const nameInputRef = useRef<DebouncedInputHandle>(null);

  const motherNameInputRef = useRef<DebouncedInputHandle>(null);

  const fatherNameInputRef = useRef<DebouncedInputHandle>(null);

  return (
    <div>
      {brideGroom.map((person, index) => (
        <div key={index} className="max-w-lg mx-auto px-4 py-2">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <label className="label flex gap-1">
                {person.role} <div className="text-red-600">*</div>{' '}
              </label>
              <DebouncedInput
                type='text'
                ref={nameInputRef}
                value={person.name}
                onDebouncedChange={(value) =>
                  updateBrideGroom(index, 'name', value)}
                placeholder="성함(OOO)"
                className="formInput"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="label">아버지</label>
              <DebouncedInput
                type='text'
                ref={fatherNameInputRef}
                value={person.family.father.name}
                onDebouncedChange={(value) =>
                  updateFamily(index, 'father', 'name', value)
                }
                placeholder="성함(OOO)"
                className="formInput"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={person.family.father.isDeceased}
                  onChange={(e) =>
                    updateFamily(
                      index,
                      'father',
                      'isDeceased',
                      e.target.checked,
                    )
                  }
                  className="w-5 h-5 rounded border-gray-400 checked:bg-button focus:ring-button focus:border-button focus:outline-none focus:ring-0"
                ></input>
                <span className="text-sm">故</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="label">어머니</label>
              <DebouncedInput
                type='text'
                ref={motherNameInputRef}
                value={person.family.mother.name}
                onDebouncedChange={(value) =>
                  updateFamily(index, 'mother', 'name', value)
                }
                placeholder="성함(OOO)"
                className="formInput"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={person.family.mother.isDeceased}
                  onChange={(e) =>
                    updateFamily(
                      index,
                      'mother',
                      'isDeceased',
                      e.target.checked,
                    )
                  }
                  className="w-5 h-5 rounded border-gray-400 checked:bg-button focus:ring-button focus:border-button focus:outline-none focus:ring-0"
                />
                <span className="text-sm">故</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NameInput;
