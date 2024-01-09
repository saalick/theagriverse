
$(document).ready(function(){

	// Product Filter Start
	$("#id_old_password , #id_new_password1 , #id_new_password2").on('change',function(){
        var _id_old_password = $("#id_old_password").val()
        var _id_new_password1 = $("#id_new_password1").val()
        var _id_new_password2 = $("#id_new_password2").val()
        var _token_csrf = $('input[name="csrfmiddlewaretoken"]').val();


		// Run Ajax
        if (_id_old_password , _id_new_password1 , _id_new_password2){

		$.ajax({
			url:'/change_password_validation/',
            type:"POST",
			data:{

                old_password:_id_old_password,
                new_password1:_id_new_password1,
                new_password2:_id_new_password2,
                csrfmiddlewaretoken:_token_csrf
            },
			dataType:'json',
			beforeSend:function(){

			},
			success:function(res ){
                    if(res.data == "success"){
            
                       
                        $(".password_msg_div").html(`<p style='background: #ddffe3;padding: 10px;border-radius: 6px;color: #00872a;'>${res.msg}</p>`)
                        
                    }
                        
                    else
                    {
                        
                        $(".password_msg_div").html(`<p style='background: #ffdddd;padding: 10px;border-radius: 6px;color: #870000;'>${res.msg}</p>`)
                    

                    }

                        
                    

                    }


            });

                    
        }

		

		// End
	});

})




function themeChangeAjax(theme){
    var _theme_mode = theme 

		// Run Ajax

		$.ajax({
			url:'/change_theme/',
			data:{
                theme_mode:_theme_mode
                
            },
			dataType:'json',
			beforeSend:function(){
                $(".theme_loading_spinner").attr('style' , 'display:inline-block;')
			},
			success:function(res){
                $(".theme_loading_spinner").attr('style' , 'display:none;')
                if(res.data == "success"){

                    if(_theme_mode == "Dark"){
                        $('head').append('<link rel="stylesheet" id="color_theme_link_css" href="/static/app/css/dark.css"/>')
                        $(".dark_mode_icon").show()

                    }
                    else if(_theme_mode == "Light"){
                        $('head > #color_theme_link_css').remove()
                        $(".light_mode_icon").show()
                    }
                    else if(_theme_mode == "System Color"){
                        $('head').append('<link rel="stylesheet" id="color_theme_link_css" media="(prefers-color-scheme:dark)" href="/static/app/css/dark.css" />')
                        $(".dark_mode_icon").show()
                    }

                }
                    
                else{
                    $('.appearance_title_with_msg').html("<p style='color:red;'> "+ res.msg +" </p>")
                }
                        

                }


        });

		// End
}



// Product Filter Start
$("#Appearance_mode").on('change',function(){
    var theme_val = $("#Appearance_mode").val()
    themeChangeAjax(theme_val)
});



$('#checkbox-theme').click(function(){
    var theme_checkBox = document.getElementById("checkbox-theme");

    if (theme_checkBox.checked == true){
        themeChangeAjax("Dark")
        $(".dark_mode_icon").hide()
    } 
    else{
        themeChangeAjax("Light")
        $(".light_mode_icon").hide()
      }

})






function account_dis_enb(status){
    var _account_switch_btn = status
    var _token_csrf = $('input[name="csrfmiddlewaretoken"]').val();

    // Run Ajax
    $.ajax({
        url:'/Account_switch/',
        type:"POST",
        data:{

            status:_account_switch_btn,
            csrfmiddlewaretoken:_token_csrf

        },
        dataType:'json',
        beforeSend:function(){
            $("#switch_loading_spinner").attr('style' , 'display:inline-block;')
        },
        success:function(res ){
            $("#switch_loading_spinner").attr('style' , 'display:none;')
            if(res.data == "success"){
                $(".switch_title_with_msg").html(`<p style='color: #00872a; margin:0px;'>${res.msg}</p>`)  
            }
            else{
                $(".switch_title_with_msg").html(`<p style='color: #870000;margin:0px;'>${res.msg}</p>`)
            }

        }

        });

    // End


}



$('#account_switch_btn').click(function(){
    var switch_btn = document.getElementById("account_switch_btn");

    if (switch_btn.checked == true){
        account_dis_enb("Enable")

    } 
    else{
        account_dis_enb("Disable")
        
      }

})






