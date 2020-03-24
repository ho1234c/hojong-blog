---
path: "/ie11-windows7-issue"
date: "2016-11-17"
title: "IE11 + Windows7 개발자 콘솔 에러"
tags: ["technology"]
---


평소에 IE를 잘 사용하지 않지만 우리나라 특성상 IE를 고려해서 개발을 할 수 밖에없다. 그래서 IE를 간만에 켰는데
개발자콘솔이 먹통이 되고 에러를 띄웠다.

![error](../images/2016-11-17-explore-developer-console-issue/1.png)

``` sh
Diagnostic:
Exception in window.onload: Error: An error has occurredJSPlugin.3005
```

뭐 이런 내용이었는데 구글링을 해보니 IE11 + windows7 에서만 발생하는 에러인가보다.
ms에서 핫픽스 <a href="https://www.microsoft.com/ko-kr/download/details.aspx?id=45134" target="_blank">KB3008923</a> 를 제공하고 있다.

그런데 이 핫픽스를 설치하려고 보니 "업데이트를 컴퓨터에 적용할 수 없습니다" 라는 메시지가 뜨고 그냥 종료되어 버린다.

![error](../images/2016-11-17-explore-developer-console-issue/2.png)

역시 구글링을 한 결과 ms 커뮤니티에 나와같은 <a href="https://www.microsoft.com/ko-kr/download/details.aspx?id=45134" target="_blank">KB3008923 업데이트 실패관련 문의</a>가 있었고 이걸 보고 해결했다.
ms에선 문제를 쉽게 해결할 수 있게 하기위해서 문제별로 Fix it 솔루션을 제공하는데, 실행만 시키면 알아서 이슈를 해결해 주는 편리한 시스템이다. 

나 또한 <a href="http://go.microsoft.com/?linkid=9665683" target="_blank">Fix it 솔루션</a>을 통해서 문제를 해결했는데, Windows Update관련 캐시폴더를 초기화해주는 것이라고 설명되어있다.

-----
이슈를 해결하기 위해 재부팅을 몇번이나했다. 윈도우는(특히 익스플로러) 익숙하긴 하지만 손이 많이 간다. 한가지 브라우저, 한가지 운영체제만 사용하기보다 여러가지를 경험해보고 적절하게 이용해보는것이 필요한것같다.


