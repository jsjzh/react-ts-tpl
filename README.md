# react-ts-tpl

## 说明

1. build
   1. vite
   2. webpack
2. framework
   1. react
   2. react-dom
   3. react-router-dom
   4. styled-components
3. UI
   1. antd
   2. @ant-design/icons
   3. @ant-design/plots
   4. @ant-design/cssinjs
4. store
   1. localforage
   2. immer
   3. use-immer
   4. zustand
5. network
   1. axios
   2. jsonp
   3. query-string
6. tools
   1. ahooks
   2. dayjs
   3. decimal.js
   4. ramda
   5. js-base64

## 前后端共识

1. 请求 url
   1. 尽量使用 restful 的 url 格式
   2. 除了 get 之外，其他的请求参数都放在 body 里
      1. get xxx.com/post/1?pageNo=1&pageSize=20
      2. post xxx.com/post/1 body title:xxx name:xxx
      3. delete xxx.com/post/1 body type:xxx
2. 表格等数据渲染的时候，如果有中文，尽量由后端直接给予
