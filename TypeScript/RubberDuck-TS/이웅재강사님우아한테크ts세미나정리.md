# 이웅재강사님 '[8월 우아한테크세미나] 우아한 타입스크립트'세미나 정리.

# 목표 : ts 잘 쓰면 런타임 전에 미리 알 수 있는 오류도 있다.

## 1부 타입스크립트 이론
### 작성자와 사용자
  - 타입 시스템 이란,
    - 컴파일러에게 사용하는 타입을 명시적으로 지정하는 시스템
    - 컴파일러가 자동으로 타입을 추론하는 시스템
  - 타입스크립트의 타입 시스템 
    - 타입을 명시적으로 지정할 수 있다.
    - 타입을 명시적으로 지정하지 않으면, 타입스크립트 컴파일러가 자동으로 타입을 추론.
      ```javascript
      function f1(a){
        return a;
      }

      function f2(a){ // 함수 사용법에 대한 오해를 야기하는 JS
        return a * 38;
      } 
      console.log(f2(10)); // 380
      console.log(f2('Kim')); // NaN
      --- //retrun타입 명시안함.
      function f3(a){ // 타입스크립트의 추론에 의지하는 경우
        return a * 38;
      }
      console.log(f3(10)); // 380
      consele.log(f3('Kim') + 5); // NaN => undifined + 5 = NaN. NaN도 number의 하나이다.
      ```
    - `nolmplicitAny` 옵션 true지정 => 타입을 명시적으로 지정하지 않은 경우, TS가 추론 중에 'any'라고 판단하게 되면, 컴파일 에러를 발생시켜서 명시적으로 지정하도록 유도한다.
      ```javascript
      function f3(a){ // nolmplicitAny옵션 활성화 에 의한 방어.
        return a * 38;
      }
      // 사용자의 코드를 실행할 수 없다. 컴파일이 정상적으로 마무리 될 수 있도록 수정해야 한다.
      console.log(f3(10)); 
      consele.log(f3('Kim') + 5); 하나이다.

      function f4(a:number){
        if(a>0){
          return a * 38;
        }
      }
      console.log(f4(5)); // 190
      console.log(f4(-5) + 5); // NaN => 음수면 retrun 타입이 undefined라서, undefined + 5 가 된다. 
      ```
        - run타임과 compile타임에 타입이 다르다.
    - `stricNullChecks` 옵션을 true지정 => 모든 타입에 자동으로 포함되어 있는 'null'과 'undefined'를 제거해준다. 그래서 run타임과 complie타임에 타입이 달라지지 않는다.
      ```javascript
      function f4(a:number){ // stricNullChecks옵션 활성화.
        if(a>0){
          return a * 38;
        }
      }
      // f4함수의 return 타입은 number|undefined로 추론된다.
      // 런타임과 컴파일타임의 타입이 다르다.
      console.log(f4(5));
      console.log(f4(-5) + 5); // error TS2532: Object is possibly 'undefined'.

      // (작성자를 위해서)명시적으로 리턴 타입을 지정해야 좋다.
      // 실제 함수 구현부의 리턴타입과 명시적으로 지정한타입이 일치하지 않아서 컴파일 에러가 발생한다.
      // error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
      function f5(a:number):number{
        if(a>0){
          return a * 38;
        }
      }
      ```
    - `nolmplicitReturns` 옵션을 true지정 => 함수 내에서 모든 코드가 값을 return하지 않으면, 컴파일 에러를 발생시킨다.
      ```javascript
      // 모든 코드에서 리턴을 직접해야 한다.
      // error TS7030: Not all code paths return a value
      function f5(a:number){
        if(a>0){
          return a * 38;
        }
      }
      ```
      ```javascript
      // 매개변수 object가 들어오는 경우
      function f6(a) {
        return `이름은 ${a.name} 이고, 연령대는 ${Math.floor(a.age / 10) * 10}대 입니다`;
      }
      console.log(f6({ name: 'Kim', age: 38 })); // 이름은 Kim 이고, 연령대는 30대 입니다.
      console.log(f6('Kim')); // 이름은 undefined 이고, 연령대는 NaN대 입니다.

      // object literal type
      function f7(a:{name:string; age:number}):string{
        return `이름은 ${a.name} 이고, 연령대는 ${Math.floor(a.age / 10) * 10}대 입니다`;
      }
      console.log(f7({ name: 'Kim', age: 38 })); // 이름은 Kim 이고, 연령대는 30대 입니다.
      console.log(f7('Kim')); // error TS2345: Argument of type 'string' is not assignable to parameter of type '{ name: string; age: number; }'.
      ```
    - 나만의 타입을 만드는 방법
      ```javascript
      interface PersonInterface {
        name: string;
        age: number;
      }

      type PersonTypeAlias = {
        name: string;
        age: number;
      };

      function f8(a: PersonInterface): string {
        return `이름은 ${a.name} 이고, 연령대는 ${
          Math.floor(a.age / 10) * 10
        }대 입니다.`;
      }

      console.log(f8({ name: 'Kim', age: 38 })); // 이름은 Kim 이고, 연령대는 30대 입니다.
      console.log(f8('Kim')); // error TS2345: Argument of type 'string' is not assignable to parameter of type 'PersonInterface'.
      ```

