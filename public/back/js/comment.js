// 调用进度条方法
$(document).ajaxStart(function(){
  // 调用方法
  NProgress.start();
});
$(document).ajaxStop(function() {
  // 在所有的 ajax 请求完成时调用
  // 模拟网络环境, 添加延迟
  setTimeout(function() {
    NProgress.done();
  }, 500 );
});

$(function(){
    // 1
    $(".lt_aside .nav .category").click(function(){
        // console.log($(".nav"))
       $(this).next().stop().slideToggle();

    })


    // 2左侧菜单的切换
    $('.lt_topbar .icon_menu').click(function(){
      $('.lt_aside').toggleClass("hidemenu");
      $(".lt_main").toggleClass("hidemenu");
      $(".lt_topbar").toggleClass("hidemenu");
       
    })
   
    //模态框的实现
    $('.lt_main .icon_logout').click(function(){

      $('#logoutModal').modal('show');
    //退出要请求服务器  销毁登陆状态
    $('#logoutModal').click(function(){

          $.ajax({
             type:"get",
             url:"/employee/employeeLogout",
             dataType:"json",
             success:function(info){
               console.log(info);
               //退出成功  跳转回到登录页
               if(info.success){
                 location.href="login.html";
               }
             }
          })






    })






    })
   
})