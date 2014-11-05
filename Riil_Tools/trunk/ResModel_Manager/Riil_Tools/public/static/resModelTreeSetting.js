//类型树对象
var modelTreeObj = "";

function modelTreeOnCheck(event, treeId, treeNode) {
  var treeObj = $.fn.zTree.getZTreeObj("resModelTree");
  treeObj.getCheckedNodes(true);
}

function modelTreeOnClick(event, treeId, treeNode) {
  // 二级节点信息，显示
  var modelId = treeNode.modelId;
  if ((modelId).indexOf('RIIL_RMM_') > -1) {
    var iframedom = $('#model_add')[0];
    if (!iframedom) {
      iframedom = $(window.parent.document).find('iframe[id=model_add]');
      var url = ctx + "/resmodel/resModelCotroll/getResourceModelMain?modelId=" + modelId;
      iframedom.attr('src', url);
    } else {
      iframedom.src = ctx + "/resmodel/resModelCotroll/getResourceModelMain?modelId=" + modelId;
    }
  }
}
var resModelTreeSetting = {
  check: {
    enable: true,
    chkStyle: "checkbox",
    chkboxType: {
      "Y": "ps",
      "N": "ps"
    }
  },
  view: {
    showLine: false
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  callback: {
    onClick: modelTreeOnClick,
    onCheck: modelTreeOnCheck
  }
};
/**
 * {resModelId} modelId
 * {oldResModelId} oldId
 * {isUpdate} 是否更新节点，true:更新,false:添加新节点。
 */
function refreshResModelTree(resModelId, oldResModelId,isUpdate) {
  $.ajax({
    url: ctx + "/resmodel/resModelCotroll/getResModelTree",
    data: {
      webPath: ctx
    },
    type: "post",
    dataType: "json",
    success: function(data) {
      modelTreeObj = window.parent.$.fn.zTree.getZTreeObj('resModelTree');
      var resModelNodes = data.data;
      var parentNode = modelTreeObj.getSelectedNodes()[0];
      for (var i = 0; i < resModelNodes.length; i++) {
        if (resModelNodes[i].modelId === resModelId) {
          if (isUpdate) {
            var update_node = modelTreeObj.getNodeByParam('modelId', oldResModelId);
            update_node.modelId = resModelNodes[i].modelId;
            update_node.name = resModelNodes[i].name;
            modelTreeObj.updateNode(update_node);
          } else {
            modelTreeObj.addNodes(parentNode, resModelNodes[i]);
          }
          modelTreeObj.selectNode(modelTreeObj.getNodeByParam('modelId', resModelId)); //选择点
          modelTreeObj.setting.callback.onClick(null, modelTreeObj.setting.treeId, resModelNodes[i]); //调用事件*/
          break;
        }
      }
    }
  });
}