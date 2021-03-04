---
path: "/javascript-modules-part-2"
date: "2016-08-06"
title: "JavaScript Modules Part2 A Beginner’s Guide"
tags: ["technology", "translation"]
---

JavaScript Modules Part2 A Beginner’s Guide

<!--more-->

**FreeCodeCamp에 기재된 <a href="https://medium.freecodecamp.com/javascript-modules-part-2-module-bundling-5020383cf306#.kthd3yfad" target="_blank"> Preethi Kasireddy의 포스트</a>를 번역한 글입니다. 이해한대로 의역했기 때문에 오역 및 빠뜨리는 부분이 있을 수 있습니다.**

이 포스트의 Part1에서는 모듈이 뭔지, 왜 사용해야 하는지, 어떻게 만드는지에 대해 이야기 했습니다. 두번째 파트에서는 "bundle" 모듈의 의미, 왜 사용해야 하는가, 다른방법과의 차이, 웹개발에서 모듈의 미래에 대해 다룰겁니다.

### 모듈 번들링이란?

높은 수준에서 모듈번들링이란 간단히 말해서 모듈 그룹을 올바른 순서로 (의존성과 함께) 하나의 파일(또는 파일그룹)로 묶는겁니다. 언제나 처럼 간단하지만 자세히 보면 어려울겁니다.

### 왜 모듈을 번들링해야하는가?

프로그램을 모듈별로 나눌때 보통 모듈들을 다른 파일이나 폴더로 구성합니다. Underscore나 React같은 라이브러리 사용을 위해 모듈 그룹이 생길 수 있습니다.

결과적으로 각각의 파일은 메인 HTML파일의 script 태그 속에 포함되서, 유저가 사이트에 방문했을 때 로드되어야 합니다. 그 말은 script태그를 여러개로 나누는건 파일들을 하나씩 로드해야된다는걸 의미하고, 페이지 접근시간에 좋지 않습니다.

이 문제를 해결하기 위해서 모든 파일을 하나의 큰 파일로(때에따라서 두개로) bundle 혹은 concatenate해서 request의 수를 줄입니다. 개발자들이 build step이나 build process에 대해 이야기 하는걸 들어본적이 있다면 아마 이걸 이야기하고 있었을 겁니다.

속도를 향상시키기 위한 또 다른 방법으로는 번들코드를 minify하는 겁니다. minification이란 코드의 기능적변화 없이 소스코드의 불필요한 부분(공백, 주석, 개행문자등)을 없애서 전체 컨텐츠의 크기를 줄이는걸 말합니다.

적은 데이터는 곧, 브라우저가 파일을 다운로드하는 프로세싱시간이 적다는 이야기입니다. underscore-min.js처럼 파일이름중에 "min"이 붙은 파일을 본적이 있다면 아마 그 파일은 풀버전과는 다르게 아주 작은(읽을 수 없게한) minifyed된 버전일겁니다.

Gulp나 Grunt같은 task runner는 사람이 읽을 수 있는 버전과 시스템 최적화된 번들버전으로 concatenation, minification해줍니다.

### 모듈을 번들하기 위한 다른방법으로는?

한가지 방법으로 표준화된 모듈패턴(이전 포스트에서 다룸)에서 concatenating 되고 minifying된 파일은 잘 동작할 겁니다. 자바스크립트 코드들을 같이 뭉쳐주기만 하면 됩니다.

만약 CommonJS나 AMD처럼 브라우저가 해석할 수 없는 *non-native*한 모듈을 붙인다면, 모듈을 브라우저에 친숙하게 만드는 도구를 사용해야합니다. 말하자면 Browerify, RequireJS, Webpack 또는 다른 모듈번들러나 모듈로더입니다.

모듈번들러는 모듈 번들링이나 로딩 외에도 코드가 바뀌거나 디버깅을 위해 소스맵을 실행했을 때 auto-recompiling해주는 기능도 제공합니다. 일반적인 모듈 번들링 메소드에 대해서 살펴봅니다.

### CommonJS의 번들링

