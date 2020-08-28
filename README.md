<html>
  # 아스키(ASCII)코드와 유니코드(Unicode)
  - 먼저 알아두면 좋은 정보
  1. 컴퓨터의 기본 저장 단위는 바이트(byte)이다.
  2. 1바이트(byte)는 8비트(bit)이다.
  3. 1바이트(byte)에는 2의8승에 해당하는 256개의 고유한 값을 저장할 수 있다.
  4. 문자 인코딩(encoding), 부호화 : 문자나 기호들의 집합을 컴퓨터에서 저장하거나, 통신 목적으로 사용할 경우 부호로 바뀌어야 한다.
  5. 모스부호도 일종의 문자 인코딩이다.

  ### 아스키(ASCII)코드란?
  - 미국정보교환표준부호(ASCII: American Standard Code for Information Interchange)
  - 영문 알파벳을 사용하는 대표적인 문자 인코딩이다. 컴퓨터와 통신 장비를 비롯한 문자를 사용하는 많은 장치에서 사용되며, 대부분의 문자 인코딩이 아스키에 기초를 두고 있다.
  - 아스키는 7비트 인코딩으로, 33개의 출력 불가능한 제어 문자들과 공백을 비롯한 95개의 출력 가능한 문자들로 총 128개로 이루어진다.
  - ASCII TABLE
  ! [ASCII CODE TABEL] [logo]
  [logo] : https://mblogthumb-phinf.pstatic.net/20160530_210/kimkwon429_1464589111496s786l_JPEG/ascii.jpg?type=w2 "ASCII CODE TABEL."
  - 컴퓨터의 기본저장단위는 1바이트(byte)-8비트(bit)라 했는데 아스키코드는 7비트(bit)만 활용하는 이유는 남은 1비트(bit)를 **통신 에러 검출**을 위해 사용하기 떄문이다.
   이러한 통신 에러 검출을 위한 비트를 **패리티비트(Parity Bit)**라 한다.


  ### 유니코드(Unicode)란?
  - 유니코드는 세계의 주요한 문자 언어를 교환하고 표햔하기 위한 문자-코딩 표준이다.
  - 플랫폼, 프로그램, 언어에 관계없이 모든 문자에 대해 고유한 번호를 제공한다.
  - 유니코드는 아메리카, 유럽, 중동, 아프리카, 인도, 아시아, 태평양 지역(Pacifica)의 언어를 포함하며 고문자와 기술 분야 기호들도 포함한다. 유니코드는 공통적인 기술 분야, 수학 분야 기호 뿐만 아니라 여러 언어를 포함한 텍스트의 교환, 처리, 표현을 지원한다.
  유니코드 문자 집합은 알려진 모든 인코딩을 위해 사용될 수 있다.
  - ASCII문자 집합을 본떠 만들어졌다. 각각의 문자에 이름을 부여한 것이다.











</html>
참고 
위키백과 ascii (https://ko.wikipedia.org/wiki/ASCII)
MDN unicode (https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Unicode)
unicode 홈페이지 (https://home.unicode.org/)
                (http://unicode.org/main.html)

