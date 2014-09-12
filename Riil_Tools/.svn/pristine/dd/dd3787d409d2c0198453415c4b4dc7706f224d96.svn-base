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
    }
    iframedom.src = ctx + '/resmodel/resourceTypeCotroller/getResourceTypeAdd?modelId=' + treeNode.modelId;
  }
}
var setting = {
  check: {
    enable: true,
    chkStyle: "checkbox",
    chkboxType: {
      "Y": "",
      "N": ""
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

function refreshResTypeTree (){
  $.ajax({
    url: ctx + "/resmodel/resourceTypeCotroller/getResTypeTree",
    data: {
      webPath: ctx
    },
    type: "post",
    dataType: "json",
    success: function (data) {
      var zNodes = data.data;
      zTreeObj = $.fn.zTree.init($(window.parent.document).find('ul[id=treeDemo]'), setting, zNodes);
      var node = zTreeObj.getNodeByParam('id', '00'); //获取id为00的点  
      zTreeObj.selectNode(node); //选择点
      zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, node); //调用事件  
    }
  });
}