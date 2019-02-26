require.config({
    baseUrl: "./resource/module",
    paths: {
        css: "../libs/css.min",
        velocity: "../libs/velocity.min"
    },
    shim: {
        picture: ["css!../css/index.css"]
    }
});

require(["picture"], function(Picture) {
   new Picture({
       el: "#wrap"
   })
})