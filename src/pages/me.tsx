/** @jsx jsx */
import { useEffect } from "react"
import { css, jsx, keyframes } from "@emotion/react"
import Layout from "../components/layout/layout"
import Profile from "@src/components/Profile/Profile"
import { Github as GithubIcon } from "@src/components/icon/Github"
import { Instagram as InstagramIcon } from "@src/components/icon/Instagram"

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
      <div css={aboutMeStyle}>
        <div className="profile-wrapper">
          <div className="profile-frame">
            <Profile
              style={{
                width: 200,
                height: 200,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderRadius: 100,
              }}
            />
          </div>
        </div>
        <div className="address">
          <a
            href="https://github.com/ho1234c"
            target="__blank"
            rel="noopener noreferrer"
          >
            <GithubIcon width="20" height="20" />
          </a>
          <a
            href="https://instagram.com/ho1234c?igshid=v6qmm1u6z692"
            target="__blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon width="20" height="20" />
          </a>
        </div>
        <div className="description">
          <AnimateText id="first">
            소프트웨어 엔지니어 정종호 입니다.
          </AnimateText>
          <AnimateText id="second" begin="0.5s" dur="2s">
            개발과 여행을 좋아하고, 운동과 보드게임을 즐깁니다.
          </AnimateText>
        </div>
      </div>
    </Layout>
  )
}

export default AboutMe

const AnimateText: React.FC<{ id: string; dur?: string; begin?: string }> = ({
  id,
  children,
  dur = "3s",
  begin = "0s",
}) => (
  <div>
    <svg
      width="300"
      height="20"
      viewBox="0 0 300 20"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <path id={id} d="M0 0">
        <animate
          attributeName="d"
          from="m0,15 h0"
          to="m0,15 h300"
          dur={dur}
          begin={begin}
          repeatCount="1"
          fill="freeze"
        />
      </path>
      <text font-size="13" fill="currentColor" fontWeight="bold">
        <textPath xlinkHref={`#${id}`}>{children}</textPath>
      </text>
    </svg>
  </div>
)

const aboutMeStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .profile-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 20px;

    .profile-frame {
      .border {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;

        animation: dash 1s ease;
        animation-fill-mode: forwards;
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      }
    }
  }

  .address {
    display: flex;
    justify-content: center;

    a:not(:last-of-type) {
      margin-right: 7px;
    }
  }

  .description {
    padding: 20px;
  }
`
