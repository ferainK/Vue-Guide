# VUE ([참고자료](https://kr.vuejs.org/v2/guide/index.html))

## 1. 시작하기
### 1) 환경설정
> VS Code 확장 프로그램 `vetur` 설치

### 2) VUE-CLI를 통한 시작
```c
// 패키지 설치
$ npm i -g @vue/cli

// 프로젝트 시작하기
$ vue create [폴더명]
```

### 3) VUE 처음부터 시작 하기
#### ① 환경 구성
```c
// git에 저장해둔 webpack 활용
$ npx degit ferainK/webapck#eslint [폴더명]

//환경설정
$ npm i vue@next               //vue 문법 해석
$ npm i -D vue-loader@next     //webpack 활용
$ npm i -D vue-style-loader    //webpack 활용
$ npm i -D @vue/compiler-sfc   //vue → html/css/js 변환

$ npm i -D file-loader         //webpack 활용(특정한 파일을 읽어서 출력)

$ npm i -D eslint              //다른 vue 불러오는 확장 기능
$ npm i -D eslint-plugin-vue   //vue에서 eslint 사용하기 위함
$ npm i -D babel-eslint        //babel-eslint 연동

//유용한 기능
$ npm i -D shortid             //고유 ID 생성툴
```
#### ② 디렉토리 설정
```c
# js 폴더 삭제
# src 폴더 추가
# src/main.js 생성
# src/App.vue 생성
# src/components/HelloWorld.vue 생성
# src/assets 폴더 생성 (logo.png 파일 추가)
# .eslintrc.js 생성
```
#### ③ webpack.config.js 재설정
```js
//import 추가
const {VueLoaderPlugin>} = require('vue-loader')

//resolve 설정 추가 지정 (import 할 때, 확장자/경로 생략 가능하게 함)
resolve: {
  extensions: ['.js', '.vue'],
  alias: {
    '~': path.resolve(__dirname, 'src'),
    'assets': path.resolve(__dirname, 'src/assets')
  }
},

//entry 경로 변경 
entry: './src/main.js'

//module/rules 설정 object 추가/수정
{
  test: /\.vue$/, 
  use: 'vue-loader' 
},
{
  test: /\.s?css$/, 
  use: [
    'vue-style-loader', 
    '...'
  ]
},
{
  test: /\.(png|jpe?g|gif\webp)$/,
  use: 'file-loader'
},

// plugins 설정 생성자 추가
new VueLoaderPlugin()
```

#### ④ .eslintrc.js 설정 (참고자료 : [vue](https://eslint.vuejs.org/rules/), [js](https://eslint.org/docs/rules/))
```js
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // vue (택 1)
    'plugin:vue/vue3-essential',              // Lv1) 가장 낮은
    'plugin:vue/vue3-strongly-recommended',   // Lv2) 중간 정도
    'plugin:vue/vue3-recommended',            // Lv3) 가장 엄격

    // js
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  //extends에 설정된 기본설정을 변경하고 싶을 때
  rules: {}
}
```

#### ⑤ main.js / index.html 기본 설정
```js
//main.js
import {createApp} from 'vue'
import App from './App.vue'   // resolve 설정했다면, .vue 생략 가능

createApp({App}).mount('#app')
```

```html
<!-- index.html -->
<body>
  <div id="app"></div>
</body>
```

#### ⑥ App.vue / HelloWorld.vue 작성 (예시)
> `<template>`는 HTML로 변환되지 않는다는 점 참고!
```vue
//App.vue
<template>
  <h1>{{ message }}</h1>
  <HelloWorld/>
</template>

<script>
import HelloWorld from '~/components/HelloWorld.vue'
export default {
  components: {
    HelloWorld
  },
  data() {
    return{
      message: 'Hello?'
    }    
  },
}
</script>

<style lang="scss">

</style>
```
```vue
//HelloWorld.vue
<template>
  <img src="~assets/logo.png" alt="Hello">
</template>
```

### 3. VUE 문법
#### 1) 인스턴스
```js
//인스턴스를 만들고 호출하는 방식임
const app = Vue.createApp({/* Vue 파일 경로 */})
app.mount(/* index.html 파일의 선택자 */)
```

### 2) 라이프사이클
![라이프사이클](./src/assets/lifecycle.png)
```vue
//라이프사이클 훅 : 초기화 -> HTML 변환(컴파일) -> 화면 출력 -> update 과정에서 특정 명령 실행 가능하게 만든 클래스
// 1) 초기화 과정
beforeCreate() {this.xxx}
created() {this.xxx}            //중요 (컴파일 직전)
// 2) vue-html 변환 (HTML 생성)
beforeMount() {this.xxx}
mounted() {this.xxx}            //중요 (화면출력 직전)
// 3) 업데이트중(re-rendered)
beforeupdete() {this.xxx}
updated() {this.xxx}
// 4) 화면종료
beforeunmounted() {this.xxx}
unmounted() {this.xxx}
```
### 3) 디렉티브
```html
<p [Directive]> xxx </p>
```
1\)v-once : 반복 실행 허용 안함 (한 번만 도작) <br/>
2\)v-html : 변수에 html 형태로 입력하면, html 문법에 따라 출력<br/>
(本 변수에 html 형태로 입력하면, 텍스트 그대로 출력됨) <br/>

