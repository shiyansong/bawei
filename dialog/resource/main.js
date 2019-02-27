require.config({
    baseUrl: "./resource/module",
    paths: {
        velocity: "../libs/velocity.min"
    },
    shim: {
        mod: ["view", "velocity"]
    }
})

require(["mod"], function(CreateModal) {
    var showBtn = document.getElementById("show")
    var hideBtn = document.getElementById("hide")
    hideBtn.onclick = function() {
        var m1 = CreateModal()
        m1.show()
    }
    showBtn.onclick = function() {
        var m1 = CreateModal()
        m1.showFade({
            easing: "spring",
            time: 2000,
            props: {
                top: 100
            }
        });
    }
});