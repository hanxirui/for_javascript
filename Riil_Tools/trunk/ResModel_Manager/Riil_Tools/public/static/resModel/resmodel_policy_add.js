var policy_tb = null;
var policy_tb_save = null;
var event_tb = null;
var event_tb_save = null;
$(document).ready(function() {
  $.ajax({
    url: ctx + "/resmodel/resModelCotroll/getModelPolicyBaseInfor?modelId=" + id,
    type: "get",
    dataType: "json",
    success: function(data) {
      if(data.data.length !== 0){
        $("#policyId").val(data.data[0].policyId);
        $("#policyName").val(data.data[0].policyName);
        $("#policyDesc").val(data.data[0].policyDesc);
        $("#policyTypeSelect").val(data.data[0].policyType);
        if(roleId === 'MAN_ENGINEER'){
          $("#addPolicyBaseicInfoBtn").toggleClass('btn_dis');
        }
      }
    }
  });
  policy_tb = $('#policyTable').dataTable({
    "oLanguage": GIRD_I18N,
    "bFilter": false,
    "bProcessing": true,
    "bLengthChange": false,
    "bAutoWidth": true,
    "aLengthMenu": [3],
    "bSort": false,
    "aoColumnDefs": [{
      "bVisible": false,
      "data": "policyId"
    }, {
      "bVisible": false,
      "data": "metricId"
    }],
    /*"data": dataSet,*/
    "ajax": ctx + "/resmodel/resModelCotroll/getThresholdList?modelId=" + id,
    /*"aaData" : JSON.parse(data),*/
    "columns": [{
      "data": "metricType"
    }, {
      "data": "metricGroupId",
      "render": function(data, type, row) {
        return '<span title="' + data + '" >' + data + '</span>';
      }
    }, {
      "data": "metricName"
    }, {
      "data": "metricFlapping",
      "render": function(data, type, row) {
        return '<input type="text" name="times" onchange="changeTimes(this);" class="w_40" value ="' + data + '" >';
      }
    }, {
      "data": "collectTimeOut",
      "render": function(data, type, row) {
        return '<input type="text" name="timeOut" onchange="changeTimeOut(this);" class="w_40" value ="' + data + '" >';
      }
    }, {
      "data": "collectRetry",
      "render": function(data, type, row) {
        return '<input type="text" name="retryTimes" onchange="changeRetryTimes(this);" class="w_40" value ="' + data + '" >';
      }
    }, {
      "data": "collectFrequency",
      "render": function(data, type, row) {
        return '<input type="text" name="frequency" onchange="changeFrequency(this);" class="w_40" value ="' + data + '" >';
      }
    }, {
      "data": "isInUsed",
      "render": function(data, type, row) {
        if (data === 1) {
          return '<input type="checkbox" checked="checked" name="isMonitor" value ="' + data + '" >';
        } else {
          return '<input type="checkbox" name="isMonitor" value ="' + data + '" >';
        }
      }
    }, {
      "data": "isGenEvent",
      "render": function(data, type, row) {
        if (data === 1) {
          return '<input type="checkbox" checked="checked" name="isEvent" value ="' + data + '" >';
        } else {
          return '<input type="checkbox" name="isEvent" value ="' + data + '" >';
        }
      }
    }, {
      "data": "c_exp1",
      "render": function(data, type, row) {
        if (row.metricType === 'PERF') {
          if (data !== null) {
            return '<input type="text" name="redVal" onchange="changeRedVal(this);" class="w_40" value ="' + data + '" >';
          } else {
            return '<input type="text" name="redVal" onchange="changeRedVal(this);" class="w_40" value ="" >';
          }
        } else {
          return '<input type="text" name="redVal" disabled="disabled" class="w_40" value ="" >';
        }
      }
    }, {
      "data": "c_exp2",
      "render": function(data, type, row) {
        if (row.metricType === 'PERF') {
          if (data !== null) {
            return '<input type="text" name="yellowVal" onchange="changeYellowVal(this);" class="w_40" value ="' + data + '" >';
          } else {
            return '<input type="text" name="yellowVal" onchange="changeYellowVal(this);" class="w_40" value ="" >';
          }
        } else {
          return '<input type="text" name="yellowVal" disabled="disabled" class="w_40" value ="" >';
        }
      }
    }, {
      "data": "c_exp3",
      "render": function(data, type, row) {
        if (row.metricType === 'PERF') {
          if (data !== null) {
            return '<input type="text" name="greenVal" onchange="changeGreenVal(this);" class="w_40" value ="' + data + '" >';
          } else {
            return '<input type="text" name="greenVal" onchange="changeGreenVal(this);" class="w_40" value ="" >';
          }
        } else {
          return '<input type="text" name="greenVal" disabled="disabled" class="w_40" value ="" >';
        }
      }
    }, {
      "render": function(data, type, row) {
        return '<a class="btn_op" id="saveThshold">保存</a>';
      }
    }]

  });

  event_tb = $('#eventTable').dataTable({
    "oLanguage": GIRD_I18N,
    "bFilter": false,
    "bProcessing": true,
    "bLengthChange": false,
    "bAutoWidth": true,
    "aLengthMenu": [4],
    "bSort": false,
    /*"aaData": dataSet1,*/
    "ajax": ctx + "/resmodel/resModelCotroll/getModelEventList?modelId=" + id,
    "aoColumnDefs": [{
      "bVisible": false,
      "data": "c_id"
    }],
    /*"aaData" : JSON.parse(data),*/
    "columns": [{
      "data": "eventName"
    }, {
      "data": "displayName"
    }, {
      "data": "eventType"
    }, {
      "data": "eventLevel",
      "render": function(data, type, row) {
        return '<input type="text" name="eventLevel" onchange="changeEventLevel(this);" class="w_160" value ="' + data + '" >';
      }
    }, {
      "data": "isInUsed",
      "render": function(data, type, row) {
        if (data === 1) {
          return '<input type="checkbox" checked="checked" name="isOpen" value ="' + data + '" >';
        } else {
          return '<input type="checkbox" name="isOpen" value ="' + data + '" >';
        }
      }
    }, {
      "render": function(data, type, row) {
        if(roleId === 'MAN_ENGINEER'){
          return '<span class="btn_op_dis" disabled="disabled">保存</span>';
        }else{
          return '<a class="btn_op" id="saveEvent">保存</a>';
        }
      }
    }]

  });

  $('#policyTable tbody').on('click', 'a#saveThshold', function() {
    var data = policy_tb.fnGetData($(this).parents('tr'));
    $(this).parents('tr').find('input').each(function() {
      var input_type = $(this).attr('type');
      if (input_type === 'checkbox') {
        if ($(this).attr('name') === 'isMonitor') {
          if (!this.checked) {
            policy_tb.fnGetData($(this).parents('tr')).isInUsed = 0;
          } else {
            policy_tb.fnGetData($(this).parents('tr')).isInUsed = 1;
          }
        } else {
          if (!this.checked) {
            policy_tb.fnGetData($(this).parents('tr')).isGenEvent = 0;
          } else {
            policy_tb.fnGetData($(this).parents('tr')).isGenEvent = 1;
          }
        }
      }
    });
    policy_tb_save = $(this).parents('tr');
    /**调用修改阈值方法*/
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resModelCotroll/updatePolicyMetricThreshold',
      data: policy_tb.fnGetData($(this).parents('tr')),
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function(data) {
        if (data.msg === '1') {
          policy_tb_save.find('input').each(function() {
            $(this).attr('disabled', 'disabled');
          });
          policy_tb_save.find('a').text('编辑');
          policy_tb_save.find('a').attr('id', 'editThshold');
          alert('操作成功');
        } else {
          alert('操作失败');
        }
      },
      error: function(err) {
        alert('操作错误');
      }
    });
  });

  $('#policyTable tbody').on('click', 'a#editThshold', function() {
    $(this).parents('tr').find('input').each(function() {
      $(this).removeAttr('disabled');
    });
    $(this).parents('tr').find('a').text('保存');
    $(this).parents('tr').find('a').attr('id', 'saveThshold');
  });

  $('#eventTable tbody').on('click', 'a#saveEvent', function() {
    var data = event_tb.fnGetData($(this).parents('tr'));
    $(this).parents('tr').find('input').each(function() {
      var input_type = $(this).attr('type');
      if (input_type === 'checkbox') {
        if ($(this).attr('name') === 'isOpen') {
          if (!this.checked) {
            event_tb.fnGetData($(this).parents('tr')).isInUsed = 0;
          } else {
            event_tb.fnGetData($(this).parents('tr')).isInUsed = 1;
          }
        }
      }
    });
    event_tb_save = $(this).parents('tr');
    /**调用修改阈值方法*/
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resModelCotroll/updatePolicyEvent',
      data: event_tb.fnGetData($(this).parents('tr')),
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function(data) {
        if (data.msg === '1') {
          event_tb_save.find('input').each(function() {
            $(this).attr('disabled', 'disabled');
          });
          event_tb_save.find('a').text('编辑');
          event_tb_save.find('a').attr('id', 'editEvent');
          alert('操作成功');
        } else {
          alert('操作失败');
        }
      },
      error: function(err) {
        alert('操作错误');
      }
    });
  });

  $('#eventTable tbody').on('click', 'a#editEvent', function() {
    $(this).parents('tr').find('input').each(function() {
      $(this).removeAttr('disabled');
    });
    $(this).parents('tr').find('a').text('保存');
    $(this).parents('tr').find('a').attr('id', 'saveEvent');
  });

});

