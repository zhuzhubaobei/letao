

$(function(){

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render(){
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data:{
                page: currentPage,
                pageSize : pageSize
            },
            dataType: 'json',
            success: function( info ){
                console.log(info);
                var htmlstr = template( 'secondTpl', info);
                $('tbody').html(htmlstr);

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil( info.total / info.size ),//总页数
                    size:"normal",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,page){
                        currentPage = page;
                        render();
                    }
                  });
            }
        })
    }

    $('#addBtn').on('click',function(){
        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function( info ){
                console.log(info);
                var htmlstr = template('dropdownTpl',info);
                $('.dropdown-menu').html(htmlstr);
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        $('#dropdownText').text(txt);
    })

    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          var picurl = data.result.picAddr;
          $('#imgBox img').attr('src',picurl);
        }
  });


   // 3. 进行校验配置
   $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // 校验字段, 一定要先配置 input 的 name
    fields: {
        brandName: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  
  // 4. 注册表单校验成功事件, 在成功准备提交表单时, 阻止默认的提交, 通过ajax提交
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();

    // 通过 ajax 提交
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 添加成功, 关闭模态框, 重新渲染
          $('#addModal').modal("hide");

          // 重新渲染第一页
          currentPage = 1;
          render();

          // 重置表单内容, 内容和状态都重置
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }

    })
  })
})