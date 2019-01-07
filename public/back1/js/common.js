
NProgress.configure({ showSpinner: false });

$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    setTimeout(function(){
        NProgress.done();
    },500);
});

if( location.href.indexOf('login.html') === -1){
    $.ajax({
        type: 'get',
        url: ' /employee/checkRootLogin',
        dataType: 'json',
        success: function( info ){
            console.log( info );
            if( info.success ){
                console.log('登录了');
            }
            if( info.error === 400 ){
                location.href = 'login.html';
            }
        }
    })
}


$(function(){
    $('.category').click(function() {
        $(this).next().stop().slideToggle();
  });


})

