# 介绍
可以快速创建一个图片轮播的功能

## 用法
1. html模板
    <div id="wrap">
        <ul>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
        </ul>
    </div>

2. js调用
    new Picture({
        el: "#wrap"
    })
    您只需这一行js代码即可创建一个图片轮播的功能

3. 参数配置
    el: 父容器, 即可传递class，也可传递id，还可以是一个原生DOM对象；推荐使用id；该参数为必传项
    pagination：是否显示分页器，默认为false，该参数为选传项
    btn：是否显示左右轮播按钮,默认为false，该参数为选传项
    loop：是否循环播放，默认为false，该参数为选传项
    autoplay：是否自动播放，默认为false，该参数为选传项
    direction：图片播放的方向，此参数有两个值，分别为"horizontal"和"vertical"; horizontal表示横向播放; vertical表示纵向播放，该参数为选传项
    speed: 图片播放的速度，默认是400ms，该参数为选传项
    playtime：每一张图片播放的时间，默认是3000ms，该参数为选传项

## 说明
html模板中的子元素不限于是ul包裹li的格式；可以是任何格式的包裹如：
    <div>
        <div><img src="" alt=""></div>
        <div><img src="" alt=""></div>
        <div><img src="" alt=""></div>
        <div><img src="" alt=""></div>
    </div>