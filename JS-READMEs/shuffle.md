1. 랜덤 정렬 방법인 sort()메서드와 피셔 예이츠 셔플(Fisher-Yates Shuffle) 알고리즘.
  -sort()메서드를 쓰면 안되는 이유.
---
---
# 궁금증의 원인
```javascript
//랜덤 정렬을 구현하기 위한 여러가지 코드들 중, 이 코드가 가진 의미? 뜻?
.sort(()=>Math.random()-Math.random())
```
## 랜덤 정렬 방법 두가지.
1. sort()메서드
2. 피셔 예이츠 셔플(Fisher-Yates Shuffle) 알고리즘

### 1. sort()메서드 사용
```javascript
//ex
const arr = [1, 2, 3, 4, 5];
arr.sort(() => Math.random()-0.5);
```
- `Math.random()`은 0이상 1미만의 부동소숫점 의사 난수를 반환한다.
- `Math.random()`은 곱한 값이 없으므로 0.xxxxxxx의 난수를 발생시킨다.<br>
배열의 길이만큼 실행된다. 여기서는 다섯번 실행된다. 각 과정마다 `Math.random()` 메서드가 만든 난수가 0.5보다크면 양수 리턴, 0.5보다 작으면 음수를 리턴한다.<br>
매회마다 어떤 값이 나올지 모르기때문에 위 코드는 랜.덤.정.렬.이라고 할수 있지만 이 코드를 사용해서 랜덤 정렬 할 것을 추천하지 않는다. 결과가 한쪽으로 치우쳐지기 때문이다.<br>
**sort는 이런 용도로 만들어진 메서드가 아니다.**
- sort를 실행했을 때 내부 동작이 블랙박스 안에 담기므로 의도한대로 동작하지 않는다. sort를 실행하면 인수로 넘긴 정렬 함수가 배열을 정리해주는데 이 과정에서 배열 요소끼리의 비교가 완전 무작위로 이뤄지기 때문에 블랙박스 안에 무엇이 담겨있을지 예측하기가 더 어려워진다.<br>
자바스크립트 엔진마다 내부 구현방식이 다 다르니 더욱 혼돈의 카오스이다,,,ㅎ

### 2. 피셔 예이츠 셔플(Fisher-Yates Shuffle) 알고리즘 사용
- Fisher-Yates 셔플은 처음 설명했던 Ronald Fisher 와 Frank Yates의 이름을 따서 명명 되었으며 Donald Knuth의 이름을 따서 Knuth 셔플((Fisher-Yates shuffle 의 현대 버전) 이라고도 한다.
- 그 밖에도 이 알고리즘을 이용한 Sattolo 알고리즘(Sattolo's algorithm)이 있는데, 이 알고리즘은 순환 순열(팩토리얼이라고 생각하면 될 것 같다)을 발생시키기 위해서 만든 알고리즘이다.
- **이 알고리즘은 배열 끝 요소부터 시작해, 앞으로 하나씩 나아가면서, 해당 요소 앞에 있는 임의의 요소와 해당 요소를 바꿔치기 하는 알고리즘이다.**<br><br>
- **원래(original/classic)방법과 현대(modern)방법**
  - <u>원래(original/classic)방법</u>
  ```javascript
  const arr = [1,2,3];
  ```
  - daa
  <br><br>

  - <u>현대(modern)방법</u>
  ```javascript
  let foo = 12;
  ```
  - daa
 

---
---
참고 <br>
- https://daheenallwhite.github.io/programming/algorithm/2019/06/27/Shuffle-Algorithm-Fisher-Yates/
- https://taesung1993.tistory.com/m/54
- https://ko.javascript.info/task/shuffle
- https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle