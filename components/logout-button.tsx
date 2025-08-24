"use client";

import { Button } from "@heroui/button";
import { useAuth, SignedIn } from "@clerk/nextjs";

const LogoutButton = () => {
  const { signOut } = useAuth();
  return (
    <SignedIn>
      <Button
        color="danger"
        className="absolute  bottom-6 right-20 z-50"
        onPress={() => signOut()}
      >
        Logout
      </Button>
    </SignedIn>
  );
};

export default LogoutButton;
