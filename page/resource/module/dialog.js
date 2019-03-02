define(function() {
    var Dialog = function(opts) {
        this.oDiv = null;
        this.iNow = 0;
        Object.assign(this, opts);
        this.init();
    }
    Dialog.prototype = {
        constructor: Dialog,
        init() {
            this.createDialog();
        },
        createDialog() {
            this.oDiv = document.createElement('div');
            this.oDiv.innerHTML = 
                `<div id="dialog" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; buttom: 0; right: 0; background: #e5e5e5;">
                    <div class="modal-dialog" style="float: right;margin-top: 10px;margin-right: 10px;color: #ccc;">
                        <h3 class="modal-title" style="cursor: pointer;">X</h3>
                        <div class="modal-content" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${this.width}px; height: ${this.height}px; border: 1px solid #ccc;">
                            <img id="img" src="${this.src}" style="width: 100%; height: 100%;" />
                        </div>
                    </div>`;

            document.body.appendChild(this.oDiv.firstElementChild);

            this.oDiv = document.querySelector("#dialog");

            Velocity(this.oDiv, "fadeIn");

            var closeBtn = this.oDiv.querySelector(".modal-title");
            var oImg = this.oDiv.querySelector("#img");

            closeBtn.onclick = this.clickClose.bind(this);
            oImg.onclick = this.click.bind(this, oImg);

        },
        clickClose() {
            Velocity(this.oDiv, "fadeOut", {
                complete() {
                    document.body.removeChild(this[0]);
                }
            })
        },
        click(oImg) {
            if(this.iNow % 2 === 0) {
                Velocity(oImg, {scale: 3})
            } else {
                Velocity(oImg, {scale: 1})
            }
            this.iNow++;
        }
    }

    return Dialog;
})