import "@emotion/react"
import { ColorType } from "./src/theme"

declare module "@emotion/react" {
  export interface Theme {
    color: ColorType
    isDarkMode: boolean
  }
}
