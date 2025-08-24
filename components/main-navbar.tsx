import { Button } from "@heroui/button";
import { MenuIcon } from "lucide-react";
import React from "react";
import { UserButton } from "@clerk/nextjs";

interface MainNavbarProps {
  onMenuPress: () => void;
}

const MainNavbar = ({ onMenuPress }: MainNavbarProps) => {
  return (
    <div className="w-full border-b border-divider backdrop-blur-lg bg-background/50 flex px-4 md:hidden h-16 sticky top-0 z-10 items-center justify-between">
      <Button
        variant="light"
        isIconOnly
        size="sm"
        onPress={onMenuPress}
      >
        <MenuIcon />
      </Button>
      <UserButton />
    </div>
  );
};

export default MainNavbar;
