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

const post = css`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  text-decoration: none;
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
    query MyQuery {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  `)
  const { allMarkdownRemark } = data
  const { nodes }: { nodes: Post[] } = allMarkdownRemark

  return (
    <Layout>
      {nodes.map(({ frontmatter }) => (
        <Link to={frontmatter.path} className={cx(post)}>
          <div className={cx(postTitle)}>{frontmatter.title}</div>
          <div className={cx(postDate)}>{frontmatter.date}</div>
        </Link>
      ))}
    </Layout>
  )
}