Part1에서 봤던 것 처럼 CommonJS는 브라우저에 친숙하지 않은 걸 제외하고는 잘 동작합니다. 저는 이걸 위해 Browserify라는 모듈번들러를 소개합니다. Browserify는 브라우저를 위한 CommonJS 모듈을 컴파일해줍니다.

예를들어서 이 main.js파일에 숫자들의 평균을 계산하는 모듈을 import했다고 가정해봅시다.

```js
var myDependency = require(‘myDependency’);

var myGrades = [93, 95, 88, 0, 91];

var myAverageGrade = myDependency.average(myGrades);
```

이 경우에 한가지 의존성이 있습니다.(myDependency) 아래 커맨드로 Browserify는 main.js를 실행하는데 필요한 모든 모듈을 재귀적으로 bundle.js하나에 번들해줍니다.

```sh
browserify main.js -o bundle.js
```

Browserify는 해당 프로젝트의 의존성을 파악하기 위해서 파싱된 <a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree" target="_blank">AST</a>를 돌아다닙니다.
의존성의 구조를 파악하고 나면 올바른 순서의 하나의 파일로 번들해줍니다. 중요한 사실은 모든 소스코드들이 하나의 script태그, 즉 한번의 HTTP request만으로
다운로드 된다는 겁니다.

마찬가지로 다수 파일에 여러 의존성이 있더라도 전체 파일을 Browserify에게 알려주기만 하면 마법이 펼쳐집니다. 최종적으로 Minify-JS같은 minify를 해야 할 파일이 준비됩니다.

### AMD의 번들링

AMD를 사용한다면 RequireJS나 Curl 같은 AMD 로더를 사용하는게 좋습니다. 모듈 로더는(번들러와 비교했을 때) 프로그램이 실행 될 때 동적으로 모듈을 로드한다는 차이가 있습니다.

기억해보면 AMD와 CommonJS의 차이중 하나는 비동기적으로 모듈을 로딩한다는 것이었습니다. 사실 AMD를 사용한다면 비동기적으로 모듈리 로딩되기 때문에 언제 모듈을 하나의 파일로 번들할건지 단계를 구축(build step)할 필요가 없습니다. 이건 페이지에 방문했을 때 모든 파일들을 다운로드하는 대신에 정확히 하나의 파일만이 필요하다는 것을 의미합니다.

하지만 현실적으론 모든 유저들의 대용량 request에 대한 오버헤드가 프로덕트에서 더 좋은 경험을 만들지는 않습니다. 그래도 여전히 대부분의 웹개발자들은 추가적인 퍼포먼스를 위해
RequireJS나 r.js같은 도구를 이용해서 AMD 모듈을 번들하고 minify 합니다.

전체적으로, 번들링에 있어서 AMD와 CommonJS의 차이는 AMD는 단계를 구축(build step)하는데서 자유롭다는 것입니다. 적어도 코드를 실시간으로 push하기 전에는 r.js과 같은 point optimizers가 코드를 핸들링 할 수 있습니다.

CommonsJS vs AMD에 관심이 있다면 <a href="http://tomdale.net/2012/01/amd-is-not-the-answer/" target="_blank">Tom Dale's blog</a>를 읽어보세요:)

### Webpack

지금까지 번들러처럼 webpack은 이 분야의 뉴페이스입니다. webpack은 CommonJS, AMD, ES6등 모듈시스템에 관계없이 사용할 수 있도록 디자인 되어있습니다. 이미 Browerify나 RequireJS처럼 훌륭한 도구들이 있는데 왜 webpack을 사용해야 하는지 궁금할 수 도 있습니다. webpack은 코드베이스를 필요에 따라 로드된 chunk로 나누는 기능인 code splitting같은 유용한 기능들을 제공합니다. 예를들어 특정 상황에만 필요한 코드블럭을 가진 웹앱의 경우 전체 코드베이스를 하나의 거대한 번들링된 파일에 넣는 것은 효율적이지 못합니다. 이경우에 코드를 번들된 필요에 따라 로드할 수 있는 chunk로 나눠서, 대부분의 경우에 중요한 부분만 로드할 수 있도록하면 큰 선행 페이로드를 피할 수 있습니다.

