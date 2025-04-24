import { useDebouncedCallback } from '@/hooks/useDebounce';
import { useDebouncedInputStore } from '@/store/useDebouncedInputStore';
import {
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
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

    const { register, unregister } = useDebouncedInputStore();

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

    useEffect(() => {
      const handle = { flush };
      register(handle);
      return () => unregister(handle);
    }, []);

    return (
      <input
        type={type}
        pattern={pattern}
        defaultValue={valueRef.current}
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
