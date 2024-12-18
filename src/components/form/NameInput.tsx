import React from 'react';
import useBrideGroomStore from '../../store/useBrideGroomStore';

const NameInput = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);
  const updateBrideGroom = useBrideGroomStore(
    (state) => state.updateBrideGroom,
  );
  const updateFamily = useBrideGroomStore((state) => state.updateFamily);

  return (
    <div>
      {brideGroom.map((person, index) => (
        <div key={index} className="max-w-lg mx-auto p-4">
          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2">
              <label className="label">{person.role} *</label>
              <input
                type="text"
                value={person.name}
                onChange={(e) =>
                  updateBrideGroom(index, 'name', e.target.value)
                }
                placeholder="성함(OOO)"
                className="formInput"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="label">아버지</label>
              <input
                type="text"
                value={person.family.father.name}
                onChange={(e) =>
                  updateFamily(index, 'father', 'name', e.target.value)
                }
                placeholder="성함(OOO)"
                className="formInput"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={person.family.father.isDeceased}
                  onChange={(e) =>
                    updateFamily(index, 'father', 'isDeceased', e.target.checked)
                  }
                  className="w-5 h-5 rounded border-gray-400 checked:bg-primary focus:ring-primary focus:border-primary focus:outline-none focus:ring-0"></input>
                <span className="text-sm">故</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="label">어머니</label>
              <input
                type="text"
                value={person.family.mother.name}
                onChange={(e) =>
                  updateFamily(index, 'mother', 'name', e.target.value)
                }
                placeholder="성함(OOO)"
                className="formInput"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={person.family.mother.isDeceased}
                  onChange={(e) =>
                    updateFamily(index, 'mother', 'isDeceased', e.target.checked)
                  }
                  className="w-5 h-5 rounded border-gray-400 checked:bg-primary focus:ring-primary focus:border-primary focus:outline-none focus:ring-0"
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