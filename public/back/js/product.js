
$(function () {

    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var htmlstr = template('productTpl', info);
                $('tbody').html(htmlstr);

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    size: 'normal',
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })

            }
        })
    }

    $('#addBtn').click(function () {
        $('#addModal').modal('show');

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlstr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlstr);

            }
        })
    })

    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('#dropdownText').text(txt);
        var id = $(this).data('id');
        $('[name="brandId"]').val(id);

        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })


    $('#form').bootstrapValidator({

        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },

            // 商品库存格式, 必须是非零开头的数字
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },

                    // 商品库存格式, 必须是非零开头的数字
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            },

            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    // 必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus: {
                validators: {
                  notEmpty: {
                    message: "请上传三张图片"
                  }
                }
            }
        }
    });


    $("#fileupload").fileupload({
        dataType:"json",
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          var picObj = data.result;
          picArr.unshift(picObj);
          var picUrl = data.result.picAddr;
          $('#imgBox').prepend('<img style="width:100px;" src="'+ picUrl+'" alt="">');
          if(picArr.length > 3){
              picArr.pop();
              $('#imgBox img:last-of-type').remove();
          }

          if(picArr.length === 3){
              $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
          }
        }
    });

    $('#form').on("success.form.bv",function( e ){
        e.preventDefault();

        var paramsStr = $('#form').serialize();
        paramsStr += '&picArr' + JSON.stringify( picArr );

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: paramsStr,
            dataType: 'json',
            success: function( info ){

                console.log(info);
                if (info.success){
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                    $('#form').data('bootstrapValidator').resetForm(true);
                    $('#dropdownText').text('请选择二级分类');
                    $('#imgBox img').remove();
                }
            }

        })
    })


})