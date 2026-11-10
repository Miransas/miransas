import type { Metadata } from 'next';
import { AboutContent } from '@/components/shared/about-content';

export const metadata: Metadata = { alternates: { canonical: '/about' }, title: 'About', description: 'Miransas is an independent engineering studio exploring voice, conversational AI and useful software systems.' };

export default function AboutPage() {
  return <AboutContent />;
}
