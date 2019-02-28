define(['../pagination/index.js'],function(Pagination){
    var page = new Pagination({
            el:document.getElementById('page'),
            changePage:function(current){
                console.log(current);
            }

        });
    window.page = page;
});