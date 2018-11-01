$(function(){
// 一进入页面, 发送 ajax 请求, 获取用户列表, 通过 模板引擎渲染
var currentPage=1;
var pageSize=5;
var currentId; // 存id 当前修改的用户 id
var isDelete; //  存状态 修改的状态

  //  1
//把ajax封装成一个方法  一进页面就调用一次
   render();

   function  render(){
      $.ajax({
           type:"get",
           url:"/user/queryUser",
           data:{
             page:currentPage,
             pageSize:pageSize
           },
           dataType:"json",
           success:function(info){
             console.log(info);
             //绑定模板
             var htmlStr=template("tmp",info);
            //  添加数据到页面
             $('tbody').html(htmlStr);
            // 调用分页插件方法
           $("#paginator").bootstrapPaginator({
               bootstrapMajorVersion:3,
               currentPage:info.page,
               totalPages:Math.ceil(info.total/info.size),
               size:"normal",
               onPageClicked:function(a,s,d,page){
                 console.log(page);
                 currentPage=page;
                 render();
      }
    })


      }
    })

   }

  //  2
   // 什么时候用事件委托?
  // 1. 元素是动态生成的
  // 2. 批量注册事件, 效率高
    // 用元素委托绑定点击事件
    $('tbody').on("click",".btn",function(){
        
        $('#userModal').modal("show");
        currentId=$(this).parent().data("id");
        isDelete=$(this).hasClass("btn-danger") ? 0 : 1;
        // console.log(isDelete);
     })

        // $.ajax({
        //        type:"post",
        //        url:"/user/updateUser",
        //        data:{
        //          id:currentId,
        //          isDelete:isDelete
        //        },
        //        dataType:"json",
        //        success:function(info){
     
        //          console.log(info);
        //        }
        
        //  })

})