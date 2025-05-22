import { cookies } from "next/headers";

const getServerDarkMode = (defaultTheme = "dark") => {
  return cookies().get("theme")?.value ?? defaultTheme;
};

export default getServerDarkMode;
