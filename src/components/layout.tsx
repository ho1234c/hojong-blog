import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import Header from "./header"
import "./layout.css"

const layout = css`
  margin: 0 auto;
  max-width: 850px;
  padding: 1.45rem;
  padding-bottom: 5rem;
  box-sizing: border-box;
  padding-top: 6rem;
`

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
      <main css={[layout]}>{children}</main>
    </>
  )
}

export default Layout
