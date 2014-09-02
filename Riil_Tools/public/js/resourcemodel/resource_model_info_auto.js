var modelIdForParam = $("#modelId").val();
var paramAddVar = {
	// 指标信息
	paramMsg : '',
	// 初始化指标信息
	initData : function() {
		$.ajax( {
			type : 'post',
			url : ctx + "/resourceModelCotroller/getAllModelParam?modelId="
					+ modelIdForParam,
			dataType : 'json',
			async : false,// 表示该ajax为同步的方式
			success : function(data) {
				paramAddVar.paramMsg = data;
			}
		});
	}
// ,resetModelInfo:function(){
// $("#model_sysoid").val("");
// $("#model_num").val("");
// $("#model_series").val("");
// $("#modle_manuf_name").val("");
// $("#model_info").val("none");
// $("#model_type").val("none");
// }
}

// $(document).ready(function(){
paramAddVar.initData();
var paramData = paramAddVar.paramMsg;
// 厂商Id绑定
$("#m_paramid").autocomplete(paramData, {
	minChars : 1,
	width : 310,
	matchContains : "word",
	autoFill : false,
	formatItem : function(row, i, max) {
		return row.m_paramid;
	},
	formatMatch : function(row, i, max) {
		return row.m_paramid;
	},
	formatResult : function(row) {
		return row.m_paramid;
	}
}).result(function(event, row, formatted) {
	$("#m_paramname").val(row.m_paramname);
	$("#m_paramdesc").val(row.m_paramdesc);
	$("#m_paramtype").val(row.m_paramtype);
	$("#m_paramunit").val(row.m_paramunit);
	$("#m_paramdatatype").val(row.m_paramdatatype);
	$("#m_paramgroup").val(row.m_paramgroup);
	paramData = paramAddVar.paramMsg;
});
// });


