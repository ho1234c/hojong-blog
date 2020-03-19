---
path: "/blockchain-guide"
date: "2018-02-02"
title: "The authoritative guide to blockchain development (번역)"
tags: ["technology", "translation"]
---


<a href="https://medium.freecodecamp.org/the-authoritative-guide-to-blockchain-development-855ab65b58bc" target="_blank"> Haseeb Qureshi님의 The authoritative guide to blockchain development</a>를 번역한 글입니다. 오역 및 의역이 있을 수 있습니다. 고유명사가 많아서 원문과 함께 보시는걸 추천합니다.

-----

암호화폐, ICO들, 마법같은 인터넷상의 돈-- 매우 흥미로운일이고, 당신같은 개발자들은 이것에 빠지고싶을겁니다. 어디서부터 시작해야할까요?

우선 당신이 이 분야에 흥미를 가져서 기쁩니다. 저 역시 마찬가지 입니다. 하지만 당신은 아마 어디서 시작해야할지 막막할것이라고 생각합니다. 블록체인은 맹렬히 움직이고 있지만 이것을 배울 수 있는 곳은 확실치않습니다.

풀타임 블록체인을 위해 Airbnb를 나오고나서 이를 위해 어떻게 해야하는지 묻는분들이 많습니다. 이 믿을만한(그리고 당연히 불완전한) 가이드를 읽어보세요.

이 가이드는 열가지 파트로 진행됩니다.

1.왜 블록체인 개발을 배워야하나?

2.기본지식

3.비트코인의 이론적기반

4.직접 블록체인 만들기

5.이더리움과 스마트 컨트랙트 프로그래밍

6.스마트 컨트랙트 보안

7.훈련에서 벗어나기

8.프로젝트 빌딩하기

9.블록체인 커뮤니티 찾기

10.직업얻기

## 왜 블록체인 개발을 배워야하나?

이 질문에 답하기 전에 한가지 주의점이 있습니다. 블록체인은 지금 너무 과대평가되어있습니다. 가격은 지속될 수 없으며 추락(crash)은 분명 찾아옵니다. 이는 모두 일어났던적이 있고 다시 일어날겁니다. 하지만 당신이 이 분야에서 오래일하면 이를 대수롭지 않게 여기는 방법을 배우게될겁니다. Emin Gun Sirer의 말을 빌리자면-- 가격은 암호화폐의 가장 흥미로운 부분입니다. 블록체인은 매우 중요한 기술이며 분명 세상을 바꿀겁니다.

당신이 확신할 수 없다면 나는 여기에 발을 들이라고 말 할수 없습니다. 하지만 당신에게 내가 여기에 빠진 다섯가지 이유를 말씀드리겠습니다.

1.여전히 이릅니다.

비트코인은 10년전에 나왔지만 그 발전률은 지난 2년간, 특히 2015년의 이더리움이 최고조였습니다. 대부분의 새로운 회사와 아이디어들은 이더리움위에 세워졌고 이는 여전히 미성숙합니다.

당신이 지금시작하더라도 몇년안에 세계적인 전문가가 될 수 있습니다. 대부분의 사람들은 이 일을 오래하지 않았기 때문에 따라잡기 어렵지 않습니다. 지금 시작하는것은 2000년대 후반에 연구를 시작한 딥러닝전문가의 사례와 유사합니다.

2.이 분야엔 아직 강력한 재능의 벽이 없습니다.

대학교의 학생들은 대부분 머신러닝, 웹프로그래밍, 혹은 게임프로그래밍에 초점을 맞출겁니다. 물론 블록체인이 대중적으로 많이 바뀌긴했지만 여전히 당신의 경력을 투자하기에 충분한 주제입니다.

초기의 블록체인은 매우 특별한 사람들만을 위한 것이었습니다. 하지만 최근엔 바뀌기 시작했습니다. 호기심많고 개방적인 개발자라면 이 분야에 큰 가치를 가져올겁니다.

3.학계밖에서 많은혁신이 일어나고 있습니다.

Satoshi Nakamoto는 우리가 아는것 같은 학문적인 사람이 아니었습니다. 아직 블록체인에 관한 학문을 제공하는 기관이나 학교는 없습니다. 대부분의 혁신이 열성팬, 기업, 개인연구에서 비롯되고 있습니다. 당신이 알아야할 대부분의 것이 백서(white papers), 블로그의 포스트, 공개슬랙채널, 그리고 오픈소스 소프트웨어속에 있습니다. 뛰어들기만하면 됩니다.

