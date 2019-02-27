//弹窗模块v
define(["view", "velocity"], function(view, Velocity) {
    var defaultDom = { //为当前的dom节点创建下标
        "title": {index: 0},
        "close": {index: 1},
        "body": {index: 2},
        "footer": {index: 3}
    }
    var buttonBase = "outline: none; border: 0;border-radius: 5px;padding: 10px 15px;color: #fff;cursor: pointer;"
    //定义模块
   var Modal = function(opts) { //构造函数 
       Object.assign(this, opts); //参数合并(opts里面的每一个参数复制到Modal这个大对象里面去)
       this.init();
   }
   Modal.prototype = {
       constructor: "Modal",
       init() {
           //创建视图
           this.createView()
           this.setContent(view);
            //设置默认值
            this.initTitleBody();
            this.initFooter();
           //修改局部内容
           this.setLocal("title", this.title)
           this.setLocal("body", this.body)
           this.setLocal("footer", this.footer)
           this.mangerEvents();
       },
       createView() { //创建视图
           var maskLayer = null;
           var maskLayerInner = null;
           if(!this.el) { //当moda对象下面没有el这个属性的时候就创建这个属性
               maskLayer = document.createElement('div')
               this.el = maskLayer;
               this.el.style.cssText = "width: 100%;height: 100%;position: absolute;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0, 0, 0, .5);display: block;";
           }

           if(!this.maskLayerInner) {
               maskLayerInner = document.createElement('div');
               this.maskLayerInner = maskLayerInner;
               this.maskLayerInner.style.cssText = "min-width: 500px;position: absolute;top: 30px;left: 50%;transform: translateX(-50%);background: #fff;border-radius: 10px;"
           }

           if(maskLayer && maskLayerInner) {
               maskLayer.appendChild(maskLayerInner);
               document.body.appendChild(maskLayer)
           }
       },
       setContent(modalDom) { //填充内容
           if(typeof modalDom === 'string') {
                this.maskLayerInner.innerHTML = modalDom;
           } else {
               this.maskLayerInner.innerHTML = modalDom.outHTML;
           }
       },
       //修改局部内容的方法
       setLocal(localName, localVal) {
           var local = this.getDom(localName) //获取到的要修改的元素
           //当前localName为footer时并且localVal为一个数组时证明这个时候要设置的是footer元素的内容
           if(localName === 'footer' && localVal instanceof Array) {
                local.innerHTML = this.footerFormArray(localVal);
           } else {
                local.innerHTML = localVal;
           }
       },
       //获取元素
       getDom(selector) {
            return this.el.firstChild.children[defaultDom[selector].index]
       },
       //初始化title属性值和body属性值
       initTitleBody() {
           if(!this.title) {
               this.title = "警告";
           }
           if(!this.body) {
                this.body = "您确定吗？";
            }
        },
        //初始化footer属性值
        initFooter() { //设置的是footer的默认值
            if(!this.footer && !this.button) {
                this.footer = this.footerFormArray([
                    {text: "确定", bgColor: "#337ab7"},
                    {text: "取消", bgColor: "#ac2925"}
                ])
            } else if(!this.footer && this.button) {
                this.footer = this.footerFormArray(this.button);
            }
        },
        //footer数组转成字符串的方法
        footerFormArray(buttonArray) { 
            var mr = "margin-right:0;";
            return buttonArray.map(function(item, index) {
                // if(index !== item.length - 1) {
                //     mr = "margin-right:10px;";
                // }
                (index !== item.length - 1) && (mr = "margin-right: 10px;");
                return `<button style="${buttonBase + mr + "background:" + item.bgColor}">${item.text}</button>`
            }).join("");
        },
        show() {  //无动画显示
            this.createView();
            if(!this.flag) { //当调用show方法的时候让flag为true
                this.flag = true;
            }
        },
        showFade(options) { //有动画显示
            //判断一下当前的参数是否存在，如果存在的话就是当前传进来的这个对象，如果没传的话就让它默认是一个空对象
            options = options || {}; 
            //判断一下当前传进来的对象下面是否有props这个属性，如果有，就取当前传进来的props属性,如果没有就取{{top: 50, opacity: 1}}
            options.props = options.props || {top: 50, opacity: 1};
            Velocity(this.el, "fadeIn", options.time ? options.time : 400);
            Velocity(this.maskLayerInner, options.props, {
                //判断一下当前对象下面是否有easing属性,有就取传进来的easing,没有就默认是swing
                easing: options.easing ? options.easing : "swing",
                duration: options.time ? options.time : 400
            })
            this.flag = false; //当调用showFade方法的时候让flag为false
        },
        hide() {
            document.body.removeChild(this.el); //删除当前元素
        },
        hideFade() { //以动画的形式隐藏
            Velocity(this.el, "fadeOut", 1000);
            Velocity(this.maskLayerInner, {
                top: 0,
                opacity: 0
            }, 1000)
        },
        mangerEvents() { //管理所有事件的方法
            var that = this;
            var closeBtn = this.getDom("close"); //获取到当前的x按钮
            closeBtn.onclick = function() {
                if(that.flag) { //如果flag为true执行hide，否则执行hideFade
                    that.hide()
                } else {
                    that.hideFade();
                }
            }
            // closeBtn.onclick = () => {
            //     if(this.flag) {
            //         this.hide()
            //     } else {
            //         this.hideFade();
            //     }
            // }
        }
   }

   function CreateModal(opts) { //将函数和功能进行分离(构造分离器)
       if(!opts) {
           opts = {}
       }
       return new Modal(opts)
   }
   return CreateModal; //返回新的函数，该函数执行的时候会返回Modal对象
})