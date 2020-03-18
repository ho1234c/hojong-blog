import React from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { cx, css } from "emotion"
import dayjs from "dayjs"
import Layout from "../components/layout"
import { PostMeta } from "../@types"

type Post = {
  frontmatter: PostMeta
}

const mainWrapper = css`
  a {
    color: inherit;
  }
`

const post = css`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  text-decoration: none;
  a {
    color: inherit;
  }
`

const postTitle = css`
  font-size: 1.4rem;
  font-weight: 700;
`

const postDate = css`
  color: #222;
  font-size: 0.9rem;
`

export default function IndexPage() {
  const data = useStaticQuery(graphql`
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
  `)
  const { allMarkdownRemark } = data
  const { nodes }: { nodes: Post[] } = allMarkdownRemark
  const tagList = Array.from(
    new Set(nodes.map(node => node.frontmatter.tags).flat())
  )

  return (
    <Layout>
      <div>
        {tagList.map(tag => (
          <div>{tag}</div>
        ))}
      </div>
      <div className={cx(mainWrapper)}>
        {nodes.map(({ frontmatter }) => (
          <Link
            to={frontmatter.path}
            className={cx(post)}
            key={frontmatter.title}
          >
            <div className={cx(postTitle)}>{frontmatter.title}</div>
            <div className={cx(postDate)}>
              {dayjs(frontmatter.date).format("MMM DD. YYYY")}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}
