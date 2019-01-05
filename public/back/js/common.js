
$(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function () {
        //关闭进度条
        NProgress.done();
        
    }, 500);

});


$(function(){
    //点击左边侧边栏,显示动画
    $('.lt_aside .category').click(function(){
        $(this).next().stop().slideToggle();
    })

    $('.icon_menu').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })

    
    $('.icon_logout').click(function(){
        $('#logoutModal').modal('show');
    })

    $('#logoutBtn').click(function(){
        $.ajax({
            url: '/employee/checkRootLogin',
            type: 'get',
            dataType: 'json',
            success: function( info ){
                if ( info.success ){
                    location.href = 'login.html';
                }
            }
        })
    })

})

