//初始化树对象
$(document).ready(function () {
  $.ajax({
    url: ctx + "/resmodel/resourceTypeCotroller/getResTypeTree",
    data: {
      webPath: ctx
    },
    type: "post",
    dataType: "json",
    success: function (data) {
      var zNodes = data.data;
      zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      var node = zTreeObj.getNodeByParam('id', '00'); //获取id为00的点  
      zTreeObj.selectNode(node); //选择点
      zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, node); //调用事件  
    }
  });
});

function delNode() {
  var treeObjDel = $.fn.zTree.getZTreeObj("treeDemo");
  var nodes = treeObjDel.getCheckedNodes(true);
  var delNodeIds = [];
  if (nodes.length === 0) {
    alert("请选择您要删除的记录");
  } else {
    for (var i = 0; i < nodes.length; i++) {
      delNodeIds.push(nodes[i].modelId);
      if (nodes[i].isParent) {
        for (var j = 0; j < nodes[i].children.length; j++) {
          delNodeIds.push(nodes[i].children[j].modelId);
        }
      }
    }
    console.log(delNodeIds);
    var r = confirm("确定要删除所选记录吗？");
    if (r == true) {
      sureDelNodes(delNodeIds);
    }
  }
};

function sureDelNodes(ids) {
  $.ajax({
    type: 'post',
    url: ctx + "/resmodel/resourceTypeCotroller/delete",
    data: {
      ids: ids
    },
    dataType: 'json',
    success: function(data) {
      if (data.msg == '1') {
        msg = "操作成功";
        $.ajax({
          url: ctx + "/resmodel/resourceTypeCotroller/getResTypeTree",
          data: {
            webPath: ctx
          },
          type: "post",
          dataType: "json",
          success: function(data) {
            var zNodes = data.data;
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            var node = zTreeObj.getNodeByParam('id', '00'); //获取id为00的点  
            zTreeObj.selectNode(node); //选择点
            zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, node); //调用事件  
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
};

function addResType() {
  var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
  var selectedNodes = treeObj.getSelectedNodes();
  if (selectedNodes.length > 0) {
    var iframedom = $('#model_add')[0];
    iframedom.src = ctx + "/resmodel/resourceTypeCotroller/getResourceTypeAdd?parentId=" + selectedNodes[0].modelId;
  } else {
    alert("请选择要添加资源类型父节点");
  }
};