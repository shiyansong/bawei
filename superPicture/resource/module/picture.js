define(["velocity"], function (Velocity) {
    var Picture = function (opts) {
        //判断容器是否存在
        if(!opts.el) {
            alert("您需要传递一个容器！"); 
            return;
        }

        this.ele = (typeof opts.el === "string") ? document.querySelector(opts.el) : opts.el;
        this.ele.style.cssText = `position: relative; overflow: hidden;`;

        //判断容器中是否具有子元素
        if(!(this.ele.firstElementChild || this.ele.firstChild)) {
            alert("您需要一个子容器！");
            return;
        }
        this.bigPic = this.ele.firstElementChild || this.ele.firstChild;

        //判断子容器中是否具有子元素
        if(this.bigPic.children.length <= 0) {
            alert("子容器中至少需要有一个子元素！");
            return;
        }
        this.bigPicLi = [...this.bigPic.children];
        this.iWidth = this.bigPicLi[0].offsetWidth;
        this.iHeight = this.bigPicLi[0].offsetHeight;
        this.iNow = 0; //定义一个下标
        this.len = this.bigPicLi.length;
        this.timer = null;
        Object.assign(this, Picture.DEFAULTS, opts); //合并参数
        this.init();
    }
    //设置轮播图的默认参数
    Picture.DEFAULTS = {
        pagination: false, //是否显示分页器
        btn: false, //是否显示左右按钮
        loop: false, //是否循环播放
        autoplay: false, //是否自动播放
        direction: "horizontal", //播放方向
        speed: 400, //播放速度
        playtime: 3000 //播放时间
    }
    Picture.prototype = {
        constructor: Picture,
        init() {
            //是否创建分页器
            if (this.pagination) {
                this.listBtn = this.createPagination();
                this.btnClick();
            }
            //是否创建左右按钮
            if (this.btn) {
                this.btnArr = this.createBtn();
                this.nextPrev();
            }
            //是否垂直播放
            if (this.direction === "horizontal") {
                this.bigPic.style.cssText = `position: absolute;width:${this.iWidth * this.len}px;`;
                this.bigPicLi.forEach(item => {
                    item.style.cssText = "float: left";
                })
            } else if (this.direction === "vertical") {
                this.bigPic.style.cssText = `position: absolute`;
            }
            //是否自动播放
            if (this.loop) {
                this.bigPic.innerHTML += this.bigPic.innerHTML;
                this.bigPic.style.width = this.bigPic.offsetWidth * 2 + 'px';
                this.autoPlay()
            } else {
                this.player();
            }
            this.hover();
        },
        btnClick() { //点击下面的按钮轮播
            this.listBtn.forEach((item, index) => {
                item.onclick = () => {
                    this.iNow = index;
                    this.play();
                }
            })
        },
        //点击按钮进行播放
        nextPrev() {
            this.btnArr.forEach(item => {
                item.onclick = () => {
                    if (item.classList.contains('prev-btn')) {
                        if (this.loop) {
                            this.prev();
                        } else {
                            this.prevPlayer();
                        }
                    } else if (item.classList.contains('next-btn')) {
                        if (this.loop) {
                            this.next();
                        } else {
                            this.nextplayer();
                        }
                    }
                    this.play();
                }
            })
        },
        //循环播放的方法
        prev() {
            this.iNow--;
            if (this.iNow < 0) {
                if (this.direction === "horizontal") {
                    this.bigPic.style.left = -this.iWidth * (this.len) + 'px';
                } else if (this.direction === "vertical") {
                    this.bigPic.style.top = -this.iHeight * (this.len) + 'px';
                }

                this.iNow = this.len - 1;
            }
        },
        next() { //点击下一个按钮轮播
            this.iNow++;
            //当iNow等于图片的长度时
            if (this.iNow === 2 * this.len) {
                if (this.direction === "horizontal") {
                    //先将ul的left值设置为负一个图片的宽 * 图片的leng-1处，因为最后一张图片和leng-1处的图片是一样的
                    this.bigPic.style.left = -this.iWidth * (this.len - 1) + 'px';
                } else if (this.direction === "vertical") {
                    this.bigPic.style.top = -this.iHeight * (this.len - 1) + 'px';
                }
                //设置ul最终需要运动到的位置处的索引值，因为ul此时通过定位已经将位置定位了leng-1处，所以ul下一次将要运动到的位置应该为leng处
                this.iNow = this.len;
            }
        },
        //不循环播放的方法
        prevPlayer() {
            this.iNow--;
            (this.iNow < 0) && (this.iNow = this.len - 1);
        },
        nextplayer() {
            this.iNow++;
            (this.iNow === this.len) && (this.iNow = 0);
        },
        //不循环自动播放
        player() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.nextplayer();
                this.play();
            }, this.playtime)
        },
        //循环自动播放
        autoPlay() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.next();
                this.play();
            }, this.playtime);
        },
        hover() { //鼠标移入停止播放，离开继续播放
            this.ele.onmouseover = () => {
                clearInterval(this.timer);
                if(this.btn) {
                    this.btnArr.forEach(item => {
                        item.style.display = "block";
                    })
                }
            }
            this.ele.onmouseout = () => {
                if(this.btn) {
                    this.btnArr.forEach(item => {
                        item.style.display = "none";
                    })
                }
                if(this.loop) {
                    this.autoPlay();
                } else {
                    this.player();
                }
            }
        },
        play() { //封装播放函数
            if (this.listBtn) {
                this.listBtn.forEach((item) => {
                    //item.className = "";
                    item.style.background = "#f00";
                })
                //this.listBtn[this.iNow % this.len].className = "active";
                this.listBtn[this.iNow % this.len].style.background = "#00f";
            }

            Velocity(this.bigPic, "stop"); //停止动画

            if (this.direction === "horizontal") {
                Velocity(this.bigPic, {
                    left: -this.iNow * this.iWidth
                }, this.speed) //需要加定位
            } else if (this.direction === "vertical") {
                Velocity(this.bigPic, {
                    top: -this.iNow * this.iHeight
                }, this.speed) //需要加定位
            }
        },
        //创建分页器
        createPagination() {
            var ol = document.createElement('ol');
            ol.setAttribute('id', 'list');
            //配置ol样式
            ol.style.cssText = 'padding: 0 20px;height: 30px;background: rgba(0, 0, 0, .5);border-radius: 30px;position: absolute;left: 50%;transform: translateX(-50%);bottom: 10px;font-size: 0;text-align: center;'
            var html = "";
            for (var i = 0; i < this.len; i++) {
                (i === 0) ? html += '<li class="active"></li>': html += '<li></li>';
                (i === this.len - 1) && '<li style="margin-right: 0;"></li>'
            }
            html += '</ol>';
            ol.innerHTML = html;
            this.ele.appendChild(ol);

            var listBtn = document.getElementById('list');
            var btnLi = listBtn.querySelectorAll('li');
            //设置分页器按钮样式
            btnLi.forEach((item, index) => {
                if(index === 0) {
                    item.style.cssText = `display: inline-block;margin-top: 9px;margin-right: 10px;width: 12px;height: 12px;background: #00f;border-radius: 50%;cursor: pointer;`;
                } else {
                    item.style.cssText = `display: inline-block;margin-top: 9px;margin-right: 10px;width: 12px;height: 12px;background: #f00;border-radius: 50%;cursor: pointer;`;
                }
            })
            return btnLi;

        },
        //创建左右按钮
        createBtn() {
            var arr = [];
            for (var i = 0; i < 2; i++) {
                var oA = document.createElement('a');
                oA.setAttribute('href', "javascript:");
                //设置a标签的公共样式
                oA.style.cssText = `position: absolute;width: 80px;height: 50px;background: rgba(0, 0, 0, .5);top: 50%;transform: translateY(-50%);font-size: 30px;font-weight: bold;color: #fff;text-align: center;line-height: 50px; text-decoration: none; display: none;`;
                if (i === 0) {
                    oA.classList.add('prev-btn');
                    oA.innerHTML = "&lt;";
                    oA.style.left = "10px";
                } else {
                    oA.classList.add('next-btn');
                    oA.innerHTML = "&gt;";
                    oA.style.right = "10px";
                }
                this.ele.appendChild(oA);
                arr.push(oA);
            }
            return arr;
        }
    }

    return Picture;
})