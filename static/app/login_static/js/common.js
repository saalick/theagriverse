setTimeout(function(){
    
    $('#content.colM select').select2()
    $('#changelist-filter select').select2()
    // $("#id_user").select2()

   

    $('.dynamic-productkeyword_set .field-keyword select').select2();
    $('#productkeyword_set-group .add-row td').click(function(){
        $('.dynamic-productkeyword_set .field-keyword select').select2();
        
})


},1500)