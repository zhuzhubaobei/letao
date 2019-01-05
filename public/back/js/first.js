

$(function(){


    var pageSize = 5;
    var currentPage = 1;
    render();

    function render(){
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page : currentPage,
                pageSize : pageSize
            },
            success: function( info ){
                console.log( info );
                var htmlstr = template('firstTpl',info);
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
    })

    $('#form').bootstrapValidator({
         // 配置图标
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',   // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
      // 校验字段, 一定要先配置 input 的 name
      fields: {
        categoryName: {
          validators: {
            notEmpty: {
              message: "请输入一级分类名称"
            }
          }
        }
      }
    })

    $('#form').on("success.form.bv", function( e ) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ){
                console.log( info );
                if( info.success ){
                   $('#addModal').modal('hide');
                   currentPage = 1;
                   render();
                   $('#form').data('bootstrapValidator').resetForm(true);
                }
                
            }
        })

    })


})