---
path: "/docker-nodejs"
date: "2017-01-31"
title: "Docker로 Nodejs서버 배포하기"
tags: ["technology"]
---

Docker를 통해 nodejs 서버를 배포하는 것에 대해 포스팅합니다.
<!-- more --> 
<style>
img{ 
  display: block;
  margin : 0 auto;
}
</style>

![docker](/images/2017-01-31-docker-nodejs/1.png)

<small>도커의 공식로고. 이름은 Moby Dock. 옷에 박혀 있어도 입고 다닐 수 있을 정도로 매우 귀엽다.</small>

이 포스트는 개인프로젝트에서 삽질하면서 이해한걸 토대로 도커에 대해 정리했습니다. 도커를 처음 접해보는 사람들을 대상으로 nodejs로 만든 웹서버를 도커 위에서 동작시키는 방법에 대해 소개합니다.
nodejs와 nginx, postgresSQL을 사용하지만 사용법에 대해서는 소개하지 않습니다. 피드백은 언제나 감사합니다.

# 도커 이해하기
도커(Docker)는 전세계적으로 사용되고있는 컨테이너 가상화 플랫폼이다.
처음에 가상화툴이라고 하면 호스트OS 위에 게스트OS를 설치해서 동작하는 VMware나 VirtualBox를 떠올린다. 하지만 도커는 이와 다르게 게스트OS를 설치하지 않는다.
도커엔진 위에 시스템운영에 필요한 최소한의 라이브러리들만 설치하고 시스템자원은 호스트OS와 공유한다. OS를 설치하는 것이 아니라 필요한 시스템 파일만 격리시키고 실행은 호스트OS에 시키는 것이다.
따라서 게스트OS를 설치하는 방식에 비해서 월등히 빠르다.

![docker principle](/images/2017-01-31-docker-nodejs/2.png)

도커에는 이미지와 컨테이너라는 개념이 있다. 이미지를 통해서 컨테이너를 찍어낸다. 이미지만 있다면 같은 컨테이너를 몇개라도 만들 수 있다. (그것도 매우 빠르게)

도커는 레이어를 겹치는것처럼 컨테이너의 이미지를 겹치는 방식으로 동작한다. 따라서 하나의 이미지에서 파생된 여러가지 이미지를 만들 수 있다.
또한 같은 이미지를 사용한다면 이미지의 용량을 아낄 수 있다.

![docker principle](/images/2017-01-31-docker-nodejs/3.png)

또한 도커가 유명해진 가장 큰 이유 중 하나는 이렇게 제작한 이미지를 Docker Hub에 쉽게 공유할 수 있다는 점이다.
마치 Github처럼 자유로운 pull/push가 가능하다.

# 설치
리눅스 컨테이너를 기반으로 하고 있기 때문에 리눅스에서 사용하는게 가장쉽고 보편적이다. 다른 OS에서 설치하면 내부적으로 VirtualBox와 그 위의 리눅스가 설치되고 거기에 도커가 설치된다.
윈도우나 맥에서 도커를 좀더 편하게 사용하게 하기 위해서 <a href="https://www.docker.com/products/docker-toolbox" target="_blank">Docker Toolbox</a>를 설치 해서 사용한다.
Toolbox는 다음과 같은 소프트웨어가 포함되어있다.

- **Docker Machine** for running docker-machine commands
- **Docker Engine** for running the docker commands
- **Docker Compose** for running the docker-compose commands
- **Kitematic**, the Docker GUI
- a shell preconfigured for a Docker command-line environment
- Oracle **VirtualBox**

리눅스에선 설치스크립트를 통해 설치하거나 <a href="https://docs.docker.com/engine/installation/linux/ubuntu/" target="_blank">저장소를 이용해서 설치</a>할 수 있다.
docker compose는 pip를 통해서 설치한다.

```sh
# docker-engine
sudo curl -sSL https://get.docker.com/ | sh

# docker-compose
sudo apt-get -y install python-pip
sudo pip install docker-compose
```

윈도우 혹은 맥에서는 Toolbox installer로 쉽게 설치할 수 있다.
![install toolbox](/images/2017-01-31-docker-nodejs/5.png)