code splitting은 webpack이 지원하는 강력한 기능중 하나일 뿐이고 웹상에는 webpack와 browserify를 두고 의견들이 많습니다. 아래 링크는 제가 이 이슈에 대해 논의하는걸 찾은 곳입니다.

<a href="https://gist.github.com/substack/68f8d502be42d5cd4942" target="_blank">https://gist.github.com/substack/68f8d502be42d5cd4942</a>
<a href="http://mattdesl.svbtle.com/browserify-vs-webpack" target="_blank">http://mattdesl.svbtle.com/browserify-vs-webpack</a>
<a href="http://blog.namangoel.com/browserify-vs-webpack-js-drama" target="_blank">http://blog.namangoel.com/browserify-vs-webpack-js-drama</a>

### ES6 모듈

다음은 ES6의 모듈이기 때문에 몇가지 방법으로 필요한 번들러를 줄일 수 있습니다.(이 뜻이 무엇인지 바로 볼수 있습니다.)
우선, ES6에서 모듈을 어떻게 로드하는지 이해해야 합니다. 현재 JS모듈 형식(CommonJS, AMD)와 ES6 모듈의 가장 중요한 차이점은 ES6의 모듈은 static analysis라는 점입니다. 이것은 모듈을 import하는 것이 스크립트가 실행되기 전인 컴파일타임에 이루어진다는것을 의미합니다. 이 말은 프로그램이 실행 되기전에 다른 모듈로부터 사용되지 않는 exports를 지우는것이 가능하다는 것입니다. 사용되지않는 exports를 지우는 것은 분명히 용량을 줄이고 브라우저의 스트레스를 줄일 수 있습니다.

한가지 드는 의문은, UglifyJS 같은 툴로 코드를 minify하는 것과 죽은 코드를 지우는것(dead code elimination)이 무엇이 다른가? 입니다. 답은 의존적입니다. (NOTE: 죽은 코드를 지운다(dead code elimination)는 것은 사용하지 않는 변수와 코드를 지우는 겁니다. 번들링된후의 프로그램이 사용하지 않는 것을 지우는것으로 생각하면 됩니다.)

죽은 코드를 지우는것(dead code elimination)이 가끔은 UglifyJS와 ES6사이에서 정확히 같은 일을 수행 할수도 있고 아닐 수 도 있습니다. <a href="https://github.com/rollup/rollup" target="_blank">Rollup’s wiki</a>를 보시면 됩니다.

ES6 모듈의 차이를 만드는 것은 죽은 코드 제거(dead code elimination)에 tree shaking이라는 다른 접근법을 사용하기 때문입니다. tree shaking은 죽은 코드 제거(dead code elimination)에 반대입니다. 번들이 필요하지 않은 코드를 제거하는 것이아니라, 번들이 필요한 프로그램만 포함시킵니다. 예제를 보세요:

다음과 같은 기능을 가진 utils.js가 있다고 가정하고 이를 ES6문법으로 export하기 위해선 아래와 같습니다.

```js
export function each(collection, iterator) {
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

export function filter(collection, test) {
  var filtered = []
  each(collection, function (item) {
    if (test(item)) {
      filtered.push(item)
    }
  })
  return filtered
}

export function map(collection, iterator) {
  var mapped = []
  each(collection, function (value, key, collection) {
    mapped.push(iterator(value))
  })
  return mapped
}

export function reduce(collection, iterator, accumulator) {
  var startingValueMissing = accumulator === undefined

  each(collection, function (item) {
    if (startingValueMissing) {
      accumulator = item
      startingValueMissing = false
    } else {
      accumulator = iterator(accumulator, item)
    }
  })

  return accumulator
}
```

다음으로 우리의 프로그램에서 어떤 기능이 필요한지 모른다고 해봅시다. 그러면 다음처럼 main.js의 모든 모듈을 import 할겁니다:

```js
import * as Utils from ‘./utils.js’;
```

그리고 나중에 이처럼 함수들을 사용할겁니다.

```js
import * as Utils from ‘./utils.js’;

Utils.each([1, 2, 3], function(x) { console.log(x) });
```

