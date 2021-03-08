import { useEffect, useState } from "react"
import { MarkdownRemark } from "@grpaphql-types"
import { setItem, getItem } from "@src/utils/sessionStorage"

const STORAGE_KEY = "hojong-blog:tag"

export const usePosts = (nodes: MarkdownRemark[]) => {
  const [postList, setPostList] = useState(nodes)
  const [tagList, setTagList] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string>(() =>
    getItem(STORAGE_KEY)
  )

  useEffect(() => {
    if (!nodes) return

    const tagList = Array.from(
      new Set(nodes.flatMap((node) => node.frontmatter?.tags).flat())
    )

    setPostList(nodes)
    setTagList(tagList)
  }, [])

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag)
    setItem(STORAGE_KEY, tag)
  }

  return {
    postList,
    tagList,
    handleSelectTag,
    selectedTag,
  }
}
