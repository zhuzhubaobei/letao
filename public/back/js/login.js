

$(function () {

    //    * 1. 进行表单校验配置

    $('#form').bootstrapValidator({

        //2. 指定校验时的图标显示，默认是bootstrap风格
        // 用户名长度必须是 2-6 位
        // 密码长度必须是6-12位
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须是 2-6 位'
                    },
                    // 专门用于配置回调的提示
                    callback: {
                        message: '用户名不存在'
                    }

                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须是6-12位'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
    });

    //    * 2. 我们需要用到插件的校验功能, 所以要用 submit 按钮
    //   *    所以需要注册表单校验成功事件, 在事件中, 阻止默认的提交(防止跳转), 通过 ajax 提交即可

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type: 'POST',
            url: ' /employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                
                if (info.error === 1000) {
                    $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    return;
                }
                if (info.error === 1001) {
                    $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    return;
                }
                if (info.success) {
                    location.href = "index.html";
                    return;
                }
            }
        })

    });

    //    * 3. 重置功能
    $('[type="reset"]').click(function(){
        $('#form').data('bootstrapValidator').resetForm();
    })
    
});

