---
path: "/sequelize"
date: "2016-08-31"
title: "Sequelize 시작하기"
tags: ["technology"]
---

Nodejs라고 하면 MongoDB로 대표되는 NoSQL을 떠올리기 마련이다. 하지만 대규모 요청로 인한 성능이 저하되는 문제를 겪는 경우가 아니면 굳이 익숙하지 않은 NoSQL을 사용할 필요가 없다. Nodejs에서도 당연히 RDB가 필요한 경우가 많다. 이때 쿼리를 직접 코드에 사용할 수도 있지만 여러가지 불편한 점이 많기 ORM(Object Relational Mapping)을 사용하면 편리하다.

처음 배울 때부터 DB에 접근하려면 당연히 SQL 질의문을 사용해야한다는 것에 익숙하다보니 ORM이 뭔지 잘 이해하지 못했다. ORM의 뜻을 정확하게 이해하는 것이 왜 편한지를 이해하는데 도움이 많이 되는것 같다.

>Object-relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data between incompatible type systems in object-oriented programming languages. This creates, in effect, a "virtual object database" that can be used from within the programming language. There are both free and commercial packages available that perform object-relational mapping, although some programmers opt to construct their own ORM tools.

위키피디아에선 위와같이 정의하고 있는데, 쉽게 말해서 ORM은 OOP와 RDB사이를 중재해주는 역할이다. class로 대표되는 OOP의 구조와 table간의 관계를 매핑시켜주는 것이다. ORM이 내가 사용하는 언어를 쿼리로 번역해 주기 때문에 쿼리문을 한줄도 쓰지 않아도 데이터베이스에 접근 할 수 있다.

Nodejs에는 sequelize, bookshelf, node-orm등 여러 ORM이 있다. 그중 가장 메이저한 것은 Sequelize이다. 공식문서가 상당히 잘되어있지만 포스팅해 놓는것이 여러모로 도움이 될것 같아서 Sequelize의 사용법을 간단하게 옮긴다.


## Feature

Sequelize는 공식적으로 PostgreSQL, MySQL, MariaDB, SQLite and MSSQL를 지원하는 promise기반의 ORM이다.

- Schema definition
- Schema synchronization/dropping
- 1:1, 1:M & N:M Associations
- Through models
- Promises
- Hooks/callbacks/lifecycle events
- Prefetching/association including
- Transactions
- Migrations
- CLI (sequelize-cli)

## Install

sequelize는 DB를 내장하고 있지 않기 때문에 사용하고자하는 DB도 따로 설치해 주어야한다. 여기서는 postgreSQL을 사용한다.

```sh
npm install pg sequelize
```

## Connect

```js
var sequelize = new Sequelize(
    'database', // 데이터베이스 이름
    'username', // 유저네임
    'password', // 유저 패스워드
    {
    host: 'localhost',      // 호스트
    dialect: 'postgres',    // DB종류
    pool: {                 // connection pool
            max: 5,
            min: 0,
            idle: 10000
          },
    }
);
```

혹은 url로 접속하는 shortcut도 제공한다.

```js
var sequelize = new Sequelize('postgres://username:password@host.com:5432/dbname');
```


## Define model

```js
sequelize.define('name', {attributes}, {options})
```

의 형태로 semantic하게 선언할 수 있다.


```js
sequelize.define("User", {
            user_id: {
                type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
            },
            user_email: {
                type: DataTypes.STRING(32), allowNull: false
            }
        },
        {
            tableName: 'users',
            freezeTableName: true,
            underscored: true,
            timestamps: false       // default is true
        })
```

추가로, options에는 hook과 custom method를 정의 할 수 있다.

```js
sequelize.define(...

...
    {
        hooks: {
            beforeCreate: function(user, options, fn) {
              console.log('beforeCreate')
              fn(null, user)
            },
            beforeUpdate: function(user, options, fn) {
              console.log('beforeUpdate')
              fn(null, user)
            }
        }
    }
)
```
위와 같이 사용할 경우 모델이 만들어지기 전에 beforeCreate가 실행되고 모델이 업데이트 되기 전에 beforeUpdate가 실행된다.

