/** @jsx jsx */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css, jsx } from "@emotion/react"
import Header from "../header/header"
import "./layout.css"

const Layout: React.FC = ({ children }) => {
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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main css={mainStyle}>{children}</main>
    </>
  )
}

export default Layout

const mainStyle = css`
  margin: 0 auto;
  max-width: 680px;
  padding: 70px 0 5rem 0;
  box-sizing: border-box;
`
