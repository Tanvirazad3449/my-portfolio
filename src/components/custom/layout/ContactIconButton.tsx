
import { Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { sections, useSections } from '@/providers/SectionProvider';

export default function ContactIconButton() {
  const { handleActiveSection } = useSections();

  return (
    <Button className='hidden md:flex' variant="ghost" size="icon" aria-label="Contact" onClick={() => handleActiveSection(sections[6])}>
      <Mail size={24} className='hover:text-primary' />
    </Button>
  )
}
