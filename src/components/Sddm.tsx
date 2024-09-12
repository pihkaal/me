import { type ReactNode, useEffect, useRef, useState } from "react";
import { useApp } from "~/hooks/useApp";

const SddmActionButton = (props: {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}) => (
  <button
    className="flex select-none flex-col items-center text-white transition-colors hover:text-zinc-800"
    onClick={props.onClick}
  >
    {props.icon}
    <span>{props.text}</span>
  </button>
);

const PASSWORD_LENGTH = 12;

export const Sddm = () => {
  const { setState } = useApp();

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (password >= PASSWORD_LENGTH) {
      passwordInputRef.current?.blur();
      return;
    }

    const timeout = setTimeout(
      () => {
        passwordInputRef.current?.focus();

        const canType =
          password < 4 ||
          password === PASSWORD_LENGTH - 1 ||
          Math.random() > 0.2;
        setPassword(Math.max(0, password + (canType ? 1 : -1)));
      },
      password === 0 ? 1000 : Math.random() * 250 + 100,
    );
    return () => clearTimeout(timeout);
  }, [password]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 animate-fadeOut bg-black" />

      <div className="flex h-full cursor-default items-center justify-around text-white">
        <div className="flex h-full w-full flex-col justify-center backdrop-blur-2xl sm:w-2/3 md:w-1/2 lg:w-2/5">
          <div className="flex flex h-4/5 flex-col items-center justify-between">
            <div className="text-center">
              <p className="text-6xl leading-10">Welcome!</p>
              <p className="text-5xl">
                {now.toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{now.toLocaleDateString("en-us", { dateStyle: "long" })}</p>
            </div>

            <div className="flex min-w-[210px] flex-col gap-5 lg:w-1/2">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 flex items-center ps-3.5">
                  
                </div>
                <input
                  type="text"
                  className="block w-full rounded-full border border-white bg-transparent p-2 text-center text-white placeholder-zinc-200"
                  value={"Pihkaal"}
                  readOnly
                  spellCheck={false}
                  maxLength={15}
                />
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 flex items-center ps-3.5">
                  
                </div>
                <input
                  type="text"
                  ref={passwordInputRef}
                  readOnly
                  className="block w-full rounded-full border border-white bg-transparent p-2 text-center text-white placeholder-zinc-200"
                  value={
                    showPassword
                      ? password > 0
                        ? "no."
                        : ""
                      : "•".repeat(password)
                  }
                  placeholder="Password"
                  spellCheck={false}
                  maxLength={PASSWORD_LENGTH}
                />
              </div>

              <label className="flex select-none items-center gap-2 transition-colors hover:border-black hover:text-black">
                <div
                  className={`relative flex h-3.5 w-3.5 items-center justify-center border border-current`}
                >
                  <input
                    type="checkbox"
                    className="peer h-2 w-2 appearance-none checked:bg-current"
                    checked={showPassword}
                    onChange={() => setShowPassword((show) => !show)}
                  />
                </div>
                <p className="text-sm">Show Password</p>
              </label>
            </div>

            <div className="flex min-w-[210px] flex-col gap-1 text-left transition-colors lg:w-1/2">
              <button
                onClick={() => setState("desktop")}
                className={`w-full select-none rounded-full p-2 ${
                  password === PASSWORD_LENGTH
                    ? "bg-neutral-800 hover:bg-zinc-800"
                    : "cursor-default bg-white bg-opacity-30"
                }`}
              >
                Login
              </button>
              <p className="text-sm">Session: Hyprland</p>
            </div>
            <div className="flex gap-8">
              <SddmActionButton
                key="suspend"
                onClick={() => setState("suspend")}
                icon={
                  <svg viewBox="0 0 34 34" width="38">
                    <path
                      fill="currentColor"
                      d="M 17,1 C 8.163444,1 1,8.163444 1,17 1,25.836556 8.163444,33 17,33 25.836556,33 33,25.836556 33,17 33,8.163444 25.836556,1 17,1 Z m 0,1 C 25.284271,2 32,8.7157288 32,17 32,25.284271 25.284271,32 17,32 8.7157288,32 2,25.284271 2,17 2,8.7157288 8.7157288,2 17,2 Z m -4,9 v 12 h 1 V 11 Z m 7,0 v 12 h 1 V 11 Z"
                    />
                  </svg>
                }
                text="Suspend"
              />

              <SddmActionButton
                key="reboot"
                onClick={() => setState("reboot")}
                icon={
                  <svg width="38" viewBox="0 0 34 34">
                    <g transform="matrix(1.000593,0,0,1.0006688,0.99050505,-287.73702)">
                      <path
                        fill="currentColor"
                        d="M 19.001953,1.1308594 V 2 H 19 v 11 h 1 V 2.3359375 A 15,15 45 0 1 32,17 15,15 45 0 1 21.001953,31.455078 v 1.033203 A 16.009488,16.010701 45 0 0 33.009766,17 16.009488,16.010701 45 0 0 19.001953,1.1308594 Z M 12.998047,1.5117188 A 16.009488,16.010701 45 0 0 0.99023438,17 16.009488,16.010701 45 0 0 14.998047,32.869141 V 32 H 15 V 21 H 14 V 31.664062 A 15,15 45 0 1 2,17 15,15 45 0 1 12.998047,2.5449219 Z"
                        transform="matrix(0.70668771,-0.70663419,0.70668771,0.70663419,-8.0273788,304.53335)"
                      />
                    </g>
                  </svg>
                }
                text="Reboot"
              />
              <SddmActionButton
                key="shutdown"
                onClick={() => setState("off")}
                icon={
                  <svg viewBox="0 0 34 34" width="38">
                    <path
                      fill="currentColor"
                      d="M 14 1 L 14 13 L 15 13 L 15 1 L 14 1 z M 19 1 L 19 13 L 20 13 L 20 1 L 19 1 z M 9 3.1855469 C 4.1702837 5.9748853 1.0026451 11.162345 1 17 C 1 25.836556 8.163444 33 17 33 C 25.836556 33 33 25.836556 33 17 C 32.99593 11.163669 29.828666 5.9780498 25 3.1894531 L 25 4.3496094 C 29.280842 7.0494632 31.988612 11.788234 32 17 C 32 25.284271 25.284271 32 17 32 C 8.7157288 32 2 25.284271 2 17 C 2.0120649 11.788824 4.7195457 7.0510246 9 4.3515625 L 9 3.1855469 z "
                    />
                  </svg>
                }
                text="Shutdown"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
