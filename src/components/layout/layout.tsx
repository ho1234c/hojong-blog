/** @jsx jsx */
import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css, jsx, ThemeProvider, Theme, Global } from "@emotion/react"
import Header from "../Header/Header"
import { theme as _theme, ColorType } from "@src/theme"
import DarkModeToggler from "@src/components/DarkModeToggler/DarkModeToggler"
import { localStorage } from "@src/utils/window"
import "./layout.css"

const Layout: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<{ color: ColorType; isDarkMode: boolean }>(
    () =>
      ({
        color: _theme.color.light,
        isDarkMode: false,
      } as Theme)
  )
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const changeMode = (nextChecked: boolean) => {
    localStorage.setItem("isDarkMode", nextChecked ? "1" : "0")

    setTheme({
      color: nextChecked ? _theme.color.dark : _theme.color.light,
      isDarkMode: nextChecked,
    })
  }

  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode") === "1"

    if (isDarkMode) {
      setTheme({
        color: _theme.color.dark,
        isDarkMode,
      })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={(theme) =>
          css`
            body {
              background-color: ${theme.color.body};
              color: ${theme.color.textPrimary};
            }
          `
        }
      />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main css={mainStyle}>
        <DarkModeToggler handleChange={changeMode} />
        {children}
      </main>
    </ThemeProvider>
  )
}

export default Layout

const mainStyle = (theme: Theme) => css`
  margin: 0 auto;
  max-width: 680px;
  padding: 70px 0 4rem 0;
  box-sizing: border-box;
  overflow-x: hidden;
`
