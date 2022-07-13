import { DEFAULT_BACKGROUND_COLOR } from "./const";

export const getColor = (value) => `hsl(${value}deg 60% 50%)`;
export const setBackgr = (color) =>
  document.documentElement.style.setProperty(
    "--main-color",
    color ? getColor(color) : DEFAULT_BACKGROUND_COLOR
  );
