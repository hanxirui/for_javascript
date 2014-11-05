var resTypeId = "";
var mainModelId = c_main_model_id;
var setting = {
  view: {
    dblClickExpand: false
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  callback: {
    beforeClick: beforeClick,
    onClick: onClick
  }
};
var modelSetting = {
  view: {
    dblClickExpand: false
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  callback: {
    onClick: modelOnClick
  }
};

function beforeClick(treeId, treeNode) {
  var check = true;
  if (treeNode.modelType == "temp") {
    alert("只能选择模型节点");
    return false;
  }
  return check;
}

function onClick(e, treeId, treeNode) {
  var zTree = $.fn.zTree.getZTreeObj("resTypeTree");
  var nodes = zTree.getSelectedNodes();
  var v = "";
  nodes.sort(function compare(a, b) {
    return a.id - b.id;
  });
  /*for (var i=0, l=nodes.length; i<l; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);*/
  v = nodes[0].name;
  resTypeId = nodes[0].modelId;
  var resType = $("#resType");
  resType.attr("value", v);
}

function modelOnClick(e, treeId, treeNode) {
  var zTree = $.fn.zTree.getZTreeObj("mainModelTree");
  var nodes = zTree.getSelectedNodes();
  var v = "";
  nodes.sort(function compare(a, b) {
    return a.id - b.id;
  });
  /*for (var i=0, l=nodes.length; i<l; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0 ) v = v.substring(0, v.length-1);*/
  if (nodes[0].modelId.indexOf('RIIL_RMM') > -1) {
    v = nodes[0].name;
    mainModelId = nodes[0].modelId;
    var mainModelObj = $("#mainModelType");
    mainModelObj.attr("value", v);
    $("#mainModelTypeId").val(nodes[0]);
  }else{
    alert("请选择主模型");
  }

}
$(document).ready(function() {
  $.ajax({
    url: ctx + "/resmodel/resourceTypeCotroller/getResTypeTree",
    data: {
      webPath: ctx
    },
    type: "post",
    dataType: "json",
    success: function(data) {
      var zNodes = data.data;
      zTreeObj = $.fn.zTree.init($("#resTypeTree"), setting, zNodes);
    }
  });
  $.ajax({
    url: ctx + "/resmodel/resModelCotroll/getMainModelTree",
    data: {
      webPath: ctx
    },
    type: "post",
    dataType: "json",
    success: function(data) {
      var zNodes = data.data;
      zTreeObj = $.fn.zTree.init($("#mainModelTree"), modelSetting, zNodes);
    }
  });
})

function showMenu() {
  var resType = $("#resType");
  var resTypeOffset = $("#resType").offset();
  $("#resTypeContent").css({
    left: resTypeOffset.left + "px",
    top: resTypeOffset.top - resType.outerHeight() + "px"
  }).slideDown("fast");
  $("body").bind("mousedown", onBodyDown);
}

function hideMenu() {
  $("#resTypeContent").fadeOut("fast");
  $("body").unbind("mousedown", onBodyDown);
}

function onBodyDown(event) {
  if (!(event.target.id == "menuBtn" || event.target.id == "resTypeContent" || $(event.target).parents("#resTypeContent").length > 0)) {
    hideMenu();
  }
}

function showMainModelMenu() {
  var mainModel = $("#mainModelType");
  var mainModelOffset = $("#mainModelType").offset();
  $("#mainModelContent").css({
    left: mainModelOffset.left + "px",
    top: mainModelOffset.top - mainModel.outerHeight() + "px"
  }).slideDown("fast");
  $("body").bind("mousedown", onModelBodyDown);
}

function hideModelMenu() {
  $("#mainModelContent").fadeOut("fast");
  $("body").unbind("mousedown", onModelBodyDown);
}

function onModelBodyDown(event) {
  if (!(event.target.id == "mainModelMenuBtn" || event.target.id == "mainModelContent" || $(event.target).parents("#mainModelContent").length > 0)) {
    hideModelMenu();
  }
}

function checkIdRepeat() {
  var modelId = $('#modelId').val();
  var noRepeat = true;
  if (modelId !== '') {
    if (modelId !== id) {
      var data = {
        'id': modelId
      };
      $.ajax({
        type: 'get',
        url: ctx + '/resmodel/resModelCotroll/check',
        dataType: 'json',
        data: data,
        async: false, //表示该ajax为同步的方式
        success: function(data) {
          if (data.msg === '1') {
            err_msg_show('modelId', 'modelId_msg', 'id重复', true);
            noRepeat = false;
          } else {
            err_msg_show('modelId', 'modelId_msg', '', false);
            $('#modelId_msg').text('ID必须以RIIL_RMM开头');
            noRepeat = true;
          }
        },
        error: function() {
          alert('操作失败');
        }
      });
    } else {
      err_msg_show('resTypeId', 'modelId_msg', '', false);
      $('#modelId_msg').text('ID必须以RIIL_RMM开头');
    }
  }
  return noRepeat;
}

function checkModelNameRepeat(isUpdate) {
  debugger;
  var parentTId = window.parent.$.fn.zTree.getZTreeObj("resModelTree").getSelectedNodes()[0].parentTId;
  var parent_node = window.parent.$.fn.zTree.getZTreeObj("resModelTree").getNodeByParam('tId', parentTId);
  var parent_res_id = '';
  if(mainModelId !== null && mainModelId !== ''){
    parent_res_id = mainModelId;
  }else{
    parent_res_id = window.parent.$.fn.zTree.getZTreeObj("resModelTree").getSelectedNodes()[0].modelId;
  }
  var modelName = $('#modelName').val();
  var noRepeat = true;
  if (modelName !== '') {
    var data = {
      'mainmodelid': parent_res_id,
      'modelName':modelName,
      'id':$('#modelId').val(),
      'isUpdate':isUpdate
    };
    $.ajax({
      type: 'get',
      url: ctx + '/resmodel/resModelCotroll/checkModelName',
      dataType: 'json',
      data: data,
      async: false, //表示该ajax为同步的方式
      success: function(data) {
        if (data.data === true) {
          err_msg_show('modelName', 'modelName_msg', '名称重复', true);
          noRepeat = false;
        } else {
          err_msg_show('modelName', 'modelName_msg', '', false);
          noRepeat = true;
        }
      },
      error: function() {
        alert('操作失败');
      }
    });
  }else{
    err_msg_show('modelName', 'modelName_msg', '名称不能为空', true);
    noRepeat = false;
  }
  return noRepeat;
}

function checkModelIdNoNull() {
  var modelId = $('#modelId').val();
  var notNull = true;
  if (modelId === '') {
    err_msg_show('modelId', 'modelId_msg', 'ID不能为空', true);
    notNull = false;
  } else if (modelId.indexOf('RIIL_RMM') === -1) {
    err_msg_show('modelId', 'modelId_msg', 'ID必须以RIIL_RMM开头', true);
    notNull = false;
  } else {
    err_msg_show('modelId', 'modelId_msg', '', false);
    $('#modelId_msg').text('ID必须以RIIL_RMM开头');
  }
  return notNull;
}

function updateResModelInfo() {
  if (checkModelIdNoNull() && checkIdRepeat() && checkModelNameRepeat(true)) {
    var c_id = $('#modelId').val();
    var modelInfo = {
      'c_id': c_id,
      'c_name': $("#modelName").val(),
      'c_oldId': id,
      'c_desc': $("#detail").val(),
      'c_is_snmp': $('input:radio[name="isSNMPModel"]:checked').val(),
      'c_plugin_id': $('#pluginSelect option:selected').val(),
      'c_main_model_id': mainModelId,
      'c_res_type_id': c_res_type_id
    };
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resModelCotroll/update',
      data: modelInfo,
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function(data) {
        if (data.msg === '1') {
          /**刷新模型树*/
          refreshResModelTree(modelInfo.c_id, modelInfo.c_oldId, true);
          alert('操作成功');
        } else {
          alert('操作失败');
        }
      },
      error: function(err) {
        var jstr = JSON.stringify(err);
        var jobj = JSON.parse(jstr);
        alert('操作错误');
      }
    });
  }
}

