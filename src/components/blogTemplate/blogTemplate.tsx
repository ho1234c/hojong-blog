/** @jsx jsx */
import React from "react"
import { graphql } from "gatsby"
import { css, jsx } from "@emotion/react"
import Layout from "../layout/layout"
import dayjs from "dayjs"
import SEO from "../seo"

interface Props {
  data: {
    markdownRemark: any
  }
}

export default function Template({ data }: Props) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <>
      <SEO title={frontmatter.title}></SEO>
      <Layout>
        <div css={postWrapper}>
          <div className="title-wrapper">
            <div className="title">{frontmatter.title}</div>
            <div className="date">
              {dayjs(frontmatter.date).format("MMM DD. YYYY")}
            </div>
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Layout>
    </>
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

const postWrapper = css`
  padding: 2rem 1.45rem 0;

  @media only screen and (max-device-width: 480px) {
    .gatsby-resp-image-wrapper {
      margin: auto -1.45rem !important;
    }
    .gatsby-highlight {
      margin: auto -1.45rem !important;
    }
  }

  .title-wrapper {
    display: flex;
    padding-bottom: 20px;
    font-weight: 700;
    flex-wrap: wrap;

    .title {
      font-size: 32px;
      line-height: 45px;
      width: 100%;
      padding-bottom: 10px;
    }

    .date {
      margin-left: auto;
      font-size: 13px;
      display: flex;
      line-height: normal;
      align-items: flex-end;
    }
  }

  .content {
    a {
      background-color: transparent;
      color: #f0ab40;
      border-bottom: 1px solid #f0ab40;
    }

    img {
      width: 100%;
    }

    @media only screen and (max-device-width: 480px) {
      code {
        font-size: 14px;
      }
    }

    .language-text {
      background-color: rgba(242, 242, 242, 1);
      color: inherit;
    }
  }
`
