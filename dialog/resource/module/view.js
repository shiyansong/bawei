//定义一个视图层
define(function() {
    var titleCss = " padding: 15px;font-weight: normal;border-bottom: 1px solid #e5e5e5;";
    var closeCss = "position: absolute;top: 15px;right: 15px;cursor: pointer;";
    var modalBodyCss = "padding: 15px;";
    var modalFooterCss = "padding: 15px;border-top: 1px solid #e5e5e5;text-align:right;";
    return (
        `<h3 style="${titleCss}"></h3>
         <span style="${closeCss}">x</span>
         <div style="${modalBodyCss}"></div>
         <div style="${modalFooterCss}"></div>`
    );
})