### interface와 type alias
  - 사용자 정의 타입 만드는 방법 두가지이다.
  - structural type system : (선언을 interface로 하던, type으로 하던)구조가 같으면, 같은 타입
    ```javascript
    interface IPerson {
      name: string;
      age: number;
      speak(): string;
    }

    type PersonType = {
      name: string;
      age: number;
      speak(): string;
    };

    let personInterface: IPerson = {} as any;
    let personType: PersonType = {} as any;

    personInterface = personType;
    personType = personInterface;
    ```
  - nominal type system : 구조가 같아도 이름이 다르면, 다른 타입이다.
    ```javascript
    type PersonID = string & { readonly brand: unique symbol };
    // readonly brand에 unique symbol을 이용하여 PersonID 타입을 만들고, 유니크한 string을 만들 수 있다.

    function PersonID(id: string): PersonID {
      return id as PersonID; // type assertion을 이용한 PersonID타입 변환
    }

    function getPersonById(id: PersonID) {}

    getPersonById(PersonID('id-aaaaaa')); // OK
    getPersonById('id-aaaaaa'); // error TS2345: Argument of type 'string' is not assignable to parameter of type 'PersonID'. Type 'string' is not assignable to type '{ readonly brand: unique symbol; }'.
    ```
  - function과 array 각각의 type alias와 interface로 정의
    ```javascript
    // function
    /*type alias*/
    type EatType = (food:string) => void;
    /*interface*/
    interface IEat{
      (food:string) : void;
    }

    // array
    /*type alias*/
    type PersonList = string[];
    /*interface*/
    interface IPersonList {
      [index:number]: string; // index는 number, 요소 type은 string
    }
    ```
  - intersection
    ```javascript
    // 사용 문법은 다르지만 같은 의미를 가짐.
    interface ErrorHanding {
      success: boolean;
      error?: {message:string};
    }
    interface ArtistsData {
      artists: {name: string} [];
    }

    /*type alias 두가지 타입 합치기*/
    type ArtistsResponseType = ArtistsData & ErrorHanding;

    /*interface 두가지 interface 합치기. 상속받기로 합친다.*/
    interface IArtistsResponse extends ArtistsData, ErrorHanding {}

    let art: ArtistsResponseType;
    let iar: IArtistsResponse;
    ```
  - union types
    ```javascript
    // 유니온타입으로 만든 건 type alias를 쓰고 있고, 만든 type alias를 interface가 상속 받거나 class가 구현하는 행위는 제공되지 않는다.
    interface Bird {
      fly(): void;
      layEggs(): void;
    }

    interface Fish {
      swim(): void;
      layEggs(): void;
    }

    type PetType = Bird | Fish;

    interface IPet extends PetType {} // error TS2312: type alias를 interface가 상속 받는 것은 불가능하다.

    class Pet implements PetType {} // error TS2422: type alias를 class가 구현하는 것은 불가능하다.
    ```
  - Declaration Merging - interface
    - **기본적** 으로 선언을 머지할 수 있는 기능은 **interface에서 제공함.**
      ```javascript
      interface MergingInterface {
        a: string;
      }

      interface MergingInterface {
        b: string;
      }

      let mi: MergingInterface;
      mi.
      ```
  - Declaration Merging - type alias 에서 머지 안됨!.
    - type alias에서는 같은 이름으로 선언한것은 머지하지 않음.
      ```javascript
      type MergingType = {
        a: string;
      };
      type MergingType = {
        b: string;
      };
      ```
  - 강사님은 type alias를 '타입 별칭'으로 받아들여서 주로 이미 있는 타입 이름을 바꾸거나, 인터섹션이나 유니온 한 타입의 이름을 지정할 때 사용한다. interface는 주로 새로운 타입을 만들어낼때 사용한다. 차이점은 위에서 살펴본 머지등의 기능을 제공하느냐 안하느냐.

