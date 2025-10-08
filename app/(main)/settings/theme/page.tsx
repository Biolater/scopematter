"use client";

import { useTheme } from "next-themes";
import { RadioGroup, Radio } from "@heroui/radio";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Sun, Moon, Laptop } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemePreferencesPage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const value = !mounted
    ? "system"
    : theme === "system"
      ? "system"
      : theme === "dark"
        ? "dark"
        : "light";

  return (
    <div className="max-w-2xl">
      <Card shadow="sm">
        <CardHeader className="flex flex-col items-start gap-1">
          <h2 className="text-xl font-semibold">Theme Preferences</h2>
          <p className="text-default-600">Choose your appearance mode.</p>
        </CardHeader>
        <CardBody>
          <RadioGroup
            aria-label="Theme options"
            value={value}
            onValueChange={(v) => {
              if (v === "system") setTheme("system");
              else if (v === "dark") setTheme("dark");
              else setTheme("light");
            }}
            orientation="horizontal"
            className="gap-4"
          >
            <Radio value="light">
              <div className="flex items-center gap-2">
                <Sun className="size-4" />
                <span>Light</span>
              </div>
            </Radio>
            <Radio value="dark">
              <div className="flex items-center gap-2">
                <Moon className="size-4" />
                <span>Dark</span>
              </div>
            </Radio>
            <Radio value="system">
              <div className="flex items-center gap-2">
                <Laptop className="size-4" />
                <span>System</span>
              </div>
            </Radio>
          </RadioGroup>

          {mounted && (
            <p className="text-xs text-default-600 mt-3">
              Current: <span className="font-medium">{theme}</span>
              {theme === "system" && systemTheme ? (
                <>
                  {" "}(system: <span className="font-medium">{systemTheme}</span>)
                </>
              ) : null}
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}


