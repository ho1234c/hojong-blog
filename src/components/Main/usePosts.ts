import { useEffect, useState } from "react"
import { MarkdownRemark } from "../../../graphql-types"

export const usePosts = (nodes: MarkdownRemark[]) => {
  const [postList, setPostList] = useState(nodes)
  const [tagList, setTagList] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>()

  useEffect(() => {
    if (!nodes) return

    const tagList = Array.from(
      new Set(nodes.flatMap((node) => node.frontmatter?.tags).flat())
    )

    setPostList(nodes)
    setTagList(tagList)
  }, [])

  return {
    postList,
    tagList,
    handleSelectTag: setSelectedTag,
    selectedTag,
  }
}