설치를 잘했는지 확인해본다. docker명령어 실행에는 기본적으로 보안권한이 필요하다.
따라서 명령어 마다 sudo를 입력해주거나 권한이 있는 계정으로 실행해야한다.

```sh
docker -v
docker-compose -v
```

# docker-compose
도커로 서버를 구축할 때 컨테이너를 띄우는데, 한 컨테이너에 필요한 소프트웨어를 몰아서 설치할 수 도 있고 각각 컨테이너를 따로 만들고 내부적으로 연결 할 수도 있다.
예를 들면 ubuntu 이미지에 nginx, nodejs, postgres를 모두 설치 할 수도 있고 각각 따로 설치된 컨테이너 세개를 띄우고 내부 네트워크로 연결 할 수 있다.
이 때, 각각의 컨테이너를 띄우고 설정하는 스크립트를 매번 하기 힘들기 때문에 여러 컨테이너를 한번에 띄울 수 있게 하는 docker-compose를 사용한다.

> 컨테이너안의 데이터는 영속성이 없기 때문에 컨테이너를 지우면 사라진다는걸 주의해야 한다. 그래서 영속성을 가져야 하는 데이터를 저장하는 용도로 사용하기엔 적절하지 않다.

# 이미지 받아오기 
```sh
# 도커허브에서 이미지를 검색한다.
docker search 키워드
```
docker hub에서 보편적으로 사용 할 수 있게 미리 만들어진 이미지를 받아 올 수 있다. 
태그를 지정할 수 있는데, 일반적으로 버전을 지칭 한다. default는 latest.

```sh
# 이미지를 받아온다.
docker pull 이미지이름
```
잘 받아졌는지 받아놓은 이미지를 확인해본다.

```sh
# 이미지 목록을 출력한다.
docker images
```

> 도커를 사용하다가 image 목록을 출력했을 때 내려받지도 않은 ``` <none>:<none> ``` 이라는 이름의 이미지가 목록에 있는 경우가 있다.
이는 도커의 레이어기반 동작방식에 의한 이미지일 수 도 있고, Dockerfile을 빌드한 후 deprecated된 이미지를 garbage collection하지 못해서 남아있는 경우이다.

```sh 
# 이미지를 제거한다
docker rmi 이미지이름 혹은 아이디

# dangling된 이미지를 모두 제거한다. 
docker rmi $(docker images -f "dangling=true" -q) 
```

# 컨테이너 생성하기
이미지를 통해서 컨테이너를 생성한다.

```sh
docker run -it --name 컨테이너이름 이미지이름
```
생성한 컨테이너속에서 인터렉티브하게 쉘을 사용하기 위해서 i,t 옵션을 사용한다.
정상적으로 실행이 되었다면 컨테이너속에 들어온것을 확인할 수 있다. exit로 컨테이너에서 빠져나올 수 있다. 컨테이너에서 빠져나오면 컨테이너는 비활성화 상태가 된다.
쉘을 종료하지 않고 빠져나오려면 ctrl + p + q를 입력한다.

```sh
docker ps -a
```
현재 실행되어 있는 컨테이너들의 목록을 표시한다. a옵션으로 활성화되어 있지않은 컨테이너까지 표시할 수 있다.

```sh
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
9e4324652af9        ubuntu              "/bin/bash"         1 minutes ago      Up 4 seconds                            ubuntu
```

```sh
docker start 컨테이너ID 혹은 컨테이너이름
docker stop 컨테이너ID 혹은 컨테이너이름
```
실행중인 컨테이너를 활성화하거나 비활성화한다.

```sh
# 컨테이너를 삭제한다.
docker rm 컨테이너ID 혹은 컨테이너이름
```
활성화 된 컨테이너를 삭제하기 위해서는 먼저 비활성화 하거나 -f를 사용해야한다.

# Dockerfile
Dockerfile은 도커이미지를 빌드하기 위한 스크립트를 기술해놓은 파일이다. Dockerfile이 있는 폴더에서 도커 명령어를 실행하면 자동으로 바인딩된다.
주요 커맨드는 다음과 같다.

