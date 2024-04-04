import AllotmentSection from '@/app/components/Allotment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assisments | Yash Godara',
  description: 'A simple allotment component for React',
};

export default function Home() {
  return (
    <main>
      <AllotmentSection />
    </main>
  );
}