### 서브 타입과 슈퍼 타입 (6장 고급 타입)
  - 집합의 관계에서 포함되는것을 서브타입이라한다.
  - 공변
    ```javascript
    let sub1 : 1 = 1; // sub1은 리터럴값 1이다.
    let super1: number = sub1; // sub1의 리터럴 값 1은 숫자이므로, super1에 정의한 number에 부합하여 할당될 수 있다.
    sub1 = super1; // error! 그렇지만, super1를 sub1에 할당할 수 없다. sub1은 서브타입이고, super1은 슈퍼타입이기 때문이다.

    let sub2 : [number, number] = [1,2]; // tuple
    let super2 : number[] = sub2; // ok
    // or let super2 : object = sub2; // ok : tuple의 슈퍼타입은 array이고, array의 슈퍼타입은 object이기 때문.

    // 깍두기 같은 존재의 any.
    let sub3: number = 1;
    let super3: any = sub3; 
    sub4 = super3; // any는 모든 타입의 슈퍼타입임.

    // never
    let sub4: never = 0 as never;
    let super4: number = sub4; // never는 모든타입의 서브타입이므로 가능.
    sub4 = super4; // error

    // class문법
    class SubAnimal{}
    class SubDog extends SubAnimal{
      eat(){}
    }
    let sub5:SubDog = new SubDog();
    let super5:SubAnimal = sub5;
    sub5 = super5; // error
    ```
  - 같거나 서브타입인 경우, 할당이 가능하다.=> 공변 
  - 함수의 매개변수 타입만 같거나 슈퍼타입인 경우, 할당이 가능하다.=> 반병
  - `strictFunctionTypes` 옵션 true지정 => 함수의 매개변수 타입만 같거나 슈퍼타입인 경우가 아닐 경우에 에러를 통해 경고한다.
  - `any` 대신 `unknown` 사용.

### 타입 추론 이해하기
  - let과 const의 타입 추론(+as const)
    - const는 리터럴타입으로 추론된다.
  - Best common type
    ```javascript
    let j = [0, 1, null]; // (number | null)[]
    const k = [0, 1, null]; // (number | null)[]

    class Animal {}
    class Rhino extends Animal {}
    class Elephant extends Animal {}
    class Snake extends Animal {}

    let l = [new Rhino(), new Elephant(), new Snake()]; // (Rhino | Elephant | Snake)[]
    const m = [new Rhino(), new Elephant(), new Snake()]; // (Rhino | Elephant | Snake)[]
    const n = [new Animal(), new Rhino(), new Elephant(), new Snake()]; // Animal[]
    const o: Animal[] = [new Rhino(), new Elephant(), new Snake()]; // Animal[]
    ```
  - Contextual Typing - 위치에 따라 추론이 다름
    ```javascript
    // Parameter 'e' implicitly has an 'any' type.
    const click = (e) => {
      e; // any
    };

    document.addEventListener('click',click);
    document.addEventListener('click',(e) => {
      e; // MouseEvent
    });
    ```

### type guard로 안전함을 파악하기(꽃)(6장 고급 타입)
  - 보통 Primitive 타입일 경우 Typeof
    ```javascript
    function getNumber(value:number|string):number{
      value; // number|string
      if(typeof value === 'number'){
        value; // number
      };
      value; // string
      return -1;
    }
    ```
  - instanceof Type Guard
    ```javascript
    interface IMachine {
      name: string;
    }

    class Car implements IMachine {
      name: string;
      wheel: number;
    }

    class Boat implements IMachine {
      name: string;
      motor: number;
    }

    function getWhellOrMotor(machine: Car | Boat): number {
      if (machine instanceof Car) {
        return machine.wheel; // Car
      } else {
        return machine.motor; // Boat
      }
    }
    ```
    - instanceof Type Guard - Error객체 구분에 많이 쓰인다.(에러처리)
      ```javascript
      class NegativeNumberError extends Error {}

      function getNumber(value: number): number | NegativeNumberError {
        if (value < 0) return new NegativeNumberError();

        return value;
      }

      function main() {
        const num = getNumber(-10);

        if (num instanceof NegativeNumberError) {
          return;
        }

        num; // number
      }
      ```
  - in operator Type Guard - Object의 프로퍼티 유무로 처리하는 경우.
    ```javascript
    interface Admin {
      id: string;
      role: string:
    }

    interface User {
      id: string;
      email: string;
    }

    // user is admin 조건을 만들기 불편하다.
    function redirect1(user: Admin | User) {
      if(/*user is admin*/) {
        routeToAdminPage(usr.role);
      } else {
        routeToHomePage(usr.email);
      }
    }

    // 위의 만들기 불편한 user is admin 조건을 
    // in operator를 사용해서 아래와 같이 조건분기 해준다.
    function redirect2(user: Admin | User) {
      if("role" in user) {
        routeToAdminPage(user.role);
      } else {
        routeToHomePage(user.email);
      }
    }
    ```
  - literal Type Guard - Object의 프로퍼티가 같고, 타입이 다른 경우.
    ```javascript
    interface IMachine {
      type: string;
    }

    class Car implements IMachine {
      type: 'CAR';
      wheel: number;
    }

    class Boat implements IMachine {
      type: 'BOAT';
      motor: number;
    }

    // redux에서 reducer의 구조와 비슷
    function getWheelOrMotor(machine: Car | Boat): number {
      if (machine.type === 'CAR') { // redux의 action.type과 비슷.
        return machine.wheel;
      } else {
        return machine.motor;
      }
    }
    ```
  - custom Type Guard - 라이브러리상에서 많이 사용함.
    ```javascript
    function getWhellOrMotor(machine: any): number {
      if (isCar(machine)) {
        return machine.wheel;
      } else if (isBoat(machine)) {
        return machine.motor;
      } else {
        return -1;
      }
    }

    function isCar(arg: any): arg is Car { // function이 true를 반환하면, arg의 타입도 Car라고 보증해줌.
        return arg.type === 'CAR';
    }

    function isBoat(arg: any): arg is Boat { // function이 true를 반환하면, arg의 타입도 Boat라고 보증해줌.
        return arg.type === 'BOAT';
    }
    ```

