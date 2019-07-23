import {  sendRequest } from "../../../utils/util";
//获取应用实例
const app = getApp();
Page({
    data: {
        checkBoxList:[
            {'content':'内饰污损','status':false},
            {'content':'未找到钥匙','status':false},
            {'content':'空调故障','status':false},
            {'content':'灯光不亮','status':false},
            {'content':'车窗/天窗问题','status':false},
            {'content':'车辆外观损坏','status':false},
            {'content':'轮胎破损','status':false},
            {'content':'车辆无法启动','status':false},
            {'content':'证照缺失','status':false},
            {'content':'其他问题','status':false}
        ],
        submitContent:[],
        isOther:false,
        areaInput:'',
        isConfirm:false
      
    },

     // 搜索跳转
    searchInto() {
        wx.navigateTo({
        url: this.data.searchInfo.url
        })
    },

    // 故障原因多选监听
    checkSelect(e) {
          // 删除数组指定元素原型链修改
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
            }
            return -1;
            };
            Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
            this.splice(index, 1);
            }
            };
    
        let index =  e.currentTarget.dataset.index;
        this.data.checkBoxList[index].status = !this.data.checkBoxList[index].status;
        
        // 判断故障内容的选中状态，根据选中状态推送进submitContent数组
        if(this.data.checkBoxList[index].status&&index!=9){
            this.data.submitContent.push(this.data.checkBoxList[index].content);
        }else if(this.data.checkBoxList[index].status&&index==9){
            this.setData({
                isOther:true
            })
        }else if(this.data.checkBoxList[9].status==false){
            this.data.submitContent.remove('其他问题：'+this.data.areaInput);
        }else{
            this.data.submitContent.remove(this.data.checkBoxList[index].content)
        }

        this.setData({
            checkBoxList:this.data.checkBoxList
        })
    },

    // 其他问题文本框监听
    bindArea(e){
        this.data.checkBoxList[9].confirm = true;
        this.setData({
            areaInput: e.detail.value
        });
    },

    // 点错取消按钮
    cancelOther() {
        this.data.checkBoxList[9].status = false;
        this.setData({
            checkBoxList:this.data.checkBoxList,
            isOther:false
        })
    },

    // 文本框确定提交按钮
    confirmOther() {
        if(this.data.areaInput==false){
            wx.showToast({
                title:'内容不能为空！',
                duration:3000
            })
        }else{
            this.data.submitContent.push('其他问题：'+this.data.areaInput);
            this.setData({
                isOther:false
            })
        }
    },

    // 提交并锁车按钮
    submitLock() {
        
        //console.log(signature);
        sendRequest('standard/hotel/list','post',{
            "lng":106.676365,
            "lat":26.563937
        },res=> {
            
        },res=>{
            console.log(res)
        })
    }
})