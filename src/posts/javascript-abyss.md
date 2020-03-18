---
path: "/javascript-abyss"
date: "2019-02-06"
title: "JavaScript Abyss"
tags: ["technology"]
---

자바스크립트는 왜그럴까
<!--more-->

<style>
img{ 
  display: block;
  margin : 0 auto;
}
</style>

<img src="/images/javascript-abyss/js-inventing.png" alt="js-inventing" style="width:400px;"/>

자바스크립트와 관련된 유명한 짤이다. 처음에는 별 생각없이 넘겼는데, 다시보니 왜 그럴까 궁금해졌다. 그래서 어쩌면 쓸모없어 보이는것들을 가볍게 정리하려한다. 깊이들어가면 끝도없기때문에 스스로 왜 그런지 납득할 정도로만.

### TL;DR
요약하면 [명세](http://www.ecma-international.org/ecma-262/5.1/)에 의해 그렇다. 

</br>

### ```typeof NaN; //'number'```

자바스크립트에서 ```NaN```는 연산의 결과가 정의되지않은, 혹은 표현할 수 없는 **산술연산**의 결과이다. [ECMA-262의 Number타입 정의](http://www.ecma-international.org/ecma-262/9.0/index.html#sec-terms-and-definitions-number-type)에 의해 Number 타입은 ```+infinity```, ```-infinity```, ```NaN```을 포함한다.
</br>

### ```9999999999999999; // 10000000000000000 ```

자바스크립트는 [64-bit floating point representation](https://en.wikipedia.org/wiki/IEEE_754)을 사용하기때문에 -(2<sup>53</sup> - 1)과 2<sup>53</sup> - 1 사이의 값만 안전하게 표현할 수 있다. 9999999999999999는  9007199254740991(2<sup>53</sup> - 1) 보다 크기 때문에 발생하는 오차.
</br>
### ```0.5 + 0.1 == 0.6; // true```
### ```0.2 + 0.1 == 0.3; // false```

위와 마찬가지로 64-bit floating point representation에 의해 오차가 발생한다.
0.1, 0.2, 0.3 모두 정확한 값이아닌, 근사값으로 추정되어 표현된다. 이때, 표현되는 0.3은 실제 0.3보다 약간작다. 그리고 표현되는 0.1과 0.2은 모두 실제값보다 약간크다. 따라서 ```0.1 + 0.2; // 0.30000000000000004```의 결과가 나온다 
</br>

### ```Math.max() // -Infinity```
### ```Math.min() // +Infinity```

```Math.max()```, ```Math.min()```은 각각 입력한 인수중 최대/최소를 반환하는 빌트인 함수이다. ECMA-262의 [max함수 정의](http://www.ecma-international.org/ecma-262/5.1/#sec-15.8.2.11), [min함수 정의](http://www.ecma-international.org/ecma-262/5.1/#sec-15.8.2.12) 에서 인수가없으면 각각 -Infinity, +Infinity를 반환한다.

</br>

### ```[] + [];  // ""```
### ```[] + {};  // [object + Object]```
### ```{} + [];  // 0```
### ```{} + {};  // [object Object][object Object] || NaN```

자바스크립트에서는 ```+```연산을 하기전, converting과정을 거친다.
1. 연산하려는 값이 primitive라면 그냥 반환한다. primitive가 아니라면 그 값은 객체라는뜻이다.
2. 값에 대해 ```valueOf()```를 호출한다. 이 값이 primitive라면 반환한다.
3. 값에 대해 ```toString()```을 호출한다. 이 값이 primitive라면 반환한다.
4. ```TypeError```를 던진다.

이때, 이 과정은 연산자의 종류에따라 숫자우선변환과 문자우선변환으로 나뉜다. 문자우선연산에 대해서는 3번과 2번의 순서가 바뀐다. 하지만 대부분의 built-in type의 경우가 숫자우선변환이며, ```valueOf()```를 가지고 있지않거나 ```valueOf()```가 자기자신을 반환하기때문에 primitive가 아니게되어 순자우선변환과 문자우선변환이 같은 결과를 가진다.

```[] + []```에서 ```[]```는 배열이다. 배열의 ```toString()```은 ```join()```이기 때문에 ```[] + []```는 ```""+""```가 되어 빈 문자열을 반환한다.

비슷하게 ```[] + {}```또한 ```{}```의 ```toString()```은  ```[object + Object]```이기 때문에  ```""+"[object + Object]"```를 반환한다.

반면 ```{} + []```에서 앞의 ```{}```는 배열이 아닌 빈 block으로 파싱된다. 따라서 ```+[]```가 되며, 여기서 단한연산자인 ```+```는 ```+''```에서 숫자우선변환을 일으키고 [$9.3](http://www.ecma-international.org/ecma-262/5.1/#sec-9.3)에 따라 ```0```을 반환한다. 이때 만약, ```({}) + []```라면 위와같은 과정으로 ```[object + Object]``를 반환한다.

```{} + {}```또한 위와마찬가지로 앞의 ```{}```는 빈 block이며 ```+{}```은 ```+[object + Object]```와 같고 이는 숫자우선변환에서 ```NaN```을 반환한다. 하지만 이 연산은 명령어를 처리하는 방식에 따라 자동으로```({}+{})```로 처리되어 ```[object Object][object Object]``` 가 반환되는 경우도 있다.

</br>

### ```true + true + true;  // 3```
### ```true - true;  // 0```

[$9.3](http://www.ecma-international.org/ecma-262/5.1/#sec-9.3)에 따라 ```true```는 1로 변환되어 연산이 이루어진다.

</br>

### ```true == 1; // true```
### ```true === 1; // false```
[$11.9.3](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)에서 자바스크립트의 Abstract Equality Comparison(==) 알고리즘에 대해 설명하고 있다. 이때 ```true == 1```의 경우는 6번에 해당하고 ```true```는 숫자우선변환되어 1로 바뀌어 연산된다. 따라서 ```true == 1```은 ```true```를 반환한다. 그리고 [$11.9.6](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6)에 따른 자바스크립트의 Strict Equality Comparison(===) 알고리즘 설명 1번을 보면 ```x === y```에서 ```x```와 ```y```의 타입이 다르면 ```false```이기때문에 ```true === 1```은 ```false```를 반환한다.

</br>

### ```(!+[]+[]+![]).length // 9```
```!+[]```, ```+[]```, ```+![]```로 끊어서 생각해 볼 수 있다.
1. 위에서와 마찬가지로 ```!+[]```의 ```+```는 단항연산자로 취급되고 숫자우섯변환을 일으켜 ```!0```과 같다. 그리고 ```!```는 boolean으로 변환을 일으키고, [$9.2](http://www.ecma-international.org/ecma-262/5.1/#sec-9.2)에 의해 ```0```는 ```false```가 되어```!0```는 ```true```가 된다.
2. 이어서 ```true+[]```는 같은 원리로 ```'true'```가 된다.
3. 여기에 ```![]```에서 ```[]```는 자바스크립트에서 객체이므로 [$9.2](http://www.ecma-international.org/ecma-262/5.1/#sec-9.2)에 의해 ```true```가 되어 ```![]```는 결국 ```false```이다. ```'true' + false```는 문자우선변형을 일으켜 ```truefalse```가 되어 이 문자의 ```lenth```는 ```9```이다.

</br>

### ```9 + "1" // "91"```
### ```91 - "1" // 90```
[$11.6.1](http://www.ecma-international.org/ecma-262/5.1/#sec-11.6.1)를 보면 자바스크립트에서 Addition operator(+)는 string concatenation 와 numeric addition의 역할을 모두하고, 피연산자중 하나라도 string타입이면 string concatenation이 일어난다. 따라서 ```9 + "1"```은 ```91```이다.
반면 Subtraction operator(-)는 [$11.6.2](http://www.ecma-international.org/ecma-262/5.1/#sec-11.6.1)에 의해 두 피연산자를 숫자우선변환시킨다. 따라서 ```91 - "1"```은 ```91 - 1```로 계산된다.

</br>

### ```[] == 0 // true```
[$11.9.3](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)의 9번에 의해 ```[] == 0```의 ```[]```는 primitive로 바뀌어 ```'' == 0```가 된다. 이어서 5번에 의해 ```''```는 숫자우선변환되고, [$9.3.1](http://www.ecma-international.org/ecma-262/5.1/#sec-9.3.1)에 의해 빈 string은 0이다. 따라서 ```0 == 0```이므로 ```true```이다.

</br>
-------
*참고사이트*
[http://2ality.com/2012/01/object-plus-object.html](http://2ality.com/2012/01/object-plus-object.html)
[https://stackoverflow.com/questions/9032856/what-is-the-explanation-for-these-bizarre-javascript-behaviours-mentioned-in-the](https://stackoverflow.com/questions/9032856/what-is-the-explanation-for-these-bizarre-javascript-behaviours-mentioned-in-the)
[https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839](https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839)