### class를 안전하게 만들기
  - class property의 타입을 명시적으로 지정해야한다.
    - 명시적으로 지정했지만, `strictpropertyinitiization` 옵션true => Class의 Property가 생성자 혹은 선언에서 값이 지정되지 않으면, 컴파일 에러를 발생시켜 주의를 준다.
      ```javascript
      class Square2 {
        area: number; // area프로퍼티가 초기화 되지 않았음에 대한 경고 에러
        sideLength: number; // sideLength프로퍼티가 초기화 되지 않았음에 대한 경고 에러
      }

      // 사용자가 아래행동을 시도조차 할 수 없도록 만든다.
      const square2 = new Square2();
      console.log(square2.area);
      console.log(square2.sideLength);

      // 선언에서 초기화 해주거나
      class Square3 {
        area: number = 0;
        sideLength: number = 0;
      }

      // 생성자에서 초기화를 해준다.
      class Square4 {
        area: number;
        sideLength: number;

        constructor(sideLength: number) {
          this.sideLength = sideLength;
          this.area = sideLength ** 2;
        }
      }
      ```
    - v4.0.2부터 Square2의 프로퍼티에 명시적 타입 지정을 해주지 않아도, 생성자내부를보고 프로퍼티 타입을 추론한다.
      ```javascript
      class Square5 {
        area; // 4 부터는 any 가 아니라, 생성자에 의해 추론된다.
        sideLength; // 4 부터는 any 가 아니라, 생성자에 의해 추론된다.

        constructor(sideLength: number) {
          this.sideLength = sideLength;
          this.area = sideLength ** 2;
        }
      }

      class Square6 {
        sideLength;

        constructor(sideLength: number) {
          if (Math.random()) {
            this.sideLength = sideLength;
          }
        }

        get area() {
          return this.sideLength ** 2; // error! Object is possibly 'undefined'.
        }
      }
      ```
    - 그렇지만 여전히 생성자를 벗어나면 추론되지 않는다. 그래서 *!로 의도를 표현* 해야 한다.
    ```javascript
    class Square7 {
      sideLength!: number; // ! 로 의도를 표현해야 한다. === constructor에서는 초기화가 되지 않지만, 어디선가는 초기화가 number로 될것이다라는 의도.

      constructor(sideLength: number) {
        this.initialize(sideLength);
      }

      // 생성자가 아닌 다른 함수에서 초기화를 진행해서 추론이 올바르게 되지 않는다. === !로 의도전달.
      initialize(sideLength: number) {
        this.sideLength = sideLength;
      }

      get area() {
        return this.sideLength ** 2;
      }
    }
    ```

