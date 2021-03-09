/** @jsx jsx */
import { Link } from "gatsby"
import { css, jsx } from "@emotion/react"
import React, { useRef, useState, useEffect } from "react"

type HeaderProps = {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = (props) => {
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
      <div className="menu">
        <div className="go-to-main">
          <Link to="/">{props.siteTitle}</Link>
        </div>
        <div className="go-to-me">
          <Link to="/me">About me</Link>
        </div>
      </div>
    </header>
  )
}

export default Header

const headerWrapper = css`
  box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 1;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.8);

  .menu {
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

    .go-to-main {
      font-weight: 900;
    }

    .go-to-me {
      margin-left: auto;
      font-size: 14px;
    }
  }
`
