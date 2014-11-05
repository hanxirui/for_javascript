var accordion = {
  init: function() {
    $('#accordion').bind('accordionchange', function(event, ui) {
      ui.oldHeader.find('a.ico').removeClass('ico down f_right').addClass('ico up f_right');
      ui.newHeader.find('a.ico').removeClass('ico up f_right').addClass('ico down f_right');
    });
    accordion.accordionInit();
    accordion.collapse();
  },
  initResModelTree: function() {
    $.ajax({
      url: ctx + "/resmodel/resModelCotroll/getResModelTree",
      data: {
        webPath: ctx
      },
      type: "post",
      dataType: "json",
      success: function(data) {
        var zNodes = data.data;
        modelTreeObj = $.fn.zTree.init($("#resModelTree"), resModelTreeSetting, zNodes);
        var node = modelTreeObj.getNodeByTId('resModelTree_5'); //获取tid为'resModelTree_5'的点
        modelTreeObj.selectNode(node); //选择点
        modelTreeObj.setting.callback.onClick(null, modelTreeObj.setting.treeId, node); //调用事件
        /**类型节点checkbox disabled*/
        var resModelTree = $.fn.zTree.getZTreeObj("resModelTree");
        var uncheckedNodes = resModelTree.transformToArray(resModelTree.getNodes());
        for (var i = 0; i < uncheckedNodes.length; i++) {
          if (uncheckedNodes[i].modelId.indexOf('RIIL_RMT') > -1) {
            resModelTree.setChkDisabled(uncheckedNodes[i], true, false, false);
          }
        }
      }
    });
  },
  collapse: function() {
    /*$("#resourcemodel").click();*/
    $("#accordion").accordion({
      activate: function(event, ui) {
        if (ui.newPanel[0].id === "resourcetype") {
          /*var iframedom = $('#model_add')[0];
                iframedom.src = ctx+"/resmodel/resourceTypeCotroller/getResourceTypeAdd";*/
          var node = zTreeObj.getNodeByParam('id', '00'); //获取id为00的点  
          zTreeObj.selectNode(node); //选择点
          zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, node); //调用事件
        }
        if (ui.newPanel[0].id === "resourcemodel") {
          accordion.initResModelTree();
          /*var iframedom = $('#model_add')[0];
                iframedom.src = ctx+"/resmodel/resModelCotroll/getResourceModelMain";*/
        }
        if (ui.newPanel[0].id === "indicatorsOfLibrary") {
          var iframedom = $('#model_add')[0];
          iframedom.src = ctx + "/resmodel/paramlibrary/listparam";
        }
        if (ui.newPanel[0].id === "indicatorsOfGroup") {
          var iframedom = $('#model_add')[0];
          iframedom.src = ctx + "/resmodel/metricGroupController/getMetricGroupManagement";
        }
        if (ui.newPanel[0].id === "appManagement") {
          var iframedom = $('#model_add')[0];
          iframedom.src = ctx + "/resmodel/applymanager/listapply";
        }
        if (ui.newPanel[0].id === "manuf_management") {
          var iframedom = $('#model_add')[0];
          iframedom.src = ctx + "/resmodel/manufController/getManufManagement";
        }
        if (ui.newPanel[0].id === "logManagement") {
          var iframedom = $('#model_add')[0];
          iframedom.src = ctx + "/resmodel/logController/getLogPage";
        }
      }
    });
  },
  accordionInit: function() {
    if (role === 'MAN_ENGINEER') {
      $("#accordion").accordion({
        active: 1
      });
      var select_h3 = $("#accordion").find('h3')[1];
      var select_div = $(select_h3).find('div a')[1];
      $(select_div).removeClass('ico up f_right').addClass('ico down f_right');
      accordion.initResModelTree();
    } else {
      $("#accordion").accordion({
        active: 0
      });
      var selectAccordion = $("#accordion").find('h3:first div a')[1];
      $(selectAccordion).removeClass('ico up f_right').addClass('ico down f_right');
    }
  }
}
$(document).ready(function() {
  accordion.init();
});