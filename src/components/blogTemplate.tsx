import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/react"
import Layout from "./layout"
import dayjs from "dayjs"
import SEO from "./seo"

const postWrapper = css`
  padding: 2rem 1.45rem 0;
  
  @media only screen and (max-device-width: 480px) {
   .gatsby-resp-image-wrapper {
       margin: auto -1.45rem !important;
    } 
  }
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
  width: 100%;
`

const date = css`
  margin-left: auto;
  font-size: 13px;
  display: flex;
  line-height: normal;
  align-items: flex-end;
`

const content = css`
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
    background-color: #ffc47954;
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
      <div css={[postWrapper]}>
        <div css={[titleWrapper]}>
          <SEO title={frontmatter.title}></SEO>
          <div css={[title]}>{frontmatter.title}</div>
          <div css={[date]}>
            {dayjs(frontmatter.date).format("MMM DD. YYYY")}
          </div>
        </div>
        <div css={[content]} dangerouslySetInnerHTML={{ __html: html }} />
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
