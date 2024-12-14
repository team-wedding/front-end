import React from 'react';
import useGreetingStore from './useGreetingStore';

const greetingSample = ['샘플 1', '샘플 2'];

const GreetingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { selectedSample, setSelectedSample, setGreeting } = useGreetingStore();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2>샘플 문구 선택</h2>
        <ul>
          {greetingSample.map((text, index) => (
            <li
              key={index}
              style={{
                marginBottom: '10px',
                cursor: 'pointer',
                border:
                  text === selectedSample
                    ? '1px solid black'
                    : '1px solid #ddd',
                borderRadius: '5px',
                padding: '10px',
              }}
              onClick={() => setSelectedSample(text)}
            >
              {text}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            if (selectedSample) {
              setGreeting(selectedSample);
              onClose();
            }
          }}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          disabled={!selectedSample}
        >
          적용하기
        </button>
        <button
          onClick={onClose}
          style={{
            marginTop: '10px',
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#ccc',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default GreetingModal;
