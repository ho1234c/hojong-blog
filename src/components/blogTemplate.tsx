import React from "react"
import { graphql } from "gatsby"
import { cx, css } from "emotion"
import Layout from "./layout"
import dayjs from "dayjs"

interface Props {
  data: {
    markdownRemark: any
  }
}

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

const blogPost = css`
  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
    color: #00c1bb;
  }

  @media only screen and (max-device-width: 480px) {
    code {
      font-size: 14px;
    }
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: Props) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
        <div className={cx(titleWrapper)}>
          <div className={cx(title)}>{frontmatter.title}</div>
          <div className={cx(date)}>
            {dayjs(frontmatter.date).format("MMM DD. YYYY")}
          </div>
        </div>
        <div
          className={cx(blogPost)}
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
