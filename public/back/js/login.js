$(function(){


      /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  //先获取表单
  $('#form').bootstrapValidator({

      // 配置图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',   // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },

      //  1配置校验字段 先给input设置   fiellds 泛指之前的字段
        fields:{
          //  校验配置 用户名
            username:{
              // 校验规则
                validators:{
                  // 非空校验
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    // 用户名必须2-6位
                    stringLength:{
                      min:2,
                      max:6,
                      message:"用户名长度必须是2-6位"
                    },
                    // 判断用户名是否存在 用ajax配
                    callback:{
                      message: "用户名不存在"
                    }

                }
            },
            // 校验配置 密码
            password:{
              validators:{
                // 非空校验
                  notEmpty:{
                      message:"密码不能为空"
                  },
                  // 密码必须是6位以上
                  stringLength:{
                     min:2,
                     max:6,
                     message:"用户名长度必须是2-6位"
                  },
                  // 判断密码是否正确 用ajax判断
                  callback:{
                     message: "密码错误"
                  }

              }
            }

        }
  })


     /*
  * 2. 登录功能
  *    表单校验插件会在表单提交时进行校验, 如果希望通过 ajax 提交
  *    可以注册表单校验成功事件, 在事件中, 阻止默认的跳转提交, 通过 ajax 进行提交
  * */

    $('#form').on("success.form.bv",function(e){
      e.preventDefault();//阻止表单的默认提交
      $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        // 表单序列号
        data:$("#form").serialize()  ,
        dataType:"json",
        success:function(info){
          
          if(info.success){
            // 登陆成功 跳转
            location.href = "index.html";

          }
          if(info.error === 1000){
            // 用户不存在
            $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
          }
          if(info.error === 1001){
            // 密码错误
            $("#form").data("bootstrapValidator").updateStatus( "password", "INVALID", "callback")
          }


        }
      })

    })


  //  设置重置功能
   
    $('[type="reset"]').click(function(){
      // 调用插件方法
      $("#form").data("bootstrapValidator").resetForm(true);
    })
})