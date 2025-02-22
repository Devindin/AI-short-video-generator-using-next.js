import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Devindi</h1>
      <Button variant="destructive">Click me</Button>
      <UserButton/>
    </div>
  );
}
