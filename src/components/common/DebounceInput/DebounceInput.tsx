import { useDebouncedCallback } from '@/hooks/useDebounce';
import {
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';

type DebouncedInputProps = {
  value: string;
  type: string;
  onDebouncedChange: (value: string) => void;
  pattern?: string;
  delay?: number;
  placeholder?: string;
  className?: string;
};

export type DebouncedInputHandle = {
  flush: () => void;
};

const DebouncedInput = forwardRef<DebouncedInputHandle, DebouncedInputProps>(
  (
    {
      value,
      onDebouncedChange,
      type,
      delay = 3000,
      pattern,
      placeholder = '',
      className = '',
    },
    ref
  ) => {
    const valueRef = useRef(value);

    const { callback: debouncedChange, flush } = useDebouncedCallback(
      onDebouncedChange,
      delay
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      valueRef.current = val;
      debouncedChange(val);
    };

    const handleBlur = () => {
      flush();
    };

    useImperativeHandle(ref, () => ({
      flush,
    }));

    return (
      <input
        type={type}
        pattern={pattern}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        onBlur={handleBlur}
      />
    );
  }
);

DebouncedInput.displayName = 'DebouncedInput';

export default DebouncedInput;
