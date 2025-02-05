import { useEffect } from "react";

export default function ToastPopup({
    message,
    setToast,
    position,
}: {
    message: string;
    setToast: React.Dispatch<React.SetStateAction<boolean>>;
    position: 'top' | 'bottom';
}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [setToast]);

    return (
        <div
            className={`z-40 fixed left-1/2 transform -translate-x-1/2 rounded-lg bg-button text-sm p-2 w-1/4
            ${position === 'top' ? 'top-12' : 'bottom-16'}`}>
            < p className="text-white text-center">{message}</p>
        </div >
    );
}