## 2부 실전 타입스크립트 코드 작성하기
### conditional type을 활용하기 // 6장 고급타입-조건부타입, 분배적 조건부
  - Item<T> - T에 따라 달라지는 container
    ```javascript
    interface StringContainer {
      value: string;
      format(): string;
      split(): string[];
    }
    interface NumberContainer {
      value: number;
      nearestPrime: number;
      round(): number;
    }
    type Item1<T> = {
      id: T,
      container: any;
    };
    const item1: Item1<string> = {
      id: "aaaaaa",
      container: null
    };
    // Item<T> - T가 string이면 StringContainer, 아니면 NumberContainer
    type Item2<T> = {
      id: T,
      container: T extends string ? StringContainer : NumberContainer;
    }; // extends를 상속으로 이해하고 쓰고 있는데 조건부 타입에서 사용할 때에는 'T tends string?'를 'T가 string안에 있으면?' 이라고 이해하면 쉽다.
    const item2: Item2<string> = {
      id: 'aaaaaa',
      container: null, // Type 'null' is not assignable to type 'StringContainer'.
    };
    // tem<T> - T 가 string 이면 StringContainer, T 가 number 면 NumberContainer, 면 사용 불가
    type Item3<T> = {
      id: T extends string | number ? T : never; // never를 사용함으로써 사용불가를 맡음.
      container: T extends string
        ? StringContainer
        : T extends number
        ? NumberContainer
        : never; // 사용불가를 맡음.
    };
    const item3: Item3<boolean> = {
      id: true, // Type 'boolean' is not assignable to type 'never'.
      container: null, // Type 'null' is not assignable to type 'never'.
    };
    ```
  - ArrayFilter<T> - T에 들어있는 것 중에서 array인것들만 골라내는 필터(never사용)
    ```javascript
    // T 가 array형태라는 것을 T extends any[]로 표현할 수 있다. 
    // T가 배열이면, T 반환, 아니면 아무것도 못하게 never 반환
    type ArrayFilter<T> = T extends any[] ? T : never;

    type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>;

    // 1. string | number | string[] | number[]
    // 2. never | never | string[] | number[]
    // 3. string[] | number[] //최종.
    ```
  - Table or Dino - 제네릭안에 제약사항을 걸어서 사용못하게 만드는 방법(never이용하는 것과 다름.)
    ```javascript
    interface Table {
      id: string;
      chairs: string[];
    }

    interface Dino {
      id: number;
      legs: number;
    }

    interface World {
      // 제네릭 안에서 제약조건을 string 또는 number로 설정함.
      getItem<T extends string | number>(id: T): T extends string ? Table : Dino;
    }

    let world: World = null as any;

    const dino = world.getItem(10);
    const what = world.getItem(true); // Error! Argument of type 'boolean' is not assignable to parameter of type 'string | number'.ts(2345)
    ```
  - Flatten<T>
    ```javascript
    type Flatten<T> = T extends any[]? T[number] : T extends object ? [keyof T] : T ;
    // T가 배열이면? T[number]이런 모양으로 리턴할꺼고 : 아니고 만약에 T가 object면? [keyof T]로 리털할꺼고 : 그것도 아니면 T를 리턴할꺼다.
    // 그냥 T만 리턴이 되려면, 배열도, object도 아니어야한다.

    const numbers = [1,2,3,4,5];
    type NumbersArrayFalttened = Flatten<typeof numbers>;
    // 1. number[]
    // 2. number // 만약 const numbers = [1,'hello',2]; 였다면 number|string으로 나옴.

    const person = {
        name:"Kim",
        age:20
    };
    type SomeObjectFalttened = Flatten<typeof person>;
    // 1. keyof T -> "name"|"age"
    // 2. T["name"|"age"] -> T["name"] | T["age"] -> string|number

    const isMale = true;
    type SomeBooleanFalttened = Flatten<typeof isMale>;
    // true
    ```
  - **infer**  <infer K> === K를 추론한다. 
    ```javascript
    // promise의 return값이 배열인 경우? 그 배열요소의 타입 K: 아니면 any 타입
    type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
    const promises = [Promise.resolve('Mark'), Promise.resolve(38)]; // (string|number)[]

    type Expected = UnpackPromise<typeof promises>; // string | number
    ```
  - 함수의 리턴 타입 알아내기 - my return type *어려워ㅠ*
    ```javascript
    function plus1(seed: number): number {
      return seed + 1;
    }

    // (...args: any) => any 는 함수라는 뜻임.
    // <T `extends (...args: any) => any` 中 이 제약 사항의 의미는 함수여야 된다.> = T extends()
    // T 가 함수면 T의 리턴타입을 infer하겠다는 것. 리턴타입을 infer해서 걔를 R로 꺼낸다. 그 R을 사용하겠다. R로 추론해서 사용하겠다.
    type MyReturnType<T extends (...args: any) => any> = T extends (
      ...args: any
    ) => infer R ? R : any;
    // ) => infer R //위의 함수 plus1의 return을 number로 타입어노테이션 함. return을 R로 추론함.
    //   ? R // 따라서 아래 type Id= //...에서 Id는 number가 됨.
    //   : any;

    // typeof는 런타임에서는 *어떠한 것의 타입을 값으로 반환* 하지만, 컴파일 타임에서는 다르다. 컴파일시에는 *plus1의 타입스크립트 타이핑을 얻어내는 역할* 이다. 
    // typeof plus1 에 위에서 정의한 함수 plus1형태를 넣은 것.
    type Id = MyReturnType<typeof plus1>; // MyReturnType의 제약사항이 함수니까 함수형태에 부합해서 통과함. , Id는 number가 됨.
    lookupEntity(plus1(10));

    function lookupEntity(id: Id) {
      // query DB for entity by ID
    }
    ```
  - 내장 conditional types (1) *중요* // 6장 고급 타입 - 내장 조건부 타입
    ```javascript
    // type Exclude<T, U> = T extends U ? never : T;
    // T에는 속하지만 U에는 없는 타입을 구한다. like without
    type Excluded = Exclude<string | number, string>; // number - diff

    // type Extract<T, U> = T extends U ? T : never;
    // T의 타입 중 U에 할당할 수 있는 타입을 구한다.
    type Extracted = Extract<string | number, string>; // string - filter

    // Pick<T, Exclude<keyof T, K>>; (Mapped Type)
    type Picked = Pick<{name: string, age: number}, 'name'>; // -> name만 있는 객체타입

    // type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
    type Omited = Omit<{name: string, age: number}, 'name'>; // -> name만 없는 객체 타입

    // type NonNullable<T> = T extends null | undefined ? never : T;
    // T에서  null과 undefined를 제외한 버전을 구한다.
    type NonNullabled = NonNullable<string | number | null | undefined>; // string|number
    // 예제
    type A = {a?:number |null};
    type B = NonNullable<A['a']> // number
    ```
  - 내장 conditional types (2)
    ```javascript
    // 함수의 return 타입을 타입으로. 함수의 반환타입을 구한다(제네릭과 오버로드된 함수에서는 동작하지 않는다).
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

    // 함수의 매개변수 타입을 타입으로
    type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

    type MyParameters = Parameters<(name: string, age: number) => void>; // [name: string, age: number]
    // [string, number]
    ```
  - 내장 conditional types (3)
    ```javascript
    interface Constructor {
      new (name: string, age: number): string;
    }
    // 내장 conditional Type인 ConstructorParameters => 생성자의 파라미터 타입을 반환
    /* type ConstructorParameters< T extends new (...args: any) => any > = T extends new (...args: infer P) => any ? P : never; */
    type MyConstructorParameters = ConstructorParameters<Constructor>; // [name: string, age: number]

    /* type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any; */
    type MyInstanceType = InstanceType<Constructor>; // string
    ```
  - Function 인 프로퍼티 찾기 - 어떠한 인터페이스안에 들어있는 함수 프로퍼티 찾는법.
    ```javascript
    // mapped Type사용.
    type FunctionPropertyNames<T> = {
      [K in keyof T]: T[K] extends Function ? K : never;
    }[keyof T]; // 함수 프로퍼티만 뽑아내기
    type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

    type NonFunctionPropertyNames<T> = {
      [K in keyof T]: T[K] extends Function ? never : K;
    }[keyof T]; // 함수 아닌 프로퍼티만 뽑아내기
    type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

    interface Person {
      id: number;
      name: string;
      hello(message: string): void;
    }

    type T1 = FunctionPropertyNames<Person>;
    type T2 = NonFunctionPropertyNames<Person>;
    type T3 = FunctionProperties<Person>;
    type T4 = NonFunctionProperties<Person>;
    ```
  
