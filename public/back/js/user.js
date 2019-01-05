
 
 $(function(){

     var currentId;
     var isDelete;

     var currentPage = 1;
     var pageSize = 5;
     render();

     function render(){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function( info ){
                console.log( info );
                var htmlstr = template( 'tpl', info);
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


     $('tbody').on('click','.btn',function(){
         $('#userModal').modal('show');
         currentId = $(this).parent().data('id');
         isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        })

     $('#submitBtn').click(function(){
         $.ajax({
             type: 'post',
             url: '/user/updateUser',
             dataType: 'json',
             data: {
                 id : currentId,
                 isDelete : isDelete
             },
             success: function( info ){
                 console.log(info);
                 if (info.success){
                   $('#userModal').modal('hide');
                   render();
                 }
             }
         })

     })


     
    
 })