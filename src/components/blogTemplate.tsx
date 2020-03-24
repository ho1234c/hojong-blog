import React from "react"
import { graphql } from "gatsby"
import { cx, css } from "emotion"
import Layout from "./layout"
import dayjs from "dayjs"
import SEO from "./seo"

const postWrapper = css`
  padding-top: 1rem;
`

const titleWrapper = css`
  display: flex;
  padding-bottom: 20px;
  font-weight: 700;
  flex-wrap: wrap;
`

const title = css`
  font-size: 32px;
  line-height: 45px;
`

const date = css`
  margin-left: auto;
  font-size: 13px;
  display: flex;
  line-height: normal;
  align-items: flex-end;
`

const content = css`
  img {
    width: 100%;
  }
  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    color: #e2777a;
    &:hover {
      text-decoration: underline;
    }
  }

  @media only screen and (max-device-width: 480px) {
    code {
      font-size: 14px;
    }
  }

  .language-text {
    background-color: #ffafaf3d;
    color: inherit;
  }
`

interface Props {
  data: {
    markdownRemark: any
  }
}

export default function Template({ data }: Props) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className={cx(postWrapper)}>
        <div className={cx(titleWrapper)}>
          <SEO title={frontmatter.title}></SEO>
          <div className={cx(title)}>{frontmatter.title}</div>
          <div className={cx(date)}>
            {dayjs(frontmatter.date).format("MMM DD. YYYY")}
          </div>
        </div>
        <div
          className={cx(content)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
