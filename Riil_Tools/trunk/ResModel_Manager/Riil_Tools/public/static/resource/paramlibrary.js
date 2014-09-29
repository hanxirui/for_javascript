var library_tb = null;
var login_userName = $(window.parent.document).find('input[id=userId]').val();
$(document).ready(function() {

  /**类型*/
  $.get(ctx + '/resmodel/paramlibrary/getMetricTypeList/', function(typeInfos) {
    $("#typeSelect").prepend("<option value=''>请选择</option>");
    for (var i = 0; i < typeInfos.data.length; i++) {
      $("#typeSelect").append('<option value=' + typeInfos.data[i].c_metric_type + '>' + typeInfos.data[i].c_metric_type + '</option>');
    }
  });

  /**分组*/
  $.get(ctx + '/resmodel/paramlibrary/getMetricGroupList/', function(typeInfos) {
    $("#groupSelect").prepend("<option value=''>请选择</option>");
    for (var i = 0; i < typeInfos.data.length; i++) {
      $("#groupSelect").append('<option value=' + typeInfos.data[i].groupId + '>' + typeInfos.data[i].groupName + '</option>');
    }
  });

  library_tb = $('#libraryData').dataTable({
    ajax: ctx + '/resmodel/paramlibrary/queryLibraryData',
    bFilter: false,
    bLengthChange: false,
    sScrollY: '590px',
    bAutoWidth: true,
    bJQueryUI: false,
    oLanguage: GIRD_I18N,
    initComplete: initCheckBox,
    "bProcessing": true,
    aLengthMenu: [20],
    aoColumns: [{
      data: "metricId",
      "aDataSort": false,
      "render": function(data, type, row) {
        debugger;
        if(row.isCustom === '0'){
          return "<input type='checkbox' name='cb' disabled='disabled' />";
        }else{
          return "<input type='checkbox' name='cb'  value='" + data + "'/>";
        }
        
      }
    }, {
      data: "metricName",
      "render": function(data, type, row) {
        if(row.isCustom === '0'){
          return '<span  title="' + data + '">' + data + '<a>';
        }else{
          return '<a onclick="updateMetric(\'' + row.metricId + '\')">' + data + '<a>';
        }
        
      }
    }, {
      data: "metricType"
    }, {
      data: "groupName"
    }, {
      data: "metricUnit"
    }, {
      data: "dataType"
    }, {
      data: "metricDesc"
    }, {
      data: "metricUser"
    }]
  });
});

