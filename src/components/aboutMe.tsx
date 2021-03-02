import React from "react"
import { css } from "@emotion/react"
import Layout from "./layout"

const mainText = css`
  font-size: 30px;
  line-height: 60px;
`

const strongText = css`
  color: #ffa32de3;
  border-bottom: 5px solid #ff9d20;
  font-weight: bold;
  padding-bottom: 3px;
  line-height: 30px;
  display: inline-block;
`

const englishText = css`
  position: absolute;
`

const AboutMe: React.FC = () => {
  return (
    <Layout>
      <div css={mainText}>
          <span css={strongText}>개발</span>과
          <span css={strongText}>여행</span>과
          <span css={strongText}>운동</span>을
        좋아합니다
      </div>
      {/* <div>Programmer</div>
      <div>Traveler</div>
      <div>Fitness lovers</div> */}
    </Layout>
  )
}

export default AboutMe
