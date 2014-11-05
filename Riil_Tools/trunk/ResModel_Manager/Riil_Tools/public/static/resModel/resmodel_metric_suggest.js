var paramAddVar = {
  // 初始化指标信息
  initData: function() {
    $.ajax({
      type: 'post',
      url: ctx + "/resmodel/resModelCotroll/getResModelMetricInfo",
      data: {
        'id': id
      },
      dataType: 'json',
      success: function(data) {
        $("#m_paramid").autocomplete(data.data, {
          max: 12, //列表里的条目数
          minChars: 0, //自动完成激活之前填入的最小字符
          width: 310, //提示的宽度，溢出隐藏
          scrollHeight: 300, //提示的高度，溢出显示滚动条
          matchContains: true,
          autoFill: false,
          formatItem: function(row, i, max) {
            return row.metricId;
          },
          formatMatch: function(row, i, max) {
            return row.metricId;
          },
          formatResult: function(row) {
            return row.metricId;
          }
        }).result(function(event, row, formatted) {
          $("#resType").val(row.resType);
          $("#m_paramname").val(row.metricName);
          $("#m_paramdesc").val(row.metricDescr);
          $("#m_paramtype").val(row.metricType);
          $("#m_paramunit").val(row.metricUnit);
          $("#m_paramdatatype").val(row.metricDataType);
          $("#m_paramgroup").val(row.metricGroupId);
        });
      }
    });
  }
};
$(document).ready(function (){
  if(metric_id === ''){
    paramAddVar.initData();
  }
});