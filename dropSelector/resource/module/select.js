define(function() {
    var selectorBoxCss = "font-size: 14px; overflow: visible;";
    var selectorImgCss = "float: left; padding-top: 2px; width: 250px; height: 20px; border: 1px solid #ccc;";
    var selectorTextCss = "float: left; width: 240px; border: 0; outline: none; padding-left: 4px;";
    var selectorMenuCss = "float: left; clear: left; padding: 0; margin: 0; list-style: none; width: 250px; border: 1px solid #ccc; display: none;";

    var Selector = function(opts) {
        //参数校验
        if(!opts.el) {
            alert("你需要传递一个参数：元素挂载点");
            return;
        }
        this.el = opts.el; //接收当前传递过来的值

        if(!opts.menuName) {
            alert("你需要传递一个参数：下拉列表的名称");
            return;
        }
        this.menuName = opts.menuName;

        if(!opts.menuValue) {
            alert("你需要传递一个参数：下拉列表的值");
            return;
        }
        this.menuValue = opts.menuValue;

        if(opts.menuName.length !== opts.menuValue.length) {
            alert("下拉列表的值和名称不对应！");
            return;
        }

        //设置属性
        this.clickNum = 0;
        this.selectArray = [];  //用于存放内容的
        this.selectValueArray = []; //y用于存放checkbox的value值的

        this.createDropSelect();
    }
    Selector.prototype = {
        constructor: Selector,
        getClickNum() { //用于获取clickNum的方法
            return this.clickNum;
        },
        setClickNum(num) { ////用于设置clickNum的方法
            this.clickNum = num;
        },
        getSelectArray() {
            return this.selectArray;
        },
        setSelectArray(array) {
            this.selectArray = array;
        },
        getSelectValueArray() {
            return this.selectValueArray;
        },
        setSelectValueArray(array) {
            this.selectValueArray = array;
        },
        //点击checkbox时触发的方法
        selectBoxcheck(para) { //para--->checkbox
            var selectArray = this.getSelectArray();
            var selectValueArray = this.getSelectValueArray();
            var _name = this.getUserName(para.value);
            if(para.checked) { //判断checked是否被选中，如果选中将值push到数组
                selectArray.push(_name);
                selectValueArray.push(para.value);
                this.showSelectArray();
            } else {
                this.delectSelectArray(_name, para.value);
                this.showSelectArray();
            }
            this.setSelectArray(selectArray);
            this.setSelectValueArray(selectValueArray);
        },
        getUserName(value) { //获取menuName中值的方法
            var menuName = this.menuName;
            var menuValue = this.menuValue;

            for(var i = 0; i < menuValue.length; i++) {
                if(menuValue[i] === value) {
                    return menuName[i];
                }
            }
        },
        showSelectArray() { //将数组中的值显示到页面上的方法
            var selectArray = this.selectArray;
            var selectText = document.getElementById('selectText');
            var finalText = "";  //存需要显示数据的变量

            if(selectArray.length === 0) {
                finalText = "请选择";
                selectText.value = finalText;
            } else {
                selectArray.forEach((item, index) => {
                    (index !== 0) && (finalText += "；");
                    finalText += item;
                })
                selectText.value = finalText;
            }
        },
        delectSelectArray(_name, value) {
            var selectArray = this.getSelectArray();
            var selectValueArray = this.getSelectValueArray();

            //获取到当前被取消的元素的下标
            var textIndex = selectArray.findIndex(item => item === _name);
            var valueIndex = selectValueArray.findIndex(item => item === value);
            
            selectArray.splice(textIndex, 1);
            selectValueArray.splice(valueIndex, 1);

            this.setSelectArray(selectArray);
            this.setSelectValueArray(selectValueArray);
            //console.log(this.selectArray)
        },
        //点击显示
        selectBoxOnClick() {
            var menu = document.getElementById("selectMenu");
            var clickNum = this.getClickNum();
            
            (clickNum % 2 === 0) ? (menu.style.display = "block") : (menu.style.display = "none")
            clickNum++;
            this.setClickNum(clickNum);
        },
        //鼠标离开selectBox是隐藏
        selectBoxOnMouseOut(ev) {
            var selectBox = document.getElementById('selectBox');
            var menu = document.getElementById("selectMenu");
            var oEvent = ev || event;
            var targetDom = oEvent.toElement ||oEvent.relatedTarget;
            var clickNum = this.getClickNum();

            while(targetDom && targetDom !== selectBox) {
                targetDom = targetDom.parentNode;
            }
            //console.log(targetDom)
            if(!targetDom) {
                if(clickNum % 2 === 1 ) {
                    menu.style.display = "none";
                    clickNum++;
                }
            }
            this.setClickNum(clickNum);
        },
        //创建元素
        createDropSelect() {
            //创建div头
            var ele = (typeof this.el === "string") ? document.querySelector(this.el) : this.el;
            var selectBox_div = document.createElement('div');
            var menuName = this.menuName;
            var menuValue = this.menuValue;
            selectBox_div.id = "selectBox";
            selectBox_div.style.cssText = selectorBoxCss;
            ele.appendChild(selectBox_div);

            //创建select下拉框
            var selectImg_div = document.createElement('div');
            selectImg_div.id = "selectImg";
            selectImg_div.style.cssText = selectorImgCss;
            selectBox_div.appendChild(selectImg_div);

            //点击selectImg_div让selectMenu显示; 
            //bind方法可以改变this指向，但不会立即执行，它的返回值是一个函数；bind方法执行的是它的返回值
            selectImg_div.onclick = this.selectBoxOnClick.bind(this);

            //创建input文本框
            var selectText_input = document.createElement('input');
            selectText_input.type = "text";
            selectText_input.value = "请选择";
            selectText_input.id = "selectText";
            selectText_input.style.cssText = selectorTextCss;
            selectImg_div.appendChild(selectText_input);

            //创建下拉菜单
            var selectMenu_ul = document.createElement('ul');
            selectMenu_ul.id = "selectMenu";
            selectMenu_ul.style.cssText = selectorMenuCss;

            //鼠标移出selectBox是隐藏menu
            selectBox_div.onmouseout = this.selectBoxOnMouseOut.bind(this);

            //创建li
            for(var i = 0; i < menuName.length; i++) {
                var selectMenu_li = document.createElement('li');

                var selectMenu_checkbox = document.createElement('input');
                selectMenu_checkbox.type = "checkbox";
                selectMenu_checkbox.value = menuValue[i];

                var selectMenu_span = document.createElement('span');
                selectMenu_span.innerHTML = menuName[i];

                selectMenu_li.appendChild(selectMenu_checkbox);
                selectMenu_li.appendChild(selectMenu_span);
                selectMenu_ul.appendChild(selectMenu_li);

                selectMenu_checkbox.onclick = this.selectBoxcheck.bind(this, selectMenu_checkbox)
            }

            selectBox_div.appendChild(selectMenu_ul);
        }
    }

    return Selector;
})

