// import original module declarations
import "styled-components";
import { palette } from "./styles";

type Palette = typeof palette;

declare module "styled-components" {
  export interface DefaultTheme extends Palette {}
}
