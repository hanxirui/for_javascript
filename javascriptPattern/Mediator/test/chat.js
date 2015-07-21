/* global Mediator*/
/* global console*/
/* global $*/
// /* global alert*/
'use strict';
// var Mediator = require('mediator-js').Mediator;
var mediator = new Mediator();

// mediator.subscribe('message', function(data){ alert(data); });
// mediator.publish('message', 'Hello, world');

// 将新消息附加到聊天结果记录上
function displayChat(data){
	var date = new Date();
	var msg = data.from + ' said ' + data.message + ' to ' + data.to;
  $('#chatResult').append('<br/>');
	$('#chatResult').append(''+msg+'('+date.toLocaleTimeString()+')');
}

// 记录消息日志
function logChat(data){
	if(window.console){
		console.log(data);
	}
}

// 通过mediator 订阅新提交的newMessage主题
mediator.subscribe('newMessage',displayChat);
mediator.subscribe('newMessage',logChat);


$('#beChat').click(function(){

  // e.preventDefault();

  // 从UI上获取chat的数据
  var text=$('#chatBox').val();
  var from=$('#fromBox').val();
  var to=$('#toBox').val();
  console.log(to);
  // 将数据发布到newMessage主题上
  mediator.publish('newMessage',{message:text,from:from,to:to});

});

// function amITalkingToMyself(data){
// 	return data.from === data.to;
// }

// function iAmClearlyCryzy(data){
// 	$('#chatResult').prepend(''+data.from+' is talking to himself.');

// }
//mediator.subscribe(amITalkingToMyself,iAmClearlyCryzy);