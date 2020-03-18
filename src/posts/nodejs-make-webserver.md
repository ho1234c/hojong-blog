---
path: "/nodejs-make-webserver"
date: "2016-07-26"
title: "Nodejs 시작하기"
tags: ["technology"]
---

수 많은 웹 프레임워크를 살펴보다보면 웹 생태계가 마치 춘추전국시대인것 같이 느껴진다. 다양한 언어와 환경에서 만들어진 라이브러리나 프레임워크, 그 속에 각각 담겨있는 철학, 테크닉등 공부할게 너무도 많다. 하지만 지금까지 '어떻게 하면 좀더 쉽게 개발 할 수 있을까?'를 고민해 온, ~~혹은 만사가 귀찮은~~ 선배 개발자분들 덕분에 이제 몇줄 안되는 코드로 서버를 띄울 수 있게 되었다.
내가 겉핥기로나마 공부를 하면서 발견한건 여러 언어와 프레임워크속에 담겨있는 생각은 모두 다르지만, GET과 POST, request와 response를 주고받으면서 클라이언트와 서버가 통신하는 방식으로 웹서버가 동작한다는 기본적인 틀은 변함이 없다는 것이다. Express, Django, Codeignitor등 대부분의 프레임워크는 어떻게든 end point를 나누고 마크업을 날려주는, 웹서버를 구축할 때 필수적으로 사용하는 기능들이 있다. 그래서 웹서버의 구조를 조금더 자세히 알고자 프레임워크를 사용하지않고 Nodejs기반의 클라이언트의 요청에 응답을 보내주는 간단한 웹서버를 만들어보려고 한다.

**스스로 학습하면서 정리하는 것을 목적으로 작성한 포스트입니다.**

-----

## Nodejs란?
대부분 어떤 언어를 처음 배울 때 변수와 함수를 선언하고 반복문을 사용하는 법을 학습하곤 한다. 하지만 Nodejs는 그것과는 좀 다르다.

>In software development, Node.js is an open-source, cross-platform runtime environment for developing server-side Web applications.
>Although Node.js is not a JavaScript framework, many of its basic modules are written in JavaScript, and developers can write
>new modules in JavaScript. The runtime environment interprets JavaScript using Google's V8 JavaScript engine.


>파이썬으로 만든 트위스티드, 펄로 만든 펄 객체 환경, 루비로 만든 이벤트머신과 용도가 비슷하다.

위키피디아에서는 이렇게 설명을 하고있는데, 트위스티드, 펄 객체 환경, 이벤트머신을 사용해본 적이 없어서 잘 모르겠다. 위의 정의에서 runtime이란 프로그램이 동작하는 환경을 일컫는다. javascript를 통해서 클라이언트단의 웹브라우저를 조작할 수 있는 동시에 서버사이드의 Nodejs를 조작할 수 있다. 여기서 Nodejs와 웹브라우저가 runtime이 된다. V8 엔진은 구글에서 C++로 개발한 매우 빠른 엔진이다. 이 엔진 덕분에 초기의 Nodejs가 유명해 졌다.

Nodejs의 가장 큰 특징은 **single thread, non-blocking I/O**라는 것이다. 이 모델에 대해서는 깊게 들어가면 끝이 없기 때문에 간단하게 요약한다. 하지만 웹서버 디자인에서 매우 중요한 모델이다.


>서버가 요청을 처리할 때 하나의 요청마다 thread를 하나씩 발생시켜 처리하는것을 Multi-thread 방식이라고 하는데, 동기방식으로 요청을 처리한다. 동기방식이란 하나의 요청이 처리되는 동안 다른 요청이 처리되지 못하고 요청을 완료한 후 다음 처리를 하는 방식이기 때문에 I/O처리 요청을 blocking한다. 하지만 single thread인 Nodejs는 비동기방식을 지원해서 **요청을 처리하면서 완료여부에 관계없이 다음 요청을 받을 수 있다.** 따라서 non-blocking으로 I/O를 처리 할 수 있다.
<a href="http://www.nextree.co.kr/p7292/" target="_blank">[더 자세한 내용]</a>

