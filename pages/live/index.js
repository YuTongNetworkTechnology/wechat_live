/*
 * @auther 海江
 * 2018-05-27
 * http://www.zjkytwl.com/
 * 
*/
Page({

    /**
     * 页面的初始数据
     */
    data: {
        kind: 1,
        page: 1,
        array: [{
            avatar: '../../temp/ex-img.jpg',
            people: '1.5w',
            title: '夏季新款爆款福利',
            name: '我是小仙女',
            num: '50',
            roomId: '52502216114177',
            pull_url: 'rtmp://26269.liveplay.myqcloud.com/live/26269_28dd5862746011e892905cb9018cf0d4_550',//直播地址，支持rtmp协议、flv格式的直播格式
        }, {
            avatar: '../../temp/ex-img3.jpg',
            people: '1.2w',
            title: '木子李的衣小铺',
            name: '木子李',
            num: '50',
            roomId: '52499029491713',
            pull_url: 'rtmp://26269.liveplay.myqcloud.com/live/26269_1b5c81cb74fb11e892905cb9018cf0d4_550'//直播地址，支持rtmp协议、flv格式的直播格式
        }, {
            avatar: '../../temp/ex-img4.jpg',
            people: '0.5万',
            title: 'KAKA爆款福利',
            name: '女神咔咔',
            num: '30',
            roomId: '52511743475715',
            pull_url: 'rtmp://26269.liveplay.myqcloud.com/live/26269_2bfed9ca74fb11e892905cb9018cf0d4_550'//直播地址，支持rtmp协议、flv格式的直播格式
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        setTimeout(function () {
            wx.hideNavigationBarLoading();
        }, 2000)
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.onShow();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //加载更多
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 导航切换
    bindChange: function (e) {
        var that = this;
        var kind = e.target.dataset.kind;
        that.setData({
            kind: kind
        })
    },
    // 直播详情
    bindDetail: function (e) {
        var listString = '?';
        var that = this;
        var index = e.currentTarget.dataset.index;
        var roomName = that.data.array[index].title
        var anthor = that.data.array[index].name
        var roomId = that.data.array[index].roomId;
        var avatar = that.data.array[index].avatar;
        var pull_url = that.data.array[index].pull_url;
        listString += 'roomName=' + roomName + '&roomId=' + roomId + '&' + 'anthor=' + anthor + '&avatar=' + avatar + '&pull_url=' + pull_url;

        wx.navigateTo({
            url: '../live/detail' + listString,
        })
    }
})