모듈이 로드 된 후에 main.js파일의 tree shaken버전은 다음과 같을겁니다.

```js
function each(collection, iterator) {
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

each([1, 2, 3], function (x) {
  console.log(x)
})
```

우리가 사용한 each만 exports했다는 것을 주의깊게 봐야합니다.

만약 filter함수를 each함수 대신 사용하기로 했다면 다음처럼 하면 됩니다.

```js
import * as Utils from ‘./utils.js’;

Utils.filter([1, 2, 3], function(x) { return x === 2 });
```

tree shaken버전에서는 이렇게 보여질 겁니다.

```js
function each(collection, iterator) {
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

function filter(collection, test) {
  var filtered = []
  each(collection, function (item) {
    if (test(item)) {
      filtered.push(item)
    }
  })
  return filtered
}

filter([1, 2, 3], function (x) {
  return x === 2
})
```

each와 filter가 둘다 포함되었다는 것을 주의깊에 봐야합니다. filter가 each를 사용해서 구현되어있기 때문에 두가지 모듈을 export해야 합니다.

tree shaking을 좀더 잘 알기 위해서는 <a href="http://rollupjs.org/" target="_blank">http://rollupjs.org/</a>를 참고해 보세요.

### ES6 모듈 빌딩

좋습니다. 우리는 ES6의 모듈이 다른 모듈 형식과 다르게 로드된다는 것을 알고 있습니다. 하지만 아직 ES6모듈을 사용할 때의 단계 구축(build step)에 대해 이야기 하지 않았습니다.

불행히도 브라우저가 ES6 모듈을 로드하는 것이 아직 구현되어 있지 않기 때문에 아직 할일이 남았습니다. 아래는 브라우저에서 ES6모듈을 building/converting 하기 위한 두가지 방법입니다. 첫번쨰 방법이 더욱 일반적입니다.

1. 트랜스파일러(Babel 이나 Traceur)를 사용해서 ES6코드를 ES5코드로 변환해서 CommonJS, AMD, UMD중 하나를 사용합니다.
   그리고 Browerify나 Webpack같은 모듈번들러를 통해서 하나이상의 번들파일을 만들어줍니다.
2. <a href="http://rollupjs.org/" target="_blank">Rollup.js</a>를 사용하는것은 번들링전에 ES6코드와 의존성을 정적으로 분석하는것 외에는 첫번째 방법과 유사합니다. 이는 번들에 포함되는 것을 최소화하기 위해 tree shaking을 사용 합니다. 결국 Rollup.js를 사용하는것의 가장 큰 장점은 tree shaking을 통해서 번들을 최소화 해주는겁니다.
   주의해야 할 점은 Rollup은 코드를 번들하기 위한 ES6, CommonJS, AMD, UMD, IIFE같은 형식을 지원한다는 것입니다. 만약 AMD, CommonJS, ES6를 번들하기로 정했는데 IIFE, UMD가 그대로 브라우저에서 작동한다면 브라우저가 이해할 수 있는 방법으로 바꾸는 다른 메소드를 찾아야 합니다.(Browserify, Webpack, RequireJS 등등)

### Jumping through hoops

웹개발자로서 우리는 Jumping through hoops를 해야만 합니다. ES6모듈을 특정 브라우저가 해석할 수 있게 바꾸는 것은 항상 쉽지만은 않습니다.

언제 오버헤드 없이 ES6모듈이 브라우저에서 실행될 수 있을 까요?

고맙게도 답은 "조만간"입니다.

ECMAScript는 현재 <a href="https://github.com/ModuleLoader/es6-module-loader/" target="_blank">ECMAScript6 module loader API</a> 라고하는 해답을 위한 설명서를 가지고 있습니다. 간단히 말해서 프로그램입니다. Promise-based API는 동적으로 모듈을 로드하고 이후에 새로운 모듈을 다시 불러오지 않기 위해 그걸 캐싱해놓습니다.

이렇게 생겼습니다.

```js
export class myModule {
  constructor() {
    console.log("Hello, I am a module")
  }

  hello() {
    console.log("hello!")
  }

  goodbye() {
    console.log("goodbye!")
  }
}
```