### overloading을 활용하기
  - 자바스크립트는 오버로딩이 불가능한데, 타입을 붙이는 경우
    ```javascript
    function shuffle(value: string | any[]): string | any[] {
      if (typeof value === 'string')
        return value
          .split('')
          .sort(() => Math.random() - 0.5)
          .join('');
      return value.sort(() => Math.random() - 0.5);
    }

    console.log(shuffle('Hello, Kim!')); // string | any[]
    console.log(shuffle(['Hello', 'Kim', 'long', 'time', 'no', 'see'])); // string | any[]
    console.log(shuffle([1, 2, 3, 4, 5])); // string | any[]
    ```
  - 제네릭을 떠올리자! => conditional type활용
    ```javascript
    function shuffle2<T extends string | any[]>(
      value: T,
    ): T extends string ? string : T;
    function shuffle2(value: any) {
      if (typeof value === 'string')
        return value
          .split('')
          .sort(() => Math.random() - 0.5)
          .join('');
      return value.sort(() => Math.random() - 0.5);
    }

    // function shuffle2<"Hello, Mark!">(value: "Hello, Mark!"): string
    shuffle2('Hello, Kim!');

    // function shuffle2<string[]>(value: string[]): string[]
    shuffle2(['Hello', 'Kim', 'long', 'time', 'no', 'see']);

    // function shuffle2<number[]>(value: number[]): number[]
    shuffle2([1, 2, 3, 4, 5]);

    // error! Argument of type 'number' is not assignable to parameter of type 'string | any[]'.
    shuffle2(1);
    ```
  - 오버로딩을 활용하면? ts의 타입처리를 도와주는거.
    ```javascript
    function shuffle3(value: string): string; // (1)
    function shuffle3<T>(value: T[]): T[]; // (2)
    function shuffle3(value: string | any[]): string | any[] { // (3) 구현부
      if (typeof value === 'string') return value .split('') .sort(() => Math.random() - 0.5) .join('');
      return value.sort(() => Math.random() - 0.5);
    }

    shuffle3('Hello, Kim!');
    shuffle3(['Hello', 'Kim', 'long', 'time', 'no', 'see']);
    shuffle3([1, 2, 3, 4, 5]);
    ```
    - ts의 오버로딩은 런타임에서 사용하는 오버로딩이 아니고, ts의 타입처리만 도와주는 오버로딩이다. 따라서 (1),(2)를 제외하고는 나머지는 런타임에 제대로 동작해야한다. 런타임에 처리되는 부분은 개발자가 알아서 해야한다.
    - (1)과 (2)의 시그니처에 부합하도록 (3)을 작성해야 한다.
  - 클래스의 메서드 오버로딩 : 작성자 -별루
    ```javascript
    class ExportLibraryModal {
      // 타이핑
      // 첫번째 시그니처
      public openComponentsToLibrary(
        libraryId: string,
        componentIds: string[],
      ): void;
      // 두번째 시그니처
      public openComponentsToLibrary(componentIds: string[]): void;
      // 구현 -> 위의 두 타이핑을 모두 만족하도록 구현
      public openComponentsToLibrary(libraryIdOrComponentIds: string | string[],componentIds?: string[],): void {
        // 이곳에서 문제점. libraryIdOrComponentIds를 추론해도, 두번째인자인 componentIds도 자동추론 해주지 않아서 또 조건을 줘서 추론해줘야한다.
        if (typeof libraryIdOrComponentIds === 'string') {
          if (componentIds !== undefined) { // 이건 좀 별루지만,
            // 첫번째 시그니처
            libraryIdOrComponentIds;
            componentIds;
          }
        }

        if (componentIds === undefined) { // 이건 좀 별루지만,
          // 두번째 시그니처
          libraryIdOrComponentIds;
        }
      }
    }
    ```
  - 클래스의 메서드 오버로딩 : 사용자
    ```javascript
    const modal = new ExportLibraryModal();

    modal.openComponentsToLibrary(
      'library-id',
      ['component-id-1', 'component-id-1'],
    );

    modal.openComponentsToLibrary(['component-id-1', 'component-id-1']);
    ```

