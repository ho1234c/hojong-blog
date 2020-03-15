---
path: "/web-design-pattern"
date: "2016-08-25"
title: "Design Pattern - MV*"
---


Web개발에 있어서 자주사용되는 디자인 패턴

<!-- more --> 
<style>
img{ margin: 0 auto; display: block;}
</style>

어쩌면 디자인 패턴은 경험과 실력이 쌓인 아키텍처 단계의, 한 프로젝트를 책임지는 위치의 사람들에게 필요한 이론일 수도 있다. 디자인 패턴을 고려해야할 규모의 프로젝트라면 적어도 심심풀이로 진행할 정도의 규모는 아닐것이기 때문이다. 하지만 작은 모듈하나라도 이 모듈이 사용되는 위치를 알고 만드는것과 그렇지 않은 것에는 큰 차이가 있을 것이기 때문에 디자인 패턴은 개발자가 필수적으로 알아야할 이론적 바탕이다.

그림에 비유하면 붓질 한번이 한줄에 코드라면 디자인 패턴은 오브제들의 구도 이다. 섬세한 붓질이 있어도 좋은 구도가 없이는 그림이 좋은 느낌을 낼 수 없는 것 처럼 개발에 있어서 디자인 패턴은 큰 그림을 그리는데 중요한 이론이다. 아마 적절한 디자인 패턴을 적용하지 않은 프로젝트는 스파게티 코드가 남발하는 프로젝트가 되어버릴것이다.

소프트웨어 설계에는 여러가지 디자인 패턴이 있지만 웹개발에 있어서 가장 유명하고 많이 사용되는 패턴은 MVC이다. 여기서는 오픈소스인 <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp" target="_blank">Javscript design patterns</a>를 참고해서 MVC에 대해 정리한다.


MVC (Model - View - Controller)
------

### Model

Model은 어플리케이션의 데이터를 담당하는 부분이다. 유저의 화면이나 인터페이스에 관여하지 않지만 그 자체적으로 form을 가지고 있고 이는 데이터의 틀이다.
책에서는 Javascript photo gallery 어플리케이션이 있다고 할 때, 이미지의 소스나 캡션, 메타데이터따위의 속성을 가진것을 예로 든다.
여기서 실제 이미지 데이터는 Model의 instance에 저장될 것이다.

### View

View는 현재의 어떤 상태가 반영되어 유저에게 직접 표현되는 부분이다. 계속해서 Javascript photo gallery를 예로 든다면 유저가 사진의 메타데이터 따위를
'edit'뷰에서 수정해서 Model이 바뀔 수 있는 부분을 말한다. (직접적으로 Model을 변경하는 일은 컨트롤러가 수행한다.)

### Controller

Controller는 View와 Model사이를 연결해준다. photo gallery에서 Controller는 유저가 편집을 끝낸 사진을 업데이트하는 역할을 수행한다. View가 Controller의
역할 까지 하는 경우가 있는데, 이는 변형된 패턴이다.

![1](/images/2016-08-25-web-design-pattern/1.png)

### Strong point

- 업데이트와 유지보수가 쉽다.
    역할이 나뉘어 있기 때문에 원하는 부분만 수정할 수 있고 로직의 테스트가 쉽다.
- 로직의 분리로 분업이 쉽다.
    인터페이스 부분과 비지니스부분의 분리로 분업화가 명확하다.

### Derivative

1. MVP(Model - View & Presenter)
    MVP는 Presentation 로직에 집중한 패턴으로, 유저의 액션을 View 대신에 Presenter가 받아서 넘겨준다. 이로서 view는 완전히 수동적이게 된다.(책에서는 "dumb"라고 표현한다)
    이것의 장점은 View와 Model간의 의존성을 느슨하게 할 수 있다는 점이다. 대규모 프로젝트에서의 복잡한 로직을 모두 Presenter로 묶어서 유지 보수를 쉽게 할수 있는 장점이 있다.<br><br>
2. MVVM(Model - View - ViewModel)
    MVVM에서 View와 ViewModel은 데이터바인딩과 이벤트로 연결되어있다. ViewModel은 data converter로서 Controller의 기능을 대신해서 View의 변화를 Model로 전달해준다. 또한 View는 ViewModel의 정보를 보고있다가 유저의 액션이 발생하면 액션을 통해 바뀐 ViewModel의 상태로 업데이트된다. 간단한 UI에서는 ViewModel을 구축하는 것이 필요없을 수 있다. 하지만 대규모프로젝트에서는 UI와 비지니스로직의 분리를 통해 병렬적 개발을 할 수 있고 추상적인 View를 통해 비지니스로직의 양을 줄일 수 있다는 장점이 있다.

MVP와 MVVM은 MVC에서 파생된 패턴들이다. MVC에서 View는 Controller와 함께 동작하는데 View가 Model에 직접 접근 할 수 있다. 따라서 어플리케이션이 복잡해지면 보안문제가 발생할 수 있다. MVP에서는 Presenter가 Controller의 역할을 대신한다. View와 Model사이에서 이벤트를 감지해서 둘을 중재한다. 반면 MVVM은 ViewModel이 View와 Model 사이에 끼어서 둘 사이의 직접적 접근을 막는다. Presenter와 다르게 ViewModel은 View를 참조하지 않는다. 이로서 보안이슈는 줄어들지만 View가 Model의 데이터를 가져다 쓰는데 드는 비용이 커지게 되면 직접 접근하는 MVC에 비해서 퍼포먼스 이슈가 발생할 수 있다.