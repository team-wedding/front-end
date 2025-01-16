import { useState } from 'react';
import usePhotoTalkStore from '../../../store/usePhotoTalkStore';
import { PhotoTalk } from '../../../store/usePhotoTalkStore';
import PhotoTalkEditor from './PhotoTalkEditor';
import PhotoTalkCard from './PhotoTalkCard';

const PhotoTalkSection = () => {
  const { openEditor, setEditingPhotoTalk } = usePhotoTalkStore();
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedPhotoTalk, setSelectedPhotoTalk] = useState<null | PhotoTalk>(
    null,
  );

  const confirmPassword = () => {
    if (selectedPhotoTalk?.password === passwordInput) {
      setEditingPhotoTalk(selectedPhotoTalk);
      openEditor();
      setPasswordInput('');
      setSelectedPhotoTalk(null);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="w-full">
      <button onClick={openEditor}>방명록 작성하기</button>
      <PhotoTalkEditor />
      <PhotoTalkCard onEdit={setSelectedPhotoTalk} />
      {selectedPhotoTalk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">비밀번호 확인</h2>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="formInput w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedPhotoTalk(null)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                취소
              </button>
              <button
                onClick={confirmPassword}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoTalkSection;
