import { useEffect, useState } from "react";
import { useApp } from "~/hooks/useApp";

export const Off = () => {
  const { state, setState } = useApp();
  const [booting, setBooting] = useState(state === "reboot");

  useEffect(() => {
    if (booting) {
      const timout = setTimeout(() => {
        if (state === "suspend") {
          setState("login");
        } else {
          setState("boot");
        }
      }, 1000);

      return () => clearTimeout(timout);
    }
  }, [state, setState, booting]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black">
      <button
        className={`drop-shadow-white cursor-pointer transition-all ${
          booting ? "animate-disappear" : "animate-breathing"
        }`}
        onClick={() => setBooting(true)}
      >
        <svg viewBox="0 0 34 34" width="128">
          <path
            fill="#ffffff"
            d="M 14 1 L 14 13 L 15 13 L 15 1 L 14 1 z M 19 1 L 19 13 L 20 13 L 20 1 L 19 1 z M 9 3.1855469 C 4.1702837 5.9748853 1.0026451 11.162345 1 17 C 1 25.836556 8.163444 33 17 33 C 25.836556 33 33 25.836556 33 17 C 32.99593 11.163669 29.828666 5.9780498 25 3.1894531 L 25 4.3496094 C 29.280842 7.0494632 31.988612 11.788234 32 17 C 32 25.284271 25.284271 32 17 32 C 8.7157288 32 2 25.284271 2 17 C 2.0120649 11.788824 4.7195457 7.0510246 9 4.3515625 L 9 3.1855469 z "
          />
        </svg>
      </button>

      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-gray-400 text-white">
        This website is primarly made for desktop
      </p>
    </div>
  );
};
