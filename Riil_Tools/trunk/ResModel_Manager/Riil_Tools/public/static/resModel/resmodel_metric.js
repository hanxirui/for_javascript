var login_userName = $(window.parent.document).find('input[id=userId]').val();
var table = null;
$(document).ready(function () {
  table = $('#metricTable').dataTable({
    "oLanguage": GIRD_I18N,
    "bFilter": false,
    "bProcessing": true,
    "bLengthChange": false,
    "bAutoWidth": true,
    "aLengthMenu": [22],
    "ajax": ctx + "/resmodel/resModelCotroll/getAllMetricInfos?modelId=" + id,
    /*"aaData" : JSON.parse(data),*/
    "initComplete": initCheckBox,
    'columnDefs':[{
                 orderable:false,//禁用排序
                 targets:[0]   //指定的列
             }],
    "columns": [
      {
        "aDataSort": false,
        "data": "metricId",
        "render": function (data, type, row) {
          if(row.isCustom === 0){
            return '<input type="checkbox" name="cb" disabled="disabled" value ="" >';
          }else{
            return '<input type="checkbox" name="cb" value ="' + data + '" >';
          }
          
        }
      }, {
        "data": "metricName",
        "render": function (data, type, row) {
          var info = "'" + id + "'" + ",'" + row.metricId + "'";
          return '<a val="' + row.metricId + '" title="' + data + '" onclick="resmodelMetric.updateModelMetricInfo('+info+')" >' + data + '</a>';
        }
      }, {
        "data": "isInstance",
        "render":function (data, type, row){
          if(row.isInstance === 1){
            return '<span>是</span>';
          }else{
            return '<span>否</span>';
          }
        }
      }, {
        "data": "isInitValue",
        "render":function (data, type, row){
          if(row.isInitValue === 1){
            return '<span>是</span>';
          }else{
            return '<span>否</span>';
          }
        }
      }, {
        "data": "isDisplayName",
        "render":function (data, type, row){
          if(row.isDisplayName === 1){
            return '<span>是</span>';
          }else{
            return '<span>否</span>';
          }
        }
      }, {
        "data": "coltProtocol"
      }
    ]

  });
});

function initCheckBox() {
  $('#all').bind('click', function () {
    var allCk = document.getElementById("all");
    var names = document.getElementsByName("cb");
    for (var i = 0; i < names.length; i++) {
      if (allCk.checked == true) {
        if(names[i].value !== '' && !names[i].disabled){
          names[i].checked = true;
        }
      } else {
        names[i].checked = false;
      }
    }
  });

  $('input:checkbox[id!="all"]').click(function () {
    $("input[name='cb']:checked").length == $("input[name='cb']").length ?
      $("#all").prop("checked", true) : $("#all").prop("checked", false);
  });
}

/**管理 添加、修改、删除*/
var resmodelMetric = {
  delResmodelMetric: function() {
    var delIds = [];
    $("input[name='cb']:checked").each(function(i, e) {
      delIds.push($(e).val());
    });
    if (delIds.length == 0) {
      alert("请选择您要删除的记录");
    } else {
      var r = confirm("确定要删除所选记录吗？");
      if(r == true){
        resmodelMetric.sureDelResmodelMetric(delIds);
      }
    }
    
  },
  sureDelResmodelMetric: function(ids) {
    var msg = '';
    var data = {
      'ids': ids,
      'modelId':id
    };
    $.ajax({
      type: 'post',
      url: ctx + "/resmodel/resModelCotroll/delMetricInfos",
      data: data,
      dataType: 'json',
      success: function(data) {
        if (data.msg == '1') {
          table.fnClearTable();
          var nowTime = new Date().getTime();
          $.ajax({
              type : 'get',
              url : ctx + "/resmodel/resModelCotroll/getAllMetricInfos?modelId=" + id + '&date=' + nowTime,
              async:true,//表示该ajax为同步的方式
              success : function(data){
                if(data.data.length > 0){
                  table.fnAddData(data.data);
                }
              },
              error:function(){
                alert("操作失败");
              }
          });
          msg = "操作成功";
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
    /*setSMsgContent(msg, 70, "45%");*/
  },
  popMetricAddPage: function() {
    $.get(ctx + "/resmodel/resModelCotroll/addMetricInfo", function(data) {
      myAlert({
        title: '添加指标信息',
        msg: data,
        type: 'alert',
        width: 602,
        height: 350
      });
    });
  },
  updateModelMetricInfo: function(modelId, metricId) {
    var nowTime = new Date().getTime();
    var url = ctx + '/resmodel/resModelCotroll/updateMetricInfo?modelId=' + modelId + '&metricId=' + metricId + '&date=' + nowTime;
    $.get(url, function(data) {
      myAlert({
        title: '编辑',
        msg: data,
        type: 'alert',
        width: 602,
        height: 350
      });
    });
  }
};