function checkResTypeNotNull(){
  var notNull = true;
  if(resTypeId === '' || typeof resTypeId === 'undefined'){
    err_msg_show('resType', 'resType_msg', '资源类型不能为空', true);
    notNull = false;
  }else{
    err_msg_show('resType', 'resType_msg', '', false);
    notNull = true;
  }
  return notNull;
}

function addResModelInfo() {
  if (checkModelIdNoNull() && checkIdRepeat() && checkResTypeNotNull() && checkModelNameRepeat(false)) {
    var c_id = $('#modelId').val();
    var modelInfo = {
      'c_id': c_id,
      'c_name': $("#modelName").val(),
      'c_desc': $("#detail").val(),
      'c_is_snmp': $('input:radio[name="isSNMPModel"]:checked').val(),
      'c_plugin_id': $('#pluginSelect option:selected').val(),
      'c_main_model_id': mainModelId,
      'c_res_type_id': resTypeId,
      'c_is_main': $('input:radio[name="mainModel"]:checked').val()
    };
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resModelCotroll/add',
      data: modelInfo,
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function(data) {
        if (data.msg === '1') {
          /**刷新模型树*/
          refreshResModelTree(modelInfo.c_id, modelInfo.c_id, false);
          alert('操作成功');
        } else {
          alert('操作失败');
        }
      },
      error: function(err) {
        var jstr = JSON.stringify(err);
        var jobj = JSON.parse(jstr);
        console.error(jobj);

        alert('操作错误');
      }
    });
  }
}

function submitClick() {
  if (parentId !== '') {
    addResModelInfo();
  } else {
    updateResModelInfo();
  }
}