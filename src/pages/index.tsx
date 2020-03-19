import React, { useEffect, useState } from "react"
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

const tagContainer = css`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
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
  font-weight: 600;
  color: #f55151;
  font-weight: lighter;
  cursor: pointer;
  min-width: 80px;
`

const post = css`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin: 0 -1.45rem;
  padding: 0 1.45rem;
  a {
    color: inherit;
  }
  &:hover {
    background-color: #f4f4f4;
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
  const [postList, setPostList] = useState<Post[]>([])
  const [tagList, setTagList] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>("")

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

  useEffect(() => {
    const { allMarkdownRemark } = data
    const { nodes }: { nodes: Post[] } = allMarkdownRemark
    const tagList = Array.from(
      new Set(nodes.map(node => node.frontmatter.tags).flat())
    )
    setPostList(nodes)
    setTagList(tagList)
  }, [])

  return (
    <Layout>
      <div className={cx(tagContainer)}>
        <div className={cx(eachTag)} onClick={() => setSelectedTag("")}>
          all
        </div>
        {tagList.map(tag => (
          <div className={cx(eachTag)} onClick={() => setSelectedTag(tag)}>
            {tag}
          </div>
        ))}
      </div>
      <section className={cx(mainWrapper)}>
        {postList
          .filter(post =>
            selectedTag ? post.frontmatter.tags.includes(selectedTag) : true
          )
          .map(({ frontmatter }) => (
            <Link to={frontmatter.path} key={frontmatter.title}>
              <article className={cx(post)}>
                <div className={cx(postTitle)}>{frontmatter.title}</div>
                <div className={cx(postDate)}>
                  {dayjs(frontmatter.date).format("MMM DD. YYYY")}
                </div>
              </article>
            </Link>
          ))}
      </section>
    </Layout>
  )
}
