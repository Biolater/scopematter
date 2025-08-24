import { Waitlist } from "@clerk/nextjs";

export default function WaitlistPage() {
  return <Waitlist afterJoinWaitlistUrl="/" signInUrl="/sign-in" />;
}
