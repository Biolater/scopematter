"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkProviderWithTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  const lightVariables = {
    colorPrimary: "#2563EB",
    colorBackground: "#F8FAFC",
    colorForeground: "#0B1220",
    colorDanger: "#EF4444",
    colorSuccess: "#10B981",
    colorWarning: "#F59E0B",
    colorInputBackground: "#FFFFFF",
    colorInputForeground: "#0B1220",
    colorTextOnPrimaryBackground: "#FFFFFF",
  };

  const darkVariables = {
    colorPrimary: "#60A5FA",
    colorBackground: "#0B1220",
    colorForeground: "#E6EAF2",
    colorDanger: "#EF4444",
    colorSuccess: "#34D399",
    colorWarning: "#F59E0B",
    colorInputBackground: "#0F172A",
    colorInputForeground: "#E6EAF2",
    colorTextOnPrimaryBackground: "#E6EAF2",
  };

  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: resolvedTheme === "dark" ? darkVariables : lightVariables,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