```sh
# 베이스가 될 이미지. 로컬에 받아놓은 이미지를 먼저 찾고 없으면 리모트서버에서 받아온다.
FROM ubuntu

# 정보 입력
LABEL maintainer "ho1234c@gmail.com"

# 명령어 실행
RUN apt-get update
RUN apt-get install nginx

# 파일 복사
ADD 복사할파일 복사될위치
ADD . /app

# 열어줄 포트
EXPOSE 8080

# 빌드 컨텍스트에 사용할 환경변수 설정
ENV NODE_ENV production

# 워킹디렉토리 설정
WORKDIR /app

# 마운트할 볼륨의 위치를 지정
VOLUME ["/data"]

# 컨테이너가 실행되었을 때 실행할 명령어
CMD ["npm", "start"]
```

# 테스트에 필요한 파일 만들기
여기서는 nginx로 reverse proxy를 구성하고, nodejs서버는 서버내부의 데이터베이스에 접근하는 구조라고 가정한다.

테스트에 사용하기 위한 파일들을 만든다. 여기서 주의해야 할 부분은 데이터베이스에 접근하는 부분이다.
외부 데이터베이스를 사용하면 그냥 주소를 통해서 연결 하면 되지만 한 서버내에 데이터베이스 컨테이너를 따로 띄우는 경우,
docker-compose에서 컨테이너 끼리의 연결에 관련된 설정을 해줄 수 있다.

```sh
app
├─nginx
│ ├──Dockerfile
│ └──nginx.conf
├─postgres
│ ├──Dockerfile
│ └──init-table.sql
├─Dockerfile
└─index.js
```

```js
// index.js
const express = require('express');
const pg = require('pg');
const app = express();

app.get('/', (req, res) => {
    
    // postgres 컨테이너에 app_db라는 도메인으로 접근 할수 있게 docker-compose에서 연결해준다.
    const conString = "postgres://postgres:1234@app_db:5432/docker_tutorial";
    const results = [];

    var client = new pg.Client(conString);
    client.connect(function (err) {
        const results = [];
        const query = client.query('SELECT * FROM car');

        query.on('row', (row) => {
            results.push(row);
        });

        query.on('end', () => {
            client.end();
            return res.json(results);
        });
    });
});

app.listen(3000, function () {
    console.log('test server listening on port 3000');
});
```

```sh
# nginx/nginx.conf
worker_processes 4;

events { 
    worker_connections 1024; 
}

http {
    upstream app {
        server localhost:3000;
    }
    
    server {
        listen 80;

        location / {
            proxy_pass http://app;
        }
    }
}
```

테스트에 사용할 table을 만들고 데이터를 몇개 넣는 쿼리를 작성한다.
컨테이너를 올릴 때 마다 새로 생성되는 데이터베이스에 초기 데이터를 삽입해 주기 위해
이 파일을 컨테이너를 초기화 할 때 실행시켜준다.

```sql
-- postgres/init-table.sql
CREATE TABLE car(name varchar(64), color varchar(64));
INSERT INTO car(name, color) values('Audis', 'Blue');
INSERT INTO car(name, color) values('BMW', 'Red');
INSERT INTO car(name, color) values('Honda', 'Black');
```

# 빌드에 사용할 Dockerfile 만들기
사용할 이미지를 받는다. 받아놓지 않아도 빌드가 가능하지만 받아오는 시간 때문에 오래걸린다.

```sh
docker pull node
docker pull nginx
docker pull postgres
```

node 이미지 빌드에 사용할 Dockerfile을 만든다.

```sh
# Dockerfile
FROM node
MAINTAINER ho1234c <ho1234c@gmail.com>

RUN mkdir /app
ADD . /app
WORKDIR /app

CMD ["node", "index.js"]
```

nginx 이미지 빌드에 사용할 Dockerfile을 만든다.

```sh
# nginx/Dockerfile
FROM nginx
ADD nginx.conf /etc/nginx/nginx.conf
```

postgres 이미지 빌드에 사용할 Dockerfile을 만든다. 빌드 후에 /docker-entrypoint-initdb.d/
안의 *.sql, *.sh 파일들이 실행된다.

postgres 공식 이미지에는 POSTGRES_USER, POSTGRES_PASSWORD처럼 이미지를 쉽게 사용할 수 있도록 미리 지정해놓은 환경변수들이 있다. 

```sh
# postres/Dockerfile
FROM postgres:9.3
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWARD 1234
ENV POSTGRES_DB docker_tutorial
ADD init-table.sql /docker-entrypoint-initdb.d/
```

