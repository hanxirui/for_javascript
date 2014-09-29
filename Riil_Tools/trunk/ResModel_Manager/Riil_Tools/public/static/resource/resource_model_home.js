$(document).ready(function() {
  $("#resource_model_left").load(ctx + "/resmodel/menuController/turnLeftMenuPage", function() {
    /*alert('111');
		var iframedom = $('#model_add')[0];
		iframedom.src = ctx+"/resmodel/resourceTypeCotroller/getResourceTypeAdd";*/
  });
});

function allExport() {
  $.ajax({
    type: 'post',
    url: ctx + '/resmodel/exportController/export',
    dataType: 'json',
    //async:true,//表示该ajax为同步的方式
    success: function(data) {
      if (data.msg === '1') {
        alert('导出成功');
      } else {
        alert('导出失败');
      }
    },
    error: function(err) {
      alert('操作错误');
    }
  });
  alert('导出中，请稍候...');
}