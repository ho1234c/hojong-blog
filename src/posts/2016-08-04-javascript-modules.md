---
path: "/javascript-modules-part-1"
date: "2016-08-04"
title: "JavaScript Modules Part1 A Beginner’s Guide"
tags: ["technology", "translation"]
---

JavaScript Modules Part1 A Beginner’s Guide

<!--more-->

**FreeCodeCamp에 기재된 <a href="https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.wou8etvsd" target="_blank"> Preethi Kasireddy의 포스트</a>를 번역한 글입니다. 이해한대로 의역했기 때문에 오역 및 빠뜨리는 부분이 있을 수 있습니다.**

자바스크립트 초심자라면 “module bundlers vs. module loaders”, “Webpack vs. Browserify” and “AMD vs. CommonJS”과 같은 용어들에 압도당할 수 있습니다. 어쩌면 자바스크립트 모듈시스템에 겁먹었을 수도 있지만 모듈 시스템은 웹개발자에게 필수적입니다.

이 포스트에선 전문용어들을 잘 풀어서 설명할겁니다. 도움이 되길 빕니다!

_note: 포스트는 두가지 섹션으로 나뉩니다. Part 1은 모듈은 무엇이고 왜 사용하는가? Part 2는 bundle modules의 의미와 이를 위한 다른 방법들에 대해 설명합니다._

## Part 1: 모듈이 뭔가요?

> 좋은 작가는 책을 챕터와 섹션으로 나누고 좋은 프로그래머는 프로그램을 모듈로 나눈다.

책에서의 챕터처럼 모듈은 코드다발 입니다. 하지만 좋은 모듈은 자기만의 기능으로 독립되어(highly self-contained with distinct functionality) 필요에 의해 섞이던 지워지던 더해지던간에 전체 시스템에 방해되지않습니다.

### 왜 모듈을 사용해야 하는가?

모듈을 사용하는건 상호 의존적 코드베이스에 큰 도움이 됩니다. 제 생각에 그 중 가장 중요한것이 몇가지 있습니다.

**1) 유지보수성(Maintainability)**
모듈은 독립적(self-contained) 입니다. 잘 디자인된 모듈은 코드베이스 끼리 독립성을 향상시키기 위해 의존성을 가능한 줄이는게 목적입니다. 다른 코드 조각으로부터 모듈이 분리 되어있을 때 단일 모듈을 수정하기도 더 쉽습니다.

아까 책을 예제로 들었던 것을 보면, 만약 하나의 챕터를 바꿨을 때 모든 챕터가 뒤틀린다면 그건 악몽일겁니다. 그 대신 각각의 챕터가 다른 챕터에 영향을 끼지지 않는, 각각 의 방식대로 개선되길 원할 겁니다.

**2) 네임스페이싱(Namespacing)**
자바스크립트에서 최상위 스코프 함수는 글로벌입니다.(모두가 접근 할 수 있음) 이 때문에 완벽하게 연관되지 않는 코드끼리도 전역변수를 공유하고 "네임스페이스 오염"이 생깁니다.

관련 없는 코드간의 전역변수 공유는 매우 좋지 않습니다. <a href="http://c2.com/cgi/wiki?GlobalVariablesAreBad" target="_blank">big no-no!!</a>

이 포스트의 후반에선 모듈을 사용하는 것이 private space를 생성해서 네임스페이스 오염을 피할수 있다는 것을 보여줍니다.

**3) 재사용성(Reusablility)**
솔직히 우리는 예전에 사용했던 코드를 새로운 프로젝트에 카피합니다. 예를 들어 예전 프로젝트의 유틸리티 메소드를 현재의 프로젝트에 카피했다고 상상해보세요.

모두 좋지만, 만약 당신이 그 코드를 사용하는 더 좋은위치나 방법을 찾았다면, 아마 뒤로 돌아가서 지금 까지 작성한 모든곳을 업데이트 해야할겁니다. 이건 명백히 시간낭비입니다. 만약 계속해서 사용할 수 있는 모듈이 있다면 더 쉽게 할 수 있지않을까요?

### 모듈을 어떻게 만드나?

모듈을 프로그램에 더하는 방법은 매우 많습니다. 다음은 몇가지 방법입니다.

