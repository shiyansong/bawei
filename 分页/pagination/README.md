# Pagination使用

## 教程

如果需要构建一个分页，那么使用以下代码。

```js
var page = new Pagination({
    total:500, //数据的总条数
    pageSize:8, // 每页要显示的条数
    current:1,  // 默认要显示的页数
    del:DomDiv, // 分页要挂载的节点
    changePage:function(current){ //页码改变后的回到函数 
        // current为当前切换到的页码数
    }
});
```

## api

### page.init();

如果页码的配置发生变化，可使用该方法进行重新的初始化，接收的参数和实例化分页的参数一致。

### page.jumpToPage(current);

该方法可以跳转页码，current为要跳转的页码。