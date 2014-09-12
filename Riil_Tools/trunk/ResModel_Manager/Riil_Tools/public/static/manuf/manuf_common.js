var imgNotRepeat = true;
function checkfile(fileObj, imgPreviewId,divPreviewId) {
    var str = $("#manuf_icon").val();
    str = str.substring(str.lastIndexOf("\\") + 1, str.length);
    checkUploadImgRepeat(str);
	$("#fileText").attr('value', str);
	/**预览图片*/
	//js本地图片预览，兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3、360浏览器
    var allowExtention=".jpg,.bmp,.png";//允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
    var extention=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase();
    var browserVersion= window.navigator.userAgent.toUpperCase();
    if(allowExtention.indexOf(extention)>-1){ 
        if(fileObj.files){//兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
            if(window.FileReader){
                var reader = new FileReader(); 
                reader.onload = function(e){
                    document.getElementById(imgPreviewId).setAttribute("src",e.target.result);
                }
                if (fileObj.files[0].size > 102400) {
                    alert('图片附件超过100k');
                    return false;
                }
                reader.readAsDataURL(fileObj.files[0]);
            }else if(browserVersion.indexOf("SAFARI")>-1){
                alert("不支持Safari浏览器6.0以下版本的图片预览!");
                return false;
            }
        }else if (browserVersion.indexOf("MSIE")>-1){//ie、360低版本预览
            if(browserVersion.indexOf("MSIE 6")>-1){//ie6
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
            }else{//ie[7-9]
                fileObj.select();
                //obj.blur();在本页可以,但如果是IFrame的页面,就只能用 window.parent.focus(); 
                window.parent.focus();
                var imageUrl = document.selection.createRange().text || obj.value;
                var newPreview =document.getElementById(divPreviewId+"New");
                if(newPreview==null){
                    newPreview =document.createElement("div");
                    newPreview.setAttribute("id",divPreviewId+"New");
                    newPreview.style.width = document.getElementById(imgPreviewId).width+"px";
                    newPreview.style.height = document.getElementById(imgPreviewId).height+"px";
                    newPreview.style.border="solid 1px #d2e2e2";
                    newPreview.style.display="inline";
                }
                newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + imageUrl + "')";
                var tempDivPreview=document.getElementById(divPreviewId);
                tempDivPreview.parentNode.insertBefore(newPreview,tempDivPreview);
                tempDivPreview.style.display="none";
                document.getElementById(imgPreviewId).style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + imageUrl + "')";
            }
        }else if(browserVersion.indexOf("FIREFOX")>-1){//firefox
            var firefoxVersion= parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if (fileObj.files[0].size > 102400) {
                alert('图片附件超过100k');
                return false;
            }
            if(firefoxVersion<7){//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.files[0].getAsDataURL());
            }else{//firefox7.0+
                document.getElementById(imgPreviewId).setAttribute("src",window.URL.createObjectURL(fileObj.files[0]));
            }
        }else{
            document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
        }
    }else{
        alert("仅支持"+allowExtention+"为后缀名的文件!");
        fileObj.value="";//清空选中文件
        if(browserVersion.indexOf("MSIE")>-1){
            fileObj.select();
            document.selection.clear();
        }
        fileObj.outerHTML=fileObj.outerHTML;
        return false;
    }
	return true;
};
function checkIdOrNameNotNull(){
    var manufName = $("#manuf_name").val();
    if(manufName == ""){
        err_msg_show('manuf_name', 'manuf_name_msg', '厂商名称不能为空', true);
        return false;
    }else{
        err_msg_show('manuf_name', 'manuf_name_msg', '', false);
    }
    return true;
};
function checkUploadImgRepeat(imgName){
    if(imgName !== '' && typeof(imgName) !== 'undefined'){
        $.ajax({
            type: 'get',
            url: ctx + "/resmodel/manufController/checkImgName",
            data: {
                imgName: imgName
            },
            dataType: 'json',
            success: function(data) {
                if (data.msg == '1') {
                    err_msg_show('fileText', 'upload_msg', '图片名称重复', true);
                    imgNotRepeat = false;
                } else {
                    err_msg_show('fileText', 'upload_msg', '', false);
                    imgNotRepeat = true;
                }
            },
            error: function() {
                alert('查询错误');
            }
        });
    }
}