**모듈 패턴(module pattern)**
모듈 패턴은 클래스 컨셉에서 한 오브젝트속에서 public, private 메소드를 흉내는데 사용됩니다.(자바스크립트는 기본적으로 클래스를 지원하지않습니다.<small>//ES6에 생기죠.</small>)
Java나 Python같은 언어에서 클래스의 사용법과 비슷합니다. private 변수를 클로저 스코프속에서 캡슐화 하는 동시에 우리가 밖으로 내보내고싶은 public api를 만들 수 있게 합니다.

모듈패턴을 만드는 몇가지 방법이 있습니다. 처음예제에서는 익명 클로저를 사용할겁니다. 이건 모든 코드를 익명함수에 넣음으로써 우리가 원하는걸 하게 해줍니다.(기억해야할것:자바스크립트에서 함수는 새로운 스코프를 만드는 유일한 방법입니다.)

**예제 1: 익명 클로저(Anonymous closure)**

```js
;(function () {
  // 클로저 스코프안에 변수를 넣음으로써 private를 유지할 수 있습니다.

  var myGrades = [93, 95, 88, 0, 55, 91]

  var average = function () {
    var total = myGrades.reduce(function (accumulator, item) {
      return accumulator + item
    }, 0)

    return "Your average grade is " + total / myGrades.length + "."
  }

  var failing = function () {
    var failingGrades = myGrades.filter(function (item) {
      return item < 70
    })

    return "You failed " + failingGrades.length + " times."
  }

  console.log(failing())
})()

// ‘You failed 2 times.’
```

이 구조에서 익명함수는 자신의 영역 또는 "클로저"를 가지고 있습니다. 이건 부모 네임스페이스(전역)로부터 변수를 숨겨줍니다. 이 접근이 훌륭한것은 이 함수 속의 지역변수는 우연히 전역변수에 덮여씌여지는것 없이 전역변수에 접근할 수 있습니다. 다음처럼요:

```js
var global = "Hello, I am a global variable :)"

;(function () {
  // 클로저 스코프안에 변수를 넣음으로써 private를 유지할 수 있습니다.

  var myGrades = [93, 95, 88, 0, 55, 91]

  var average = function () {
    var total = myGrades.reduce(function (accumulator, item) {
      return accumulator + item
    }, 0)

    return "Your average grade is " + total / myGrades.length + "."
  }

  var failing = function () {
    var failingGrades = myGrades.filter(function (item) {
      return item < 70
    })

    return "You failed " + failingGrades.length + " times."
  }

  console.log(failing())
  console.log(global)
})()

// 'You failed 2 times.'
// 'Hello, I am a global variable :)'
```

**예제 2: Global import**

또 다른 방법은 jQuery처럼 Global import를 하는 겁니다. 이건 매개변수로 전역변수를 전달하는 것을 제외하면 방금전의 익명 클로저와 유사합니다.

```js
;(function (globalVariable) {
  // 클로저 스코프안에 변수를 넣음으로써 private를 유지할 수 있습니다.
  var privateFunction = function () {
    console.log("Shhhh, this is private!")
  }

  // function() 블럭 속에 감춰진 메소드들 속에서 globalVariable의 인터페이스를 통해 아래 메소드들을 드러냄

  globalVariable.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection)
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection)
      }
    }
  }

  globalVariable.filter = function (collection, test) {
    var filtered = []
    globalVariable.each(collection, function (item) {
      if (test(item)) {
        filtered.push(item)
      }
    })
    return filtered
  }

  globalVariable.map = function (collection, iterator) {
    var mapped = []
    globalUtils.each(collection, function (value, key, collection) {
      mapped.push(iterator(value))
    })
    return mapped
  }

  globalVariable.reduce = function (collection, iterator, accumulator) {
    var startingValueMissing = accumulator === undefined

    globalVariable.each(collection, function (item) {
      if (startingValueMissing) {
        accumulator = item
        startingValueMissing = false
      } else {
        accumulator = iterator(accumulator, item)
      }
    })

    return accumulator
  }
})(globalVariable)
```

이 예제에서 globalVariable은 유일한 전역변수 입니다.
익명함수에 비해 이 방법이 가지는 장점은 전역변수를 미리 선언해서 다른사람들이 코드를 읽기 쉽게 만든다는 겁니다.

**예제 3: 객체 인터페이스(Object interface)**
다음처럼, 독립적인(self-contained) 객체를 이용해서 모듈을 만드는 방법도 있습니다.

```js
var myGradesCalculate = (function () {
  // 클로저 스코프안에 변수를 넣음으로써 private를 유지할 수 있습니다.
  var myGrades = [93, 95, 88, 0, 55, 91]

  // function() 블럭 속에 구현 된 메소드들 속에서 인터페이스를 통해 메소드들을 드러냄

  return {
    average: function () {
      var total = myGrades.reduce(function (accumulator, item) {
        return accumulator + item
      }, 0)

      return "Your average grade is " + total / myGrades.length + "."
    },

    failing: function () {
      var failingGrades = myGrades.filter(function (item) {
        return item < 70
      })

      return "You failed " + failingGrades.length + " times."
    },
  }
})()
```

보시다시피 이 방법은 어떤 변수 혹은 메소드가 private 일지 결정 할 수 있게 하고 우리가 드러내길 원하는 변수나
메소드는 리턴구문에 넣습니다.(예를들어 average & failing)

**예제 4: 공개 모듈패턴(Revealing module pattern)**
이 예제는 모든 메소드들을 명시적으로 드러내기 전까지 private를 유지한다는 점을 제외하고는 위에서의 접근과 매우 흡사합니다.

```js
var myGradesCalculate = (function () {
  // 클로저 스코프안에 변수를 넣음으로써 private를 유지할 수 있습니다.
  var myGrades = [93, 95, 88, 0, 55, 91]

  var average = function () {
    var total = myGrades.reduce(function (accumulator, item) {
      return accumulator + item
    }, 0)

    return "Your average grade is " + total / myGrades.length + "."
  }

  var failing = function () {
    var failingGrades = myGrades.filter(function (item) {
      return item < 70
    })

    return "You failed " + failingGrades.length + " times."
  }

  // Explicitly reveal public pointers to the private functions
  // that we want to reveal publicly

  return {
    average: average,
    failing: failing,
  }
})()

myGradesCalculate.failing() // 'You failed 2 times.'
myGradesCalculate.average() // 'Your average grade is 70.33333333333333.'
```

지금까지 많은걸 이해한것 처럼 보일 수 있습니다. 하지만 이건 모듈패턴의 빙산의 일각 입니다. 이건 제가 찾은 유용한 예제들 입니다.

<a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript" target="_blank">Learning JavaScript Design Patterns</a> by Addy Osmani: 인상적인 간결함 속에서 보물을 발견할 수 있음
<a href="http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html" target="_blank">Adequately Good by Ben Cherry</a> 모듈패턴에 익숙한 사람들을 위해 예제를 포함한 유용한 개요
<a href="https://carldanley.com/js-module-pattern/" target="_blank">Blog of Carl Danley</a>모듈패턴의 개요 및 다른 자바스크립트 패턴들의 리소스

### CommonJS and AMD

위의 방법들은 모두 한가지 공통점이 있습니다: 코드를 함수로 감싸서 각각의 클로저 스코프를 위한 private한 네임스페이스를 만들었다는 것입니다. 방법들은 모두 각각 효과적이지만 단점 또한 있습니다.

하나는 개발자로서 파일을 로드하기 위해 올바른 의존성의 순서를 알고있어야 합니다. 예를들어 프로젝트에 Backbone을 쓴다고 했을 때 파일속의 Backbone의 소스코를 위한 스크립트태그들을 포함시켜야 합니다.

Backbone이 Underscore.js에 높은 의존성을 가지고 있기 떄문에 Backbone 파일의 스크립트태그는 Underscore.js파일의 앞에 올 수 없습니다. 개발자로서 의존성을 관리하는것은 때때로 골칫거리입니다.

또다른 단점은 그것들이 여전히 또다른 네임스페이스 붕괴를 이끌 수 있다는 것입니다. 예를들어 두개의 같은 이름의 모듈이 있을 수 있습니다. 또는 두가지 버전의 모듈이 있을경우에 둘다 필요한가요? 그래서 전역 스코프를 거치지않는 모듈인터페이스를 디자인하는 방법이 있는지 궁금할겁니다.

운좋게도 답이 있습니다.

두가지 잘 만들어진 방법이 있는데, 바로 CommonJS와 AMD입니다.

**CommonJS**
CommonJS는 모듈선언을 위한 자바스크립트 API를 디자인하고 구현한 자발적 워킹 그룹입니다.

CommonJS 모듈은 특정 객체를 exports 할 수 있고 그것들을 *require*를 통해 다른 프로그램에서 사용가능하게 한, 재사용가능한 자바스크립트 조각입니다.
만약 Nodejs에 익숙하다면 이 형식에 익숙할겁니다.

CommonJS는 각각의 자바스크립트 파일을 그 자신의 유니크한 모듈 컨텍스트속에 저장합니다.(마치 클로저로 감싸는것 처럼) 이 스코프 속에서 우리는 모듈의 exports를 위해서 *module.exports*를, import를 위해서 *require*를 사용할 수 있습니다.

CommonJS 모듈은 다음과 같은 형식일겁니다.

```js
function myModule() {
  this.hello = function () {
    return "hello!"
  }

  this.goodbye = function () {
    return "goodbye!"
  }
}

module.exports = myModule
```

우리는 특별한 객체 모듈을 사용할 수 있고 함수를 *module.exports*에 참조시킬 수 있습니다. 이것은 다른 파일에서 사용하기위해 무엇을 공개할건지 CommonJS 모듈시스템에 알려주는겁니다.

누군가 위의 myModule을 사용하길 원한다면 아래와 같이 *require*를 통해 가능합니다.

```js
var myModule = require("myModule")

var myModuleInstance = new myModule()
myModuleInstance.hello() // 'hello!'
myModuleInstance.goodbye() // 'goodbye!'
```

좀전에 나왔던 모듈패턴에는 두가지 확실한 장점이 있습니다.

1. 전역스코프의 네임스페이스 오염을 피한다.
2. 의존성을 구분짓는다.

거기다가 개인적으로 문법이 간결해서 좋습니다.

또 한가지는 server-first하고 동기적으로 모듈을 로드한다는 점입니다. 우리가 세가지 다른 모듈을 *require*할 때 문제가 발생하는데, 그것들을 하나씩 불러오기 때문입니다.

지금 서버에서 잘 작동한다고 해도 모듈을 디스크에서 읽는것보다 웹사이트에서 불러오는게 훨씬더 오래걸린다는 사실은 브라우저를 위한 자바스크립트 작성할때 우리를 힘들게합니다. 한가지 스크립트로 하나의 모듈을 로드하는한 자바스크립트의 쓰레드가 코드가 로드될때 까지 멈춰있기 때문에 로딩이 끝날 때 까지 브라우저가 멈춰있을겁니다. (Part2에서 모듈번들링에 대해 이야기하면서 어떻게 이 이슈에대해 다루는지 이야기할겁니다. 지금은 이것이 우리가 알아야할 전부입니다.)

**AMD**
CommonJS는 모두 훌륭하지만 비동기적으로 모듈을 로드해야할 경우엔 어떤가요? 간단히 말해서 답은 AMD이거나 비동기적으로 모듈을 정의하는겁니다.

AMD는 이런겁니다.

```js
define(["myModule", "myOtherModule"], function (myModule, myOtherModule) {
  console.log(myModule.hello())
})
```

여기서 define 함수는 이 모듈이 의존적인 모듈의 배열로 첫번째 매개변수를 받습니다. 이 의존성은 백그라운드에 로드됩니다.(non-blocking한 방식으로) 그리고 로드가 끝나면 define 함수는 가지고있던 콜백함수를 호출합니다.

다음으로 콜백함수는 의존성이 있는 이 모듈들을 매개변수로 가져갑니다. 이 경우엔 myModule과 myOtherModule를 사용할 수 있게합니다. 의존성은 define 키워드를 사용해서 정의되어야 합니다.

예를들어 myModule은 이와같을겁니다.

```js
define([], function () {
  return {
    hello: function () {
      console.log("hello")
    },
    goodbye: function () {
      console.log("goodbye")
    },
  }
})
```

그래서 CommonJS와는 다르게 AMD는 brower-first한 비동기적 접근입니다.

비동기와는 다르게 또다른 AMD의 장점은 CommonJS가 오직 객체만 지원하는 반면에 AMD는 객체, 함수, 생성자, 문자열, 제이슨과 같은 많은 타입들을 취할수 있다는 겁니다. 즉, AMD는 io, 파일시스템, 그리고 다른 CommonJS를 통해 사용가능한 서버사이드한것들과 호환되지 않는다. 그리고 *require*에 비해 문법이 좀 난잡(verbose)하다.

**UMD**
AMD와 CommonJS를 모두 지원해야하는 프로젝트의경우, 아직 한가지가 남아있습니다. Universal Module Definition(UMD).

UMD는 또다른 전역변수 정의를 지원하면서 위의 두가지를 필수로하는 방법입니다. 결과적으로 UMD는 server와 client둘다 잘 동작합니다.

UMD는 아래처럼 동작합니다.

```js
;(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["myModule", "myOtherModule"], factory)
  } else if (typeof exports === "object") {
    // CommonJS
    module.exports = factory(require("myModule"), require("myOtherModule"))
  } else {
    // Browser globals (Note: root is window)
    root.returnExports = factory(root.myModule, root.myOtherModule)
  }
})(this, function (myModule, myOtherModule) {
  // Methods
  function notHelloOrGoodbye() {} // A private method
  function hello() {} // A public method because it's returned (see below)
  function goodbye() {} // A public method because it's returned (see below)

  // Exposed public methods
  return {
    hello: hello,
    goodbye: goodbye,
  }
})
```

더 많은 UMD의 형식을 보고싶다면 <a href="https://github.com/umdjs/umd" target="_blank">이 곳</a>을 참조하세요.

**Native JS**
잘 따라오고 계신가요? 아직 한가지 모듈타입이 더 남았습니다.

아마 위의 모듈타입들이 자바스크립트에 국한되지 않았다는걸 눈치챘을겁니다. 그 대신에 위의 모듈패턴들과 경쟁할 수있는 방법을 만들었습니다. 운좋게도 TC39(ECMAScript의 문법과 의미가 정의되어있는 표준)의 똑똑한 사람들이 ES6에서 내장모듈을 소개하고있습니다.

ES6는 importing과 exporting에 대해 많은 가능성을 제시합니다. 여기 몇가지 리소스가 있습니다.

<a href="http://jsmodules.io/cjs.html" target="_blank">jsmodules.io</a>
<a href="http://exploringjs.com/es6/ch_modules.html" target="_blank">exploringjs.com</a><br>

ES6에서 대단한것은 CommonJS나 AMD의 두 세상을 동시에 제공하는 방법입니다. 간단하고 선언적인 문법, 비동기적 로딩에다가 더해서 의존성관리도 더 잘해줍니다. 아마 제가 가장좋아하는 ES6의 모듈기능은 읽기전용뷰의 exports에서 살아있다는 것입니다.(CommonJS에서는 imports할때, exports를 복사하기때문에 살아있지않습니다.)

예를들면

```js
// lib/counter.js

var counter = 1

function increment() {
  counter++
}

function decrement() {
  counter--
}

module.exports = {
  counter: counter,
  increment: increment,
  decrement: decrement,
}

// src/main.js

var counter = require("../../lib/counter")

counter.increment()
console.log(counter.counter) // 1
```

이 예제에서 기본적으로 두가지 모듈의 복사가 일어납니다. 하나는 export했을때, 두번째는 require 했을때.

게다가 main.js의 복사본은 오리지널 모듈과 연결되어있지 않습니다. 이것이 counter가 여전히 1인 이유입니다.

import한 counter 변수가 카피한 counter 변수와 연결 되어 있지 않기 때문입니다. 그래서 모듈에서 counter 변수를 증가시켜도 카피버전에서는 증가하지 않는것입니다. 카피버전의 counter를 증가시키려면 다음과 같이 할수 밖에 없습니다.

```js
counter.counter++
console.log(counter.counter) // 2
```

반면 ES6에서는 살아있는(live) 읽기전용 뷰 모듈을 생성할 수 있습니다.

```js
// lib/counter.js
export let counter = 1

export function increment() {
  counter++
}

export function decrement() {
  counter--
}

// src/main.js
import * as counter from "../../counter"

console.log(counter.counter) // 1
counter.increment()
console.log(counter.counter) // 2
```

멋지지않나요? 살아있는 읽기전용 뷰는 당신의 모듈을 기능적인 손실없이 더 작은 모듈로 나눌수 있게 합니다. 그리고 그걸 합치면 문제없이 동작합니다.

---

_FreeCodeCamp 라는 커뮤니티에서 발췌한 모듈패턴에 대해서 쉽게 잘 설명해준 포스트였다. 모듈패턴은 웹에서 너무도 중요한 패턴이다. 어렴풋이 중요하다는것만 알고있었는데, 이 글을 읽으면서 왜 중요한지 명확해졌다._

---

_고등학교때 영어를 열심히 하지 않은게 후회된다. 프로그래밍 뿐만아니라 무언가 공부하는데 있어서 영어는 절대적으로 필요한 것 같다. 너무 좋은 교재나 지식들이 웹에 널려있는데 받아들이지 못할때는 정말 아쉽다._

---
