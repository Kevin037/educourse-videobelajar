import { useEffect, useState } from "react";

export const PaymentTimer = () => {
    const [timeLeft, setTimeLeft] = useState(7200); // contoh: 1 jam (3600 detik)

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return { hrs, mins, secs };
      };
      
    const { hrs, mins, secs } = formatTime(timeLeft);
    return (
            <div className="bg-orange-100 p-4 flex justify-center items-center rounded">
              <span className="text-sm text-gray-700 mr-2">Selesaikan pemesanan dalam</span>
              <div className="flex space-x-1">
                {[hrs, mins, secs].map((t, i) => (
                  <div key={i} className="bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {t}
                  </div>
                ))}
              </div>
            </div>
    )
}