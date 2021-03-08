/** @jsx jsx */
import React from "react"
import { Link, graphql } from "gatsby"
import { css, jsx } from "@emotion/react"
import dayjs from "dayjs"
import Layout from "@src/components/layout/layout"
import { Query } from "@grpaphql-types"
import { usePosts } from "@src/hooks/usePosts"
import { useNavigate } from "@reach/router"

const Main: React.FC<{ data: Query }> = ({ data }) => {
  const navigate = useNavigate()
  const { postList, tagList, handleSelectTag, selectedTag } = usePosts(
    data.allMarkdownRemark.nodes
  )

  const goTo = (url: string) => navigate(url)

  return (
    <Layout>
      <div css={wrapperStyle}>
        <section className="tag-container">
          {tagList.length !== 0 && (
            <div
              css={[eachTagStyle, !selectedTag && activeTagStyle]}
              onClick={() => handleSelectTag("")}
            >
              all
            </div>
          )}
          {tagList.map((tag) => (
            <div
              key={tag}
              css={[eachTagStyle, selectedTag === tag && activeTagStyle]}
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
              <article
                onClick={() => goTo(frontmatter?.path!)}
                key={frontmatter?.title}
              >
                <h4 className="title">{frontmatter?.title}</h4>
                <div className="content">
                  {dayjs(frontmatter?.date).format("MMM DD. YYYY")}
                </div>
                <div className="chip-container">
                  {frontmatter?.tags!.map((tag) => (
                    <div className="chip">{tag}</div>
                  ))}
                </div>
              </article>
            ))}
        </section>
      </div>
    </Layout>
  )
}

export default Main

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

const eachTagStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  background: #ffedda;
  color: #f96900;
  cursor: pointer;
  min-width: 80px;
  margin: 0 0.5rem 0.5rem 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.08, 1.08);
    margin-left: calc(3px);
    margin-right: calc(0.5rem + 3px);
  }
`

const activeTagStyle = css`
  font-weight: 900;
`

const wrapperStyle = css`
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

    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      margin: 0 -1.45rem;
      padding: 1rem 1.45rem;
      border-radius: 5px;
      cursor: pointer;

      a {
        color: inherit;
      }

      &:hover {
        background-color: #f4f4f4;
      }

      .title {
        font-size: 1.2rem;
        font-weight: 700;
        margin: 0;
      }

      .content {
        color: #585858;
        font-size: 0.8rem;
      }

      .chip-container {
        display: flex;

        .chip {
          font-size: 0.8rem;
          border-radius: 20px;
          background: #ffedda;
          color: #f96900;
          padding: 0 10px;
          line-height: 24px;

          &:not(:last-of-type) {
            margin-right: 5px;
          }
        }
      }
    }
  }
`