4.인재에 대한 수요가 턱없이 부족합니다.

이 분야의 개발자가 충분치않아서 빠르게 학습할수 없습니다. 모든 사람들이 블록체인개발자를 고용하기 위해 경쟁하고 있으며, 프로젝트들은 인재들이 부족합니다. 많은 최고의 기업들은 너무 많은 기회가 있기때문에 직원들에게 충분한 급여를 지불하고 있지 않습니다. 기술을 가지고 있다면 직업을 구하기 쉬워질겁니다.

5.암호화폐는 끝내줍니다. (really damn cool)

비밀리에 보호되는 분산자금 같은걸 어디서 또 만들 수 있을까요? 지금 이분야는 매우 황량합니다-- 이는 좋은것이 오기도, 나쁜것이 오기도합니다. 이 분야는 더욱 투명성을 사용할 수 있고 곧 규제가될것입니다. 하지만 의심할여지없이 암호화폐는 지금 연구할 수 있는 가장 혁식적인 주제입니다.

Naval Ravikan는 [최근 인터뷰](https://www.pscp.tv/w/1eaKbqrWloRxX)에서 이렇게 이야기했습니다: 성공의 비결을 사회가 원하지만 스스로 얻는 방법을 모르는것을 제공하는 것입니다. 그래서 학교에 갈 수 없습니다. 당신이 할 수 있다면 세상은 이미 그것을 안정적으로 공급하고 있을겁니다.

그러니 아무도 만드는 방법을 모르는 무언가를 만드세요. 블록체인이 지금당장은 새롭고 알아야할게 너무 많습니다. 분산기술의 미래를 세우는데 성공한다면 세상은 당신에게 훌륭하게 보상할겁니다.

하기도 전에 포기해야 할 이유가 있을까요?

## 기본지식

저는 더욱 깊이 공부하기전에 기초를 튼튼히하시길 추천합니다. 블록체인은 컴퓨터공항, 암호학, 경제학연구를 기반으로 만들어져있습니다. Satoshi Nakamoto는 변절자(renegade)이긴했지만 그는 선행한 역사를 잘 알고 있었습니다. 블록체인이 왜 동작하는지 이해하기위해선 그것들의 블록--블록체인전에 무엇이 있었는지, 왜 블록체인이 작동하지 않는지를 이해해야합니다.

아래는 필요한 기본지식들을 중요도의 순서로 나열한것입니다.

이것은 시작점일뿐이며 아마 많은 토픽들이 필요할겁니다.

## 컴퓨터공학 (Computer science)

### 자료구조 (Data structures)

주요 자료구조의 특징 및 복잡성에대해 잘 알고있어야 합니다. [연결리스트(linked lists)](https://en.wikipedia.org/wiki/Linked_list), [이진검색트리(binary search trees)](https://en.wikipedia.org/wiki/Binary_search_tree),[해쉬맵(hash maps)](https://en.wikipedia.org/wiki/Hash_table), [그래프(graphs)](https://en.wikipedia.org/wiki/Graph_%28discrete_mathematics%29)(특히 블록체인에서 두드러지게 나타나는 [방향순환그래프](https://en.wikipedia.org/wiki/Directed_acyclic_graph)). 이것들은 동작방법과 속성을 이해하는데 도움이됩니다.

### 암호학 (Cryptography)

암호학은 암호화폐라는 이름의 근간을이룹니다. 모든 암호화폐는 인증과 구분을위해 [공개/비공개 키 암호화방식](https://en.wikipedia.org/wiki/Public-key_cryptography)을 사용합니다. [RSA](https://www.youtube.com/watch?v=vgTtHV04xRI)에 대해 공부하고(배우기쉽고 정교한 수학지식을 필요로하지않습니다) [ECDSA](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/)에 대해 공부해보길 추천합니다. 타원곡선암호화(Elliptic curve cryptography)는 더 추상적인 수학이 필요합니다. 모든 세부적인것들을 이해할 필요는 없지만 암호학이 비트코인을 포함한 대부분의 암호화폐에 사용됨을 알고있어야합니다.

또 암호학에서의 중요한 기반지식으로는 [암호해쉬함수(cryptographic hash function)](https://en.wikipedia.org/wiki/Cryptographic_hash_function)가 있습니다. [commitment schemes](https://en.wikipedia.org/wiki/Commitment_scheme)와 [머클트리(Merkle trees)](https://en.wikipedia.org/wiki/Merkle_tree)의 블럭을 구성하는데 사용됩니다.

### 분산시스템 (Distributed systems)

분산시스템에는 여러가지 좋은 텍스트북이 있지만 방대하고 어렵습니다. 분산시스템은 분명 블록체인을 배우는데 필수적이기 때문에 블록체인을 다루기전에 기초를 알아야합니다.

우리는 더이상 하나의 기계에 살지않습니다. [동시(consistency )](https://en.wikipedia.org/wiki/Consistency_model)와 [일치(consensus)](https://en.wikipedia.org/wiki/Consensus_%28computer_science%29)에 대한 추론에서부터 시작해야합니다. [선형(linearizable)모델](https://en.wikipedia.org/wiki/Linearizability)과 [점차적 단계(eventual consistency)모델](https://en.wikipedia.org/wiki/Eventual_consistency)의 차이를 알아야합니다. 또한 [Paxos](https://en.wikipedia.org/wiki/Paxos_%28computer_science%29)나 [RAFT](https://en.wikipedia.org/wiki/Raft_%28computer_science%29)와 같은 일치알고리즘(consensus algorithm) [장애허용시스템(fault-tolerant)](https://en.wikipedia.org/wiki/Fault_tolerance)의 보장을 배워야합니다. [분산시스템에서 시간추론의 어려움에 대해 알아야합니다.](https://www.youtube.com/watch?v=BRvj8PykSc4) [안정성과 실시간성](http://www.bailis.org/blog/safety-and-liveness-eventual-consistency-is-not-safe/)의 트레이드오프를 이해해야합니다.

이런 배경지식이 있다면 이제 블록체인의 주요 보안이슈인 [비잔티움 장애 허용(Byzantine fault-tolerant consensus)](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)을 이해할 수 있습니다. 그리고 비잔티움 장애 허용(Byzantine fault-tolerant consensus)의 내에서 확장가능한 첫 알고리즘인 [PBFT](https://blog.acolyer.org/2015/05/18/practical-byzantine-fault-tolerance/)를 배울수 있습니다. PBFT는 증명되지 않은 블록체인 동시성알고리즘의 기초입니다. 다시한번 말씀드리면 당신은 PBFT가 왜 맞는지와 같은 자세한 부분을 이해할 필요가 없습니다. 일반적인 아이디어와 안전보장을 이해하는 정도면 됩니다.

또한 [전통적인방식의 분산데이터베이스](https://en.wikipedia.org/wiki/Distributed_database)를 이해하는것은 매우 유용합니다. (결국 블록체인은 데이터베이스이기 때문입니다) ([일관 해쉬(consistent hashing)](https://en.wikipedia.org/wiki/Consistent_hashing)를 통한) [sharding](https://en.wikipedia.org/wiki/Shard_%28database_architecture%29), [leader-follower replication](https://en.wikipedia.org/wiki/Replication_%28computing%29), [quorum-based commits](https://en.wikipedia.org/wiki/Quorum_%28distributed_computing%29)에 대해 학습하세요. 그리고 [Chord](https://en.wikipedia.org/wiki/Chord_%28peer-to-peer%29), [Kademlia](https://en.wikipedia.org/wiki/Kademlia)와 같은 [분산해시테이블(distributed hash tables (DHTs))](https://en.wikipedia.org/wiki/Distributed_hash_table)를 살펴보세요.

## 네트워킹 (Networking)

블록체인의 분산성은 피어투피어(peer-to-peer)네트워크에 기반합니다. 따라서 과거 P2P네트워크와 직접적 관련이 있습니다.

블록체인 커뮤니티모델을 이해하려면 컴퓨터네트워킹의 기초인 [TCP와 UDP](https://www.diffen.com/difference/TCP_vs_UDP), [IP패킷의 모양과 패킷모델](https://en.wikipedia.org/wiki/Network_packet)에 대해 이해해야합니다. 그리고 [인터넷라우팅](https://en.wikipedia.org/wiki/Routing)이 어떻게 동작하는지도 대충 알아야합니다.

공개된 블록체인은 보통 [flooding](https://en.wikipedia.org/wiki/Flooding_%28computer_networking%29)을 이용한 [gossip protocols](https://en.wikipedia.org/wiki/Gossip_protocol)를 통해 전파됩니다. P2P네트워크 디자인의 역사를 [Napster-Gnutella](http://www.springer.com/cda/content/document/cda_downloaddocument/9783642035135-c2.pdf?SGWID=0-0-45-855488-p173920223), [BitTorrent](https://en.wikipedia.org/wiki/BitTorrent), [Tor](https://en.wikipedia.org/wiki/Tor_%28anonymity_network%29)에서부터 알아두는게 유익합니다. 블록체인은 그 자체로 분야이지만 네트워크와 그것들이 어떻게 디자인되어있는지에 근간합니다.

## 경제학 (Economics)

암호화폐는 본질적으로 다양한 학문이 결합되어있는 형태입니다. 이것이 이 분야가 매혹적이고 급진적인 이유입니다. 컴퓨터공학과 더불어 암호학, 네트워킹 모두 경제학과 엮여있습니다. 암호화폐는 경제구조에서 파생된 많은 보안요소를 갖습니다.cryptoeconomics라는 용어로 일컫습니다. 이와 같은 이유로 경제학은 암호화폐의 이해에서 필수적입니다.

### 게임이론 (Game theory)

암호화폐와 관련된 경제학중 가장 중요한건 [게임이론(game theory)](https://en.wikipedia.org/wiki/Game_theory), 즉 여러 에이전트간의 보상과 인센티브입니다. 매우 깊게 공부할 필요는 없습니다. 하지만 게임이론의 기본적인 툴과 그것들이 여러 게임에서 어떻게 사용되는지를 알아야합니다.

암호화 경제분석에서 두드러지는 [Nash equilibria](https://en.wikipedia.org/wiki/Nash_equilibrium), [Schelling point](https://en.wikipedia.org/wiki/Focal_point_%28game_theory%29)를 중심적으로 공부해야합니다.

### 거시경제학 (Macroeconomics)

암호화폐는 단순히 규약이 아니라 돈입니다. 따라서 (법칙이라고 한다면) [거시경제학(Macroeconomics)](https://en.wikipedia.org/wiki/Macroeconomics)의 법칙을 적용할수있습니다. 암호화폐는 다른 [통화정책(monetary policies,)](https://en.wikipedia.org/wiki/Monetary_policy)의 영향을 받으며 예측가능한 [인플레이션(inflation)](https://en.wikipedia.org/wiki/Inflation)과 [디플레이션(deflation)](https://en.wikipedia.org/wiki/Deflation)에 반응합니다. 이런 프로세스와 그것들이 소비와 저축에 미치는 영향을 이해해야합니다.

### 미시경제학 (Microeconomics)

또한 암호화폐는 시장과 밀접한 연관이 있기때문에 [미시경제학(microeconomics)](https://en.wikipedia.org/wiki/Microeconomics)에 대한 이해가 필요합니다. [공급곡선과 수요곡선](https://en.wikipedia.org/wiki/Supply_and_demand)에 대한 강한 직관이 필요합니다. 경쟁과 [기회비용](https://en.wikipedia.org/wiki/Opportunity_cost)에 대해 추론할 수 있어야합니다.(암호화폐의 채굴에 자주사용됩니다) 많은 동전분배, 암호경제시스템에서 [경매이론(auction theory)](https://www.youtube.com/watch?v=4kWuxfVbIaU)이 두드러지게 나타납니다.

아마 몇가지 주제는 이미 익숙할거라고 생각합니다. 그럴때는 과감히 건너뛰세요.

좋습니다. 이제 당신은 기초가 어느정도 쌓였습니다.(혹은 그냥지나쳤을 수도 있습니다) 이론적인걸 확인했으니 블록체인 개발을 시작해봅시다.

## 비트코인의 이론적기반

2008년 10월, Satoshi Nakamoto는 분산 디지털 화폐 프로토콜을 설명한 문서를 발표했습니다. 그리고 이것을 비트코인이라고 불렀습니다. 블록체인이라는 거대한 아이디어를 이해하기전에 비트코인으로 시작해 Satoshi의 인사이트를 파악해야합니다.

첫째로 작업증명(proof-of-work)과 포크선택규칙(fork choice rule)(Nakamoto consensus라고도 알려져있음)에 대해 직관을 세워보는것이 좋습니다. 여기서부터 시작해보세요.

<iframe width="700" height="394" src="https://www.youtube.com/embed/_160oMzblY8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

아이디어를 잘이해하기위해서 다른 비디오도 보시길 추천합니다.

<iframe width="700" height="394" src="https://www.youtube.com/embed/bBC-nXj3Ng4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

좋습니다. 이제 여러분은 높은 수준의 직관을 구축했습니다. [이 기사](https://www.igvita.com/2014/05/05/minimum-viable-block-chain/)에서는 비트코인이 동작하는 핵심 구성요소에 대해 더 깊은 설명을 제공합니다.

## 직접 블록체인 만들기

여러분은 높은 수준의 직관을 가지고 있기때문에 이제 블록체인 기반의 작업증명(proof-of-work)을 구현해볼 시간입니다. 걱정하지마세요. 보기보다 쉽습니다. 여기 훌륭한 자료들이 있습니다.

우선 제가 Ruby로 만드는 과정을 차례차례 설명한 비디오강의가 있습니다.(Ruby 프로그래머가 아니더라도 보시길 추천합니다)

<iframe width="700" height="525" src="https://www.youtube.com/embed/3aJI1ABdjQk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[소스코드와 슬라이드](https://github.com/Haseeb-Qureshi/lets-build-a-blockchain)

다양한 언어로 작성된 [블록체인 구현체](https://github.com/openblockchains/awesome-blockchains)를 볼 수 있습니다. 만족할만큼 자신의 것으로 만드세요. 대부분 실용적입니다.

그렇다면 이제 블록체인위에서 동작하는 간한단 결제 어플리케이션이 어떻게 구현되어있는지 이해해야합니다.(즉 비트코인) 그리고 당신은 이미 [비트코인의 오리지널 논문](https://bitcoin.org/bitcoin.pdf)을 읽고 이해할 충분한 배경지식을 갖추고 있습니다.

비트코인 채굴의 구조와 경제성을 이해하기위해 비트코인과 암호화폐 프린스턴 과정의 [비트코인 채굴에 대한 강의](https://www.youtube.com/watch?v=jXerV3f5jN8)를 보시기를 추천합니다.

여기까지오셨다면 [비트코인블록헤더](https://www.youtube.com/watch?v=gUwXCt1qkBU)를 보고, 각 구성요소를 이해할수있을만큼 비트코인을 잘 이해하고 있어야합니다. 또한 비트코인블록탐색기를 통해 원시비트코인 트랜잭션을 살펴볼 수 있어야합니다.

이제 비트코인과 암호화폐의 역사에 대해 공부할 타이밍입니다. UC 버클리에서 훌륭한 개요를 제공하고 있습니다. 아래비디오를 보세요.

<iframe width="700" height="525" src="https://www.youtube.com/embed/apYieuvnUaE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

그 외 신뢰할만한 정보들:

- [비트코인의 학문적 선례](https://queue.acm.org/detail.cfm?id=3136559)

- 비트코인의 메커니즘: [UTXO와 비트코인 스크립트](https://www.youtube.com/watch?v=q5GWwTgRIT4)(비트코인 스크립트는 크게 중요하지 않고 그냥 뭔지만 알면됩니다)

- [비트코인 포크를 위한 짧은 안내서](https://www.coindesk.com/short-guide-bitcoin-forks-explained/)

- [소프트 포크와 채굴 신호효과](https://en.bitcoin.it/wiki/Softfork)

- [이중지불, 51%공격, 셀프채굴](https://en.bitcoin.it/wiki/Softfork)

- [재실행 공격](https://en.bitcoin.it/wiki/Softfork)

- [비트토인 확장성 문제](https://en.bitcoin.it/wiki/Softfork)은 비트코인 생태계에서 논란의 큰 부분을 차지합니다. 사람들이 블록의 크기때문에 논쟁하는 이유를 알필요가 있습니다.

- [증인분산, a.k.a SegWit(a.k.a. SegWit)](https://en.wikipedia.org/wiki/SegWit)은 필수는 아니지만 많이 쓰입니다.

- [라이트닝 네트워크](https://lightning.network/)은 비트코인에서 스케일링을 해결하기 위한 중요한 솔루션중 하나인 동시에 다른 블록체인에도 적용됩니다.

- [비트코인 전체 노드](https://bitnodes.earn.com/), [비트코인 수수료통계](https://bitcoinfees.earn.com/), [차트](https://blockchain.info/charts), [차트](https://coin.dance/stats), [또다른 차트](https://bitcointicker.co/networkstats/)

- [비트코인의 에너지소비지수](https://digiconomist.net/bitcoin-energy-consumption)(발행당시 비트코인 채굴은 페루 전체의 에너지만큼을 소비합니다)

- [Gwern의 비트코인의 단점에 대한 통찰있는 에세이](https://www.gwern.net/Bitcoin-is-Worse-is-Better)

- 더 알고싶으시다면 [Jameson Lopp의 비트코인에 대한 풍부한 자료](https://lopp.net/bitcoin.html)를 확인해보세요