function initCheckBox() {
  $('#all').bind('click', function() {
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

  $('input:checkbox[id!="all"]').click(function() {
    $("input[name='cb']:checked").length == $("input[name='cb']").length ?
      $("#all").prop("checked", true) : $("#all").prop("checked", false);
  });
};

/**
 * 删除指标（删除按钮）
 */
function deleteMetric() {
  if ($("input[name='cb']:checked").length == 0) {
    alert("请选择您要删除的记录");
  } else {
    if (confirm("确定要清空数据吗？")) {
      deleteLibrary();
    }
  }
}

/**
 * 打开修改页面
 */
function updateMetric(metricId) {
  $.get(ctx + '/resmodel/paramlibrary/updateLibraryData?id=' + metricId, function(data) {
    myAlert({
      title: '修改指标信息',
      msg: data,
      type: 'alert',
      width: 601,
      height: 283
    });
  });
}

/**
 * 删除指标（删除按钮）
 */
function deleteLibrary() {
  var metricId = [];
  $("input[name='cb']:checked").each(function(e, data) {
    metricId.push(data.value);
  });
  $.ajax({
    type: 'post',
    url: ctx + '/resmodel/paramlibrary/deleteLibraryData',
    data: {
      id: metricId
    },
    success: function(data) {
      if (data.msg == "success") {
        alert('操作成功');
        var iframedom = $('#model_add', parent.document)[0];
        iframedom.src = ctx + "/resmodel/paramlibrary/listparam";
      } else {
        alert('操作失败');
      }
    }
  });
}

/**
 * 添加指标（确定按钮），弹出弹出框信息
 */
function pop() {
  $.post(ctx + '/resmodel/paramlibrary/addLibraryData', function(data) {
    myAlert({
      title: '添加指标信息',
      msg: data,
      type: 'alert',
      width: 601,
      height: 283
    });
  });
}

/**
 * 添加指标（提交数据按钮）
 */
function submitlibrary() {
  var paramgroup = [];
  $("input[name='m_paramgroup']:checked").each(function(e, data) {
    paramgroup.push(data.value);
  });


  $.ajax({
    type: 'post',
    url: ctx + '/resmodel/paramlibrary/addMretric',
    data: {
      metricName: $("#m_paramname").val(),
      metricDesc: $("#m_paramdesc").val(),
      metricType: $("#m_paramtype").val(),
      metricUnit: $("#m_paramunit").val(),
      metricDataType: $("#m_paramdatatype").val(),
      metricGroupName: paramgroup
    },
    success: function(msg) { // 提交成功后的回调，msg变量是输出的内容。
      if (msg.msg == '1') {
        alert('操作成功');
        /*setSMsgContent("操作成功", 70, "45%");*/
        closeAlert("alert");
        // 清除JQuery的缓存，使load页面有效
        $.ajaxSetup({
          cache: false
        });
        var iframedom = $('#model_add', parent.document)[0];
        iframedom.src = ctx + "/resmodel/paramlibrary/listparam";
        /*debugger;
          library_tb.fnDraw();*/
      } else {
        alert('操作失败');
        /*setSMsgContent("操作失败", 70, "45%");*/
        closeAlert("alert");
        $.ajaxSetup({
          cache: false
        });
        $("#form1").load(ctx + "/paramlibrary/listparam");
      }
    }
  });
}
//修改指标库
function updateLib() {
  var paramgroup = [];
  $("input[name='m_paramgroup']:checked").each(function(e, data) {
    paramgroup.push(data.value);
  });


  $.ajax({
    type: 'post',
    url: ctx + '/resmodel/paramlibrary/updateMretric',
    data: {
      metricId: metric_id,
      metricName: $("#m_paramname").val(),
      metricDesc: $("#m_paramdesc").val(),
      metricType: $("#m_paramtype").val(),
      metricUnit: $("#m_paramunit").val(),
      metricDataType: $("#m_paramdatatype").val(),
      metricGroupName: paramgroup
    },
    success: function(msg) { // 提交成功后的回调，msg变量是输出的内容。
      if (msg.msg == '1') {
        alert('操作成功');
        /*setSMsgContent("操作成功", 70, "45%");*/
        closeAlert("alert");
        // 清除JQuery的缓存，使load页面有效
        $.ajaxSetup({
          cache: false
        });
        var iframedom = $('#model_add', parent.document)[0];
        iframedom.src = ctx + "/resmodel/paramlibrary/listparam";
        /*debugger;
          library_tb.fnDraw();*/
      } else {
        alert('操作失败');
        /*setSMsgContent("操作失败", 70, "45%");*/
        closeAlert("alert");
        $.ajaxSetup({
          cache: false
        });
        $("#form1").load(ctx + "/paramlibrary/listparam");
      }
    }
  });
}

function searchOnblur() {
  var val = $("#searchMetricName").val();
  if (val == '') {
    $("#searchMetricName").val('请输入指标名称进行搜索');
  }
}

function searchOnfocus() {
  var val = $("#searchMetricName").val();
  if (val === '请输入指标名称进行搜索') {
    $("#searchMetricName").val('');
  }
}

function searchMetricLibInfos () {
  var type = $('#typeSelect option:selected').val();
  var groupId = $('#groupSelect').val();
  var metricName = $('#searchMetricName').val();
  if (metricName == '请输入指标名称进行搜索' || metricName == '') {
    metricName = "";
  }
  var condition = {
    type: type,
    groupId: groupId,
    metricName: metricName
  };
  $.ajax({
    type: 'get',
    url: ctx + "/resmodel/paramlibrary/getMetricBaseByCondition",
    data: condition,
    dataType: 'json',
    //async:true,//表示该ajax为同步的方式
    success: function(data) {
      library_tb.fnClearTable();
      if (data.data.length > 0) {
        library_tb.fnAddData(data.data);
      }
    },
    error: function() {
      alert("操作失败");
    }
  });
}