### readonly, as const를 남발하기
  - readonlyarray<T>와 as const
    ```javascript
    class Layer {
      id!: string;
      name!: string;
      x: number = 0;
      y: number = 0;
      width: number = 0;
      height: number = 0;
    }
    
    // 요소의 값을 다시 set할 수 없는 readonly array
    const LAYER_DATA_INITIALIZE_INCLUDE_KEYS: ReadonlyArray<keyof Layer> = [
      'x', 'y', 'width', 'height',
    ];
    const x = LAYER_DATA_INITIALIZE_INCLUDE_KEYS[0]; // "id" | "name" | "x" | "y" | "width" | "height"

    const LAYER_DATA_INITIALIZE_EXCLUDE_KEYS = ['id', 'name'] as const;
    const id = LAYER_DATA_INITIALIZE_EXCLUDE_KEYS[0]; // "id"

    //as const 없으면 type이 string으로 넓혀진다.
    const LAYER_DATA_INITIALIZE_EXCLUDE_KEYS = ['id', 'name'];
    const id = LAYER_DATA_INITIALIZE_EXCLUDE_KEYS[0];  // 'string'
    ```
  - ReadonlyArray<T>
    ```javascript
    const weekdays: ReadonlyArray<string> = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    weekdays[0]; // readonly string[]
    weekdays[0] = 'Fancyday'; // error! Index signature in type 'readonly string[]' only permits reading.
    ```
  - as const 
    ```javascript
    const weekdays = [
      'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
    ] as const;

    weekdays[0]; // 'sunday'
    weekdays[0] = 'Fancyday' // error! cannot assign to '0' because it is a read-only property.
    ```
  - Mapped Types - 타입스크립트 내장 Mapped types
    ```javascript
    interface IPerson {
      name: string;
      age: number;
    }

    type ReadonlyPerson = Readonly<IPerson>;

    const person: ReadonlyPerson = Object.freeze<IPerson>({
      name: "Kim",
      age: 34,
    });

    person.name = "Gildong"; // error!
    person.age = 30; // error!
    ---

    interface IPerson {
      name: string;
      age: number;
    }

    type Nullable<T> = {
      [P in keyof T]: T[P] | null;
    };

    type Stringify<T> = {
      [P in keyof T]: string;
    };

    type PartialNullablePerson = Partial<Nullable<Stringify<IPerson>>>;
    /*
    type PartialNullablePerson = {
        name?: string | null | undefined;
        age?: string | null | undefined;
        speak?: string | null | undefined;
    }
    */

    let pnp: PartialNullablePerson;
    pnp = { name: 'Mark', age: '38' };
    pnp = { name: 'Mark' };
    pnp = { name: undefined, age: null };
    ---

    // T의 모든 속성을 optional하게 바꿔줌
    type Partial<T> = {
        [P in keyof T]?: T[P];
    };

    // T의 모든 속성을 필수로 설정
    type Required<T> = {
        [P in keyof T]-?: T[P];
    };

    // Make all properties in T readonly
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    };

    // From T, pick a set of properties whose keys are in the union K
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };

    // Construct a type with a set of properties K of type T
    type Record<K extends keyof any, T> = {
        [P in K]: T;
    };
    ```
  - Readonly<T>
    ```javascript
    interface Book {
      title: string;
      author: string;
    }

    interface IRootState {
      book: {
        books: Book[];
        loading: boolean;
        error: Error | null;
      };
    }

    type IReadonlyRootState = Readonly<IRootState>;
    let state1: IReadonlyRootState = {} as IReadonlyRootState;
    const book1 = state1.book.books[0];
    book1.title = 'new';
    ```
  - DeepReadonly<T>
    ```javascript
    type DeepReadonly<T> = T extends (infer E)[]
      ? ReadonlyArray<DeepReadonlyObject<E>>
      : T extends object
      ? DeepReadonlyObject<T>
      : T;

    type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

    type IDeepReadonlyRootState = DeepReadonly<IRootState>;
    let state2: IDeepReadonlyRootState = {} as IDeepReadonlyRootState;
    const book2 = state2.book.books[0];
    book2.title = 'new'; // error! Cannot assign to 'title' because it is a read-only property.
    ```
  - readonly keyword in return type
    ```javascript
    // array and tuple literal types.
    function freturn1(): string[] {
      return ['readonly'];
    }

    const fr1 = freturn1();
    fr1[0] = 'hello'; // 반환값 변경 가능

    // 반환타입에 readonly 추가.
    function freturn2(): readonly string[] {
      return ['readonly'];
    }

    const fr2 = freturn2();
    fr2[0] = 'hello'; // error! Index signature in type 'readonly string[]' only permits reading. -> 반환값 변경 불가능
    ```

