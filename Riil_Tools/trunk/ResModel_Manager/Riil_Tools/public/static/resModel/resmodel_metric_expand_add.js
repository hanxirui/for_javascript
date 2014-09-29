$(document).ready(function () {
  $("#extCmd").val($("#collectCmds").val());
  var collectCmd = $("#collectParameters").val();
  if(collectCmd !== ''){
    $("#collectType").val(collectCmd.split('=')[1]);
  }
});

function checkSysOidNotNull() {
  var extSysoid = $('#extSysoid').val();
  var notNull = true;
  if (extSysoid === '') {
    err_msg_show('extSysoid', 'extSysoid_msg', '不能为空', true);
    notNull = false;
  } else {
    err_msg_show('extSysoid', 'extSysoid_msg', '', false);
  }
  return notNull;
}

function addExtCmd() {
  if (checkSysOidNotNull()) {
    var data = {
      'collectCmdUUID' : collCommandId,
      'sysOID' : $('#extSysoid').val(),
      'sysVersion' : $('#extRel').val()
    };
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resModelCotroll/saveAddSNMPSupportCommand',
      data: data,
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function(data) {
        if (data.msg === '1') {
          var url = ctx + "/resmodel/resModelCotroll/getSNMPSupportCommandList?modelId=" + id + "&metricId=" + metric_id;
          $.ajax({
            type: 'get',
            url: url,
            //async:true,//表示该ajax为同步的方式
            success: function(data) {
              $("#extcmd")[0].contentWindow.expand_table.fnClearTable();
              if (data.data.length > 0) {
                $("#extcmd")[0].contentWindow.expand_table.fnAddData(data.data);
              }
              alert('操作成功');
              closeAlert('alertadd');
            },
            error: function() {
              alert("操作失败");
            }
          });
        } else {
          alert('操作失败');
          closeAlert('alertadd')
        }
      },
      error: function(err) {
        alert('操作错误');
      }
    });
  }
}