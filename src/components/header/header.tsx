/** @jsx jsx */
import { Link } from "gatsby"
import { css, jsx } from "@emotion/react"
import React, { useRef, useState, useEffect } from "react"

type Props = {
  siteTitle: string
}

const Header: React.FC<Props> = (props) => {
  const headerRef = useRef<HTMLElement>(null)
  const [scrollPos, setScrollPos] = useState(() => 0)
  const [headerMarginTop, setHeadermarginTop] = useState(() => 0)

  useEffect(() => {
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
      css={headerWrapper}
      ref={headerRef}
    >
      <div css={header}>
        <Link to="/" css={headerLink}>
          {props.siteTitle}
        </Link>

        {/*<Link to="/me" css={[aboutMeLink]}>*/}
        {/*  About me*/}
        {/*</Link>*/}
      </div>
    </header>
  )
}

export default Header

const headerWrapper = css`
  background-color: #fff;
  box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 1;
`

const header = css`
  margin: 0 auto;
  max-width: 680px;
  padding: 20px 1.45rem;
  box-sizing: border-box;
  font-size: 20px;
  display: flex;
  a {
    text-decoration: none;
    color: inherit;
  }
`

const headerLink = css`
  font-weight: 900;
`
