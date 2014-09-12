var resTypeId = "";
var mainModelId = "";
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
    v = nodes[0].name;
    mainModelId = nodes[0].modelId;
    var mainModelObj = $("#mainModelType");
    mainModelObj.attr("value", v);
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
        success: function (data) {
          if (data.msg === '1') {
            err_msg_show('modelId', 'modelId_msg', 'id重复', true);
            noRepeat = false;
          } else {
            err_msg_show('modelId', 'modelId_msg', '', false);
            $('#modelId_msg').text('ID必须以RIIL_RMM开头');
            noRepeat = true;
          }
        },
        error: function () {
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

function checkIdNoNull() {
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
  if (checkIdNoNull() && checkIdRepeat()) {
    var c_id = $('#modelId').val();
    var modelInfo = {
      'c_id': c_id,
      'c_name': $("#modelName").val(),
      'c_oldId': id,
      'c_desc': $("#detail").val(),
      'c_is_snmp' : $('input:radio[name="isSNMPModel"]:checked').val(),
      'c_plugin_id' : $('#pluginSelect option:selected').val()
    };
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resModelCotroll/update',
      data: modelInfo,
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function (data) {
        if (data.msg === '1') {
          /**刷新模型树*/
          refreshResModelTree();
          alert('操作成功');
        } else {
          alert('操作失败');
        }
      },
      error: function (err) {
        var jstr = JSON.stringify(err);
        var jobj = JSON.parse(jstr);
        console.error(jobj);

        alert('操作错误');
      }
    });
  }
}

function addResModelInfo() {
  if (checkIdNoNull() && checkIdRepeat()) {
    
  }
}
function submitClick() {
    if (parentId !== '') {
        addResModelInfo();
    } else {
        updateResModelInfo();
    }
}