# docker-compose.yml
docker-compose는 파이썬 기반으로 작성되어 있기 때문에 yml을 사용한다.
links를 통해서 컨테이너끼리 접근 할 수 있다. 컨테이너들이 올라간 후에 확인해보면
/etc/hosts 속에 여기서 설정한 것들이 들어가 있는것을 확인 할 수 있다.

```yaml
# docker-compose의 버전을 명시. 버전별로 명령어등의 약간의 차이가 있다.
version: "2"

services:
    nginx:
        # 만들어질 container 이름
        container_name: nginx

        # Dockerfile의 위치
        build: ./nginx

        # 컨테이너 끼리 내부적으로 연결할 때의 alias
        # 예를 들어 A:B 의 경우 이 컨테이너 내에서 B라는 이름으로 A에 연결 할 수 있다.
        # 여기서는 nginx에서 app이라는 도메인을 통해서 app 컨테이너에 접근할 수 있다.
        links:
            - app:app

        # 열어줄 포트
        # 호스트와 연결할 포트:외부에 노출할 포트
        ports:
            - 80:80
        
    app:
        container_name: app
        build: .

        # 환경변수를 지정할 수 있음.
        environment:
            NODE_ENV: localhost
        ports:
            - 8000
        links:
            - postgres:app_db
        
    postgres:
        container_name: postgres
        image: postgres:9.3
        ports:
            - 5432
```

개발중에 컨테이너를 자주 올렸다 내렸다 하는데, 그때마다 데이터베이스가 설치된 컨테이너도 초기화 된다.
테스트에서는 별 상관없지만 실제 서비스에선 데이터가 지워지면 안된다. docker에선 이를 위해서 data volume을 만들 수 있다. 이를 통해서 docker속에 영속성이 유지되는 볼륨을 만들어 주거나 호스트의 디렉토리와 연결 할 수 있다.

```yaml
 # 데이터 볼륨 지정
        # 호스트 디렉터리:컨테이터 디렉터리
        # 컨테이너 내부에서 해당 경로에 접근하면 지정한 호스트 디렉터리로 접근할 수 있다.
        # 데이터베이스의 경우 유지되어야 할 파일의 위치를 볼륨으로 지정해 주면 
        # 볼륨을 삭제하지 않는 한 컨테이너가 재기동되어도 영속성이 유지된다.
        volumes: 
            - /data/postgres:/var/lib/postgresql/data
```

# 컨테이너 실행하기
docker-compose.yml이 있는 위치에서 빌드를 해준다.

```sh
# docker-compose.yml에 기술 한대로 컨테이너를 빌드한다.
docker-compose build
```

```sh
# 빌드한 컨테이너들을 실행시킨다.
docker-compose up
```

빌드와 동시에 실행하려면 --build 옵션을 사용한다. 또한 -d 옵션으로 백그라운드에서 실행 시킬 수 있다.

```sh
# 실행중인 컨테이너를 정지하고 삭제한다.
docker-compose down
```

![dokcer-compose-up](/images/2017-01-31-docker-nodejs/6.png)
<br/>
> 윈도우나 맥에서 도커를 샤용한다면 VM을 통하게 되는데, 이 때는 localhost 와 같은 루프백 도메인이 아니라 
docker machine과 호스트pc가 연결 되어있는 주소를 사용해야한다. docker terminal에서 ```docker-machine ls``` 를 입력하면 url을 확인할 수 있다.

<br/>

![check](/images/2017-01-31-docker-nodejs/4.png)

# 마치며
도커를 활용하면 컨테이너를 두개 띄우고 라우터 설정만 바꿔주는 식으로 Blue-Green등의 배포전략을 쉽고 부드럽게 구성 할 수 있다. 특히 가벼운 프로젝트나 마이크로서비스에는 장점이 극대화되는것 같다.

아직 한국어로 된 자료도 많이 없고 해서 배우기 어려웠고 삽질도 많이 했다. 하지만 사용해보니 내부원리는 이해하기 어렵지만 사용하기는 쉽다는 느낌을 받았다. 단기간내에 대세가 되는건 다 이유가 있는것같다. 앞으로도 적극적으로 활용해야겠다.