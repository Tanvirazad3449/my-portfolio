"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Mail, Linkedin, Github, Rss, Facebook, Instagram, Menu, Link } from "lucide-react";

const contacts = [
  {
    href: "mailto:tanvirazadwork@gmail.com",
    label: "tanvirazadwork@gmail.com",
    icon: Mail,
  },
  {
    href: "https://linkedin.com/in/tanvirazadwork",
    label: "tanvirazadwork",
    icon: Linkedin,
  },
  {
    href: "https://github.com/Tanvirazad3449",
    label: "Tanvirazad3449",
    icon: Github,
  },
  {
    href: "https://dev.to/tanvir_azad",
    label: "tanvir_azad",
    icon: Rss,
  },
  {
    href: "https://www.facebook.com/tanvirazad49",
    label: "tanvirazad49",
    icon: Facebook,
  },
  {
    href: "https://www.instagram.com/tanvir.azad/",
    label: "tanvir.azad",
    icon: Instagram,
  },
];

function ContactList() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      {contacts.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center gap-3 transition-colors hover:text-accent"
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  )
}
export function ContactSidebar() {
  return (
    
      <div className="md:hidden">
       
        <Sheet>
          <SheetHeader className="display: hidden">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open navigation">
              <Link size={24} />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-64 p-4 pt-14">
            <ContactList />
          </SheetContent>
        </Sheet>
      </div>
    
  );
}

export default function ContactBar() {

  return (
    <div className="hidden md:flex p-6 rounded-2xl border flex-col gap-6 sticky top-6">

      <ContactList />
    </div>
  );
}
