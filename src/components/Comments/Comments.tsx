import React, { createRef, useLayoutEffect } from "react"

const src = "https://utteranc.es/client.js"

export type CommentsProps = {
  repo: string
}

const Comments: React.FC<CommentsProps> = React.memo(({ repo }) => {
  const containerRef = createRef<HTMLDivElement>()

  useLayoutEffect(() => {
    const utterances = document.createElement("script")

    const attributes = {
      src,
      repo,
      theme: "github-light",
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
