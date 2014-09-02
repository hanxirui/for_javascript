$(document).ready(function() {

    $('#libraryData').dataTable({
     ajax:ctx + '/resmodel/paramlibrary/queryLibraryData',
     bFilter: false,
	 bLengthChange: false,
	 sScrollY: '590px',
	 bAutoWidth: true,
	 bJQueryUI: false,
	 oLanguage: GIRD_I18N,
	 // initComplete: initCheckBox,
     aoColumns: [
      {"aDataSort":false,
      	"render": function(data, type, row ) {
			    return "<input type='checkbox' name='cb'/>";	
	  }},
      { data: "metricName" },
      { data: "metricType" },
      { data: "groupName" },
      { data: "metricUnit" },
      { data: "dataType"},
      { data: "metricDesc"},
      { data: "metricUser"}
     ]
    }); 
});