```js
System.import(‘myModule’).then(function(myModule) {
  new myModule.hello();
});

// ‘Hello!, I am a module!’
```

script태그 속에 "type=module"을 정의해 줄 수 있습니다.

```js
<script type="module">
  // loads the 'myModule' export from 'mymodule.js' import {hello} from
  'mymodule'; new Hello(); // 'Hello, I am a module!'
</script>
```

아직 <a href="https://github.com/ModuleLoader/es6-module-loader/" target="_blank">module loader API Polyfill의 repo</a>를 꼭 읽어보시기를 권장합니다.

추가적으로 테스트해보고 싶으시다면 ES6 Module Loader polyfill의 상단에 있는 <a href="https://github.com/systemjs/systemjs" target="_blank">System.js</a>를 check out하세요.
System.js는 브라우저와 Node에서 다양한 형식의 모듈(ES6 modules, AMD, CommonJS, global scripts)을 동적으로 로드해줍니다. 그리고 이전에 로드된 모듈을 다시 로드하지 않기 위해 module registry가 로드된 모듈을 관리합니다. 어떤 모듈형식이라도 로드해주고 ES6 모듈을 트랜스파일 해주는 것은 말할 필요도 없습니다!

### ES6에 모듈기능이 있는데도 번들러가 필요한가?

ES6의 인기가 증가하면서 다음과 같은 몇가지 흥미로운 결과를 가져왔습니다.

**HTTP/2가 모듈번들러를 필요 없게 만들것인가?**<br>
HTTP/1에서는 TCP 커넥션 하나에 하나의 request만이 가능했습니다. 이것은 여러 리소스를 위해서 여러 request가 필요한 이유입니다. HTTP/2에서는 모든것이 바뀌엇습니다. HTTP/2는 완벽히 다중화 되어있습니다. 이건 여러 request와 response가 병행될수 있다는 뜻입니다. 결과적으로 우리는 하나의 커넥션에서 동시에 여러가지 request를 처리할수 있습니다.

HTTP request의 코스트가 현저히 낮아지면서 모듈을 로딩하는것은 장기적으로 큰 퍼포먼스 이슈가 되지 않습니다. 몇몇은 더이상 모듈 번들링이 의미가 없다고 이야기합니다. 이건 확실히 가능하지만 상황에 따라 다릅니다.

사용하지 않는 exports를 지우는것 같은 모듈번들링의 이점이 HTTP/2에는 해당되지 않습니다. 작은 퍼포먼스문제들이 있는 웹사이트의 경우 장기적으로 봤을 때 번들링이 이득이 있을지 모릅니다. 이는 퍼포먼스에 대한 니즈가 크지 않다면 build step을 스킵하는 것이 시간이 절약된다는 말입니다.

대부분의 웹사이트가 HTTP/2를 지원하려면 멀었습니다. 저는 이 build process가 가까운 시일 동안은 계속 있을거라고 생각합니다.

PS. HTTP/2의 다른 차이가 궁금하다면 <a href="https://http2.github.io/faq/#what-are-the-key-differences-to-http1x" target="_blank">이곳</a>을 읽어보세요.

**CommonJS, AMD, UMD가 필요없게 될것인가?**<br>
모듈이 기본 내장으로 ES6에 들어가 있으니, 다른 non-native한 모듈형식은 모두 필요없게 될까요?

글쎄요. 모듈을 import 하고 export하는 메소드의 표준화는 웹개발에 있어서 큰 수혜입니다. 과연 ES6모듈이 표준화 되는 시점에 도달하려면 얼마나 걸릴까요?

기회는 있습니다.:)

더해서 "고르는것"을 좋아하는 많은 사람들이 있기 때문에 "오직 하나의 접근"은 현실화 될수 없을지 모릅니다.

### 결론

저는 이 두 포스트로 모듈과 모듈번들링에 대한 몇가지 어려운 용어들이 말끔하게 정리 되었길 바랍니다.
위의 용어중에 헷갈리는게 있다면 Part1을 참고하세요.

코멘트와 질문은 언제나 환영합니다~

Happy bundling :)
