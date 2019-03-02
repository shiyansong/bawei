define(["velocity"], function(Velocity) {
    var Move = function(opts) {
        if(!opts) {
            throw Error("您需要传递一个对象!");
            return;
        }
        this.el = (typeof opts.el === "string") ? document.querySelector(opts.el) : opts.el;
        this.data = opts.data;
        this.nowPage = opts.nowPage;  //当前页
        //计算出每页需要显示的数据数
        this.num = (this.nowPage * 10) < this.data.title.length ? 10 : this.data.title.length - (this.nowPage - 1) * 10;
        this.iNow = 9; //最后一张图片的下标
        this.init();
    }
    Move.prototype = {
        constructor: Move,
        arr: [], //用来存储所有元素的位置的
        init() { //初始化函数
            if(this.el.children.length === 0) {
                this.create();
                this.layer();
            } else {
                this.move();
            }
        },
        create() {  //创建视图
            for(var i = 0; i < this.num; i++) {
                var oLi = document.createElement('li');
                oLi.innerHTML = `<img src="${this.data.title[(this.nowPage - 1) * 10 + i]}" />`
                this.el.appendChild(oLi);
            }
        },
        layer() { //浮动布局--->固定布局
            for(var i = 0; i < this.el.children.length; i++) {
                this.arr.push([this.el.children[i].offsetLeft, this.el.children[i].offsetTop]);
            }

            for(var i = 0; i < this.el.children.length; i++) {
                this.el.children[i].style.cssText = `position: absolute; left: ${this.arr[i][0]}px; top: ${this.arr[i][1]}px; margin: 0`;
            }  
        },
        move() {  //运动--->换图片进行分页
            clearInterval(timer);
            var timer = setInterval(() => {  //先把图片进行收缩
                Velocity(this.el.children[this.iNow], "stop");
                Velocity(this.el.children[this.iNow], {
                    left: 350,
                    top: 350,
                    opacity: 0
                })

                if(this.iNow === 0) {
                    clearInterval(timer);
                    this.iNow = this.num - 1; //iNow应该是每页显示的图片数的下标

                    //更换图片
                    for(var i = 0; i < this.el.children.length; i++) {
                        this.el.children[i].innerHTML = `<img src="${this.data.title[(this.nowPage - 1) * 10 + i]}" title="点击图片查看大图" />`
                    }

                    //换号路径的图片弹出
                    clearInterval(timer2);
                    var timer2 = setInterval(() => {
                        Velocity(this.el.children[this.iNow], "stop");
                        Velocity(this.el.children[this.iNow], {
                            left: this.arr[this.iNow][0],
                            top: this.arr[this.iNow][1],
                            opacity: 1
                        })

                        if(this.iNow === 0) {
                            clearInterval(timer2);
                            this.iNow = this.num - 1;
                        } else {
                            this.iNow--
                        }
                    }, 100)
                } else {
                    this.iNow--;
                }
            }, 100)
        }
    }

    return Move;
});