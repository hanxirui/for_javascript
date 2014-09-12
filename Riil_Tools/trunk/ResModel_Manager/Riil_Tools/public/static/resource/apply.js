/* jshint jquery:true */
/* global GIRD_I18N,ctx,myAlert,setBMsgContent,msgHide,err_msg_show,nstrlength,setSMsgContent */
'use strict';

$(document).ready(function() {

  var usetId = $(window.parent.document).find("#userId").val();
  $('#backgroudTable').dataTable({
    ajax:ctx + '/resmodel/applymanager/queryData',
    bFilter: false,
    bLengthChange: false,
    sScrollY: '590px',
    bAutoWidth: true,
    bJQueryUI: false,
    oLanguage: GIRD_I18N,
    initComplete: initCheckBox,
    aoColumns: [{
      'aDataSort': false,
      data: 'c_id',
      'render': function(data, type, row) {
        if(usetId==="admin"){
          return '<input type="checkbox" name="cb" value="'+data+'"/>';
        }else if(usetId===row.c_operator_id){
          return '<input type="checkbox" name="cb" value="'+data+'"/>';
        }else{
           return '<input type="checkbox" name="cb" value="'+data+'" disabled="disabled"/>';
        }
        
      }
    }, {
      data: 'c_project_name',
      'render': function(data, type, row) {
        if(usetId==="admin"){
          return '<a onclick="updataBackGroud(this)" value="'+row.c_id+'">'+row.c_project_name+'</a>';
        }else if(usetId===row.c_operator_id){
          return '<a onclick="updataBackGroud(this)" value="'+row.c_id+'">'+row.c_project_name+'</a>';
        }else{
           return '<span value="'+row.c_id+'">'+row.c_project_name+'</span>';
        }
       
      }
    }, {
      data: 'c_ventor'
    }, {
      data: 'c_equipment_type'
    }, {
      data: 'c_apply_date'
    }, {
      data: 'c_operator_id'
    }, {
      data: 'c_desc'
    }, {
      data: 'c_backplane_name',
      'render': function(data, type, row) {
        return '<a id="download" onclick="downLoadFile(this)" value="'+data+'">下载</a>';
      }
    }]
  });

  //添加背板管理（确定按钮）
  function addBackGroud() {
    $('#add_button').click(function() {

      $.post(ctx + '/resmodel/applymanager/addapply', function(data) {
        myAlert({
          title: '背板制作申请添加',
          msg: data,
          type: 'alert',
          width: 600,
          height: 250
        });
      });
    });
  }

  function deleteBackGroud(){
    $('#delete_button').click(function(){
       
      if ($("input[name='cb']:checked").length == 0) {
        alert("请选择您要删除的记录");
      } else {
       if(confirm("确定要清空数据吗？")){
        deleteapply();
       }
      }
    });
  }
  addBackGroud();
  deleteBackGroud();

});

// 删除申请管理（点击删除按钮）
function deleteapply() {
  var backGroudId = [];
  $("input[name='cb']:checked").each(function(e,data){
    backGroudId.push(data.value);
  });
  $.ajax({
    type : 'post',
    url : ctx + '/resmodel/applymanager/deleteData',
    data : {id:backGroudId},
    success : function(data) {
      if (data.msg == "success") {
        alert('操作成功');
        var iframedom = $('#model_add', parent.document)[0];
        iframedom.src = ctx+"/resmodel/applymanager/listapply";
        closeAlert("alert");
      } else {
        alert('操作失败');
      }
    }
  });
}

  //修改背板管理
  function updataBackGroud(input) {
      var Id = $(input).attr('value');
      $.get(ctx + '/resmodel/applymanager/updataBackGroud?id='+Id, function(data) {
        myAlert({
          title: '项目信息查看',
          msg: data,
          type: 'alert',
          width: 600,
          height: 250
        });
      });
  }

function downLoadFile(input){
  var iframedom = $('#model_add', parent.document)[0];
    iframedom.src = ctx+"/resmodel/applymanager/downLoadFile?fileName="+$(input).attr('value');
}

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

function checkfile(fileInput) {

  $('#fileText').val(fileInput.files[0].name);
  if (fileInput.files[0].size > 10240000) {
    setBMsgContent('prompt_warning', 'warning_content', '附件超过10M', '',
      msgHide, 200, 400, true);
  }
  return false;
}

// 添加前验证（提交数据按钮）
function preSubmitapply() {
  if (checkid()) {
    checkIdValue();
  }
}

// 验证项目名称，只能输入汉字或字母、数字且长度不能超过20个字符
function checkid() {
  var m_projectname = $('#m_projectname').val().trim();
  var m_ventor = $('#m_ventor').val().trim();
  var m_equipmenttype = $('#m_equipmenttype').val().trim();
  var reg1 = /^[A-Z|a-z|\u4e00-\u9fa5]*$||[0-9]/;
  var flag = true;

  if ($.isNull(m_projectname) || m_projectname === '') {
    err_msg_show('m_projectname', 'projectMessage', '项目名称不能为空', true);
    flag = false;
  } else if (!reg1.test(m_projectname)) {
    err_msg_show('m_projectname', 'projectMessage', '只能输入汉字或字母', true);
    flag = false;
  } else if (nstrlength(m_projectname) > 20) {
    err_msg_show('m_projectname', 'projectMessage', '长度不能超过20个字符', true);
    flag = false;
  }

  if ($.isNull(m_ventor) || m_ventor === '') {
    err_msg_show('m_ventor', 'ventorMessage', '厂商名称不能为空', true);
    flag = false;
  }
  if ($.isNull(m_equipmenttype) || m_equipmenttype === '') {
    err_msg_show('m_equipmenttype', 'equipmentMessage', '设备型号不能为空', true);
    flag = false;
  }
  return flag;
}

// 判断项目名称不能重复
function checkIdValue() {
  var projectname = $('#m_projectname').val();
  $.ajax({
    type: 'post',
    url: ctx + '/resmodel/applymanager/checkIDRepeat',
    dataType: 'json',
    data: {
      'projectname': projectname,
    },
    success: function(data) {
      if (data.count === '0') {
        submitapply();
      } else {
        // 提示
        err_msg_show('m_projectname', 'projectMessage', '项目名称重复', true);
      }
    }
  });
}

// 添加申请管理（点击确定添加）
function submitapply() {
  if (!document.getElementById('file').value) {
    setBMsgContent('prompt_warning', 'warning_content', '请选择要上传的附件', '',
      msgHide, 270, 400, true);
    return false;
  } else {
    setSMsgContent('操作成功', 70, '45%');
    $('#addapplyform')[0].submit();
          
    return true;
  }
}

// 添加申请管理（点击确定添加）
function submitLoad() {
  var a = $($("#frameFile")[0].contentDocument.body).text();
  if(a==='true'){
    alert('操作成功');
    var iframedom = $('#model_add', parent.document)[0];
    iframedom.src = ctx+"/resmodel/applymanager/listapply";
    closeAlert("alert");
  }
  if(a==='false'){
    alert('操作失败');
  }
}

// 修改申请管理
function applyupdate() {
  if (checkid()) {
      $("#addapplyform")[0].submit();
  }
}

// 添加申请管理（点击确定添加）
function submitUpdateLoad () {
  var a = $($("#updateFrameFile")[0].contentDocument.body).text();
  if(a==='true'){
    alert('操作成功');
    var iframedom = $('#model_add', parent.document)[0];
    iframedom.src = ctx+"/resmodel/applymanager/listapply";
    closeAlert("alert");
  }
  if(a==='false'){
    alert('操作失败');
  }
}