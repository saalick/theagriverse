setTimeout(function(){
    
    $('fieldset:nth-child(1) select').select2()
    $('#changelist-filter select').select2()
    // $("#id_user").select2()
    

    $('.dynamic-customerpermissions_set .field-customer select').select2();
        $('#customerpermissions_set-group .add-row td').click(function(){
            $('.dynamic-customerpermissions_set .field-customer select').select2();
            
    })

 



},1500)