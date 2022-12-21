


# ohlight

一个基于 `web components` 的`跨框架/库（vue、react等）`、`无框架`的高亮划词组件。无需任何挂载注册，只需引入`js`文件就可以直接在项目中使用。

注：目前仅支持浏览器环境。

# 项目地址

gitee: [点击前往](https://gitee.com/xiaoruil/o-light.git)

github: [点击前往](https://github.com/xiaoruil/o-light.git)

# 安装

```javascript

// pnpm 
pnpm i ohlight

// npm
pnpm i ohlight

// yarn
yarn add ohlight

```

# 使用

```javascript

<o-light></o-light>

<script type="module">
    import { oLight } from "ohlight"
</script>

```

## 1、基础使用

```javascript

<o-light content="清道夫" keywords="清"></o-light>

<script type="module">
    import { oLight } from "ohlight"
</script>

```
## 2、多个关键词

```javascript

<o-light content="清道夫" keywords="清,夫"></o-light>

<script type="module">
    import { oLight } from "ohlight"
</script>

```
## 3、自定义高亮样式

自定义样式需要使用一个序列化`CSSStyleDeclaration`后的对象字符串，详细内容可以看下方的`api`说明。

```javascript

<o-light content="清道夫" keywords="清" :styles="style"></o-light>

<script setup>
const style =  JSON.stringify({
    color: 'red',
    background: 'aliceblue',
    'font-style': 'oblique'
})
</script>

<script type="module">
    import { oLight } from "ohlight"
</script>

```

## 4、`vue` 中使用

这里使用的是`vue3`，`vue2`中是差不多的。在`vue`中需要注意的是要过滤掉组件的注册解析。具体过滤方法可以看下面的配置示例。

**使用示例**

```javascript
<template>
    <div>
        <o-light content="清道夫"
         keywords="清" 
         :styles="style"
        ></o-light>
    </div>
</template>


<script type="module">
    import { oLight } from "ohlight"
</script>

<script setup>
import {ref} from "vue"

let style = JSON.stringify({
    color: 'red',
    background: 'aliceblue',
    'font-style': 'oblique'
})

</script>
```

**浏览器内配置示例**

```javascript
//仅当使用浏览器内编译时有效
app.config.compilerOptions.isCustomElement = tag => tag.includes('-')
```

**Vite配置示例**

```javascript
//vite.config.js
export default {
	plugins:[
		vue({
			template:{
				compilerOptions:{
					//将所有包含短横线的标签作为自定义元素处理
					isCustomElement:tag => tag.includes('-')
				}
			}
		})
	]
}
```

**Vue CLI配置示例**

```javascript
//vue.config.js
module.exports = {
	chainWebpack:config => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.tap(option => ({
				...options,
				compilerOptions:{
					//将所有以ion-开头的标签作为自定义元素处理
					isCustomElement:tag => tag.startsWith('ion-')
				}
			}))
	}
}

```

## 5、`react` 中使用

```javascript
import {oLight} from "ohlight"

<o-light content="章三积分快到了时间" keywords="章三"></o-light>
```

## 6、获取组件实例并操作组件

```javascript

<o-light content="清道夫" keywords="清" :styles="style" @load="load"></o-light>

<script setup>
const style =  JSON.stringify({
    color: 'red',
    background: 'aliceblue',
    'font-style': 'oblique'
})

const load = (e) => {
    // e.detail.shadowRoot.children[0].style.background = 'red'
}
</script>

<script type="module">
    import { oLight } from "ohlight"
</script>

```

# 组件实例说明

由于采用的`web components`中`shadowRoot`的方法实现，故需要操作`dom`的话则需要操作其真实`dom`才会达到效果，这里我用`load`方法的回调将组件实例返回。需要操作`dom`则需要通过`event.detail.shadowRoot.children[0]`的形式拿到真实可以操作的`dom`。当然，你如果仅仅只是操作表层（如：控制隐藏/显示等）的话则不需要获取到真实`dom`。


# Api

## 属性

| 属性名 | 类型 | 描述 | 默认值 |
|--|--|--|--|
| content | `string` | 文本内容 | - |
| keywords | `string` | 关键词字符串，多个关键词使用`'','`隔开 | - |
| styles | `string`  | 高亮关键字样式，仅支持序列化后的`CSSStyleDeclaration`对象；`注：涉及到驼峰写法的需要改写成 - 连接`；`如：fontStyle 需要写成 font-style ` | - |
| stableTime | `string` ｜ `number`  | 防抖时间，单位：(ms) | 200 |
|  |  |  |  |

## 事件

所有的事件内容均在`event.detail`中。

| 事件名 | 类型 | 描述 | 默认值 |
|--|--|--|--|
| load | `Function`  | 该方法在组件绘制完成并挂载后触发，返回当前组件实例，内容在`event.detail中`，可供操作`dom`使用等 | - |
| connectedCallback | `Function` | 当自定义元素第一次被连接到文档 DOM 时被调用 | - |
| disconnectedCallback | `Function` | 当自定义元素与文档 DOM 断开连接时被调用 | - |
| adoptedCallback | `Function` | 当自定义元素被移动到新文档时被调用 | - |
| attributeChangedCallback | `Function` | 当自定义元素的一个属性被增加、移除或更改时被调用。 | - |
|  |  |  |  |

# 浏览器支持情况

| chrome | edge | firefox | opera | safari |
|--|--|--|--|--|
| 53+ | 79+ | 63+ | 40+ | 10+ |
| | | | | |


