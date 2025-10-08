'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Moon, Sun, TreePine } from 'lucide-react';

const themes = [
  { key: 'dark',   component:   <span aria-hidden><Moon className="w-5 h-5"/></span>},
  { key: 'light',  component:  <span aria-hidden><Sun className="w-5 h-5"/></span>},
    { key: 'forest',   component:   <span aria-hidden><TreePine className="w-5 h-5"/></span>},

] as const;

type ThemeKey = (typeof themes)[number]['key'];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeKey>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as ThemeKey) || 'dark';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (newTheme: ThemeKey) => {
    document.documentElement.classList.remove(...themes.map(t => t.key));
    document.documentElement.classList.add(newTheme);
  };

  const handleChange = (newTheme: ThemeKey) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const current = themes.find(t => t.key === theme)!;

  return (
    <Select value={theme} onValueChange={(v) => handleChange(v as ThemeKey)}>
      <SelectTrigger
        className="
          w-10 h-10 p-0 
          flex items-center justify-center  shadow-none
          appearance-none outline-0 rounded-lg hover:text-secondary-foreground hover:bg-primary/20 cursor-pointer
          pr-0 [&>svg]:hidden
        "
      >
        {current?.component}
        <span className="sr-only">Theme: {theme}</span>
      </SelectTrigger>

      <SelectContent className="w-auto min-w-0">
        {themes.map((t) => (
          <SelectItem
            key={t.key}
            value={t.key}
            className="flex items-center justify-center w-10 h-10 p-0 rounded-lg focus:bg-border text-primary focus:text-primary"
          >
            {t.component}
            <span className="sr-only">{t.key}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
