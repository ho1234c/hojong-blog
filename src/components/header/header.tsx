/** @jsx jsx */
import { Link } from "gatsby"
import { css, jsx, Theme } from "@emotion/react"
import React, { useState, useEffect } from "react"

type HeaderProps = {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const [scrollPos, setScrollPos] = useState(() => 0)
  const [headerYPos, setHeaderYPos] = useState(() => 0)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 0) return

      let nextYpos = headerYPos + (scrollPos - window.scrollY)

      if (nextYpos <= -80) {
        nextYpos = -80
      } else if (nextYpos >= 0) {
        nextYpos = 0
      }
      setScrollPos(window.scrollY)
      setHeaderYPos(nextYpos)
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [headerYPos, scrollPos])

  return (
    <header
      css={headerWrapper}
      style={{ transform: `translateY(${headerYPos}px)` }}
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

const headerWrapper = (theme: Theme) => css`
  box-shadow: ${theme.color.headerBoxShadow};
  width: 100%;
  z-index: 1;
  backdrop-filter: blur(3px);
  background-color: ${theme.color.header};
  position: sticky;
  top: 0;

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
