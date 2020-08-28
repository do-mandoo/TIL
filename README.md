<html>

  # 아스키(ASCII)코드와 유니코드(Unicode)
  - 먼저 알아두면 좋은 정보
  1. 컴퓨터의 기본 저장 단위는 바이트(byte)이다.
  2. 1바이트(byte)는 8비트(bit)이다.
  3. 1바이트(byte)에는 2의8승에 해당하는 256개의 고유한 값을 저장할 수 있다.
  4. 문자 인코딩(encoding), 부호화 : 문자나 기호들의 집합을 컴퓨터가 이용할 수 있는 신호로 만들거나, 통신 목적으로 사용할 경우 부호로 바뀌어야 한다.
  5. 모스부호도 일종의 문자 인코딩이다.
  <br>
  <br>
  ### 아스키(ASCII)코드란?
  - 미국정보교환표준부호(ASCII: American Standard Code for Information Interchange)
  - 영문 알파벳을 사용하는 대표적인 문자 인코딩이다. 컴퓨터와 통신 장비를 비롯한 문자를 사용하는 많은 장치에서 사용되며, 대부분의 문자 인코딩이 아스키에 기초를 두고 있다.
  - 아스키는 7비트 인코딩으로, 33개의 출력 불가능한 제어 문자들과 공백을 비롯한 95개의 출력 가능한 문자들로 총 128개로 이루어진다.sss
  - ASCII TABLE<br>
  ![ASCII CODE TABEL](https://mblogthumb-phinf.pstatic.net/20160530_210/kimkwon429_1464589111496s786l_JPEG/ascii.jpg?type=w2 "ASCII CODE TABEL.")
  - 컴퓨터의 기본저장단위는 1바이트(byte)-8비트(bit)라 했는데 아스키코드는 7비트(bit)만 활용하는 이유는 남은 1비트(bit)를 **통신 에러 검출** 을 위해 사용하기 때문이다.
   이러한 통신 에러 검출을 위한 비트를 **패리티비트(Parity Bit)** 라 한다.
  <br>
  <br>
  ### 유니코드(Unicode)란?
  - 유니코드는 세계의 주요한 문자 언어를 교환하고 표현하기 위한 문자-코딩 표준이며 유니코드 협회(Unicode Consortium)가 제정한다
  - 유니코드는 아메리카, 유럽, 중동, 아프리카, 인도, 아시아, 태평양 지역(Pacifica)의 언어를 포함하며 고문자와 기술 분야 기호들도 포함한다. 유니코드는 공통적인 기술 분야, 수학 분야 기호 뿐만 아니라 여러 언어를 포함한 텍스트의 교환, 처리, 표현을 지원한다.
  - 유니코드 문자 집합은 알려진 모든 인코딩을 위해 사용될 수 있다.
    -유니코드 매핑방식 두가지
      1. 유니코드 변환 형식(Unicode Transformation Format, UTF)인코딩.<br>
        - UTF-1, UTF-7, **UTF-8** , UTF-EBCDIC, UTF-16, UTF-32 포함.
      2. 국제 문자 세트(Universal Coded Character Set, UCS)인코딩.
  - ASCII문자 집합을 본떠 만들어졌다. 각각의 문자에 이름을 부여한 것이다.
  - **데이터의 교환을 원활하게 하기 위하여 문자 1개에 부여되는 값을 16비트(bit)로 통일했다.** 코드의 1문자당 영어는 7비트(bit), 비영어는 8비트(bit), 한글이나 일본어는 16비트(bit)의 값을 지니는데 이를 모두 16비트(bit)로 통일한 것이다.
  - 영문자, 숫자에 대한 유니코드 <br>
  ![UNICODE-1](https://postfiles.pstatic.net/MjAyMDA4MjhfOTIg/MDAxNTk4NTk5OTc3NDYx.UrPX94oHqD3dJAo3teIGE-p9ipJ7f1eAck_OjI85PL8g.rqyITXFmx2QoCT0NxKHEubeaZBtjwMq9pZPRo3ABGVQg.PNG.qmdlqmdl38/%EC%95%84%EC%8A%A4%ED%82%A4%EC%BD%94%EB%93%9C1.PNG?type=w966 "UNICODE-1.")
  - 한글에 대한 유니코드 <br>
  ![UNICODE-2](https://postfiles.pstatic.net/MjAyMDA4MjhfMjMz/MDAxNTk4NTk5OTc3NDYy.SJaLAFOa5Eq6vMGyxAh_lZQo84UjiHKyYM8BDiHjsZsg.BdkYrB06TbGlZUZq_EDJ_LIZFqnpZdXulczSiPclJEYg.PNG.qmdlqmdl38/%EC%95%84%EC%8A%A4%ED%82%A4%EC%BD%94%EB%93%9C2.PNG?type=w966 "UNICODE-2.")
  <br>
  <br>
  ### 더 알아보기
  1. 패리티 비트(Parity bit)란?
   - 정보의 전달 과정에서 오류가 생겼는지를 검사하기 위해 추가된 비트이다.
    - 문자열 내 1비트의 모든 숫자가 짝수 또는 홀수인지를 보증하기 위해 전송하고자  하는 데이터의 각 문자에 1비트를 더해 전송하는 방법으로 홀수,짝수의 두가지 종류의 패리티 비트가 있다.
    - 패리티 비트 홀수, 짝수 <br>
    ![Parity bit](https://postfiles.pstatic.net/MjAyMDA4MjhfMTU5/MDAxNTk4NTk5NjI5ODIy.vMysQig0i1vvEFD7rTo2e0xh4JAJ_7Fxw-kF1l_j_KQg.IV3HvTexe1I9XCMJgQbw-DKMJLlTSWQJwaLzo9IQvKIg.PNG.qmdlqmdl38/%ED%8C%A8%EB%A6%AC%ED%8B%B0%EB%B9%84%ED%8A%B8.PNG?type=w966 "Parity bit.")
  <br>
  <br>
  <br>
---
참고 <br>
위키백과 ascii (https://ko.wikipedia.org/wiki/ASCII)
MDN unicode (https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Unicode)
unicode 홈페이지 (https://home.unicode.org/)
                (http://unicode.org/main.html)
unicode (https://terms.naver.com/entry.nhn?docId=2270340&cid=51173&categoryId=51173)
위키백과 문자인코딩 (https://ko.wikipedia.org/wiki/%EB%AC%B8%EC%9E%90_%EC%9D%B8%EC%BD%94%EB%94%A9)
</html>