# [모바일 멀티미디어 과제](https://gup97.github.io/CoffeePage/)

목차
- [미리보기](#preview)
- [도안](#projectdrawing)
- [작업현황](#작업현황)
- [구조](#구조)
- [결과](#후기)
---
### preview


---
### projectdrawing
![projectdrawing](https://user-images.githubusercontent.com/80537765/117955020-91382c80-b352-11eb-9a22-67c53dfeb620.png)  
made by 윤성호

---
### 작업현황
2021-05-12   
- loading page 구성
- menu layout 구성  

2021-05-19   
- coffee page css animation으로 구성  
- 부자연스러워서 삭제 (ㅠㅠ)  

2021-06-01
- html5 canvas 로 자연스러운 wave 구성
- wave의 높낮이는 백분율로 구성할수있고, rgb값과 reset여부를 정할 수 있음
- 추가 얘기  
김종민님의 ![사이트분석](http://fff.cmiscm.com/#!/section/surfacewaves)을 해봄
canvas 를 바꿀수없어서 코드를 분석해보니  
canvas를 작게만든뒤 네모난걸 svg를 덧대어서   
동그랗게만든걸로 파악됨 현재나는 canvas를 바꿀수없기에 막혀있음  
canvas의 위치를 바꿀수없아 작게만들었고 그위에 svg파일을 올림


2021-06-05  
- 코드 싹다 갈아엎음+날코딩
- 날코딩하다가 변수 스코프에서 한방맞아버림  
- ++ y축을 바꾸기위한작업중
 Uncaught TypeError: Cannot read property
 에러가 뜨게되어서 해결방안을 찾았다.  
[찾은곳1](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
[찾은곳2](https://blog.meeta.io/10)

2021-06-07

변수와 함수들의 스코프에서 문제가생겼다.
수정해야겠다.
- waterdrop(물방울 객체)를 만듬
- 물방울의 색상, 높이, 속도 정할 수 있음   

2021-06-08
- 목표 rgb값을 정하여 wave 색 자동 변경

2021-06-10
- fullpage js 를 vanilla로 구성
- page scroll시 page 내의 공간으로 이동

제출 끝

------------------------------------------
### 구조
------------------------------------------
index.html  - loading.js  -> lay.html
            - intro.css

lay.html    - newlay.css 
            - newnav
            
wave.js     - app.js
            - wave.css

font.css 공용

------------------------------------------
### 후기
😐처음으로 짜본 인터렉션한 사이트는 스파게티 코드가 되어있었고,  
무엇을 공부해야 하는 지 깨닫게 되었다. (스코프, 선언형 프로그래밍)  
역시 몸으로 부딪혀야 길이 보인다.