function fnExcelUpload(event) {
     /// <summary>上传Excel</summary>
     /// <param name="event" type="Object">file对象</param>
     // fnPushMainTr();

     $.ajaxFileUpload({
        url: "/ajaxfile",
        secureuri: false, // 一般设置为false
        fileElementId: "excel_upload", // 文件上传表单的id <input type="file" id="fileUpload" name="file" />
         dataType: 'json', // 返回值类型 一般设置为json
         success: function (data) {
             if (!data || data.reuslt == 'error' || data.result == 'warning') {
                 // fnErrorMsg(data);
                 return;
             }
         //设置上传Excel按钮样式
         $('#btn-upload').removeClass('exl-submit-can').addClass('exl-submit-no').children('input').attr('disabled', true);
             //设置第一步的样式，并增加文字提示“完成”
             $('#step_one').removeClass('step-one-a').addClass('step-one-b').siblings('p:last').addClass('fc-green')
                 .children('span').text('完成')
                 .parents('li').addClass('fc-green');
             $('#loading_info').html('<span class="progress">Excel格式校验进行中</span>');
             setTimeout(function () {
                 // fnGetState();
             }, 1000);

        },
         error: function (data)// 服务器响应失败处理函数
         {
             console.log("服务器异常");
         }
     });
 }