function checkIdNoNull() {
  var policy_id = $("#policyId").val();
  var notNull = true;
  if (policy_id === '') {
    err_msg_show('policyId', 'policyId_msg', '不能为空', true);
    notNull = false;
  } else if (policy_id.indexOf('RIIL_RMP_RES_') === -1) {
    err_msg_show('policyId', 'policyId_msg', 'ID必须以RIIL_RMP_RES_开头', true);
    notNull = false;
  } else {
    err_msg_show('policyId', 'policyId_msg', '', false);
    $('#policyId_msg').text('ID必须以RIIL_RMP_RES_开头');
  }
  return notNull;
}

function addPolicyBasicInfo() {
  if (checkIdNoNull()) {
    var data = {
      modelId: id,
      id: $("#policyId").val(),
      name: $("#policyName").val(),
      desc: $("#policyDesc").val(),
      type: $("#policyTypeSelect").val()
    }
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resModelCotroll/updatePolicyInfo',
      data: data,
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function(data) {
        if (data.msg === '1') {
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

function changeTimes(obj) {
  var times = $(obj).val();
  policy_tb.fnGetData($(obj).parents('tr')).metricFlapping = times;
}

function changeTimeOut(obj) {
  var timeOut = $(obj).val();
  policy_tb.fnGetData($(obj).parents('tr')).collectTimeOut = timeOut;
}

function changeRetryTimes(obj) {
  var retryTimes = $(obj).val();
  policy_tb.fnGetData($(obj).parents('tr')).collectRetry = retryTimes;
}

function changeFrequency(obj) {
  var frequency = $(obj).val();
  policy_tb.fnGetData($(obj).parents('tr')).collectFrequency = frequency;
}

function changeRedVal(obj) {
  var redVal = $(obj).val();
  policy_tb.fnGetData($(obj).parents('tr')).c_exp1 = redVal;
}

function changeYellowVal(obj) {
  var yellowVal = $(obj).val();
  policy_tb.fnGetData($(obj).parents('tr')).c_exp2 = yellowVal;
}

function changeGreenVal(obj) {
  var greenVal = $(obj).val();
  policy_tb.fnGetData($(obj).parents('tr')).c_exp3 = greenVal;
}

function changeEventLevel(obj) {
  var eventLevel = $(obj).val();
  event_tb.fnGetData($(obj).parents('tr')).eventLevel = eventLevel;
}