3\)v-bind : 선택자 명 지정   [(약어) v-bind: → :]
```js
//기본식
v-bind: class = "xxx"

//약어
:class = "xxx"
```
> 동적 클래스 (true일때만 클래스명 지정)
> ```js
> :class = "{[class명]: [true/false], ... }"
> ```

4\) v-on : 이벤트 수신        [(약어) v-on: → @]
> 자세한 이벤트 핸들링은 12항 참고
```js
//기본식
v-on:click="[함수명]"

//약어
@click="[함수명]"
```
※ 속성(clinck, class, id 등)을 매개변수로 표현하는 것도 가능 <br/>
```js
//기본식
v-bind:id="app"

//약어
v-bind:[attr]="app" 
  //단, attr이 선언되어 있어야함  
  return{
    attr="id"
  }
```

### 4) 보간법
```html
<h1> 값: {{count}} </h1>
```

### 5) 반복문 
> index 생략 가능하다. (괄호 불요)

HTML
```html
<li v-for="(fruit, index) in fruits"
      :key="fruit">
      {{ fruit }}</li>
```

JS
```js
export default {
  data() {
    return {
      fruits: ['사과', '배', '포도']}}}
```

> [한걸음더] 배열 데이터 사용하기 <br>
> HTML
> ```html
> <li v-for="fruit in fruits"
>       :key="fruit.id">
>       {{ fruit.name }}</li>
> ```
> 
> JS
> ```js
> export default {
>   data() {
>     return {
>       fruits: ['사과', '배', '포도']}},
>   computed:{
>     newFruits() {
>       return this.fruits.map((fruit, index) => {
>         return {
>           id: index,
>           name: fruit,            
>         }})}}}
> ```

> [한걸음더] 반복생성 시 독립된 id 부여하기 <br>
> JS
> ```js
> import shortid from 'shortid'
> id: shortid.generate()
> ```
### 6) 조건문 (조건부 렌더링)
> 주의사항! <br>
> `v-show`도 조건문과 유사하게 사용되는데, `v-show`는 CSS의 display값만 변환시켜주므로, 렌더링 유무에 차이가 있다. <br>
> 자주 update되는 요소(element)라면 `v-show`를 사용하는게 리소스 관리에 유리하다.
```html
  <template v-if="fruits.length > 0">
    <h1>fruit's list</h1>
  </template>
  <template v-if-else="fruits.length > 5">
    <h1>Too many fruits!!!!</h1>
  </template>
  <template v-else>
    <h1>Nothing</h1>
  </template>
  ```
### 7) data
> \- template에 return하기 위한 데이터 <br>
> \- 재선언 가능 (getter/setter)
```js
data() {
    return {
      count: 2
    }
  }
```

### 8) methods : 매소드(함수/funciton)
> 함수 호출 시, 매개변수가 없다면 괄호 생략 가능 <br>
> 단, 여러 함수를 동시 호출하는 경우 괄호 생략 불가능

<br>

### 9) computed (데이터 값/value)
> 1\. cashing 기능이 있어 연산 최소화하기 위해 사용됨. <br>
> 2\. 매개변수가 없다면, 재선언 불가함 (default: getter) <br>
> 3\. 재선언하기 위해서는, get()/ set() 함수 설정 필요

1\. script에서 조건 생성
```js
computed: {
    reverseFruits(){
      get() {
        return fruit.split('').reverse().join('')
      },
      set(value) {
        this.msg = value
      }
    }}
```

2\. template에서 computed(조건) 호출 방법
```html
<!-- HTML 에서 (get 사용) -->
<li v-for="fruit in reverseFruits"
  :key="fruit">
  {{ fruit }}
</li>
```
```js
// JS 에서 (set 사용)
add() {
  this.reverseFruits += '!!' }
```

### 10) watch
> 특정 데이터(computed 포함)에 대해 변경되는 경우 실행되는 함수
> `변경된 데이터`는 인수에 명시, `기존 데이터`는 this. 로 명시
```js
watch: {
  [데이터]('[new 데이터]']) {
    console.log('[old 데이터]', →, '[new 데이터]') }}
```

### 11) 리스트 렌더링
> ① 변이 매소드 <br>
`push()` : 가장 마지막에 데이터 추가<br>
`pop()` : 가장 마지막 데이터 반환<br>
`shift()` : 가장 앞 데이터 반환<br>
`unshift()` : 가장 앞에 데이터 추가<br>
`splice()` : 데이터 넣고/빼고/삭제 <br>
`sort()` : 배열 정렬<br>
`reverse()` : 배열 반전<br>

> ② 교체 매소드 (재렌더링 하지는 않는다.) <br>
`filter()` : 배열 추출<br>
`concat()` : 배열 연결<br>
`slice()` : 배열 자르기 <br>

### 12) 이벤트 핸들러 (매소드=함수)
HTML
```html
@click="handler(hi, $event)"  /* defalut는 '$event' */
```
JS
```js
methods: {
  handler(msg) {
    console.log(msg)    //'hi' 뿐만 아니라, 발생한 event에 대한 다양한 정보를 확인할 수 있다. (마우스 위치 등)
  }
}
```

> 이벤트 수식어 <br>
> `.stop` : <br>
> `.prevent` <br>
> `.capture` <br>
> `.self` <br>
> `.once` <br>
> `.passive` <br>

