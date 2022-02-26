# Webpack 사용 방법
```c
// 레포지토리 복제
$ npx degit ferainK/webpack.git 폴더명

//주요 명령어
$ npm run dev       //개발자 모드
$ npm run bulid     //배포
```
1. html / js / static폴더 변경 시, `webpack.config.js`에 반영해주세요.
2. `./static`에 favicon.ico를 추가해주세요.
3. 모든 이미지 파일들은 `./static/img`에 넣어주세요.
4. json/js 파일은 수정하지 마세요.



# WEBPACK 기본서
## 1. 설치 방법
```c
$ npm init -y                       //node.JS 시작

$ npm i -D webpack                  //webpack 설치 (js 해석 파일)
$ npm i -D webpack-cli              //webpack script 명령 사용하기 위함
$ npm i -D webpack-dev-server@next  //webpack dev 편의성 향상

$ npm i -D html-webpack-plugin      //만들어둔 HTML 파일을 병합하기 위함

$ npm i -D copy-webpack-plugin      //static 폴더 사용하기 위함

$ npm i -D css-loader               //css를 읽고 분석하기 위함
$ npm i -D style-loader             //html에 css 적용하기 위함
$ npm i -D sass                     //scss를 읽고 분석하기 위함
$ npm i -D sass-loader              //scss를 읽고 분석하기 위함 (webpack에서)

$ npm i -D postcss                  //css css 후처리 패키지
$ npm i -D autoprefixer             //css 공급업체별 css 자동 적용
$ npm i -D postcss-loader           //autoprefixer 적용 위함 (webpack에서)

$ npm i -D @babel/core                      //다른 버전의 js 자동 변환
$ npm i -D @babel/preset-env                //babel 기본값 적용
$ npm i -D @babel/plugin-transform-runtime  //비동기(async-await) 문법 지원
$ npm i -D babel-loader                     //babel 적용 위함 (webpack에서)

```

## 2. package.json 설정 방법
```json
{
  "script": {
    "dev": "webpack-dev-server --mode development",
    "bulid": "webpack --mode production"
  },

  //autoprefixer 사용 설정
  "browerslist":[
    "> 1%",
    "last 2 versions"
  ]
}
```

## 3. webpack.config.js 설정 방법 (따로 만들어야됨)
```js
//import
//--------output 경로 설정 시 필요한 설정--------
//const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlPlugin = require('copy-webpack-plugin')

//export
module.exports = {
  //js 지정 (webpack은 기본적으로 js만 읽을 수 있음)
  enrty:'.main.js',

  //결과물 저장 장소 관련 설정 (경로)
  output: {
    //--------webpack의 기본값이라 생략해둠--------
    //path: path.resolve(__dirname, 'dist')   //절대경로 입력 필요 (= 현재 경로\dist)
    //filename: 'main.js'                   //entry와 이름 동일하게 설정
    clean: true     //지정된 폴더 내 기존 파일 삭제 여부 (다른 설정들도 있음)
  },

  //분석 방법 설정
  module:{
    //scss, css
    rules:[
      {
        test: /\.s?css$/,     //?css = scss, css, acss, ...
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      //js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:[
          'babel-loader'
        ]
      },
    ]
  },

  // 변환자료 저장 시 사용할 셋팅
  plugins: [
    //html 복사하기 위함
    new HtmlPlugin({
      template: './index.html'   //index.html 위치를 지정하면됨
    }),
    //css, src 등 복사기기 위함
    new CopyPlugin({
      patterns: [
        {from: 'static'}         //static말고 다른 폴더를 추가할 수도 있음
      ]}),
  ],

  //dev 옵션
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true
  }

}
```
## 4. css 파일 적용 방법
> main.js파일 상단에 css import 필요
```js
import '[css 경로]'
```

## 5. static 폴더 (plugins에서 다른 폴더로도 설정 가능)
> webpack은 js에 대한 내용만 처리하기에 img 파일은 별도로 모아두어야 dev/bulid 가능함 </br>
> static 폴더에는 favicon.ico / image 폴더를 넣어둬야됨 

## 6. .postcssrc.js 설정 (autoprefixer 사용 위함)
```js
module.exports = {
  plugins: [
    requrie('autoprefixer')
  ]
}
```

## 7. .babelrc.js
```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-transform-runtime']
  ]
}
```