싱글쓰레드는 장단점이 있기 때문에 흔히 양날의 검이라고 불린다.

Nodejs의 **장점**
* 싱글쓰레드,비동기I/O 이벤트드리븐방식으로, 빠르다.
* 따라서 low cost의 multi connection 처리에 적합하다.
* javascript기반으로 진입장벽이 낮다.

Nodejs의 **단점**
* high cost의 작업에 취약하다. => **high cost를 많이 처리해야하는 경우에 Nodejs는 적합하지 않다.**
* 콜백 중첩으로 인해 가독성이 떨어 질 수 있다. => **Promise나 Async와 같은 라이브러리를 사용하여 가독성을 높일 수 있다.**
* 에러가 발생하면 프로세스가 종료되서, 서버가 자주 죽는다. => **watch dog 을 사용한다.**

-----

### 어떤 기능이 필요한가?
간단한 웹어플리케이션을 제작하려한다. 이를 위해 지금까지 공부했던 프레임워크를 참고해서 클라이언트의 응답에 필요한 최소한의 것들을 정리해 보면 아래와 같다.

- create server
- routing
- request, response handling
- view logic

프레임워크를 개발한 개발자들은 이렇게 공통적으로 필요한 기능들을 어떻게 제공할지, 어떤 세부적인 기능을 통해 사용자가 편하게 사용할지를 계속해서 고민 했을 것 같다.

