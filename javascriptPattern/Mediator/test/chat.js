$("#chatForm").on("submit",function(e){
  e.preventDefault();

  // 从UI上获取chat的数据
  var text=$("#chatBox").val();
  var from=$("#fromBox").val();
  var to=$("#toBox").val();

  // 将数据发布到newMessage主题上
  mediator.publish("newMessage",{message:text,from:from,to:to});

});

// 将新消息附加到聊天结果记录上
