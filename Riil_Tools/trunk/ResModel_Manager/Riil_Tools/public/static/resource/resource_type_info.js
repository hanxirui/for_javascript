/* jshint jquery:true */
/* jslint devel */
/*jslint browser:true*/
/*global ctx,vendorId,parentId,isMain,id,err_msg_show,alert,closeWin,setting,console,zTreeObj */
'use strict';
$(document).ready(function () {
  $('#resTypeId_msg').text('ID必须以RIIL_RMT开头');
  /**厂商下拉列表*/
  $.get(ctx + '/resmodel/vendorController/getAllManufInfos/', function (manufInfos) {
    $('#manufSelect').prepend('<option value="">请选择</option>');
    var i = 0;
    for (i = 0; i < manufInfos.data.length; i++) {
      $('#manufSelect').append('<option value=' + manufInfos.data[i].c_manuf_id + '>' + manufInfos.data[i].c_manuf_name + '</option>');
    }
    if (!vendorId) {
      $('#manufSelect').val(vendorId);
    }
  });
  $('#resTypeNameEn').val($('#resTypeName').val());
  if (parentId !== '') {
    $('#isMainType').removeAttr('disabled');
    $('#notMainType').removeAttr('disabled');
    $('#scanImg').css('display', 'inline');
  } else {
    $('#scanImg').css('display', 'none');
  }
  if (isMain !== '') {
    if (isMain === '1') {
      $('#isMainType').attr('checked', 'checked');
    } else {
      $('#notMainType').attr('checked', 'checked');
    }
  }
  var imageName = $('#manufIcon').attr('value');
  if (imageName !== '') {
    var path = window.location.href;
    var imagePath = path.substring(0, path.indexOf('/resmodel')) + '/images/template/';
    imagePath += imageName;
    $('#image_display').attr('src', imagePath);
  }
});

function checkIdRepeat() {
  var resTypeId = $('#resTypeId').val();
  var noRepeat = true;
  if (!resTypeId) {
    if (resTypeId !== id) {
      var data = {
        'id': resTypeId
      };
      $.ajax({
        type: 'get',
        url: ctx + '/resmodel/resourceTypeCotroller/check',
        dataType: 'json',
        data: data,
        async: false, //表示该ajax为同步的方式
        success: function (data) {
          if (data.msg === '1') {
            err_msg_show('resTypeId', 'resTypeId_msg', 'id重复', true);
            noRepeat = false;
          } else {
            err_msg_show('resTypeId', 'resTypeId_msg', '', false);
            $('#resTypeId_msg').text('ID必须以RIIL_RMT开头');
            noRepeat = true;
          }
        },
        error: function () {
          alert('操作失败');
        }
      });
    } else {
      err_msg_show('resTypeId', 'resTypeId_msg', '', false);
      $('#resTypeId_msg').text('ID必须以RIIL_RMT开头');
    }
  }
  return noRepeat;
}

function checkIdNoNull() {
  var resTypeId = $('#resTypeId').val();
  var notNull = true;
  if (resTypeId === '') {
    err_msg_show('resTypeId', 'resTypeId_msg', 'ID不能为空', true);
    notNull = false;
  } else if (resTypeId.indexOf('RIIL_RMT') === -1) {
    err_msg_show('resTypeId', 'resTypeId_msg', 'ID必须以RIIL_RMT开头', true);
    notNull = false;
  } else {
    err_msg_show('resTypeId', 'resTypeId_msg', '', false);
    $('#resTypeId_msg').text('ID必须以RIIL_RMT开头');
  }
  return notNull;
}

function updateResTypeInfo() {
  if (checkIdNoNull() && checkIdRepeat()) {
    var c_id = $('#resTypeId').val();
    var c_name = $('#resTypeName').val();
    var c_vendor_id = $('#manufSelect option:selected').val();
    var resTypeInfo = {
      'c_id': c_id,
      'c_name': c_name,
      'c_oldId': id,
      'c_vendor_id': c_vendor_id
    };
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resourceTypeCotroller/update',
      data: resTypeInfo,
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function (data) {
        if (data.msg === '1') {
          var iframedom = $('#model_add', parent.document)[0];
          //setSMsgContent('操作成功', 70, '45%');
          alert('操作成功');
          iframedom.src = ctx + '/resmodel/resourceTypeCotroller/getResourceTypeAdd?modelId=' + c_id;
        } else {
          alert('操作失败');
        }
      },
      error: function () {
        alert('操作失败');
      }
    });
  }
}

