$(document).ready(function() {
	/**init jquery table*/
	var table = $('#aduitLogTable').dataTable({
		"oLanguage": GIRD_I18N,
		"bFilter": false,
		"bLengthChange": false,
		"aLengthMenu": [23],
		"bProcessing": true,
		"bAutoWidth": true,
		"ajax": ctx + "/resmodel/logController/getLogInfos",
		/*"aaData" : JSON.parse(data),*/
		"columns": [
			{
				"data": "c_user"
			},{
				"data": "c_time"
			},{
				"data": "c_info",
				"render": function(data, type, row) {
					return '<span title="' + data + '" >' + data + '</a>';
				}
			}
		]

	});
});