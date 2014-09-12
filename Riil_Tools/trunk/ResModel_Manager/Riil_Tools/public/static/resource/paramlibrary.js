$(document).ready(function() {

    $('#libraryData').dataTable({
     ajax:ctx + '/resmodel/paramlibrary/queryLibraryData',
     bFilter: false,
  	 bLengthChange: false,
  	 sScrollY: '590px',
  	 bAutoWidth: true,
  	 bJQueryUI: false,
  	 oLanguage: GIRD_I18N,
  	 initComplete: initCheckBox,
     aLengthMenu:[20],
     aoColumns: [
      {data:"metricId",
        "aDataSort":false,
      	"render": function(data, type, row ) {
			    return "<input type='checkbox' name='cb' value='"+ data+"'/>";	
	  }},
      { data: "metricName" ,
        "render": function(data, type, row ) {
          return '<a onclick="updateMetric(\''+row.metricId+'\')">'+data+'<a>';  
      }
      },
      { data: "metricType" },
      { data: "groupName" },
      { data: "metricUnit" },
      { data: "dataType"},
      { data: "metricDesc"},
      { data: "metricUser"}
     ]
    }); 
});

function initCheckBox() {
  $('#all').bind('click', function() {
    var allCk = document.getElementById("all");
    var names = document.getElementsByName("cb");
    for (var i = 0; i < names.length; i++) {
      if (allCk.checked == true) {
        names[i].checked = true;
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
function deleteMetric(){
  if ($("input[name='cb']:checked").length == 0) {
    alert("请选择您要删除的记录");
  } else {
   if(confirm("确定要清空数据吗？")){
    deleteLibrary();
   }
  }
}

/**
 * 打开修改页面
 */
function updateMetric(metricId){
  $.get(ctx + '/resmodel/paramlibrary/updateLibraryData?id='+metricId, function(data) {
    myAlert({
      title : '修改指标信息',
      msg : data,
      type : 'alert',
      width : 601,
      height : 283
    });
  });
}

/**
 * 删除指标（删除按钮）
 */
function deleteLibrary() {
  var metricId = [];
  $("input[name='cb']:checked").each(function(e,data){
    metricId.push(data.value);
  });
  $.ajax({
    type : 'post',
    url : ctx + '/resmodel/paramlibrary/deleteLibraryData',
    data : {id:metricId},
    success : function(data) {
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
      title : '添加指标信息',
      msg : data,
      type : 'alert',
      width : 601,
      height : 283
    });
  });
}

/**
 * 添加指标（提交数据按钮）
 */
function submitlibrary() {
    var paramgroup = [];
    $("input[name='m_paramgroup']:checked").each(function(e,data){
      paramgroup.push(data.value);
    });
    

    $.ajax({
      type : 'post',
      url : ctx + '/resmodel/paramlibrary/addMretric',
      data :{
        metricName : $("#m_paramname").val(),
        metricDesc : $("#m_paramdesc").val(),
        metricType : $("#m_paramtype").val(),
        metricUnit : $("#m_paramunit").val(),
        metricDataType : $("#m_paramdatatype").val(),
        metricGroupName : paramgroup
      },
      success : function(msg) { // 提交成功后的回调，msg变量是输出的内容。
        if (msg == "ok") {
          setSMsgContent("操作成功", 70, "45%");
          closeAlert("alert");
          // 清除JQuery的缓存，使load页面有效
          $.ajaxSetup({
            cache : false
          });
          $("#form1").load(ctx + "/paramlibrary/listparam?page=0");
        } else {
          setSMsgContent("操作失败", 70, "45%");
          closeAlert("alert");
          $.ajaxSetup({
            cache : false
          });
          $("#form1").load(ctx + "/paramlibrary/listparam?page=0");
        }
      }
    });
}

