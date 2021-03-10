/** @jsx jsx */
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css, jsx, ThemeProvider, Theme, Global } from "@emotion/react"
import Header from "../Header/Header"
import { theme as _theme } from "@src/theme"
import "./layout.css"

const Layout: React.FC = ({ children }) => {
  const [theme, setTheme] = useState({ color: _theme.color.dark } as Theme)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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
      <main css={mainStyle}>{children}</main>
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
