
setTimeout(function(){
    var check_user_emp = $('.select2-selection__rendered').text()
    var s_name = ''
    var s_course =''
    var s_p_status = ''

    $(".select2-selection__rendered" ).each(function( index ) {
      
        if (index == 1){
            s_name = $( this ).text()
        }
        else if (index == 2){
            s_course = $( this ).text()
        }
        else if (index == 3){
            s_p_status = $( this ).text()
        }
        
       
        
        // total_pump += parseInt($( this ).text())
    });


    var formdate = $('#id_date__range__gte').val()
    var todate = $('#id_date__range__lte').val()
    let date_1 = new Date(todate);
    let date_2 = new Date(formdate);

    const days = (date_1, date_2) =>{
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    
    if (formdate && todate){
        var from = formdate
        var to = todate

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        var all_pay_amount = 0
        $(".all_pay_amount" ).each(function( index ) {
            all_pay_amount += parseInt($(this).text())
        });

        var all_deu_amount = 0
        $(".all_deu_amount" ).each(function( index ) {
            all_deu_amount += parseInt($(this).text())
        });


        $('#result_list >tbody').append(
            `<tr class="grand_total_row">
        <td class="action-checkbox"></td>
        <th colspan="5" class="field-drivers" style="text-align:center;     font-size: 19px;">Overall</th>
       
        <td class="field-Paid"><p style="    background: #071142;
        padding: 8px 7px;
        margin: 0px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: white;    border-radius: 7px;    white-space: nowrap;">Days <span class="grand_total_days"></span></p></td>

        
        
        <td class="field-expenses"><p style="background: #70bf2b;
        padding: 8px 7px;
        margin: 0px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: white;    border-radius: 7px;    white-space: nowrap;">Paid Rs.<span class="grand_total_paid"></span></p></td>
        
        <td class="field-balance"><p style="    background: #b00f0f;
        padding: 8px 7px;
        margin: 0px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: aliceblue;    border-radius: 7px;    white-space: nowrap;">Due Rs.<span class="grand_total_due"></span> </p></td>

        </tr>`
        )

        var totalgays =days(date_1 , date_2)+1
        var action_counter = $('.action-counter').data("actions-icnt") 
        $(".grand_total_days").text(totalgays)
        $(".grand_total_paid").text(all_pay_amount)
        $(".grand_total_due").text(all_deu_amount)


        $("#changelist-search").append(`
          <div class="report_btn_coontainer"><a class="float-left" >
            <button type="button" class="my_btn1 dow_btn PDf_btn" ><i class="fa fa-download" aria-hidden="true"></i>PDF REPORT</button>
          </a>
          <button type="button" class="my_btn1 download_csv PDf_btn" ><i class="fa fa-download" aria-hidden="true"></i>CSV REPORT</button>
          </div>
          `
        )

        // csv report 
        $("#changelist-search").on('click' , '.download_csv' , function(){

            var divContents = $(".results").html();
            
                var printWindow = window.open('', '', 'height=800,width=1000');
                printWindow.document.write(`<html><head>
                
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
                <script src="/static/lms/js/tableToCsv.js"></script>
                <title>Attendance Record</title> 
                <style>
                body {
                    font-family: system-ui;
                }
                table#result_list {
                    width: 100%;
                    border-collapse: collapse;
                }
                th.action-checkbox-column {
                    display: none;
                }
                thead > tr th {
                    background: #286090;
                    color: white;
                    padding: 8px;
                }
                .field-Status{
                    text-align: center;
                }

                td, th {
                    
                    font-size: 14px;
                    line-height: 16px;
                    border-bottom: 1px solid #e8e8e8;
                    vertical-align: middle;
                    padding: 4px 10px;
                    border: 1px solid #dddddd;
                    white-space: nowrap;
                    text-align: start;
                }

                th.field-Student a {
                    color: #286090;
                    text-decoration: none;
                }

                thead > tr th div a {
                    color: white;
                    text-decoration: none;
                }

                
                td.action-checkbox {
                    display: none;
                }
                th.field-Line_Haul {
                    text-align: left;
                }
                th.field-Line_Haul > a {
                    color: #a50000;
                    text-decoration: none;
                }

                
                tr:nth-child(even) {
                    background: #f1f1f1;
                }

                .tr_d_none{
                    display:none;
                }
                
                </style>`);
                printWindow.document.write('</head><body >');
                printWindow.document.write(`
                <table class="tr_d_none">
                <tbody>
                    
                    <tr class="tr_d_none">
                        <th colspan="7">Student Fee Report</th>
                        <th>Date : ${today}</th>
                    </tr> 
                    <tr class="tr_d_none">
                        <th>S/Name : ${s_name}</th>
                    </tr> 
                    <tr class="tr_d_none">
                        <th>Course : ${s_course}</th>
                        
                    </tr> 
                    <tr class="tr_d_none">
                        <th>Payment Status  : ${s_p_status}</th>
                        
                    </tr> 
                   
                    <tr class="tr_d_none">
                        <th>Record Range : <span>From ${from} To ${to}</span></th>
                    </tr> 
                    <tr class="tr_d_none">
                        <th></th>
                    </tr> 
                   
                </tbody>
                </table>
                `)
                printWindow.document.write(divContents);
                printWindow.document.write(`
                <script>
                    $(".action-checkbox-column").remove();
                    $(".action-checkbox").remove();
                    $(".clear").remove();
                    $("td.field-PrintSlip").remove();
                    $("th.column-PrintSlip").remove();

                    

                    $('table').tableToCsv({
                       filename: 'Student_fee_Report_${today}.csv',
                       
                    });
                </script>
                `);
               
                printWindow.document.write('</body></html>');

                printWindow.document.close();
                
                

           
            
        }) 
           
    
   
            $(".dow_btn").click(function(){
                
                
           
                var divContents = $(".results").html();
            
                var printWindow = window.open('', '', 'height=800,width=1000');
                printWindow.document.write(`<html><head><title>Student Fee Report</title> 
                <style>
                body {
                    font-family: system-ui;
                }
                table#result_list {
                    width: 100%;
                    border-collapse: collapse;
                }
                th.action-checkbox-column {
                    display: none;
                }
                thead > tr th {
                    background: #071142;
                    color: white;
                    padding: 8px;
                }

                .field-slip_id > a {
                    color: #70bf2b;
                }

                .field-Status{
                    text-align: center;
                }

                td, th {
                    
                    font-size: 14px;
                    line-height: 16px;
                    border-bottom: 1px solid #e8e8e8;
                    vertical-align: middle;
                    padding: 4px 10px;
                    border: 1px solid #dddddd;
                    white-space: nowrap;
                }

                th.field-Student a {
                    color: #286090;
                    text-decoration: none;
                }

                thead > tr th div a {
                    color: white;
                    text-decoration: none;
                }

                
                td.action-checkbox {
                    display: none;
                
                }

                td.field-PrintSlip {
                    display: none;
                }

                th.column-PrintSlip{
                    display: none;
                }

                th.field-Line_Haul {
                    text-align: left;
                }
                th.field-Line_Haul > a {
                    color: #a50000;
                    text-decoration: none;
                }

                
                tr:nth-child(even) {
                    background: #f1f1f1;
                }
                
                </style>`);
                printWindow.document.write('</head><body >');
                printWindow.document.write(`
                <div id="table_img">
                <div>
                <span style="color: red;
                font-size: 27px;
                font-weight: bold;
                font-family: sans-serif;"> <img src="/static/lms/img/logo1.png" alt="logo" width="150px" style="margin-bottom: 10px;"> </span>
                <span style="    float: right;
                font-size: 16px;">Date ${today} </span> 
                <p style="    font-family: sans-serif; margin:5px 0px;">
                    S/Name : <span> ${s_name} </span>
                </p>
                <p style="    font-family: sans-serif; margin:5px 0px;">
                    Course  : <span>${s_course}</span>
                </p>
                <p style="    font-family: sans-serif; margin:5px 0px;">
                    Payment Status : <span>${s_p_status}</span>
                </p>
                
                
                <p style="    font-family: sans-serif; margin:5px 0px;">
                    Record Range : <span>From ${from} To ${to}</span>
                </p>
                
                </div> 
                </div>`)
                printWindow.document.write(divContents);
               
                printWindow.document.write(`

                            <div style="position: fixed;
                            bottom: 0;
                            left: 38px;
                            border-top: 1px solid grey;
                            width: 239px;
                            text-align: center;">
                                <p>signature</p>
                            </div>`)
                
                printWindow.document.write(`

                <div style="position: fixed;
                text-align: center;
                right: 25px;
                font-weight: bold;
                color: #959595;
                bottom: 10px;
                    ">
                    <p>Developed By Software Department</p>
                </div>`)


                printWindow.document.write('</body></html>');

                setTimeout(function(){
                    printWindow.print();
                    
                },1000)
                printWindow.document.close();
                
                
                
        
        })


        
                


    }

},1600)
    









