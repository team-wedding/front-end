import React from 'react';
import useBrideGroomStore from './useBrideGroomStore';

const NameInput = () => {
  const brideGroom = useBrideGroomStore((state) => state.brideGroom);
  const updateBrideGroom = useBrideGroomStore(
    (state) => state.updateBrideGroom,
  );
  const updateFamily = useBrideGroomStore((state) => state.updateFamily);

  const handleSubmit = () => {
    alert('저장 로직 작성하기 ~~');
  };

  return (
    <div>
      {brideGroom.map((person, index) => (
        <div key={index}>
          <div>
            <label>
              <select
                value={person.role}
                onChange={(e) =>
                  updateBrideGroom(index, 'role', e.target.value)
                }
              >
                <option value="신랑">🤵 신랑</option>
                <option value="신부">👰 신부</option>
              </select>
            </label>
            <label>
              <input
                type="text"
                value={person.name}
                onChange={(e) =>
                  updateBrideGroom(index, 'name', e.target.value)
                }
                placeholder="이름을 입력하세요"
              />
            </label>
            <label>
              <select
                value={person.relation}
                onChange={() => updateBrideGroom(index, 'relation', '아들')}
              >
                <option value="아들">아들</option>
                <option value="딸">딸</option>
              </select>
            </label>
          </div>
          <div>
            <div>
              <label>
                아버지 이름:
                <input
                  type="text"
                  value={person.family.father.name}
                  onChange={(e) =>
                    updateFamily(index, 'father', 'name', e.target.value)
                  }
                  placeholder="이름을 입력하세요"
                />
              </label>
              <label>
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
                />
                故
              </label>
            </div>
            <div>
              <label>
                어머니 이름:
                <input
                  type="text"
                  value={person.family.mother.name}
                  onChange={(e) =>
                    updateFamily(index, 'mother', 'name', e.target.value)
                  }
                  placeholder="이름을 입력하세요"
                />
              </label>
              <label>
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
                />
                故
              </label>
            </div>
          </div>
        </div>
      ))}
      <button onClick={handleSubmit}>저장하기</button>
    </div>
  );
};

export default NameInput;