function addResTypeInfo() {
  if (checkIdNoNull() && checkIdRepeat()) {
    /**上传图片*/
    $('#submitBtn').click();
    var c_id = $('#resTypeId').val();
    var c_name = $('#resTypeName').val();
    var c_is_main = $('input:radio[name="mainType"]:checked').val();
    var c_vendor_id = $('#manufSelect option:selected').val();
    var c_icon = $('#manufIcon').val();
    var resTypeInfo = {
      'c_id': c_id,
      'c_name': c_name,
      'c_vendor_id': c_vendor_id,
      'c_is_main': c_is_main,
      'c_icon': c_icon,
      'c_parent_id': parentId
    };
    $.ajax({
      type: 'post',
      url: ctx + '/resmodel/resourceTypeCotroller/add',
      data: resTypeInfo,
      dataType: 'json',
      //async:true,//表示该ajax为同步的方式
      success: function (data) {
        if (data.msg === '1') {
          //refreshResTypeTree();
          parent.location.reload();
          alert('操作成功');
        } else {
          alert('操作失败');
        }
      },
      error: function (err) {
        var jstr = JSON.stringify(err);
        var jobj = JSON.parse(jstr);
        console.error(jobj);

        alert('操作错误');
      }
    });
  }
}

function submitClick() {
  if (parentId !== '') {
    addResTypeInfo();
  } else {
    updateResTypeInfo();
  }
}

function checkUploadImgRepeat(imgName) {
  if (!imgName) {
    $.ajax({
      type: 'get',
      url: ctx + '/resmodel/manufController/checkImgName',
      data: {
        imgName: imgName
      },
      dataType: 'json',
      success: function (data) {
        if (data.msg === '1') {
          err_msg_show('manufIcon', 'upload_msg', '名称重复', true);
          window.imgNotRepeat = false;
        } else {
          err_msg_show('manufIcon', 'upload_msg', '', false);
          window.imgNotRepeat = true;
        }
      },
      error: function () {
        alert('查询错误');
      }
    });
  }
}

function checkfile(fileObj, imgPreviewId, divPreviewId) {
  var str = $('#manuf_icon').val();
  str = str.substring(str.lastIndexOf('\\') + 1, str.length);
  checkUploadImgRepeat(str);
  $('#manufIcon').attr('value', str);
  /**预览图片*/
  //js本地图片预览，兼容ie[6-9]、火狐、Chrome17+、Opera11+、Maxthon3、360浏览器
  var allowExtention = '.jpg,.bmp,.png'; //允许上传文件的后缀名document.getElementById('hfAllowPicSuffix').value;
  var extention = fileObj.value.substring(fileObj.value.lastIndexOf('.') + 1).toLowerCase();
  var browserVersion = window.navigator.userAgent.toUpperCase();
  if (allowExtention.indexOf(extention) > -1) {
    if (fileObj.files) { //兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
      if (window.FileReader) {
        var reader = new window.FileReader();
        reader.onload = function (e) {
          document.getElementById(imgPreviewId).setAttribute('src', e.target.result);
        };
        if (fileObj.files[0].size > 102400) {
          alert('图片附件超过100k');
          return false;
        }
        reader.readAsDataURL(fileObj.files[0]);
      } else if (browserVersion.indexOf('SAFARI') > -1) {
        alert('不支持Safari浏览器6.0以下版本的图片预览!');
        return false;
      }
    } else if (browserVersion.indexOf('MSIE') > -1) { //ie、360低版本预览
      if (browserVersion.indexOf('MSIE 6') > -1) { //ie6
        document.getElementById(imgPreviewId).setAttribute('src', fileObj.value);
      } else { //ie[7-9]
        fileObj.select();
        //obj.blur();在本页可以,但如果是IFrame的页面,就只能用 window.parent.focus(); 
        window.parent.focus();
        var imageUrl = document.selection.createRange().text || fileObj.value;
        var newPreview = document.getElementById(divPreviewId + 'New');
        if (!newPreview) {
          newPreview = document.createElement('div');
          newPreview.setAttribute('id', divPreviewId + 'New');
          newPreview.style.width = document.getElementById(imgPreviewId).width + 'px';
          newPreview.style.height = document.getElementById(imgPreviewId).height + 'px';
          newPreview.style.border = 'solid 1px #d2e2e2';
          newPreview.style.display = 'inline';
        }
        newPreview.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="scale",src="' + imageUrl + '")';
        var tempDivPreview = document.getElementById(divPreviewId);
        tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
        tempDivPreview.style.display = 'none';
        document.getElementById(imgPreviewId).style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod="scale",src="' + imageUrl + '")';
      }
    } else if (browserVersion.indexOf('FIREFOX') > -1) { //firefox
      var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
      if (fileObj.files[0].size > 102400) {
        alert('图片附件超过100k');
        return false;
      }
      if (firefoxVersion < 7) { //firefox7以下版本
        document.getElementById(imgPreviewId).setAttribute('src', fileObj.files[0].getAsDataURL());
      } else { //firefox7.0+
        document.getElementById(imgPreviewId).setAttribute('src', window.URL.createObjectURL(fileObj.files[0]));
      }
    } else {
      document.getElementById(imgPreviewId).setAttribute('src', fileObj.value);
    }
  } else {
    alert('仅支持' + allowExtention + '为后缀名的文件!');
    fileObj.value = ''; //清空选中文件
    if (browserVersion.indexOf('MSIE') > -1) {
      fileObj.select();
      document.selection.clear();
    }
    //fileObj.outerHTML = fileObj.outerHTML;
    return false;
  }
  return true;
}
