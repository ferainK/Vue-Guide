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
$ npx degit ferainK/webapck [폴더명]

//환경설정
$ npm i vue@next               //vue 문법 해석
$ npm i -D vue-loader@next     //webpack 활용
$ npm i -D vue-style-loader    //webpack 활용
$ npm i -D @vue/compiler-sfc   //vue → html/css/js 변환
$ npm i -D file-loader         //webpack 활용(특정한 파일을 읽어서 출력)
$ npm i -D eslint              //다른 vue 불러오는 확장 기능
$ npm i -D eslint-plugin-vue   //vue에서 eslint 사용하기 위함
$ npm i -D babel-eslint        //babel-eslint 연동
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