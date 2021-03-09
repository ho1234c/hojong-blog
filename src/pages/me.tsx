/** @jsx jsx */
import { useEffect, useState } from "react"
import { css, jsx } from "@emotion/react"
import Layout from "@src/components/Layout/Layout"
import Profile from "@src/components/Profile/Profile"
import WorkIcon from "@src/assets/icon/work.svg"
import GithubIcon from "@src/assets/icon/github.svg"
import InstagramIcon from "@src/assets/icon/instagram.svg"
import CodeIcon from "@src/assets/icon/code.svg"
import PlantIcon from "@src/assets/icon/plant.svg"
import MailIcon from "@src/assets/icon/mail.svg"
import { mq, breakPoint } from "@src/utils/mediaQuery"

const isDesktop =
  typeof window === `undefined`
    ? false
    : window.matchMedia(`(min-width: ${breakPoint}px)`).matches

const AboutMe: React.FC = () => {
  const [isShowProfile, setIsShowProfile] = useState(() => isDesktop)

  useEffect(() => {
    const timeout = setTimeout(() => setIsShowProfile(true), 1500)

    return () => clearTimeout(timeout)
  }, [isShowProfile])

  return (
    <Layout>
      <div css={aboutMeStyle}>
        <section className={`profile-wrapper ${isShowProfile ? "show" : ""}`}>
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
            <a href="mailto:ho1234c@gmail.com">
              <MailIcon width="20" height="20" />
            </a>
          </div>
        </section>

        <section className="description">
          <section>
            <AnimateText id="first">
              소프트웨어 엔지니어 정종호 입니다
            </AnimateText>
            <AnimateText id="second" begin="0.5s" dur="2s">
              개발과 여행을 좋아하고, 운동과 보드게임을 즐깁니다
            </AnimateText>
          </section>

          <section>
            <h4>
              <WorkIcon width="20" height="20" />
              Work
            </h4>
            <ul>
              <li>
                <AnimateText id="work-1">
                  why와 how를 모두 중요히 생각합니다
                </AnimateText>
              </li>
              <li>
                <AnimateText id="work-2" begin="0.5s">
                  귀찮음을 해결하면서 동기부여됩니다
                </AnimateText>
              </li>
            </ul>
          </section>
          <section>
            <h4>
              <PlantIcon width="20" height="20" />
              Life
            </h4>
            <ul>
              <li>
                <AnimateText id="life-1">
                  작은 목표를 세우고 꾸준히 해나가는 것을 잘합니다
                </AnimateText>
              </li>
              <li>
                <AnimateText id="life-2" begin="0.5s" dur="2s">
                  불규칙 속의 규칙을 중요하게 생각합니다
                </AnimateText>
              </li>
              <li>
                <AnimateText id="life-3" begin="1s" dur="2s">
                  여행과 사유로부터 영감과 통찰을 얻습니다
                </AnimateText>
              </li>
            </ul>
          </section>
          <section>
            <h4>
              <CodeIcon width="20" height="20" />
              Code
            </h4>
            <ul>
              <li>
                <AnimateText id="code-1" dur="2s">
                  명령형보단 선언형을 선호합니다
                </AnimateText>
              </li>
              <li>
                <AnimateText id="code-2" dur="1s">
                  테스트 코드의 가치에 공감합니다
                </AnimateText>
              </li>
              <li>
                <AnimateText id="code-3" begin="0.5s">
                  리팩토링을 좋아합니다
                </AnimateText>
              </li>
            </ul>
          </section>
        </section>
      </div>
    </Layout>
  )
}

export default AboutMe

const AnimateText: React.FC<{
  id: string
  width?: string
  dur?: string
  begin?: string
  fontSize?: string
}> = ({
  id,
  children,
  dur = "3s",
  begin = "0s",
  fontSize = "13",
  width = "100%",
}) => (
  <div>
    <svg
      width={width}
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <path id={id}>
        <animate
          attributeName="d"
          from="m0,15 h0"
          to="m0,15 h1000"
          dur={dur}
          begin={begin}
          repeatCount="1"
          fill="freeze"
        />
      </path>
      <text fontSize={fontSize} fill="currentColor" fontWeight="bold">
        <textPath xlinkHref={`#${id}`}>{children}</textPath>
      </text>
    </svg>
  </div>
)

const aboutMeStyle = css`
  display: flex;
  justify-content: start;
  flex-direction: column;

  ${mq.large} {
    flex-direction: row;
  }

  .profile-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 20px;
    flex-direction: column;
    align-items: center;
    transition: all 1s ease-in-out;

    margin-top: -300px;
    opacity: 0;

    &.show {
      margin-top: 0;
      opacity: 1;
    }

    ${mq.large} {
      justify-content: start;
    }

    .profile-frame {
      .border {
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;

        animation: 1s dash 2.1s ease forwards;

        ${mq.large} {
          animation: dash 1s ease forwards;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      }
    }

    .address {
      display: flex;
      justify-content: center;

      a:not(:last-of-type) {
        margin-right: 10px;
      }
    }
  }

  .description {
    padding: 0 20px;

    ${mq.large} {
      padding: 35px 0 0 50px;
    }

    section {
      padding: 20px 0;

      h4 {
        font-size: 18px;
        margin: 0 0 5px 0;
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;
        }
      }

      ul {
        margin: 0;
        padding: 0;

        li {
          list-style: none;
        }
      }
    }
  }
`
