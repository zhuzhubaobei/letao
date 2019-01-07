$(function () {
    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //   用户名长度必须是 2-6 位
        // 密码长度必须是6-12位

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
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },

            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须是6-12位'
                    },
                    callback: {
                        message: '密码不正确'
                    }
                }
            },
        }

    });


    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: ' /employee/employeeLogin',
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                console.log(info);
                if (info.error === 1000) {
                    $("#form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    return;
                }
                if (info.error === 1001) {
                    $("#form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    return;
                }
                if (info.success) {
                    location.href = 'index.html';
                    return;
                }

            }

        })
    });

    // 重置表单
    $('[type="reset"]').on('click', function () {


        $("#form").data('bootstrapValidator').resetForm();//重置表单，并且会隐藏所有的错误提示和图标

    })
})




