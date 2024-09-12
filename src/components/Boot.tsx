import { useEffect, useState } from "react";
import { useApp } from "~/hooks/useApp";

const LINES = [
  "Loading Linux...",
  "Loading initial ramdisk...",
  "Feeding the cat...",
  "Cleaning my room...",
  "Preparing tuna tomato couscous...",
  "Ready",
];

export const Boot = () => {
  const { setState } = useApp();
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (line >= LINES.length) {
      setState("login");
      return;
    }

    const timeout = setTimeout(
      () => setLine(line + 1),
      line === 0
        ? 3500
        : line === LINES.length - 1
          ? 1200
          : Math.random() * 750 + 200,
    );
    return () => clearTimeout(timeout);
  }, [setState, line]);

  return (
    <main className="h-[100svh] w-screen bg-black text-white">
      {LINES.filter((_, i) => i <= line).map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </main>
  );
};
