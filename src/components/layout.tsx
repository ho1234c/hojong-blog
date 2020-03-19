import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { cx, css } from "emotion"

import Header from "./header"
import "./layout.css"

const layout = css`
  margin: 0 auto;
  max-width: 850px;
  padding: 1.45rem;
  padding-bottom: 5rem;
  box-sizing: border-box;
`

const main = css`
  padding-top: 5rem;
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
      <div className={cx(layout)}>
        <main className={cx(main)}>{children}</main>
      </div>
    </>
  )
}

export default Layout
