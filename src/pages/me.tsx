/** @jsx jsx */
import { useEffect } from "react"
import { css, jsx } from "@emotion/react"
import Layout from "../components/layout/layout"

const AboutMe: React.FC = () => {
  useEffect(() => {
    const onScroll = () => {
      console.log(
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      )
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Layout>
      <div style={{ height: 20000 }}></div>
    </Layout>
  )
}

export default AboutMe
