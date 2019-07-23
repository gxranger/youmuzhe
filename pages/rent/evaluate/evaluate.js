
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
        stars:{
            'service':{'arr':[false,false,false,false,false],'key':0},
            'clear':{'arr':[false,false,false,false,false],'key':0},
            'carStatus':{'arr':[false,false,false,false,false],'key':0}
        },
        serviceDesc:'',
        clearDesc:'',
        carStatusDesc:'',
        starMap: [
            '非常差',
            '差',
            '一般',
            '好',
            '非常好',
          ],
        average:{'arr':[false,false,false,false,false],'key':0}      
    },
   
    /**
     * 评分
     */
    chooseStar: function (e) {
      const index = e.currentTarget.dataset.index;
      const name = e.target.dataset.name;
      this.data.stars[name].arr = [false,false,false,false,false];
      this.data.stars[name].key = index+1;
      for(let i=0; i<index+1;i++){
        this.data.stars[name].arr[i] = true;
      }
      this.data[name+'Desc'] = this.data.starMap[index];

    //   计算总体评价平均数并赋值到数组
      let aver = (this.data.stars.service.key+this.data.stars.clear.key+this.data.stars.carStatus.key)/3;
      this.data.average.arr = [false,false,false,false,false];
      this.data.average.arr.key = Math.round(aver);
      for(let k =0;k<Math.round(aver);k++){
        this.data.average.arr[k] = true;
      }

      this.setData({
        stars:this.data.stars,
        serviceDesc:this.data.serviceDesc,
        clearDesc:this.data.clearDesc,
        carStatusDesc:this.data.carStatusDesc,
        average:this.data.average
      })
      
    //   console.log(Math.round(aver));
      //console.log(this.data.stars);
    },
    onShow() {
        
    }
  })