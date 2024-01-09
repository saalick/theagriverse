


function agrigptAjax(question , saveqt){
    var _question = question
    var user_dp = $("#user_dp_link").val()
    var _save_chats = document.getElementById("chat_save_switch_btn");
    var _saveqt = saveqt
    if (_save_chats.checked){
        _save_chat_switch = "on"
    }
    else{
        _save_chat_switch = "off"
    }
    var chat_len = $(".chat_child_one").length + 1
    var speech_msg = new SpeechSynthesisUtterance();




    // Run Ajax
    $.ajax({
        url:'/agrigptapi/',
        data:{
            question:_question,
            save_chat_switch: _save_chat_switch,
            save_chat:_saveqt
        },
        dataType:'json',
        beforeSend:function(){
            $("#question_inp").val('')
            window.speechSynthesis.cancel();
            $("#send_msg_btn").hide()
            $(".send_btn_loading").css({'display':'flex'})
            $(".chat_main_container").append(` <div class="chat_child_one">
            <div class="chat_question_container">
                <div class="user_icon_container">
                  
                    <img src="${user_dp}" alt="user_icon">
                   
                </div>

                <div class="user_question_txt">
                    <p>${_question}</p>
                </div>

            </div>


            <div class="chat_answer_container">
                <div class="agrigpt_icon_container">
                    <img src="/static/app/img/AgriGPT_color.png" alt="user_icon">
                </div>

                <div class="agrigpt_answer_container">
                    <div class="agrigpt_answer_txt" id="agrigpt_answer_txt_id${chat_len}">
                        <p class="placeholder-glow">
                            <span class="placeholder col-12"></span>
                        </p>

                        <p class="placeholder-glow">
                            <span class="placeholder col-8"></span>
                        </p>

                        <p class="placeholder-glow">
                            <span class="placeholder col-9"></span>
                        </p>

                        <p class="placeholder-glow">
                            <span class="placeholder col-5"></span>
                        </p>

                        <p class="placeholder-glow">
                            <span class="placeholder col-3"></span>
                        </p>

                    </div>
                </div>
            </div>


        </div>`)
        $(".popular_question_container").hide()

        $(".gpt_parent_container").animate({
            scrollTop: $('.scroll_container').height()
        }, 300);



        },
        success:function(res){
            
            if(res.status == "success"){
                $("#send_msg_btn").show()
                
                $(".send_btn_loading").css({'display':'none'})
                var speech_btn = document.getElementById("chat_speech_switch_btn");
                if (speech_btn.checked == true){
                  
                    var read_text = res.answer
                    speech_msg.text = read_text;
                    window.speechSynthesis.speak(speech_msg);

                } 
               

                $("#agrigpt_answer_txt_id"+chat_len+"").html("<pre>"+res.answer+"</pre>")  
            }
            else{
                $("#agrigpt_answer_txt_id"+chat_len+"").html(`<p style='color: #870000;margin:0px;'>${res.status}</p>`)
            }

        }

        });

    // End


}



$("#agrigpt_form").submit(function(e){
    e.preventDefault();
    var qt = $("#question_inp").val()
    if (qt){
        agrigptAjax(qt , 'unsave_chat')

    }

})


$('.save_qt_box').click(function(){
    var qt = $(this).data('saveqt')
    agrigptAjax(qt , 'save_chat')
    

})
$('.popular_question_li').click(function(){
    var qt = $(this).text()
    agrigptAjax(qt , 'unsave_chat')
    
})






$('#chat_speech_switch_btn').click(function(){
    var chat_speech_switch_btn = document.getElementById("chat_speech_switch_btn");

    if (chat_speech_switch_btn.checked == true){
        window.speechSynthesis.resume();
    } 
    else{
        window.speechSynthesis.pause();

    }

    
})



$(document).ready(function(){

	// Product Filter Start
	$(".save_chat_delete_btn").on('click',function(){
        var _chat_id = $(this).data('chatid')
        var _parent_div = $(this).data('parent')
        var _this = $(this)
        var _token_csrf = $('input[name="csrfmiddlewaretoken"]').val();


		// Run Ajax
       
		$.ajax({
			url:'/chats_delete_api/',
            type:"POST",
			data:{

                chat_id:_chat_id,
                csrfmiddlewaretoken:_token_csrf
            },
			dataType:'json',
			beforeSend:function(){
                _this.html('<small style="font-size:10px;">deleting..</small>')
			},
			success:function(res ){
                if(res.status == "success"){
                    $(_parent_div).remove()
                }
                    
                else{
                    _this.html(res.msg)

                }


            }


            });

                    
      

		
		// End
	});

})
