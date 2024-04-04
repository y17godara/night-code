import AllotmentSection from "@/app/components/Allotment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assessment | Yash Godara @y17godara",
  description: "A simple allotment component for React",
};

export default function Home() {
  return (
    <main>
      <AllotmentSection />
    </main>
  );
}
