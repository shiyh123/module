
// 前言：注意点

/*
*   1.微信认证过的公众号:必须是经过认证的，没有认证的或者认证过期的都不可以；
    2.经过备案的域名：必须是备案过的，不然是无法使用的；
    3.绑定域名：首先你需要将需要分享的网址的域名绑定到微信公众平台上面，具体操作：
        先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”
*
* */
// 2.获取access_token：利用公共号APPID、APPSECRET从微信服务器获取对应的access_token，这是本地服务器去请求微信服务器
// 调用分享的SDK <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
$(function() {
    //对当前页面分享 url进行编码
    var localUrl = encodeURIComponent(location.href.split('#')[0]);
    //url传到后台格式
    var Url = "URL=" +localUrl;

    $.ajax({
        //后台获取参数接口
        //这几个参数都是后台做服务器中转从微信公众平台获取到，传递给前端
       // var nonceStr, signature, timestamp, appId, shareUrl;
        url: "https://www.xxxxxxx.cn/user/xxxxxxxx/",// 请求本地服务器获取 参数
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Token", getCookie("token"));
        },
        type: 'get',
        data: Url,
        success: function(data) {
            //得到参数
            var appId = JSON.parse(data).appId;
            var nonceStr = JSON.parse(data).nonceStr;
            var signature = JSON.parse(data).signature;
            var timestamp = JSON.parse(data).timestamp;
            var shareUrl = JSON.parse(data).url;
            //通过微信config接口注入配置
            wx.config({
                debug: false, // 默认为false  为true的时候是调试模式，会打印出日志
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
            //配置自定义分享内容
            window.share_config = {
                'share': {
                    'imgUrl': 'https://www.xxxxxx.cn/cecerecruit/img/%E6%B5%8B%E6%B5%8B%E6%8B%9B%E5%8B%9F.png', // 这里是需要展示的图标
                    'desc': '120秒，48项天赋解析，90分钟专家咨询解读，深度剖析您的天赋人生。成为测测科技合伙人，尊享至多11项专属超值礼遇。', // 这是分享展示的摘要
                    'title': '90%的人都认可测测科技天赋智能测评|合伙人现正招募中', // 这是分享展示卡片的标题
                    'link': shareUrl, // 这里是分享的网址
                    'success': function(rr) {
                        //console.log('成功' + JSON.stringify(rr))
                    },
                    'cancel': function(tt) {
                        //console.log('失败' + JSON.stringify(tt));
                    }
                }
            };
            wx.ready(function() {
                wx.onMenuShareAppMessage(share_config.share); // 微信好友
                wx.onMenuShareTimeline(share_config.share); // 微信朋友圈
                wx.onMenuShareQQ(share_config.share); // QQ
            });

        },
        error: function(err) {

        },
    });

})
