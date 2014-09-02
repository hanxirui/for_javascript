function closeWin(){
	closeAlert("alert");
};
function checkIdRepeat(){
	var sysoid = $("#sysoid").val();
	var id = $("#cId").val();
    if(typeof(id) === 'undefined' || id === ''){
        id = ''
    }
    var vendorInfo = {
        'id' : id,
        'sysoid' : sysoid
    };
    var noRepeat = true;
    if(sysoid !=''){
        $.ajax({
            type:'get',
            url:ctx + "/resmodel/vendorController/check",
            dataType:'json',
            data:vendorInfo,
            async:false,//表示该ajax为同步的方式
            success:function(data){
                if(data.msg=="1"){
                	err_msg_show('sysoid', 'sysoid_msg', 'sysoid重复', true);
                    noRepeat=false;
                }
                else{
                	err_msg_show('sysoid', 'sysoid_msg', '', false);
                    noRepeat=true;
                }
            },
            error:function(){
                alert("操作失败");
            }
        });
    }
    return noRepeat;
}
function checkNameRepeat(){
	var id = $("#cId").val();
	var vendorName = $("#vendor_name").val();
    if(typeof(id) === 'undefined' || id === ''){
        id = ''
    }
    var vendorInfo = {
        'id' : id,
        'vendorName' : vendorName
    };
    var noRepeat = true;
    if(vendorName != ''){
        $.ajax({
            type:'get',
            url:ctx + "/resmodel/vendorController/check",
            dataType:'json',
            data:vendorInfo,
            async:false,//表示该ajax为同步的方式
            success:function(data){
                if(data.msg=="1"){
                	err_msg_show('vendor_name', 'vendor_name_msg', '设备型号重复', true);
                    noRepeat=false;
                }
                else{
                	err_msg_show('vendor_name', 'vendor_name_msg', '', false);
                    noRepeat=true;
                }
            },
            error:function(){
                alert("操作失败");
            }
        });
    }
    return noRepeat;
};
function checkIdOrNameNotEmpty(){
	var sysoid = $("#sysoid").val();
	var vendorName = $("#vendor_name").val();
	if(sysoid == ''){
		err_msg_show('sysoid', 'sysoid_msg', 'Sysoid不能为空', true);
		return false;
	}else if(vendorName == ''){
		err_msg_show('vendor_name', 'vendor_name_msg', '设备型号不能为空', true);
		return false;
	}else{
		err_msg_show('sysoid', 'sysoid_msg', '', false);
		err_msg_show('vendor_name', 'vendor_name_msg', '', false);
	}
	return true;
};