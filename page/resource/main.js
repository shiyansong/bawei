require.config({
    baseUrl: "./resource/module",
    paths: {
        css: "../libs/css.min",
        velocity: "../libs/velocity.min"
    },
    shim: {
        json: {
            deps: ["css!../css/index.css"],
            exports: "json"
        }
    }
});

require(["page", "move", "json", "dialog"], function(Page, Move, json, Dialog) {
    var totalPage = Math.ceil(json.title.length / 10)
    new Page({
        el: "#page",
        curPage: 1,
        //totalPage: totalPage
        totalPage,
        callback(nowPage, total) {
            new Move({
                el: ".list",
                data: json,
                nowPage,
            });
        }
    })
    var oList = document.querySelectorAll('li');
    oList.forEach(item => {
        item.onclick = () => {
            console.log(item.children[0].src)
            new Dialog({
                width: 200,
                height: 200,
                src: item.children[0].src
            })
        }
    })
})