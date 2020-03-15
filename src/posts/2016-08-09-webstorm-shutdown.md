---
path: "/webstorm-issue"
date: "2016-08-09"
title: "웹스톰 메모리 셋팅, shutdown issue"
---

웹스톰에서 shutdown되는 issue에 대한 트러블슈팅
<!-- more --> 
<style>
img{ margin: 0 auto; display: block;}
</style>
우선, 나의 노트북은 이와같은 환경의 윈도우7 이다.

![1](/images/2016-08-09-webstorm-shutdown/1.png)

좋은 환경은 아니지만 한가지 IDE정도는 문제없이 돌릴 수 있는 스펙인데, 얼마전부터 웹스톰이 메모리부족 경고메시지가 나오고 급기야 타이핑을 하는도중 강제종료가 됐다.

웹스톰 스스로 경고메시지를 띄워주기로는, 메모리를 할당해주는 셋팅값을 변경해주라는 것이다.
파일의 위치는 윈도우 기준으로 이곳이다.

```bash
설치위치/bin/WebStorm.exe.vmoptions
```

이 파일을 텍스트 에디터로 열어보면

```bash
-server
-Xms128m
-Xmx1024m   # Xmx 사이즈 설정 하는 부분
-XX:MaxPermSize=350m
-XX:ReservedCodeCacheSize=225m
-XX:+UseConcMarkSweepGC
-XX:SoftRefLRUPolicyMSPerMB=50
-ea
-Dsun.io.useCanonCaches=false
-Djava.net.preferIPv4Stack=true
-XX:+HeapDumpOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow
```

이런 식으로 되어있는데 Xmx를 설정하는 부분의 값을 늘려주라는 것이다. 아마 할당할 최대메모리 따위 인것 같은데, 나의 경우엔 기본적으로 512로 설정이 되어있던걸 1024로 늘렸다. (일정이상 늘리게 되면 웹스톰이 아예 실행되지않는다.) 셋팅을 저장하고 다시 웹스톰을 켰다. 한동안 잘 되는가 싶더니 타이핑을 하던 도중 밑도끝도 없이 튕겨버렸다.

이런 증상이 수분을 주기로 반복되니 작업을 할수가 없었다. 하지만 아무리 검색을 해봐도 나와같은 문제는 나오지 않았다. 이 때 문득 떠오른건 최근 웹스톰에 마크다운 플러그인을 설치했다는 것이다.

나는 얼마전 github page를 통해서 블로그를 만들고 마크다운으로 글을 작성하고 있다.
웹스톰은 플러그인이 풍부한 IDE답게 마크다운에 관한 플러그인도 있었다. 마크다운을 작성하기 위해 파일을 열면 자동으로 플러그인을 감지해서 설치하라고 추천해 준다. 플러그인을 설치하면 따로 셋팅을 하지 않더라도 프리뷰탭이 생겨서 마크다운이 웹에서 보여지는 모습을 미리보기 할 수 있다.

**나의 경우에는 이 마크다운 플러그인에서 문제가 발생했던 것이었다. 해당 플러그인을 지우고 사용하니 며칠을 켜놔도 튕기지 않고 잘 작동했다.**

근본적인 원인은 모르겠지만 아마 메모리를 엄청 많이 잡아먹었나보다. 플러그인이 없으면 비교적 불편하지만 튕기는 것 보다는 나으니 다행이다.