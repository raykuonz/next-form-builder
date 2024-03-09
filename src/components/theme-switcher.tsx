"use client";

import {
  useEffect,
  useState
} from "react";
import { useTheme } from "next-themes";
import {
  MonitorIcon,
  MoonIcon,
  SunIcon
} from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

const ThemeSwitcher = () => {

  const { theme, setTheme } = useTheme();
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rehydration error.
    return null;
  }

  return (
    <Tabs
      defaultValue={theme}
    >
      <TabsList
        className="border"
      >
        <TabsTrigger
          onClick={() => setTheme('light')}
          value="light"
        >
          <SunIcon
            className="h-[1.2rem] w-[1.2rem]"
          />
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setTheme('dark')}
          value="dark"
        >
          <MoonIcon
            className="h-[1.2rem] w-[1.2rem]"
          />
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setTheme('system')}
          value="system"
        >
          <MonitorIcon
            className="h-[1.2rem] w-[1.2rem]"
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher