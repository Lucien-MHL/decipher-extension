import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    scrollbar-width: none; /* 隱藏滾動條，但允許滾動 */
  }
  /* 隱藏滾動條，但允許滾動 */
  html {
    scrollbar-width: none; /* 這行對於Firefox有效 */
  }

  body {
    -ms-overflow-style: none;  /* 這行對於IE 10+有效 */
    overflow-y: hidden;        /* 保證垂直滾動功能 */
    overflow-x: hidden;        /* 隱藏水平滾動條 */
  }


`;

export interface Palette {
  [key: string]: string;
}

export const palette: Palette = {
  navy: "#0f172a",
  grey: "#94a3b8",
  code: "#fd8b18",
  code_background: "#282828",
  item_dark_background: "#1f1f1f",
  item_light_background: "#26272a",
  light_code_background: "#5B5459",
  dark_white: "#ededed",
  white: "#FFFFFF",
  blue: "#38bdf8",
};