### optional type보단 Union type을 사용하기
  - Result1은 optional type. r1의 data가 있으면 => error는 null이고, loading은 false.
    ```javascript
    type Result1<T> = {
      data?: T;
      error?: Error;
      loading: boolean;
    };

    declare function getResult1(): Result1<string>;

    const r1 = getResult1();
    r1.data; // string | undefined
    r1.error; // Error | undefined
    r1.loading; // boolean

    if (r1.data) {
      r1.error; // Error | undefined
      r1.loading; // boolean
    }
    ```
  - Result2는 union type. 'in' operator type guard를 활용하여 r2를 제한시켜 처리.
    ```javascript
    type Result2<T> =
      | { loading: true }
      | { data: T; loading: false }
      | { error: Error; loading: false };

    declare function getResult2(): Result2<string>;

    const r2 = getResult2();

    r2.data; // error! Property 'data' does not exist on type 'Result2<string>'. Property 'data' does not exist on type '{ loading: true; }'.
    r2.error; // error! Property 'error' does not exist on type 'Result2<string>'. Property 'error' does not exist on type '{ loading: true; }'.
    r2.loading; // boolean

    if ('data' in r2) {
      r2.error; // error! Property 'error' does not exist on type '{ data: string; loading: false; }'.
      r2.loading; // false
    }
    ```
  - Reault3은 union type. type guard를 활용해서 r3를 명시적으로 제한시켜 처리.
    ```javascript
    type Result3<T> =
      | { type: 'pending'; loading: true }
      | { type: 'success'; data: T; loading: false }
      | { type: 'fail'; error: Error; loading: false };

    declare function getResult3(): Result3<string>;

    const r3 = getResult3();

    if (r3.type === 'success') {
      r3; // { type: 'success'; data: string; loading: false; }
    }
    if (r3.type === 'pending') {
      r3; // { type: 'pending'; loading: true; }
    }
    if (r3.type === 'fail') {
      r3; // { type: 'fail'; error: Error; loading: false; }
    }
    ```
  - Union Type 과 Literal Type Guard
    ```javascript
    interface Dog {
      kind: 'dog';
      eat: () => string;
    }

    interface Cat {
      kind: 'cat';
      jump: () => string;
    }

    interface Cow {
      kind: 'cow';
      milk: () => string;
    }

    type Pet = Dog | Cat | Cow;

    function stringifyPaymentMethod(pet: Pet): string {
      switch (pet.kind) {
        case 'dog':
          return pet.eat();
        case 'cat':
          return pet.jump();
        case 'cow':
          return pet.milk();
      }
    }
    ```
### never 활용하기
  - 중요. 조건문할때 좋다
  - 에러처리 방법 중 하나?일까?
