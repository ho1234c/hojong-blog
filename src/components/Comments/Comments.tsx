import React, { createRef, useLayoutEffect } from "react"
import { useTheme } from "@emotion/react"

const src = "https://utteranc.es/client.js"

export type CommentsProps = {
  repo: string
}

const Comments: React.FC<CommentsProps> = React.memo(({ repo }) => {
  const containerRef = createRef<HTMLDivElement>()
  const theme = useTheme()

  useLayoutEffect(() => {
    const utterances = document.createElement("script")

    const attributes = {
      src,
      repo,
      theme: theme.isDarkMode ? "github-dark" : "github-light",
      "issue-term": "pathname",
      label: "✨💬 comments ✨",
      crossOrigin: "anonymous",
      async: "true",
    }

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })

    containerRef.current!.appendChild(utterances)
  }, [repo])

  return <div ref={containerRef} />
})

Comments.displayName = "Utterances"

export default Comments
