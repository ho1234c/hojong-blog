/** @jsx jsx */
import React from "react"
import { css, jsx, useTheme } from "@emotion/react"
import LightModeIcon from "@src/assets/icon/light-mode.svg"
import DarkModeIcon from "@src/assets/icon/dark-mode.svg"
import Switch from "react-switch"

type DarkModeTogglerProps = {
  handleChange: (nextChecked: boolean) => void
}

const DarkModeToggler: React.FC<DarkModeTogglerProps> = ({ handleChange }) => {
  const theme = useTheme()

  return (
    <div css={wrapperStyle}>
      <Switch
        onChange={handleChange}
        checked={theme.isDarkMode}
        offColor={theme.color.textSecondary}
        onColor={theme.color.textSecondary}
        onHandleColor={theme.color.body}
        checkedIcon={
          <LightModeIcon
            width="20"
            height="20"
            style={{ transform: "translate(5px, 4px)" }}
          />
        }
        uncheckedIcon={
          <DarkModeIcon
            width="16"
            height="16"
            style={{ transform: "translate(7px, 2px)" }}
          />
        }
      />
    </div>
  )
}

DarkModeToggler.displayName = "DarkModeToggler"

export default DarkModeToggler

const wrapperStyle = css`
  padding: 1.45rem 1.45rem 0;
  display: flex;
  justify-content: flex-end;
`
