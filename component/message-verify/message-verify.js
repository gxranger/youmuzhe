Component({
    properties: {
        openID:String
    },
    options: {
        addGlobalClass: true,
    },
    data: {
      btnValue:'获取验证码',
      btnDisabled:false,
      phone: '',
      code: '',
      snsMsgWait:60
    },
    ready() {
        console.log(this.data.openID)
    },
    methods: {
        // 短信倒计时
        verifyTimer () {
            let that = this;
            if(that.data.btnDisabled==false){
            that.setData({
                btnDisabled:true
            })
            let inter = setInterval(function () {
                that.setData({
                btnValue: that.data.snsMsgWait+'s' ,
                snsMsgWait: that.data.snsMsgWait - 1
                });
                if (that.data.snsMsgWait < 0) {
                clearInterval(inter)
                that.setData({
                    btnValue: "重新获取",
                    snsMsgWait: 60,
                    btnDisabled:false
                });
                }
            }.bind(that), 1000);
            }
            
        },
        //获取短信验证码
        getCode() {
            var that = this;
            that.verifyTimer();
        },
    }
})