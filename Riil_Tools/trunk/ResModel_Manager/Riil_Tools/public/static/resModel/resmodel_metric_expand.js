var expand_table = null;
var metricId = $(window.parent.document).find('#m_paramid').val();
var id = window.parent.id;
$(document).ready(function() {
  var url = ctx + "/resmodel/resModelCotroll/getSNMPSupportCommandList?modelId=" + id + "&metricId=" + metricId;
  expand_table = $('#metricExpandTable').dataTable({
    "oLanguage": GIRD_I18N,
    "bFilter": false,
    "bProcessing": true,
    "bLengthChange": false,
    "bAutoWidth": true,
    "aLengthMenu": [3],
    "bSort": false,
    /*"aaData": dataSet1,*/
    "ajax": url,
    /*"aaData" : JSON.parse(data),*/
    "initComplete": initCheckBox,
    "columns": [{
      "aDataSort": false,
      "data": "cmdsGroupId",
      "render": function(data, type, row) {
        return '<input type="checkbox" name="cb" value ="' + data + '" >';
      }
    }, {
      "data": "sysOID"
    }, {
      "data": "sysVersion"
    }, {
      "data": "collectCmd"
    }, {
      "data": "collectType"
    }]
  });
});

function initCheckBox() {
  $('#all').bind('click', function() {
    var allCk = document.getElementById("all");
    var names = document.getElementsByName("cb");
    for (var i = 0; i < names.length; i++) {
      if (allCk.checked == true) {
        if (names[i].value !== '' && !names[i].disabled) {
          names[i].checked = true;
        }
      } else {
        names[i].checked = false;
      }
    }
  });

  $('input:checkbox[id!="all"]').click(function() {
    $("input[name='cb']:checked").length == $("input[name='cb']").length ?
      $("#all").prop("checked", true) : $("#all").prop("checked", false);
  });
}

function addExpand() {
  $.get(ctx + "/resmodel/resModelCotroll/addMetricExpand", function(data) {
    parent.myAlert({
      title: '添加扩展指标信息',
      msg: data,
      type: 'alertadd',
      width: 554,
      height: 230,
      outAlert: 109
    });
  });
}

/**删除操作*/
function delExpandInfos() {
  var ids = [];
  $("input[name='cb']:checked").each(function(i, e) {
    ids.push($(e).val());
  });
  if (ids.length == 0) {
    alert("请选择您要删除的记录");
  } else {
    var r = confirm("确定要删除所选记录吗？");
    if (r == true) {
      sureDeleteExpandInfos(ids);
    }
  }
}

function sureDeleteExpandInfos(ids) {
  var msg = '';
  $.ajax({
    type: 'post',
    url: ctx + "/resmodel/resModelCotroll/delSNMPSupportCommand",
    data: {
      ids: ids
    },
    dataType: 'json',
    success: function(data) {
      if (data.msg == '1') {
        msg = "操作成功";
        var url = ctx + "/resmodel/resModelCotroll/getSNMPSupportCommandList?modelId=" + id + "&metricId=" + metricId;
        $.ajax({
          type: 'get',
          url: url,
          //async:true,//表示该ajax为同步的方式
          success: function(data) {
            expand_table.fnClearTable();
            if (data.data.length > 0) {
              expand_table.fnAddData(data.data);
            }
          },
          error: function() {
            alert("操作失败");
          }
        });
        alert(msg);
      } else {
        msg = "操作失败";
        alert(msg);
      }
    },
    error: function() {
      msg = "操作失败";
      alert(msg);
    }
  });
}