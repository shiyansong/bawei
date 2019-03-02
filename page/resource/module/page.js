define(function() {
    var Page = function(opts) {
        if(!opts) {
            //console.error("您需要传递一个对象");  
            throw Error("您需要传递一个对象");
            return;
        };

        if(!opts.el) {
            throw Error("您需要有一个容器");
            return;
        }

        this.ele = (typeof opts.el === "string") ? document.querySelector(opts.el) : opts.el;
        this.ele.style.cssText = "position: fixed;bottom: 20px;left: 50%;transform: translateX(-50%);";
        Object.assign(this, Page.DEFAULTS, opts);
        this.init();
    }
    Page.DEFAULTS = {
        curPage: 1,
        totalPage: 5,
        callback: function() {}
    }
    Page.prototype = {
        constructor: Page,
        init() {
            this.createPage();
            this.click();
        },
        createPage() {
            //首页
            if(this.curPage >= 4 && this.totalPage >= 6) {
                var oA = document.createElement('a');
                oA.href = "#1";
                oA.innerHTML = "首页";
                this.ele.appendChild(oA); 
            }
            //上一页
            if(this.curPage >= 2) {
                var oA = document.createElement('a');
                oA.href = "#" + (this.curPage - 1);
                oA.innerHTML = "上一页";
                this.ele.appendChild(oA); 
            }

            if(this.totalPage <= 5) {
                for(var i = 1; i <= this.totalPage; i++) {
                    var oA = document.createElement('a');
                    oA.href = "#" + i;
                    if(this.curPage === i) {
                        oA.innerHTML = i;
                    } else {
                        oA.innerHTML = '[' + i + ']';
                    }
                    this.ele.appendChild(oA)
                }
            } else {
                for(var i = 1; i <= 5; i++) {
                    var oA = document.createElement('a');
                    if(this.curPage === 1 || this.curPage === 2) {
                        oA.href = "#" + i;
                        if(this.curPage === i) {
                            oA.innerHTML = i;
                        } else {
                            oA.innerHTML = '[' + i + ']';
                        }
                    } else if(this.totalPage - this.curPage === 1 || this.totalPage - this.curPage === 0) {
                        oA.href = "#" + (this.totalPage - 5 + i);
                        if((this.totalPage - this.curPage === 1 && i === 4) || (this.totalPage - this.curPage === 0 && i === 5)) {
                            oA.innerHTML = (this.totalPage - 5 + i);
                        } else {
                            oA.innerHTML = '[' + (this.totalPage - 5 + i) + ']';
                        }
                    } else {
                        oA.href = "#" + (this.curPage - 3 + i);
                        if(i === 3) {
                            oA.innerHTML = (this.curPage - 3 + i);
                        } else {
                            oA.innerHTML = '[' + (this.curPage - 3 + i) + ']';
                        }
                    }
                    this.ele.appendChild(oA);
                }
            }

            //下一页
            if(this.totalPage - this.curPage >= 1) {
                var oA = document.createElement('a');
                oA.href = "#" + (this.curPage + 1);
                oA.innerHTML = "下一页";
                this.ele.appendChild(oA);
            }

            //尾页
            if(this.totalPage - this.curPage >= 3 && this.totalPage >= 6) {
                var oA = document.createElement('a');
                oA.href = "#" + this.totalPage;
                oA.innerHTML = "尾页";
                this.ele.appendChild(oA);
            }

            this.callback(this.curPage, this.totalPage);
        },
        click() {
            var aA = this.ele.querySelectorAll("a");
            aA.forEach(item => {
                item.style.cssText = "text-decoration: none;margin-right: 5px;color: #00f;"
                item.onclick = () => {
                    console.time(0);
                    var curPage = parseInt(item.getAttribute('href').substring(1));
                    //console.dir(this)
                    this.curPage = curPage;
                    this.ele.innerHTML = "";
                    this.init(); 
                    console.timeEnd(0)
                    return false;
                }
            })
        }
    }

    return Page;
})

