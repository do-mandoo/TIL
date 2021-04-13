# useEffect, useMemo, useCallback

## useEffect
- 라이프사이클을 대처하는 HOOK이다.
- 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 본다.
  - class Component 라이프사이클은 컴포넌트 중심이다.
    - 클래스 컴포넌트 종류:
      - `componentWillMount` : 마운트 되려고 할 때
      - `componentDidMount` : 마운트 되고나서
      - `componentDidUpdate` : 업데이트 되었을 때
      - `componentWillUnmount` : 언마운트 될 때

```javascript
ex) useEffect(didUpdate);
사용구조
useEffect(()=>{
  console.log('렌더링이 완료 되었습니다!')
},[])
```
- `useEffect`에 전달된 함수는 화면에 렌더링될 때마다 특정 작업을 수행하게 된다.
- 기본적으로 동작은 모든 렌더링이 완료된 **후** 에 수행되지만, 어떤 값이 변경되었을때만(=마운트될때만 실행) 실행되게 할수도 있다.

```javascript
useEffect(()=>{
  console.log('렌더링이 완료되었습니다.')
}) // 값들이 변할때마다 찍힘.
useEffect(()=>{
  console.log('마운트 될 때만 실행합니다.')
},[]) // 최초 한번 렌더될때만 찍힘.
useEffect(()=>{
  console.log(특정값,'특정 값이 업데이트 될때만 실행합니다.')
},[특정값]) // 특정값만 변할때마다 찍힘.
```

- 뒷정리하기CleanUp
  - useEffect는 기본적으로 렌더링되고 난 직후마다 실행, 두번째 파라미터배열에 무엇을 넣는가에 따라 실행되는 조건이 달라진다.
  - 컴포넌트가 언마운트 되기 전이나, 업데이트되기 직전에 어떠한 작업을 수행하고싶다면, useEffect에서 뒷정리(cleanup)함수를 반환해줘야한다.
  - 이 정리함수는 메모리 누수 방지를 위해 UI에서 컴포넌트를 제거하기 전에 수행한다.
    - 만약 컴포넌트가 (그냥 일반적으로 수행하는 것처럼) 여러번 렌더링 된다면 **다음 effect가 수행되기 전에 이전 effect는 정리된다.**

```javascript
// 뒷정리하기clean up
useEffect(()=>{
  console.log('effect');
  console.log('특정값');
  return()=>{
    console.log('cleanup');
    console.log('특정값')
  }
})
```
```javascript
// 오직 언마운트 될때만 뒷정리하기clean up
useEffect(()=>{
  console.log('effect');
  console.log('특정값');
  return()=>{
    console.log('cleanup');
    console.log('특정값')
  }
},[특정값]) //두번째 파라미터에 비어있는 배열을 넣으면 된다.
```

## useMemo
함수형 컴포넌트 내부에서 발생하는 연산을 최적화 할 수 있다.<br/>
<br/>
렌더링하는 과정에서 특정 값(===의존성 값)이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식이다.<br/>
<br/>

`useMemo`로 전달된 함수는 렌더링 중에 실행된다!!<br/>
`useMemo`는 성능 최적화를 위해 사용할 수는 있지만, 보장되지는 않는다!!

## useCallback
`useMemo`와 상당히 비슷한 함수다.<br/>
역시 렌더링 성능을 최적화해야하는 상황에서 사용함.<br/>
이 HOOK을 사용하면, 만들어 놨던 **함수를 재사용** 할 수 있다.<br/>
```javascript
useCallback(()=>{
  // 첫번째 파라미터
  console.log('useCallback사용')
},['두번째 파라미터'])
```
- 첫 번째 파라미터: 생성하고 싶은 함수를 넣는다.
- 두 번째 파라미터: 배열(=어떤 값이 바뀌었을 때 함수를 새로 생성해야하는지 명시해야한다.)
  - 빈 배열일 때: 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용하게 된다.
  - 빈 배열이 아닐 때: 배열 안의 값들이 바뀌거나, 추가될때 새로 만들어진 함수를 사용하게 된다.


**함수 내부에서 상태 값에 의존해야 할때는 그 겂을 반드시 두번쨰 파라미터 안에 포함시켜야 한다.**

`useCallback(fn, deps)`은 `useMemo(() => fn, deps)`와 같다.