前言：
	对于下载pdf,可使用window.open ,或 a标签 染安给浏览器下载，但会有兼容性，最好是文件流

	let _this = this;
                let ua = navigator.userAgent.toLocaleLowerCase();
                let browserType=null;
                if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
                  browserType = "IE";
                let  browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
                  window.open(`${axios.defaults.baseURL}/${axios.defaults.headers.common.AppId}${this.pdfUrls}`);
                  return ;
                }

              let loading = this.$loading({
                lock: true,
                text: '下载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

            // 获取 文件流
              downPdf({
                url:`/${axios.defaults.headers.common.AppId}/api/mb-download/${this.ppfId}`,
                method:"get",
                responseType:'arraybuffer'
              }).then(res=>{
                loading.close();
               // console.log(22222,res.data)
                const blob = new Blob([res.data], {type: "application/x-msdownload"});
             //   console.log('blob',blob)
               const down = document.createElement('a');
                const href = window.URL.createObjectURL(blob);
                down.href = href;
               // console.log(this.pdfUrls)
                let typePdf = this.pdfUrls.slice(-4);
                if (typePdf == '.pdf'){
                 // down.download = `${this.pdfName}.pdf`;
                  down.download = '申报模板.pdf';
                 // console.log('pdf')
                }else if (typePdf == '.PDF') {
                  down.download = '申报模板.PDF';
                 // console.log('PDF')
                }else if (typePdf == '.ppt') {
                  down.download = '申报模板}.ppt';
                 // console.log('ppt')
                }else if (typePdf == 'pptx') {
                  down.download = '申报模板.pptx';
                 // console.log('pptx')
                }

                document.body.appendChild(down)
                down.click()
                document.body.removeChild(down);
                window.URL.revokeObjectURL(href)
              });/**/

    方式（二）

    axios 拦截器
    service.interceptors.response.use(
      response => {
        // 导出
        const headers = response.headers
        if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
          return response.data
        }
        ...
      },
      error => {
        return Promise.reject(error)
      }
    )
	// api
	export function export(params = {}) {
      return request({
        url: '/export',
        method: 'post',
        data: params,
        responseType: 'blob'
      })
    }

    // 请求处理

    exportClick () {
          export().then(res => {
            const content = res
            const blob = new Blob([content])
            const fileName = '导出信息.xlsx'
            if ('download' in document.createElement('a')) { // 非IE下载
              const elink = document.createElement('a')
              elink.download = fileName
              elink.style.display = 'none'
              elink.href = URL.createObjectURL(blob)
              document.body.appendChild(elink)
              elink.click()
              URL.revokeObjectURL(elink.href) // 释放URL 对象
              document.body.removeChild(elink)
            } else { // IE10+下载
              navigator.msSaveBlob(blob, fileName)
            }
          })
        }
	这里用到了Blob对象，这里是从服务器接收到的文件流（content-type:application/octet-stream）创建blob对象
	使用该blob 创建一个指向类型数组的URL，将该url作为a标签的链接目标，然后去触发a标签的点击事件从而文件下载
