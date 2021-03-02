import React, { useEffect, useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { css } from "@emotion/react"
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
  color: #f55151;
  cursor: pointer;
  min-width: 80px;
`

const activeTag = css`
  font-weight: 900;
`

const post = css`
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
`

const postTitle = css`
  font-size: 1.4rem;
  font-weight: 700;
`

const postDate = css`
  color: #585858;
  font-size: 0.8rem;
`

const wrapper = css`
padding: 0 1.45rem;
`

const IndexPage: React.FC = () => {
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
      <div css={wrapper}>
      <section css={[tagContainer]}>
        {tagList.length !== 0 ? (
          <div
            css={[eachTag, !selectedTag && activeTag]}
            onClick={() => setSelectedTag("")}
          >
            all
          </div>
        ) : null}
        {tagList.map(tag => (
          <div
            key={tag}
            css={[eachTag, selectedTag === tag && activeTag]}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </div>
        ))}
      </section>
      <section css={mainWrapper}>
        {postList
          .filter(post =>
            selectedTag ? post.frontmatter.tags.includes(selectedTag) : true
          )
          .map(({ frontmatter }) => (
            <Link to={frontmatter.path} key={frontmatter.title}>
              <article css={post}>
                <div css={postTitle}>{frontmatter.title}</div>
                <div css={postDate}>
                  {dayjs(frontmatter.date).format("MMM DD. YYYY")}
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
