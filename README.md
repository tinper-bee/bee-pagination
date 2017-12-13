# bee-pagination
[![npm version](https://img.shields.io/npm/v/bee-pagination.svg)](https://www.npmjs.com/package/bee-pagination)
[![Build Status](https://img.shields.io/travis/tinper-bee/bee-pagination/master.svg)](https://travis-ci.org/tinper-bee/bee-pagination)
[![Coverage Status](https://coveralls.io/repos/github/tinper-bee/bee-pagination/badge.svg?branch=master)](https://coveralls.io/github/tinper-bee/bee-pagination?branch=master)

用于内容过多，分页显示内容

Pagination组件内部集成了子组件PaginationButton.PaginationButton并不暴露给用户。

## 使用

使用单独的bee-Pagination包
#### 组件引入
先进行下载bee-Pagination包
```
npm install --save bee-pagination
```
组件调用
```js
import Pagination from 'bee-pagination';
React.render(<div>
   <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={20}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handleSelect.bind(this)} />
</div>, document.getElementById('target'));
```
#### 样式引入
- 可以使用link引入dist目录下bee-pagination.css
```
<link rel="stylesheet" href="./node_modules/build/bee-pagination.css">
```
- 可以在js中import样式
```js
import "./node_modules/src/Pagination.scss"
//或是
import "./node_modules/build/bee-pagination.css"
```




## API
|参数|说明|类型|默认值|
|---|----|---|------|
|items|总页数|number|''|
|activePage|哪一页是激活状态|number|''|
|onSelect|切换页的方法|func |''|
|maxButton|显示最多页数按钮|number|''|
|prev|显示上一页按钮|bool|false|
|next|显示下一页按钮|bool|''|
|first|显示第一页按钮|bool|false|
|last|显示最后一页按钮|bool|last|
|ellipsis|显示省略按钮|bool|false|
|boundaryLinks|显示边界按钮|bool|false|
|gap|按钮之间有间隔|bool|false|
|noBorder|不显示按钮边框|bool|false|
|size|按钮大小oneOf:lg,sm,''|string|''|

#### 开发调试

```sh
$ git clone https://github.com/tinper-bee/bee-pagination
$ cd bee-pagination
$ npm install
$ npm run dev
```
