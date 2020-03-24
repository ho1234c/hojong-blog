import { useStaticQuery, Link, graphql } from "gatsby"
import { cx, css } from "emotion"
import React, { useLayoutEffect, useRef, useState } from "react"
// import { useLocation } from "@reach/router"

const headerWrapper = css`
  background-color: #fff;
  box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 1;
`

const header = css`
  margin: 0 auto;
  max-width: 850px;
  padding: 20px 1.45rem;
  box-sizing: border-box;
  font-size: 20px;
`

const headerLink = css`
  text-decoration: none;
  color: inherit;
  font-weight: 900;
`

type Props = {
  siteTitle: string
}

const Header: React.FC<Props> = props => {
  const headerRef = useRef<HTMLElement>(null)
  const [scrollPos, setScrollPos] = useState<number>(0)
  const [headerMarginTop, setHeadermarginTop] = useState<number>(0)
  // const { pathname } = useLocation()
  // const data = useStaticQuery(graphql`
  //   query {
  //     allMarkdownRemark {
  //       nodes {
  //         frontmatter {
  //           path
  //           title
  //         }
  //       }
  //     }
  //   }
  // `)

  useLayoutEffect(() => {
    const onScroll = () => {
      let nextMargin = headerMarginTop + (scrollPos - window.scrollY)
      if (nextMargin <= -80) {
        nextMargin = -80
      } else if (nextMargin >= 0) {
        nextMargin = 0
      }
      setScrollPos(window.scrollY)
      setHeadermarginTop(nextMargin)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [headerMarginTop, scrollPos])

  return (
    <header
      style={{ marginTop: `${headerMarginTop}px` }}
      className={cx(headerWrapper)}
      ref={headerRef}
    >
      <div className={cx(header)}>
        <Link to="/" className={cx(headerLink)}>
          {props.siteTitle}
        </Link>
      </div>
    </header>
  )
}

export default Header
