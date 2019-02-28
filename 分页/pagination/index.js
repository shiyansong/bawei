define(function(){
    var pageLiCss = 'width:30px;height:30px;border-width:1px;border-style:solid;text-align:center;line-height:30px;margin-right:8px;display:inline-block;border-radius:4px;cursor:pointer;user-select:none;'
    var pageLiCssActive = pageLiCss + 'border-color:#40a9ff;color:#40a9ff';
    var pageLiCssDefault = pageLiCss +'border-color:#d9d9d9;color:#333';
    function Pagination(options){
        options = options || {};
        this.init(options);
        this.events();
    }
    Pagination.prototype.init = function(options){
        Object.assign(this,options); // 合并参数
        this.total = this.total || 500; //总数据量
        this.pageSize = this.pageSize || 20; // 每页的数据条数
        this.current = this.current || 1; // 默认显示的页数
        this.changePage = this.changePage || function(){}; // 改变页面后的回调
        if(!this.el){ // 分页所在的节点
            throw new Error('没有可挂载的节点');
        } 
        this.getAllPage(); // 获取总页数
        this.jumpToPage(this.current); //跳转到当前页
    }
    // 计算要显示的总页数
    Pagination.prototype.getAllPage = function(){
        this.allPage = Math.ceil(this.total / this.pageSize);
    }
    // 计算出页面的展现形式，以数组展现
    Pagination.prototype.getArrPageNums = function(){
        if(this.current > this.allPage || this.current < 1){
            throw new Error('页码超出范围了');
        }
        var pageNums = [];
        var minNum = this.current - 2;
        var maxNum = this.current + 2;
        if((minNum > 2) && (maxNum < this.allPage-1)){
            pageNums.push(1,'•••');
            for(var i = minNum; i <= maxNum; i++){
                pageNums.push(i);
            }
            pageNums.push('•••',this.allPage);
        }else if(minNum <= 2 && maxNum < this.allPage - 1){
            for(var i = 1; i <= maxNum; i++){
                pageNums.push(i);
            }
            var j = 1;
            while(pageNums.length < 5){
                pageNums.push(maxNum + j);
                j++;
            }
            pageNums.push('•••',this.allPage);
        }else if(minNum >2 && maxNum >= this.allPage - 1){
            for(var i = this.allPage; i >= minNum; i--){
                pageNums.push(i);
            }
            var j = -1;
            while(pageNums.length < 5){
                pageNums.push(minNum + j);
                j --;
            }
            pageNums.push('•••',1);
            pageNums.reverse();
        }else if(minNum <= 2 && maxNum >= this.allPage - 1){
            for(var i = 1; i <= this.allPage; i++){
                pageNums.push(i);
            }
        }else{
            throw new Error('页码超出范围了');
        }
        return pageNums;
    }
    // 构建分页视图
    Pagination.prototype.createView = function(pageNums){
        var oPageUl = document.createElement('ul');
        oPageUl.style.cssText = 'padding:0;margin:0;';
        var that = this;
        oPageUl.innerHTML = `<li style=${pageLiCssDefault}>&lt;</li>`+pageNums.map(function(item){
            var style = pageLiCssDefault;
            if(parseInt(item) === that.current){
                style = pageLiCssActive;
            }
            return `<li style=${style}>${item}</li>`;
        }).join('')+`<li style=${pageLiCssDefault}>&gt;</li>`;
        this.el.innerHTML = '';
        this.el.appendChild(oPageUl);
        
    }
    // 分页跳转
    Pagination.prototype.jumpToPage = function(current){
        if(current){
            this.current = current;
        }
        this.createView(this.getArrPageNums());
        this.changePage(this.current);
    }
    // 管理事件
    Pagination.prototype.events = function(){
        var that = this;
        this.el.addEventListener('click',function(ev){
            if(ev.target.tagName === 'LI'){
                if(ev.target.innerHTML === '&lt;'){
                    that.current = that.current - 1 < 1 ? 1 : that.current - 1;
                }else if(ev.target.innerHTML === '&gt;'){
                    that.current = that.current + 1 > that.allPage ? that.allPage : that.current + 1;
                }else if(!isNaN(parseInt(ev.target.innerHTML))){
                    that.current = parseInt(ev.target.innerHTML);
                }
                that.jumpToPage(that.current);
            }
        },false);
    }
    return Pagination;
})