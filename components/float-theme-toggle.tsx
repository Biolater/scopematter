"use client";

import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { useEffect, useState } from "react";

export default function FloatThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        isIconOnly
        radius="full"
        aria-label="Toggle theme"
        onPress={() => setTheme(isDark ? "light" : "dark")}
        className="shadow-md bg-content1"
      >
        {mounted && isDark ? <SunFilledIcon size={20} /> : <MoonFilledIcon size={20} />}
      </Button>
    </div>
  );
}


