// index.js
let app = getApp()
Page({
  data: {
    city: '增城',
    flag: false,
    weather: {},
    name: ''
  },
  //获取搜索框输入值
  getInput(e) {
    console.log(e)
    this.setData({
      city: e.detail.value
    })
  },
  //点击搜索按钮，发起查询请求
  getSearch() {
    this.get_weather()
  },
  // 获取实时天气
  get_weather() {

    //获取locationID
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data: {
        key: app.globalData.key,
        location: this.data.city //输入的城市名
      },
      success: (res) => {
        console.log(res.data)
        this.setData({
          location: res.data.location[0].id,
          name: res.data.location[0].name
        })
        //获取locationID后，查询实时天气
        let location_id = this.data.location;
        //获取实时天气
        wx.request({
          url: 'https://devapi.qweather.com/v7/weather/now',
          method: "GET",
          data: {
            key: app.globalData.key,
            location: location_id
          },
          success: (res) => {
            console.log(res)
            this.setData({
              weather: res.data.now,
              flag: true
            })
          }
        })
        //获取天气指数
        wx.request({
          url: 'https://devapi.qweather.com/v7/indices/1d',
          data:{
            key:app.globalData.key,
            location:location_id,
            type:'0'
          },
          success:(res)=>{
            console.log(res)
            this.setData({
              daily:res.data.daily,
              flag:true
            })
          }
        })
      }
    })
  },
  onLoad(Option) {
    this.get_weather()
  }
})