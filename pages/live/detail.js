/*
 * @auther 海江
 * 2018-05-27
 * http://www.zjkytwl.com/
 * 
*/
var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
Page({
    /**
     * 直播相关监听
     */
    onReady(res) {
        this.ctx = wx.createLivePlayerContext('player')
    },
    statechange(e) {
        console.log('live-player code:', e.detail.code)
    },
    error(e) {
        console.error('live-player error:', e.detail.errMsg)
    },
    /**
     * 页面的初始数据
     */
    data: {
        hidden: true,
        name: '',
        url: '',
        num: 0,
        project: [{
            name: '连衣裙',
            price: '39 - 59',
            num: 1,
            image: '../../temp/ex-img9.jpg',
            types: 0,
            spec: [
                {
                    name: '白色',
                    price: 59,
                    type: '（包邮）',
                    image: '../../temp/ex-img9.jpg',
                }, {
                    name: '黑色',
                    price: 49,
                    type: '（包邮）',
                    image: '../../temp/ex-img9.jpg',
                }, {
                    name: '蓝色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img9.jpg',
                }, {
                    name: '绿色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img9.jpg',
                }
            ]
        }, {
            name: '太阳裙',
            price: '49 - 69',
            num: 1,
            image: '../../temp/ex-img10.jpg',
            types: 0,
            spec: [
                {
                    name: '蓝色',
                    price: 69,
                    type: '（包邮）',
                    image: '../../temp/ex-img10.jpg',
                }, {
                    name: '白色',
                    price: 49,
                    type: '（包邮）',
                    image: '../../temp/ex-img10.jpg',
                }, {
                    name: '蓝色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img10.jpg',
                }, {
                    name: '绿色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img10.jpg',
                }
            ]
        }, {
            name: '清晰长款裙子',
            price: '39 - 59',
            num: 1,
            image: '../../temp/ex-img11.jpg',
            types: 0,
            spec: [
                {
                    name: '白色',
                    price: 59,
                    type: '（包邮）',
                    image: '../../temp/ex-img11.jpg',
                }, {
                    name: '黑色',
                    price: 49,
                    type: '（包邮）',
                    image: '../../temp/ex-img11.jpg',
                }, {
                    name: '蓝色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img11.jpg',
                }, {
                    name: '绿色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img11.jpg',
                }
            ]
        }, {
            name: '清晰长款裙子2',
            price: '39 - 59',
            num: 1,
            image: '../../temp/ex-img11.jpg',
            types: 0,
            spec: [
                {
                    name: '白色',
                    price: 59,
                    type: '（包邮）',
                    image: '../../temp/ex-img11.jpg',
                }, {
                    name: '黑色',
                    price: 49,
                    type: '（包邮）',
                    image: '../../temp/ex-img11.jpg',
                }, {
                    name: '蓝色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img11.jpg',
                }, {
                    name: '绿色',
                    price: 39,
                    type: '',
                    image: '../../temp/ex-img11.jpg',
                }
            ]
        }],
        chatMsg: [],
        userMessage: '',
        roomId: '',
        roomName: '',
        roomAnthor: '',
        index:'',
        show:0,
        isLayer:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            roomName: options.roomName,
            roomAnthor: options.anthor,
            avatar: options.avatar,
            pull_url: options.pull_url,
            roomId: options.roomId
        })
        var option = {
            roomId: options.roomId//房间地址为环信聊天室地址，可根据环信webSDK进行创建，活到管理后台进行创建。
        };
        WebIM.conn.joinChatRoom(option);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        wx.setNavigationBarTitle({
            title: that.data.roomName
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /**
     * 左侧购物列表详情
     */
    bindDetail: function (e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        that.setData({
            num: index,
            index:index,
            hidden: false
        })
    },
    /**
     * 关闭购物列表详情
     */
    close: function (e) {
        var that = this;
        that.setData({
            hidden: true
        })
    },
    /**
     * 购物车数量加
     */
    addCount: function () {
        var that = this;
        var project = that.data.project;
        project[that.data.num].num++;
        that.setData({
            project: project,
        })
    },
    /**
     * 购物车数量减
     */
    minusCount: function () {
        var that = this;
        var project = that.data.project;
        var num = project[that.data.num][num];
        if (num <= 1) {
            return false;
        }
        project[that.data.num].num--;
        that.setData({
            project: project,
        })
    },
    /**
     * 购物车规格选中
     */
    bindSelect: function (e) {
        var that = this;
        var idx = e.currentTarget.dataset.idx;
        var project = that.data.project;
        project[that.data.num].types = idx;
        that.setData({
            project: project,
        })
    },
    inputMsg: function (e) {
        this.setData({
            userMessage: e.detail.value
        })
    },
    submit: function () {
        wx.showToast({
            title: '请自行开发'
        })
    },
    /**
     * 弹出输入框
     */
    popup:function(){
        var that = this;
        that.setData({
            show:1,
            isLayer:0
        })
    },
    /**
     * 取消输入框
     */
    layer: function () {
        var that = this;
        that.setData({
            show: 0,
            isLayer: 1
        })
    },
    /**
     * 发送消息
     */
    sendMessage: function () {
        if (!this.data.userMessage.trim()) return;
        var that = this
        var myName = wx.getStorageSync('myUsername')
        var id = WebIM.conn.getUniqueId();
        var msg = new WebIM.message('txt', id);
        msg.set({
            msg: that.data.userMessage.trim(),
            to: that.data.roomId,
            roomType: true,
            chatType: 'chatRoom',
            success: function (id, serverMsgId) {
                console.log('send text message success')
            }
        });
        msg.setGroup('groupchat');
        WebIM.conn.send(msg.body);
        if (msg) {
            var msgData = {
                Username: myName,
                Msg: that.data.userMessage.trim(),
                mid: msg.id
            }
            var thisMsg = that.data.chatMsg;

            thisMsg.push(msgData);
            that.setData({
                chatMsg: thisMsg,
                userMessage: '',
                toView: thisMsg[thisMsg.length - 1].mid
            })
        }
    },
    /**
     * 接收信息
     * 由app.js进行调用
     */
    receiveMsg: function (msg, type) {
        var that = this
        if(msg.to==that.data.roomId){
          if (type == 'txt') {
            var value = WebIM.parseEmoji(msg.data.replace(/\n/mg, ''))
          } else if (type == 'emoji') {
            var value = msg.data
          }
          if (typeof value == 'object') {
            value = value[0].data;
          }
          var msgData = {
            Username: msg.from,
            Msg: value,
            mid: msg.type + msg.id
          }
          var thisMsg = that.data.chatMsg;

          thisMsg.push(msgData);
          that.setData({
            chatMsg: thisMsg,
            userMessage: '',
            toView: thisMsg[thisMsg.length - 1].mid
          })
        }
        
    }
})