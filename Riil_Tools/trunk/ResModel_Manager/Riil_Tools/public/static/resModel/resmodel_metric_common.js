function closeWin() {
  closeAlert("alert");
}
$(document).ready(function() {
  var iframe = $("#extcmd")[0];
  iframe.src = ctx + "/resmodel/resModelCotroll/getResModelExpand";
});

function checkMetricInfoNoNull() {
  var modelMetricId = $("#m_paramid").val();
  var collectCmdsVal = $("#collectCmds").val();
  var flag = true;
  if (modelMetricId === '') {
    err_msg_show('m_paramid', 'm_paramid_msg', '不能为空', true);
    flag = false;
  } else {
    err_msg_show('m_paramid', 'm_paramid_msg', '', false);
    flag = true;
  }
  if (collectCmdsVal === '') {
    err_msg_show('collectCmds', 'collectCmds_msg', '不能为空', true);
    flag = false;
  } else {
    err_msg_show('collectCmds', 'collectCmds_msg', '', false);
    flag = true;
  }
  return flag;
}
/**查询MetricId是否存在*/
function checkMetricIdExists() {
  var resModelMetricInfo = {
    'modelId': id,
    'metricId': $("#m_paramid").val(),
    'coltProtocol': $("#pluginProtocol").val(),
    'isInitValue': $('input:radio[name="isInitValue"]:checked').val(),
    'isInstance': $('input:radio[name="isInstance"]:checked').val(),
    'isDisplayName': $('input:radio[name="isDisplayName"]:checked').val()
  };
  var flag = false;
  $.ajax({
    type: 'get',
    url: ctx + "/resmodel/resModelCotroll/checkMetricInfoExists",
    data: resModelMetricInfo,
    async:false,//表示该ajax为同步的方式
    success: function(data) {
      if (data.msg === '1') {
        flag = true;
      } else {
        alert('该指标不存在，请添加');
        flag = false;
      }
    },
    error: function() {
      alert("操作失败");
      flag = false;
    }
  });
  return flag;
}
/**添加*/
function btnOk() {
  var resModelMetricInfo = {
    'modelId': id,
    'metricId': $("#m_paramid").val(),
    'resType': $("#resType").val(),
    'usedProtocol': $("#pluginProtocol").val(),
    'isInitvalue': $('input:radio[name="isInitValue"]:checked').val(),
    'isInstance': $('input:radio[name="isInstance"]:checked').val(),
    'isDisplayname': $('input:radio[name="isDisplayName"]:checked').val(),
    'collectCmds': $("#collectCmds").val(),
    'paramValue': $("#collectParameters").val(),
    'collCommandId': collCommandId
  };
  if (checkMetricInfoNoNull()) {
    if (metric_id !== '') {
      $.ajax({
        type: 'post',
        url: ctx + '/resmodel/resModelCotroll/updateMetric',
        data: resModelMetricInfo,
        dataType: 'json',
        //async:true,//表示该ajax为同步的方式
        success: function(data) {
          if (data.msg === '1') {
            $.ajax({
              type: 'get',
              url: ctx + "/resmodel/resModelCotroll/getAllMetricInfos?modelId=" + id,
              //async:true,//表示该ajax为同步的方式
              success: function(data) {
                table.fnClearTable();
                if (data.data.length > 0) {
                  table.fnAddData(data.data);
                }
              },
              error: function() {
                alert("操作失败");
              }
            });
            alert('操作成功');
            closeWin();
          } else {
            alert('操作失败');
          }
        },
        error: function(err) {
          alert('操作错误');
        }
      });
    } else {
      $.ajax({
        type: 'post',
        url: ctx + '/resmodel/resModelCotroll/addModelMetricInfo',
        data: resModelMetricInfo,
        dataType: 'json',
        //async:true,//表示该ajax为同步的方式
        success: function(data) {
          collCommandId = data.uuid;
          if (data.msg === '1') {
            $.ajax({
              type: 'get',
              url: ctx + "/resmodel/resModelCotroll/getAllMetricInfos?modelId=" + id,
              //async:true,//表示该ajax为同步的方式
              success: function(data) {
                table.fnClearTable();
                if (data.data.length > 0) {
                  table.fnAddData(data.data);
                }
              },
              error: function() {
                alert("操作失败");
              }
            });
            metric_id = $("#m_paramid").val();
            $("#m_paramid").attr('disabled','disabled');
            alert('操作成功');
          } else {
            alert('操作失败');
          }
        },
        error: function(err) {
          alert('操作错误');
        }
      });
    }
  }

}

function changeProtocol(){
  if($("#pluginProtocol").val() !== 'SNMP'){
    $("#tabs22").css('display', 'none');
  }else{
    $("#tabs22").css('display', 'block');
  }
}