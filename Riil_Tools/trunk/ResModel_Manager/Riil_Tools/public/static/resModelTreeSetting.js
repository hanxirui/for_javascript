//类型树对象
var modelTreeObj = "";
function modelTreeOnCheck (event, treeId, treeNode){
  var treeObj = $.fn.zTree.getZTreeObj("resModelTree");
  treeObj.getCheckedNodes(true);
 }
function modelTreeOnClick (event, treeId, treeNode){
  // 二级节点信息，显示
  var modelId = treeNode.modelId;
  if ((modelId).indexOf('RIIL_RMM_') > -1) {
    var iframedom = $('#model_add')[0];
    if(!iframedom){
      iframedom = $(window.parent.document).find('iframe[id=model_add]');
      var url = ctx + "/resmodel/resModelCotroll/getResourceModelMain?modelId="+ modelId;
      iframedom.attr('src', url);
    }else{
      iframedom.src = ctx + "/resmodel/resModelCotroll/getResourceModelMain?modelId="+ modelId;
    }
  }
 }
var resModelTreeSetting = {
  check : {
    enable : true,
    chkStyle : "checkbox",
    chkDisabledInherit : false
  },
  view : {
    showLine : false
  },
  data : {
    simpleData : {
      enable : true
    }
  },
  callback : {
    onClick : modelTreeOnClick,
    onCheck: modelTreeOnCheck
  }
};

function refreshResModelTree (){
  $.ajax({
      url : ctx + "/resmodel/resModelCotroll/getResModelTree",
      data : {
        webPath:ctx
      },
      type : "post",
      dataType : "json",
      success : function(data) {
          var resModelNodes =  data.data;
          modelTreeObj = $.fn.zTree.init($(window.parent.document).find('ul[id=resModelTree]'), resModelTreeSetting, resModelNodes);
          /**类型节点checkbox disabled*/
          var resModelTree = $.fn.zTree.getZTreeObj("resModelTree");
          var uncheckedNodes = resModelTree.transformToArray(resModelTree.getNodes());
          for(var i = 0; i < uncheckedNodes.length; i++){
            if(uncheckedNodes[i].modelId.indexOf('RIIL_RMT') > -1){
              resModelTree.setChkDisabled(uncheckedNodes[i], true, false, false);
            }
          }
          var node = modelTreeObj.getNodeByTId('resModelTree_5');//获取tid为'resModelTree_5'的点
          modelTreeObj.selectNode(node);//选择点
          modelTreeObj.setting.callback.onClick(null, modelTreeObj.setting.treeId, node);//调用事件
      }
    });
}