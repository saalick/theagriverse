setTimeout(function(){

    

$("#send_fee_slip_btn").click(function(){
    

    var _id = $(".field-id .readonly").text()
    var _csrf = $('input[name="csrfmiddlewaretoken"]').val()
    // var _lname = $("#update_lname").val()

    $.ajax({
        url:'/feeslip_mail_api/',
        type:'post',
        data:{
            id:_id,
            csrfmiddlewaretoken:_csrf
            
        },
        dataType:'json',
        beforeSend:function(){
            $("#send_fee_slip_btn").html('loading...')
        },
        success:function(res){
            if (res.data == "success"){
                $("#send_fee_slip_btn").html('Mail Sent ✔')

            }
            else{
                $("#send_fee_slip_btn").html(res.data)
                
            }
        }
    });


});

},1500)