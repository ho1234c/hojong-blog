import React from 'react';
import { graphql } from 'gatsby';
import { css, Theme } from '@emotion/react';
import Layout from '../layout/layout';
import dayjs from 'dayjs';
import SEO from '../seo';
import Comments from '../Comments/Comments';

interface Props {
  data: {
    markdownRemark: any;
  };
}

export default function Template({ data }: Props) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <>
      <SEO title={frontmatter.title}></SEO>
      <Layout>
        <div css={postWrapper}>
          <div className="title-wrapper">
            <div className="title">{frontmatter.title}</div>
            <div className="date">{dayjs(frontmatter.date).format('MMM DD. YYYY')}</div>
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
          <Comments repo="ho1234c/hojong-blog" />
        </div>
      </Layout>
    </>
  );
}
export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

const postWrapper = (theme: Theme) => css`
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
    padding-bottom: 3rem;

    a {
      background-color: transparent;
      color: ${theme.color.primary};
      border-bottom: 1px solid ${theme.color.primary};
      word-break: break-all;
    }

    @media only screen and (max-device-width: 480px) {
      code {
        font-size: 14px;
      }
    }

    p:first-of-type {
      text-indent: 1em;
    }

    h1+ p, h2 + p, h3 + p {
      text-indent: 1em;
    }

    p {
      word-break: keep-all;
    }

    p img {
      width: 100%;
      vertical-align: bottom;
    }

    .language-text {
      background-color: ${theme.color.markdown.languageText};
      color: inherit;
    }
  }
`;
