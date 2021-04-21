# React와 Key

key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야한다.<br/>
key를 선택하는 가장 좋은 방법은 리스트 각 항목들을 고유하게 식별할 수 있는 문자열을 사용하는것이다. 대부분의 경우 ID를 key로 사용한다.<br/>
만약 안정적인 ID가 없다면 최후의 수단으로 항목의 index를 key로 사용할 수 있다.<br/>
항목의 순서가 바뀔 수 있는 경우에는 key에 index를 사용을 권장하지 않는다.
이로 인해 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있다.


## key로 컴포넌트 추출하기
키는 주변 배열의 context에서만 의미가 있다.
```javascript
function ListItem(props) {
  // return(<li key={value.toString()}>{value}</li>) 이런 방식으로 여기에 key를 지정할 필요가 없습니다.

  // 맞습니다! 여기에는 key를 지정할 필요가 없습니다. 
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // <ListItem value = {number}/> 이런 방식으로 여기에 key 지정을 빼면 안됩니다.

    // 맞습니다! 배열 안에 key를 지정해야 합니다.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
`map()`함수 내부에 있는 엘리먼트에 key를 주는게 좋습니다.

## key는 형제 사이에서만 고유한 값이어야 한다.sibling
key는 배열 안의 형제 사이에서 고유해야하고, 전체 범위에서는 고유할 필요는 없다.
두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있다
```javascript
function Blog(props) {
  const sidebar = ( // sidebar 형제
    <ul>
      {props.posts.map((post) =>
      // sidebar 배열에서의 고유 값
        <li key={post.id}> 
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) => // contetn 형제
    // content 배열에서의 고유 값
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  // const NotGood = posts.map((post)=>
  //   <Post 
  //     key={post.id} 
        // 컴포넌트로 전달하지 않는다. `props.id`는 읽지만, `props.key`는 읽을 수 없다.
  //     id={post.id} 
  //     title={post.title} />
  // );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```
`map()`함수가 너무 많이 중첩된다면 `컴포넌트 추출`을 하는것이 좋다.

# 재조정 (Reconciliation)
O(n3)의 복잡도에서 O(n)의 복잡도로 낮춘다.

- 조건 두 가지.
    1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
        - ex) virtualDOM Tree와 realDOM Tree가 있다.
    1. 개발자가 `key prop`을 통해, 여러 렌더링사이에서 어떤 자식 엘리먼트가 변경되지 않아야할지 표시해줄 수 있다.

## 비교 알고리즘(Diffing Algorithm)
`virtualDOM Tree`와 `realDOM Tree`가 있다.<br/>
두 개의 트리를 비교할 때, React는 두 엘리먼트(element)의 루트(root)엘리먼트부터 비교한다.

1. 엘리먼트의 타입이 다른 경우
    - root element의 type이 다르면, React는 이전 트리를 버리고, 완전히 새로운 트리를 구축한다.
    - root element 아래의 모든 컴포넌트도 언마운트(Unmount)되고, 그 state도 사라진다.
        ```javascript
        <div><Count/></div>

        <span><Count/></span>
        ```
        이전 `Count`는 사라지고, 새로 다시 마운트(Mount)된다.
2. DOM 엘리먼트의 타입이 같은 경우
    - 같은 타입의 두 React DOM element를 비교할 때, React는 두 element의 속성을 확인해서, 동일한 내역은 유지하고 변경된 속성들만 갱신한다. `className`만 수정한다.
        ```javascript
        <div className="before" title="now"/>
        <div className="after" title="now"/>
        ```
    - `style`이 갱신될 때도 React는 변경된 속성만 갱신한다.
        ```javascript
        <div style={{color:'red', fontSize:'14px'}}/>
        <div style={{color:'blue', fontSize:'14px'}}/>
        ```
3. 같은 타입의 컴포넌트 엘리먼트
    - 컴포넌트가 갱신되면 인스턴스는 동일하게 유지되어 렌더링 간 state가 유지된다. React는 새로운 엘리먼트의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 props를 갱신한다.

## 자식에 대한 재귀적 처리
```javascript
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```
위의 코드처럼 단순하게 구현하면 문제없이 동작한다.<br/>
하지만 아래 코드를 보면 문제가 있다.
```javascript
<ul>
  <li>apple</li>
  <li>banana</li>
</ul>

<ul>
  <li>mango</li>
  <li>apple</li>
  <li>banana</li>
</ul>
```
React는 `<li>apple</li>`과 `<li>banana</li>`종속 트리를 그대로 유지하고, 다른 모든 자식을 변경한다.

### Keys
위의 문제의 해결 => `key`!!<br/>
자식들이 key를 가지고 있다면, React는 key를 통해 기존 트리와 이후 트리의 자식들이 일치하는지 확인한다.<br/>
```javascript
<ul>
  <li key="2020">apple</li>
  <li key="2021">banana</li>
</ul>

<ul>
  <li key="2019">mango</li>
  <li key="2020">apple</li>
  <li key="2021">banana</li>
</ul>
```
`2019`key를 가진 엘리먼트가 새롭게 추가되었고, 기존의 `2020` `2021`key를 가진 엘리먼트는 이동만 했다.
