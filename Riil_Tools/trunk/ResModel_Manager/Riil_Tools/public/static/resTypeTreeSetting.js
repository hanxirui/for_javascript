//类型树对象
var zTreeObj = "";
function zTreeOnCheck(event, treeId, treeNode) {
  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
  treeObj.getCheckedNodes(true);
}
//点击树节点时出发的函数
function zTreeOnClick(event, treeId, treeNode) {
  // 二级节点信息，显示
  if (treeNode.modelType !== "model") {
    var iframedom = $('#model_add')[0];
    if(!iframedom){
      iframedom = $(window.parent.document).find('iframe[id=model_add]');
      var url = ctx + '/resmodel/resourceTypeCotroller/getResourceTypeAdd?modelId=' + treeNode.modelId;
      iframedom.attr('src', url);
    }else{
      iframedom.src = ctx + '/resmodel/resourceTypeCotroller/getResourceTypeAdd?modelId=' + treeNode.modelId;
    }
  }
}
var setting = {
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
    onClick: zTreeOnClick,
    onCheck: zTreeOnCheck
  }
};

/**
* {modelId} modelId
* {oldModelId} oldId
* {isUpdate} 是否更新节点，true:更新,false:添加新节点。
*/
function refreshResTypeTree (modelId, oldModelId, isUpdate){
  $.ajax({
    url: ctx + "/resmodel/resourceTypeCotroller/getResTypeTree",
    data: {
      webPath: ctx
    },
    type: "post",
    dataType: "json",
    success: function (data) {
      /*window.parent.$.fn.zTree.getZTreeObj('treeDemo').destroy();*/
      zTreeObj = window.parent.$.fn.zTree.getZTreeObj('treeDemo');
      var zNodes = data.data;
      var parentNode = zTreeObj.getSelectedNodes()[0];
      for(var i = 0;i < zNodes.length; i++){
        if(zNodes[i].modelId === modelId){
          if(isUpdate){
            var update_node = zTreeObj.getNodeByParam('modelId', oldModelId);
            update_node.modelId = zNodes[i].modelId;
            update_node.name = zNodes[i].name;
            update_node.icon = zNodes[i].icon;
            zTreeObj.updateNode(update_node);
          }else{
            zTreeObj.addNodes(parentNode, zNodes[i]);
          }
          zTreeObj.selectNode(zTreeObj.getNodeByParam('modelId', modelId));//选择点
          zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, zNodes[i]); //调用事件*/
          break;
        }
      }  
    }
  });
}