```js
sequelize.define(...

...
    {
        classMethods: {
            method1: function(){ return this.user_id }
          },
        instanceMethods: {
            method2: function() { return this.user_email }
        }
    }
)
```

또한 custom method를 정의해서 사용 할 수 있다. class method와 instance method의 호출시점은 자바의 그것과 비슷하다.

이 메소드들 안에서는 this를 통해 멤버변수에 접근 할 수 있는데, es6환경이라면 주의해야한다.

> sequelize를 es6환경에서 사용하기 위해서 babel로 컴파일 한다면 custom method을 arrow function 문법을 통해 정의 할때 this를 사용할 수 없다. 전역scope에 정의 된 메소드 속의 this의 경우 window객체와 같기 때문에 babel은 메소드속의 this는 할당 되지 않았다고 판단하고 undefined로 컴파일해버린다. (여기서는 sequelize 3.24, babel 6.14 를 사용했다.)

**더 많은 attribute에 대해서는
<a href="http://docs.sequelizejs.com/en/latest/docs/models-definition" target="_blank">공식도큐먼트</a>에서 확인할 수 있다.**



## Promise

sequelize는 소개했다시피 Promise기반의 ORM이다. Promise를 통해 async한 흐름을 제어한다. 데이터를 다 가져왔음을 보장할 수 없기 때문에 Promise객체를 통해 비동기적인 방법을 사용해야 한다.


```js

user = User.findOne()

console.log(user.get('firstName'));

```

공식 도큐먼트에서는 **위와 같은 방법을 사용하면 안된다**고 나와있다. 대신,

```js
User.findOne().then(function (user) {
    console.log(user.get('firstName'));
});
```

위와 같은 방법으로 호출되어야 한다. sequelize는 bluebird기반의 promise를 사용한다. promise의사용법에 대해서는
<a href="http://bluebirdjs.com/docs/api-reference.html" target="_black">bluebird API reference</a>에 나와있다.


## Relations/Associations

```js
User.hasOne(Song)
Song.belongTo(User)
```

- Source.hasOne(target, [options])
    소스와 타겟간에 관계를 정의해준다. forienkey는 타겟에 만들어진다.
- Source.belongsTo(target, [options])
    소스와 타겟간에 관계를 정의해준다. forienkey는 소스에 만들어진다.
- Source.hasMany(target, [options])
    1:m 혹은 n:m 관계를 정의한다. join되는 테이블의 이름은 "source + target"이 default지만 through 옵션을 통해 지정해 줄 수도 있다.
- Source.belongsToMany(target, [options])
    hasMany와 마찬가지로 1:m 혹은 n:m 관계를 정의한다.

관계를 통해서 source와 target을 inject시키면 관련 method를 사용 할 수 있게 되는데 get[target]의 형태로 호출 할 수 있다.

```js
User.hasMany(Song)

var mySongList = User.getSong()  // gets you all song
```

## Usage

레코드의 조회를 위해서 find 를 사용한다.

- Source.findOne(...)
    조건에 일치하는 엘리먼트 하나를 반환한다.

```js
User.findOne({ where : { email : 'ho1234c@gmail.com' } })
    .then(
        ...
    )
```

- Source.findAll(...)
    조건에 일치하는 엘리먼트 모두를 반환한다.

```js
User.findAll({ where : { sex : 'male' } })
    .then(
        ...
    )
```
- 자주 사용되는 find 옵션

```js
User.findAll({
            where: { key: value },
            attributes: [ ...얻고자하는 attribute ],
            offset: count, // 어디서부터
            limit: 10,  // 몇개
            include: { model: 다른 모델, where: { key: value }, attributes: [...] } // associate된 다른 모델을 포함시킴
```

> sequelize는 promise객체로 DAO를 반환한다. 하지만 raw한 데이터만 받고 싶은경우, {..., raw : true} 옵션을 사용할 수 있다.

find말고도 update나 destroy 메소드도 사용 할 수 있다.