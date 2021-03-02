import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/react"
import Header from "./header"
import "./layout.css"

const layout = css`
  margin: 0 auto;
  max-width: 680px;
  padding: 70px 0 5rem 0;
  box-sizing: border-box;
 
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
      <main css={layout}>{children}</main>
    </>
  )
}

export default Layout
