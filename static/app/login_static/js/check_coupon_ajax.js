$(document).ready(function(){

    function get_course_price(){
        var _course_id = $('#course_list').val()
            var _csrf = $('input[name="csrfmiddlewaretoken"]').val()
        
            // Run Ajax
            $.ajax({
                url:'/course_price_api/',
                type:'post',
                data:{
                    csrfmiddlewaretoken : _csrf,
                    course_id:_course_id,
               
                    
                },
                dataType:'json',

                success:function(res){
                    if (res.data == 'success'){
                        $('#fee_num').text(res.price)
                        $('.month_num').text(res.duration)
                    }
                    else{
                        $('#fee_num').text("0")
                        $('.month_num').text(res.data)
                    }
                    
                }
            });
    }




    // save_adress with ajax 

    function apply_code_wthi_price(){
        var _course_id = $('#course_list').val()
        var _coupon = $("#coupon_code").val();
        var _csrf = $('input[name="csrfmiddlewaretoken"]').val()
    
        // Run Ajax
        $.ajax({
            url:'/check_coupon_valid_api/',
            type:'post',
            data:{
                csrfmiddlewaretoken : _csrf,
                course_id:_course_id,
                coupon:_coupon,
                
            },
            dataType:'json',
            beforeSend:function(){
                
            },
            success:function(resp){
                
                if (resp.data == 'success'){
                    $.ajax({
                        url:'/course_price_api/',
                        type:'post',
                        data:{
                            csrfmiddlewaretoken : _csrf,
                            course_id:_course_id,
                       
                            
                        },
                        dataType:'json',
        
                        success:function(res){
                            if (res.data == 'success'){
                                
                                if (resp.dis_t == 'Percent'){
                                   
                                    var parsonvalue = parseInt(res.price) * resp.dis / 100 ;
                                    sabract = parseInt(res.price) - parsonvalue
                                    $('#fee_num').text(sabract.toFixed(0))
                                    $('.cop_msg').text(''+resp.dis+'% discount Apply Success')

                                }
                                else{
                                    
                                    var parsonvalue = parseInt(resp.dis);
                                    sabract = parseInt(res.price) - parsonvalue
                                    $('#fee_num').text(sabract.toFixed(0))
                                    $('.cop_msg').text('Rs.'+resp.dis+' discount Apply Success')
                                }

                                $('.month_num').text(res.duration)
                               
                                $('.cop_msg').css({'color':'green'})

                            }
                            else{
                                $('#fee_num').text("0")
                                $('.month_num').text(res.data)
                            }
                            
                        }
                    });
    
                }

                else{
                    $('.cop_msg').text(resp.data)
                
                    $('.cop_msg').css({'color':'red'})
                    get_course_price()
                }

               
               
                
            }
        });

    }


    

    $("#coupon_code").on('change' , function(){
        apply_code_wthi_price()
    });

    $("#course_list").on('change' , function(){
            if ($("#coupon_code").val()){
                apply_code_wthi_price()
            }
            else{
                get_course_price()
                $('.cop_msg').text('')
            }
    
    });

    get_course_price()


    
 });