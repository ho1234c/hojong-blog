---
path: "/javascript-execution-context"
date: "2017-07-11"
title: "JavaScript Execution context"
tags: ["technology"]
---

자바스크립트 깊은곳의 중심에는 prototype과 Execution context가 있다. 이 포스트는 Execution context에 대해 요약한다.

## What is Execution context?

자바스크립트는 스크립트언어이기 때문에 라인별로 코드를 실행한다. 하지만 브라우저에서 자바스크립트가 실행되는 환경은 싱글스레드이기 때문에 한번에 한가지 일밖에 처리할 수 없다. 따라서 자바스크립트는 interpreting이 진행되기 전에 콜스택을 만든다. 그리고 콜스택에 쌓이 함수들은 **어떤 환경에서 실행할 것인가**에 대한 정보가 필요하다. 이 정보를 담고있는 객체를 Execution context, 줄여서 EC라 부르고 불려진 EC 들의 Collection을 EC stack이라고 한다. EC는 함수를 호출할 때 새롭게 생성되고 **return될 때 파괴된다.** 브라우저는 EC stack의 최상단부터 실행하고 끝나면 stack에서 pop시킨다. 또한 EC stack의 최하단에는 항상 Global EC가 있고 브라우저(혹은 탭)가 종료될 때까지 유지된다.

![ec](../images/javascript-inside/ec.png)

## Execution context의 구조

Execution context는 세가지로 구성된다.

#### Activation / Variable Object

EC에서 사용 될 **변수, 매개변수와 arguments, 함수**를 저장한다. (Literal로 선언된 함수는 제외)

#### Scope Chain

EC를 차례로 중첩해서 가지고 있는 Collection. **현재의 Variable Object + 상위 EC의 Scope chain**이다. 이 프로퍼티로 인해 지역변수가 아닌 변수를 찾을 때 스코프 체이닝이 가능하다.

#### this Binding

현재 Context가 참조하고 있는 객체. 객체 속의 함수(메소드)일때와 this를 직접 지정해주는 형식으로 함수를 호출 했을 때를 제외하곤 항상 **전역객체**(브라우저에선 window객체, Nodejs에선 global객체)를 가르킨다.

![ec-structure](../images/javascript-inside/ec-structure.png)

## 코드의 실행

자바스크립트에서 context에는 Global, Function, Eval의 세가지가 있다. 일반적으로 실행가능한 코드는 Global context와 Function context에서 실행 된다.

#### Global object의 생성

모든 EC가 실행 되기 전에 앞서 Global object가 만들어진다. Global object에는 `Math, String, Object...`등의 객체들이 포함되며 어디에서나 접근가능하다.

#### Creation stage (Global context)

- **Initialize Scope chain**
  Scope chain을 생성하고 초기화 한다. 이때 현재의 Variable object가 최상위에 들어가고 상위 함수의 Scope chain이 차례로 중첩된다. Global context에서는 Global object를 참조한다.
- **Create Variable object**
  Variable object가 현재 Context에 선언된 변수와 함수로 채워진다. (변수의 값이 초기화되는 것이 아니라 undefined로 set됨) 함수 표현식은 set에서 제외되며 선언된 함수들은 현재 Context의 Scope chain이 참조하는 객체가 내부적으로 `[[Scope]]` 프로퍼티에 할당된다. Global context에서는 Global object가 Variable object가 된다.
  > 변수에 실제 값을 주기 전에 우선 메모리를 할당하는것이 `Hoisting`이 일어나는 이유가된다.
- **Determine `this`**
  이 Context에서this에 어떤 객체를 할당 할지 결정한다. 특별한 경우가아니라면 Global object가 할당된다.

![code-start](../images/javascript-inside/code-start.png)

#### Activation / Execution Stage (Global context)

실행되어야 할 코드를 해석하고 실행한다. 변수가 실제로 할당되며 이때, 다시 함수가 실행되면 새로운 EC가 형성된다.

#### Creation stage (Function context)

- **Initialize Scope chain**
  Global context와 마찬가지로 Scope를 생성하고 초기화 한다. Activation Object의 레퍼런스가 최상위에 들어가고 하위에 이 함수를 부른 Context의 Scope chain이 삽입된다.
- **Create Activation object**
  Activation Object가 현재 Context에 선언된 변수와 함수로 채워진다. 이때 Global context에선 존재하지 않았던 함수의 매개변수와 [arguments 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/arguments)도 포함된다. 마찬가지로 함수 표현식은 제외되며 현재 Context의 Scope chain이 참조하는 객체가 내부적으로 `[[Scope]]` 프로퍼티에 할당된다.
- **Determine `this`**
  Function context의 경우, 호출한 객체로부터 this가 결정된다. 이 함수를 호출한 caller가 객체가 아니라면 Global object가 된다.

![code-start-function](../images/javascript-inside/code-start-function.png)

#### Activation / Execution Stage (Function context)

실행해야할 코드를 해석하고 실행한다. 변수를 할당하고 만약 변수를 찾을 수 없다면 Scope chain을 통해 찾는다.

---

[http://poiemaweb.com/js-execution-context](http://poiemaweb.com/js-execution-context)  
[http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)  
[https://medium.com/dailyjs/javascript-basics-the-execution-context-and-the-lexical-environment-3505d4fe1be2](https://medium.com/dailyjs/javascript-basics-the-execution-context-and-the-lexical-environment-3505d4fe1be2)  
[http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)  
[http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)
