/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-10-31 11:27:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-03 11:04:42
 * @fun [jquery show,hide,toggle,slideDown,slideUp,next,prev]
 */


(function(window) {
    // 通过立即函数模仿块级作用域，达到私有作用域的目的

    var jQuery = function(selector, context) {
        // 无new 实例化
        return new jQuery.fn.init(selector, context);
    };
    /**
     * @param {objtectArray} objtectArray [类数组]
     */
    // fn静态属性 = prototype
    jQuery.fn = jQuery.prototype = {
            constructor: jQuery,
            /**
             * @param {String} selector [选择器]
             * @param {String} context [父节点，该参数可省略]
             */
            init: function(selector, context) {
                var that = this;
                // 给context设置默认document
                context = context || document;
                // 判断context是不是实例
                context = context.nodeType ? context : context[0];
                this.length = 0;
                if (!selector) {
                    return this;
                }
                //  判断selector是不是一个字符串, 字符串用于创建节点或查找节点
                if (typeof selector === 'string') {
                    // 判断传的是不是HTML标签,创建节点并将该节点作实例对象的属性
                    if (selector[0] === '<' && selector.length >= 3 && selector[selector.length - 1] === '>') {
                        var oDiv = document.createElement('div');
                        oDiv.innerHTML = selector;
                        this[0] = oDiv.firstChild || oDiv.firstElementChild;
                        this.length = 1;
                    } else if (selector[0] === '#' && this.strNum(selector, '#') === 1 && this.strNum(selector, ' ') === 0) { // 判断是不是ID名
                        var dom = document.getElementById(selector.slice(1));
                        if (dom) {
                            this[0] = dom;
                            this.length = 1;
                        }
                    } else { // 其他选择器，通过querySelectorAll来获取所有的元素存入实例对象中
                        var eles = context.querySelectorAll(selector);
                        for (var i = 0; i < eles.length; i++) {
                            this.push(eles[i]);
                        }
                    }
                } else if (selector.nodeType) {
                    // 将DOM节点转为jquery实例对象
                    this[0] = selector;
                    this.length = 1;
                } else if (selector instanceof jQuery) { // 判断传入的selector是不是jquery实例对象
                    return selector;
                } else {
                    return this;
                }
            },
            /**
             * @param {String} str  [检测的字符串]
             * @param {String} char [检测的字符]
             * @func [用于检测一个字符在字符串中出现的次数]
             */
            strNum: function(str, char) {
                var count = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str[i] === char) {
                        count++;
                    }
                }
                return count;
            },
            /**
             * @param {String} content  [添加的内容]
             * @func [利用数组的push方法为对象添加属性]
             */
            push: function(content) {
                Array.prototype.push.call(this, content);
            },
            /**
             * @func [遍历jquery对象]
             */
            each: function(fn) {
                for (var i = 0; i < this.length; i++) {
                    fn.call(this[i], i, this[i]);
                }
                return this;
            },
            /**
             * @func [将索引指定jquery对象转为dom节点]
             */
            get: function(index) {
                return this[index];
            },
            /**
             * [获取下标]
             *
             * @return  {[number]}
             */
            index: function() {
                var that = this;
                var children = Array.from(this[0].parentNode.children);
                var i;
                children.forEach(function(item, index) {
                    if (item === that[0]) {
                        i = index;
                    }
                });
                return i;
            },
            /**
             * @func [根据索引获取指定的jquery对象]
             */
            eq: function(index) {
                return jQuery(this.get(index));
            },
            /**
             * [siblings description]
             *
             * @return  {init} init实例对象
             */
            siblings: function() {
                var that = this;
                // console.log(that[0]);
                var childs = Array.from(this[0].parentNode.children); //包括我自身的所有节点
                var el = jQuery();
                childs.forEach(function(item) {
                    if (item !== that[0]) {
                        el.push(item);
                    }
                });
                return el;
            },
            /**
             * @return  {init} init实例对象
             */
            parent: function() {
                return jQuery(this[0].parentNode);
            },
            /**
             * [parents 找祖先元素]
             *
             * @param   {[string]}  string  [父元素的类名或标签名或id名]
             *
             * @return  {[type]} 
             */
            parents: function(string) {
                var targetParent = jQuery(string);
                var that = this[0];
                var el = jQuery();
                while (that.parentNode) {
                    that = that.parentNode;
                    if (that.nodeType !== 9) {
                        el.push(that);
                    }
                };
                if (string) {
                    el.each(function(i, val) {
                        if (val === targetParent[0]) {
                            el = jQuery(val);
                        }
                    })
                }
                return el;
            },
            /**
             * [find 查找子孙元素]
             */
            find: function() {
                var that = this[0];
                var el = jQuery();

                function addChild(parent) {
                    if (parent.children.length) {
                        Array.from(parent.children).forEach(function(item) {
                            el.push(item);
                            addChild(item);
                        })
                    }
                }
                addChild(that);
                return el;
            },
            /**
             * func [获取下一个兄弟]
             */
            next: function() {
                return jQuery(this[0].nextElementSibling);
            },
            /**
             * func [前一个兄弟]
             */
            prev: function() {
                return jQuery(this[0].previousElementSibling);
            },
            /**
             * @func [操作HTML内容]
             */
            html: function(content) {
                if (content) { // 有参数，设置当前对象HTML内容
                    this.each(function(i, item) {
                        item.innerHTML = content;
                    });
                    //  为了实现链式调用
                    return this;
                } else { //  没参数：实现获取当前对象的HTML内容
                    return this[0].innerHTML;
                }
            },
            /**
             * @func [操作css样式]
             */
            css: function(pName, pValue) {
                if (arguments.length === 2) {
                    this.each(function(i, v) {
                        v.style[pName] = pValue;
                    });
                    return this;
                } else {
                    if (typeof pName === 'string') {
                        return getComputedStyle(this[0])[pName]
                    } else {
                        for (var key in pName) {
                            this.each(function(i, v) {
                                v.style[key] = pName[key];
                            });
                        }
                        return this;
                    }
                }
            },
            /**
             * @func [操作html属性]
             */
            attr: function(pName, pValue) {
                if (pValue) { // 如果是两个参数：设置HTML属性
                    this.each(function(i, v) {
                        v.setAttribute(pName, pValue);
                    });
                    return this;
                } else {
                    // 如果是1个参数：获取HTML属性
                    return this[0].getAttribute(pName);
                }
            },
            /**
             * @func [末端添加子节点]
             */
            append: function(childNode) {
                var child = null;
                if (childNode.nodeType) {
                    child = childNode;
                } else if (childNode instanceof jQuery) {
                    child = childNode[0];
                }
                this.each(function(i, item) {
                    item.appendChild(child.cloneNode(true));
                });
                return this;
            },
            /**
             * @func [前端添加子节点]
             */
            prepend: function(childNode) {
                var child = null;
                if (childNode.nodeType) {
                    child = childNode;
                } else if (childNode instanceof jQuery) {
                    child = childNode[0];
                }
                this.each(function(i, item) {
                    item.insertBefore(child.cloneNode(true), item.firstChild);
                });
                return this;
            },
            /**
             * @func [前端添加子节点]
             */
            prependTo: function(parent) {
                var that = this;
                parent.each(function(i, item) {
                    item.insertBefore(that[0].cloneNode(true), item.firstChild);

                });
                return this;
            },
            /**
             * @func [前端添加子节点]
             */
            appendTo: function(parent) {
                var that = this;
                parent.each(function(i, item) {
                    item.appendChild(that[0].cloneNode(true));

                });
                return this;
            },
            addClass: function(cName) {
                var that = this;
                cName = cName.split(" ");
                cName.forEach(function(cssName) {
                    that.each(function(i, item) {
                        item.classList.add(cssName)
                    })
                })
                return this;
            },
            removeClass: function(cName) {
                this.each(function(i, item) {
                    item.classList.remove(cName)
                })
                return this;
            },
            /**
             * @func [事件模块]
             */
            on: function(type) {
                var str,
                    callback,
                    data,
                    arg = Array.prototype.slice.call(arguments, 1);
                arg.forEach(function(item) {
                    typeof item === 'string' ? str = item : typeof item === 'function' ? callback = item : item.toString() === "[object Object]" ? data = item : null;
                });
                //  事件处理函数
                function run(e) {
                    // 判断有没有对象这个参数
                    if (data) {
                        // 将传入的对象挂载到事件对象上，作为事件对象的data属性来使用
                        e.data = data;
                    }
                    // 判断找事件源是不是  str指定的委托子节点
                    var tar = e.target;
                    if (str) {
                        // 通过str查找委托的子节点
                        $(str, this).each(function(i, item) {
                            if (tar === item) { // 事件源和委托子节点相同节点
                                callback && callback.call(tar, e); // 回调函数
                                return;
                            };
                        })


                    } else {
                        callback && callback.call(this, e); // 回调函数
                    }
                };
                // 通过判断str参数，有该参数以事件委托方式去添加事件
                if (str) { // 需要通过事件委托绑定事件
                    //this[0].addEventListener(type, run);
                    this[0]['on' + type] = run;
                } else { // 直接绑定
                    // 遍历jquery对象绑定事件
                    this.each(function(i, item) {
                        //item.addEventListener(type, run);
                        item['on' + type] = run;
                    })
                }
                return this;
            },
            /**
             * @func 
             */
            off: function(type) {
                this.each(function(i, item) {
                    // 删除事件
                    item['on' + type] = null;
                });
                return this;
            },
            // DOM尺寸与位置
            /**
             * @func [内宽 = padding + width]
             * @return {Number} [内部宽度]
             */
            innerWidth: function() {
                // 获取元素的offsetWidth - 左右边框宽
                var oStyle = getComputedStyle(this[0]);
                var lw = parseFloat(oStyle.borderLeftWidth);
                var rw = parseFloat(oStyle.borderRightWidth);
                return this[0].offsetWidth - lw - rw;
            },
            innerHeight: function() {
                // 获取元素的offsetWidth - 左右边框宽
                var oStyle = getComputedStyle(this[0]);
                var tw = parseFloat(oStyle.borderTopWidth);
                var bw = parseFloat(oStyle.borderBottomWidth);
                return this[0].offsetHeight - tw - bw;
            },
            /**
             * @func [外部宽度，有参数true = padding + width + border + margin ,无参数 不含maring]
             * @return {Number} [外部宽度]
             */
            outerWidth: function(deep) {
                var el = this[0],
                    oStyle = getComputedStyle(el),
                    lm = parseFloat(oStyle.marginLeft),
                    rm = parseFloat(oStyle.marginRight),
                    offsetW = el.offsetWidth;
                return offsetW += deep ? (lm + rm) : 0;
            },
            outerHeight: function(deep) {
                var el = this[0],
                    oStyle = getComputedStyle(el),
                    tm = parseFloat(oStyle.marginTop),
                    bm = parseFloat(oStyle.marginBottom),
                    offsetH = el.offsetHeight;
                return offsetH += deep ? +(tm + bm) : 0;
            },
            /**
             * @func [隐藏]
             */
            hide: function() {
                this.each(function(index, el) {
                    el.style.display = 'none';
                })
            },
            show: function() {
                this.each(function(index, el) {
                    el.style.display = 'block';
                })
            },
            toggle: function() {
                this.each(function(index, el) {
                    // 根据元素当前显示状态执行相反操作，即显示执行隐藏
                    var displayStatus = getComputedStyle(el, null).display;
                    el.style.display = displayStatus === 'block' ? 'none' : 'block';
                })
            },
            /**
             * @param {number|string} [设置动画时间]
             * @func [折叠动画]
             */
            slideUp: function(time) {
                // 动画时间设置默认参数
                time = time || 400;
                if (typeof time === 'string') {
                    time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400
                }
                // 核心控制height慢慢变为0
                this.each(function(i, el) {
                    el.style.overflow = 'hidden';
                    // 获取元素总高度
                    var totalH = el.offsetHeight;
                    // 设置当前高度
                    var currentH = totalH;
                    // 计算减的差值（步长值）
                    var step = totalH / (time / 10);
                    // 通过定时器去减高度
                    var timer = setInterval(function() {
                        currentH = currentH - step;
                        el.style.height = currentH + 'px';
                        // 当高度为0，清除定时器
                        if (currentH <= 0) {
                            clearInterval(timer);
                            el.style.display = 'none';
                            el.style.height = totalH + 'px';
                        }
                    }, 10)
                })
            },
            /**
             * @param {number|string} [设置动画时间]
             * @func [折叠动画]
             */
            slideDown: function(time) {
                // 动画时间设置默认参数
                time = time || 400;
                if (typeof time === 'string') {
                    time = time === 'slow' ? 600 : time === 'fast' ? 200 : 400
                }
                // 核心控制height慢慢变为0
                this.each(function(i, el) {
                    // 设为显示
                    el.style.display = 'block';
                    // 获取元素总高度
                    var totalH = el.offsetHeight;
                    // 设置当前高度
                    el.style.height = 0;
                    var currentH = 0;
                    // // 计算减的差值（步长值）
                    var step = totalH / (time / 10);
                    // // 通过定时器去减高度
                    var timer = setInterval(function() {
                        currentH = currentH + step;
                        el.style.height = currentH + 'px';
                        // 当高度为0，清除定时器
                        if (currentH >= totalH) {
                            clearInterval(timer);
                            el.style.height = totalH + 'px';
                        }
                    }, 10)
                })
            },
            slideToggle: function(time) {
                this.each(function(i, el) {
                    var displaystatus = getComputedStyle(el).display;
                    if (displaystatus === 'block') {
                        $(el).slideUp(time);
                    } else {
                        $(el).slideDown(time);
                    }
                })
            }
        }
        // 无new 实例化如何使用jquery函数原型方法
    jQuery.prototype.init.prototype = jQuery.prototype;
    // 将jQuery局部函数变为全局变量$来使用
    window.jQuery = window.$ = jQuery;
})(window);