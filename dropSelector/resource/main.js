require.config({
    baseUrl: "./resource/module"
});

require(["select"], function(Selector) {
    //var sel = document.getElementById("dropSelector")
    new Selector({
        el: "#dropSelector",
        menuName: ["第一个", "第二个", "第三个", "第四个"],
        menuValue: ["111", "2222", "333", "444"]
    })
})


