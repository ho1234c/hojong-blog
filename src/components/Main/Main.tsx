/** @jsx jsx */
import React from "react"
import { Link, graphql } from "gatsby"
import { css, jsx } from "@emotion/react"
import dayjs from "dayjs"
import Layout from "../layout/layout"
import { Query } from "../../../graphql-types"
import { usePosts } from "./usePosts"

const IndexPage: React.FC<{ data: Query }> = ({ data }) => {
  const { postList, tagList, handleSelectTag, selectedTag } = usePosts(
    data.allMarkdownRemark.nodes
  )

  return (
    <Layout>
      <div css={wrapper}>
        <section className="tag-container">
          {tagList.length !== 0 ? (
            <div
              css={[eachTag, !selectedTag && activeTag]}
              onClick={() => handleSelectTag("")}
            >
              all
            </div>
          ) : null}
          {tagList.map((tag) => (
            <div
              key={tag}
              css={[eachTag, selectedTag === tag && activeTag]}
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </div>
          ))}
        </section>
        <section className="main-container">
          {postList
            .filter((post) =>
              selectedTag ? post.frontmatter?.tags?.includes(selectedTag) : true
            )
            .map(({ frontmatter }) => (
              <Link to={frontmatter?.path!} key={frontmatter?.title}>
                <article className="post">
                  <div className="title">{frontmatter?.title}</div>
                  <div className="content">
                    {dayjs(frontmatter?.date).format("MMM DD. YYYY")}
                  </div>
                </article>
              </Link>
            ))}
        </section>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          path
          title
          date
          tags
        }
      }
    }
  }
`

const eachTag = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  background: #feebeb;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: #f55151;
  cursor: pointer;
  min-width: 80px;
`

const activeTag = css`
  font-weight: 900;
`

const wrapper = css`
  padding: 0 1.45rem;

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
  }

  .main-container {
    a {
      color: inherit;
    }

    .post {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin: 0 -1.45rem;
      padding: 0 1.45rem;
      border-radius: 5px;

      a {
        color: inherit;
      }

      &:hover {
        background-color: #f4f4f4;
      }

      .title {
        font-size: 1.4rem;
        font-weight: 700;
      }
      .content {
        color: #585858;
        font-size: 0.8rem;
      }
    }
  }
`
