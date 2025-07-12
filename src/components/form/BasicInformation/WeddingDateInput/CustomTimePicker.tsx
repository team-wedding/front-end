import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useWeddingStore } from '@store/useWeddingStore';
import { ko } from 'date-fns/locale';

const CustomTimePicker = () => {
  const { weddingTime, setWeddingTime } = useWeddingStore();

  const handleTimeChange = (date: Date | null) => {
    if (date) {
      setWeddingTime(date.getHours(), date.getMinutes());
    }
  };

  const timeValue =
    weddingTime.hour !== null && weddingTime.minute !== null
      ? new Date(2000, 0, 1, weddingTime.hour, weddingTime.minute)
      : null;

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <TimePicker
          value={timeValue}
          onChange={handleTimeChange}
          ampm={false}
          minutesStep={10}
          slotProps={{
            textField: {
              fullWidth: true,
              size: 'small',
              variant: 'outlined',
              focused: false,
            },
          }}
          className="wedding-timepicker"
        />
      </LocalizationProvider>
    </>
  );
};

export default CustomTimePicker;
