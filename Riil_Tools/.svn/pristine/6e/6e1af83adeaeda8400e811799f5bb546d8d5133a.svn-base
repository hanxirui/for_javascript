function closeWin(){
    closeAlert("alert");
};
function checkIdOrNameNotNull(){
    var metricGroupId = $("#metricGroupId").val();
    var metricGroupName = $("#metricGroupName").val();
    if(metricGroupId == ""){
        err_msg_show('metricGroupId', 'metricGroupId_msg', '指标组ID不能为空', true);
        return false;
    }else if(metricGroupName == ""){
        err_msg_show('metricGroupName', 'metricGroupName_msg', '指标组名称不能为空', true);
        return false;
    }else{
        err_msg_show('metricGroupId', 'metricGroupId_msg', '', false);
        err_msg_show('metricGroupName', 'metricGroupName_msg', '', false);
    }
    return true;
};
function checkMetricGroupIdRepeat(){
    var noRepeat = true;
    var metricGroupId = $("#metricGroupId").val();
    var checkMetricGroupInfo = {
        'metricGroupId' : metricGroupId
    };
    if(metricGroupId !=''){
        $.ajax({
            type:'get',
            url:ctx + "/resmodel/metricGroupController/check",
            dataType:'json',
            data:checkMetricGroupInfo,
            async:false,//表示该ajax为同步的方式
            success:function(data){
                if(data.msg === "1"){
                    err_msg_show('metricGroupId', 'metricGroupId_msg', '指标组ID重复', true);
                    noRepeat=false;
                }else{
                    err_msg_show('metricGroupId', 'metricGroupId_msg', '', false);
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