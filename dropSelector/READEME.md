# 介绍 这个模块可以快速创建一个下拉列表
## 使用
1. html模板：
	html标签中需要有一个容器如：
	`<div id="dropSelect"></div>`
2. js模板：
	```
		new Selector({
	        el
	        menuName
	        menuValue
	    })
	```

## 参数说明
. el: 容器的id，或class，或原生DOM对象
. menuName: 下拉列表的内容，该参数为一个数组
. menuValue: 下拉列表的值, 参数为一个数组
注：menuName的length属性应该和menuValue的length属性相同