## create server
Nodejs를 설치하고 우선 'Hello world!'를 띄워 보도록 한다. 운영체제에 관계없이 [https://nodejs.org](https://nodejs.org)에서 쉽게 다운로드 받을 수 있다. 또한 공식 홈페이지에서 서버를 띄우는 기초코드를 쉽게 찾을 수 있다.

``` javascript
const http = require('http');

http.createServer( (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/');
```

위의 코드는 Nodejs 서버를 만드는 코드이다. javascript에 익숙하다면 이해하기 쉽다. 익숙하지 않을 수 있는 ES6부분은
 <a href="https://github.com/lukehoban/es6features#let--const" target="_blank">const</a>와 <a href="https://github.com/lukehoban/es6features#arrows" target="_blank">arrow function</a>인데 링크에서 예시와 함께 설명이 잘 나와있다.

```sh
node server.js
```

server.js라는 파일을 만들고 실행하면 http:\/\/127.0.0.1:8000 에서 Hello World를 볼 수 있다.

| Method   | function                 |
|----------|--------------------------|
| writeHead| response객체에 header 작성|
| end      | response객체 작성 종료    |

end 메소드는 response header와 body가 모두 보내졌다는 신호이다. 관련 메소드에 대해서는 <a href="https://nodejs.org/docs/latest/api/http.html#http_response_end_data_encoding_callback" target="_blank">공식 api</a>에 자세히 나와 있다.

> **127.0.0.1 과 198.168.x.y에 대해서**<br>
평소에 로컬테스트를 할 때 127.0.0.1:port 를 사용하는데 이는 loopback address이다. 라우팅, 데이터스트림을 어떠한 가공없이 원래의 디바이스로 다시 돌려보내주는 기능을 한다. 반면 198.168.x.y는 디바이스의 로컬주소로, 같은 네트워크상의 다른 기기와 통신하는데 사용할 수 있다.


## routing
기본 내장 모듈인 url모듈은 request객체에서 url을 파싱해준다. 라우팅 인터페이스를 만들기 위해 router를 만들고 실질적인 기능을 위해 routeHandler를 만든다. 물론 router에 직접 뭔가를 하는 기능을 추가할 수도 있겠지만 의존관계를 주입하는 패턴으로 제작하는 것이 OOP적인 관점에서 좋다고 할 수 있다. 그리고 설계를 위해 직관적으로 생각할 수 있는 방법으로는 server에서 route를 호출하고 route는 outeHandler에서 적절한 기능을 실행시켜주면 routeHandler는 어떤 output을 리턴하고, 리턴받은 서버는 리턴받은 데이터를 클라이언트에게 넘겨주는 방식이 있다. 그런데 여기서 blocking과 non-blocking에 대해 생각해야한다. 만약 서버가 동기적으로 동작한다면 어떤 cost가 큰 작업이 큐에 들어오는 순간 그 작업을 위해 다른 작업을 할 수 없게 될것이다.

```js
// router.js
exports.router = (pathname, handler) => {
  try {
    return handler[pathname](response) // server로 리턴
  } catch (e) {
    console.log(e.message)
    return "error"
  }
}
```

```js
// routeHandler.js
module.exports = (() => {
  return {
    "/data": () => {
      ....
      "기다리세요"
      ....
      return "success" // router로 리턴
    },
    "/index": () => {
      return "It is index page"
    },
  }
})()
```

예를 들어 위와같은 방식이라면 먼저 '/data'에 요청을 보낸 후 '/index'에 요청을 보냈을 때 '/data'에서 뭔가 기다리는 로직이 수행되는 동안 '/index'로의 요청이 처리되지 않는다. 서버는 단일 쓰레드 이기 때문이다. 따라서 response객체를 주입시켜주어 각각 response를 보낼 수 있게 한다. 이러면 더이상 데이터가 routeHandler에서 server로는 올라오지 않고 server에서 routeHanlder로만 흐르게 된다. server.js는 클라이언트에게 응답을 보내주는것이 아니라 객체를 전달해주는 로직만 수행한다.


```js
// router.js
exports.router = (pathname, handler, response) => {
    try {
      handler[pathname](response);
    }
    catch(e) {
      console.log(e.message);
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.end("404 Not found");
    }
};
```

```js
// routeHandler.js
module.exports = (() => {
  return {
    "/index": response => {
      response.writeHead(200, { "Content-Type": "text/plain" })
      response.end("It is index page")
    },
    "/signin": response => {
      response.writeHead(200, { "Content-Type": "text/plain" })
      response.end("It is signin page")
    },
  }
})()
```

## view
서버에서 html을 response로 보내줄 때, 마크업을 서버에 직접 하드코딩하는것 보다 따로 모듈화를 시키는것이 효율적이다. 여기선 노드가 제공하는 기본 내장모듈을 사용해서 파일을 읽어온다.

```js
// view.js
const fs = require("fs")

module.exports = filename => {
  const filePath = "./" + filename + ".html"
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("readFile err : " + err)
    }
    return data // 서버로 리턴
  })
}
```

하지만 여기서도 비동기방식의 특징으로, 서버로 data를 직접 리턴해주는 방식은 읽어 온 data를 사용할 수 있음을 보장할 수 없다. 따라서 요청을 던져놓고 작업이 끝나면 등록 해 놓은 콜백 함수를 호출하는 방식이 필요하다.

```js
// view.js
const fs = require("fs")

module.exports = (filename, callback) => {
  const filePath = "./" + filename + ".html"
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("readFile err : " + err)
    }
    callback(data)
  })
}

```

```js
// routeHandler.js
const view = require("./view")

module.exports = (() => {
  return {
    "/index": (response, pathname) => {
      response.writeHead(200, { "Content-Type": "text/html" })
      view(pathname.replace("/", ""), function(data) {
        response.end(data) // 콜백을 통해 호출함.
      })
    },
    "/signin": (response, pathname) => {
      response.writeHead(200, { "Content-Type": "text/text" })
      response.end("It is signin page")
    },
  }
})()

```

## POST request handling
http 프로토콜에는 여러가지 종류가 있는데, 그중 가장 많이 사용되는것이 GET 과 POST이다. 둘다 서버에 요청을 보내는 건 같지만 GET은 대놓고 보내지만 POST는 숨겨서 보내고 비교적 많은 양의 데이터를 보내는데 적합하다. Nodejs에서도 querystring 모듈을 이용하면 클라이언트가 보낸 POST데이터를 파싱 할 수 있다.

> **Google Accelerator 사건**<br>
구글은 쿠키가 남아있는 페이지가 더 빠르게 로딩이 된다는 점을 이용해서 미리 페이지를 탐색하고 static한 데이터를 로딩해 놓는 방식으로 체감속도를 높이는 방식의 유틸리티인 google Accelerator 개발했다. Accelerator bot은 GET요청만 탐색해서 기계적으로 요청을 보내는데, POST나 DELETE 메소드를 써야 할 곳에 GET을 쓴 경우가 많아서 생각지도 못한 게시물이나 데이터가 지워졌다고 한다. 목적에 맞는 적절한 프로토콜을 썼다면 더 좋은 웹 환경이 되었을 것이다.

데이터가 들어 올때마다 저장하고 더이상 저장할 데이터가 없으면 end를 통해 종료를 알린다. request 객체또한 이벤트를 붙일 수 있기 때문에 data 이벤트를 추가하면 데이터가 들어올 때마다 이벤트가 발생한다.

> **Event Emitter**<br>
많은 Nodejs api들은 emitters라는 객체가 내장되어 있다. 이 객체는 정기적으로 listeners 함수를 호출하는 이벤트 이름을 뱉는다. 예를 들면 fs.ReadStream 은 파일이 열릴때 stream이 이벤트를 발생시킨다. 모든 이벤트는 EventEmitter 클래스의 인스턴스이다. eventEmitter.on()을 통해 오브젝트에 이벤트를 붙일 수 있고 eventEmitter.emit()를 통해 이벤트를 발생 시킬 수 있다.

```js
// server.js
const http = require("http")
const url = require("url")

function runServer(router, handler) {
  http
    .createServer((request, response) => {
      var pathname = url.parse(request.url).pathname
      var postBody = ""
      request.on("data", data => {
        postBody += data
      })
      request.on("end", () => {
        router(pathname, handler, response, postBody)
      })
    })
    .listen(8000)
  console.log("Server running at http://127.0.0.1:8000/")
}

exports.runServer = runServer
```

```js
// routeHandler.js
const view = require("./view")
const querystring = require("querystring")

module.exports = (() => {
  return {
    "/index": (response, pathname, postBody) => {
      response.writeHead(200, { "Content-Type": "text/html" })
      view(pathname.replace("/", ""), data => {
        response.end(data)
      })
    },
    "/signin": (response, pathname, postBody) => {
      var postData = querystring.parse(postBody)
      console.log(postData)
      response.writeHead(200, { "Content-Type": "text/html" })
      view(pathname.replace("/", ""), data => {
        response.end(data)
      })
    },
  }
})()

```

POST요청을 파싱할 수 있다.

![1](../images/2016-07-26-nodejs-make-webserver/1.png)
![2](../images/2016-07-26-nodejs-make-webserver/2.png)

<br>

## 마치며..
Nodejs를 통해 클라이언트의 요청에 응답을 보내주는 간단한 웹서버를 만들었다. 기본적으로 서버를 위해 설계되어서 그런지 프레임워크를 사용하지 않더라도 자동화 되어있는 함수들이 많고 가볍다. Nodejs의 가장 대중적인 프레임워크인 express가 가벼운건 아마 이런이유 때문인것 같다. 반면 Python의 Django와 같은 프레임워크는 무겁지만 견고하고 강력하다는 느낌을 준다. (Django는 expressJS 용량에 약 20배) 아무래도 비교적 직관적이지 못한 Nodejs의 비동기 event driven에 익숙해 지기 위해서는 자주 사용해 보는 수 밖에 없는 것 같다.

