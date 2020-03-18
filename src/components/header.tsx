import { Link } from "gatsby"
import PropTypes from "prop-types"
import { cx, css } from "emotion"
import React from "react"

const headerWrapper = css`
  background-color: #fff;
  box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
`

const header = css`
  margin: 0 auto;
  max-width: 850px;
  padding: 20px 1.45rem;
`

const headerLink = css`
  text-decoration: none;
  color: inherit;
`

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <header className={cx(headerWrapper)}>
    <div className={cx(header)}>
      <h1 style={{ margin: 0 }}>
        <Link to="/" className={cx(headerLink)}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
