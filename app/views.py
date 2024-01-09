from django.shortcuts import render ,redirect , HttpResponse ,HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth.forms import  PasswordChangeForm , SetPasswordForm
from django.contrib.auth import authenticate, login, logout ,update_session_auth_hash
# Create your views here.
from .models import *
from django.contrib import messages

from django.core.mail import send_mail ,  EmailMessage
from django.utils.html import strip_tags
from ADA.settings import DEFAULT_FROM_EMAIL , EMAIL_HOST_USER  , ADMIN_URL , MEDIA_ROOT , TIME_ZONE , UPLOAD_ROOT

from django.http import JsonResponse
import pytz
from datetime import datetime , timedelta

from .languages_list import MyLanguageField

from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required

from django.core.files.storage import FileSystemStorage
from django.core.paginator import Paginator
from django.contrib.sites.models import Site
import openai


from django import template


from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from .form import *

UserModel = get_user_model()



register = template.Library()  



@login_required(login_url='/')
def cuurent_user_time(request):
    try:
        user_time = UserProfile.objects.get(user=request.user)
    except:
        user_time = []

    if user_time and user_time.Time_Zone:
        time_zone = pytz.timezone(user_time.Time_Zone) # set timezone here
    else:
        time_zone = pytz.timezone(TIME_ZONE) 

    # Before save
    user_current_time = time_zone.localize(datetime.now())
    print(user_current_time)
    return user_current_time


def index(request):
    return render(request , 'app/index.html')



def singup(request):
    if request.user.is_authenticated:
        try:
            user_email_verify = EmailVerified.objects.get(user=request.user , user_email=request.user.email)
            return redirect(f'/profile/')
        except:
            messages.error(request , 'Please First Verify Your Email !')
            return redirect('/login/')
        
        
    else:   
        if request.method == 'POST':
            username = request.POST['username']
            # fname = request.POST['fname']
            # lname = request.POST['lname']
            email = request.POST['email']
            password = request.POST['password']
            confirm_password = request.POST['confirm_password']
            next_redirect = request.GET.get('next' , '')

            # user exists
            if User.objects.filter(username=username).exists():
                messages.error(request, f'User "{username}" is already Exists')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            
            if User.objects.filter(email=email).exists():
                messages.error(request, f'{username} Your "{email}" Email is already Exists! Please use different Email')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            
            
            # hendle error
            if len(username) > 20:
                messages.error(
                    request, 'Your User Name is too Long. maximum 20 characters ')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

            if password != confirm_password:
                messages.error(request, 'Your Confirm Password is Not Match ')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

            if not username.isalnum():
                messages.error(
                    request, 'Please alphanumeric characters Like A-Z a-z 1-9.')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            
            form = FormWithCaptcha(request.POST)
            if form.is_valid():
                pass
            else:
                messages.error(request , 'Invalid Captcha Error')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
            
            
            # user create
            myuser = User.objects.create_user(username, email, password)
            # myuser.first_name = fname
            # myuser.last_name = lname
            myuser.save()

            # user create
            EmailVerified.objects.create(user=myuser , user_email=email)

            current_site = get_current_site(request)
            try:
                html_message = render_to_string('app/mail_template.html',
                {
                    'username': myuser ,
                    'password':password ,
                    'account_type':'Seller',
                    'domain': current_site.domain,
                    'request':request,
                    'uid': urlsafe_base64_encode(force_bytes(myuser.pk)),
                    'token': default_token_generator.make_token(myuser),
                    'next_redirect':next_redirect
                })
                plain_message = strip_tags(html_message)
                send_mail(
                    'Agriverse Account Verification.',
                    plain_message,
                    DEFAULT_FROM_EMAIL,
                    [email , EMAIL_HOST_USER],
                    html_message=html_message
                )
                
            except:
                pass

            messages.success(request, f'{username} Your Account Has Been Successfully Created.')
            return render(request, 'app/mail_send_msg.html' , {'email':email , 'uid':urlsafe_base64_encode(force_bytes(myuser.pk)) , 'token':default_token_generator.make_token(myuser)})
            
        else:
            captcha_form = FormWithCaptcha()
            params  = {'form':captcha_form}
            return render(request, 'app/signup.html' , params)




# email verify 

def activate(request, uidb64, token , backend='django.contrib.auth.backends.ModelBackend'):
    next_redirect = request.GET.get('next' , '')
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
        
    if user is not None and default_token_generator.check_token(user, token):
        EmailVerified.objects.filter(user=user , user_email=user.email).update(verify=True)
        user_email_verify = EmailVerified.objects.get(user=user , user_email=user.email)
        if user_email_verify.verify == True:
            login(request, user , backend)
            return redirect("/profile/")
        else:
            messages.error( request, 'Please confirm your email address to complete the registration')
            return redirect('email_send')
        
    else:
        messages.error( request, 'invalid user. please try again')
        return redirect('/')



def loginsys(request):
    if request.user.is_authenticated:
        return redirect("/profile/")
    else:
        if request.method == 'POST':
            loginusername = request.POST['loginusername']
            loginpassword = request.POST['loginPassword']
            next_redirect = request.GET.get('next' , '')
            form = FormWithCaptcha(request.POST)

            if form.is_valid():
                pass
            else:
                messages.error(request , 'Invalid Captcha Error')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
                
            user = authenticate(username=loginusername, password=loginpassword)
            if user is not None:
                
                try:
                    user_email_verify = EmailVerified.objects.get(user=user , user_email=user.email)
                except:
                    messages.error(request, 'Sorry Your Account is not Verified Please Verify Your account. Contact hydribazar.com helpline')
                    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
                    
                if user_email_verify.verify == True:
                    login(request, user)

                    if request.user.is_superuser and request.user.is_staff:
                        messages.success(request , f'You have logged in as {request.user}')
                        if next_redirect:
                            return redirect(next_redirect)
                        else:
                            messages.success(request, 'You Logged in Successfully')
                            return redirect(f'/{ADMIN_URL}')


                    elif request.user.is_authenticated:
                        messages.success(request , f'You have logged in as {request.user}')
                        if next_redirect:
                            return redirect(next_redirect)
                        else:
                            messages.success(request, 'You Logged in Successfully')
                            return redirect(f'/profile/')
                    
                else:
                    messages.error( request, 'Please confirm your email address to complete the registration')
                    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

            else:
                messages.error(
                    request, 'You have entered an invalid username or password. please try again')
                return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        
        captcha_form = FormWithCaptcha()
        params  = {'form':captcha_form}

        return render(request, 'app/login.html' , params)


def logoutsys(request):
    logout(request)
    messages.success(request, 'You Logout from theAgriverse.com')
    return redirect('/')



def usercheck(request):
    username = request.GET['username']
    user_fiter = User.objects.filter(username=username).exists()
    if user_fiter:
        return JsonResponse({'data':'username_already_exists'})
    else:
        return JsonResponse({'data':'username_is_not_already_exists'})



def contact(request):
    if request.method == "POST":
        f_name = request.POST["fname"]
        l_name = request.POST["lname"]
        email = request.POST["email"]
        phone = request.POST["phone"]
        msg = request.POST["msg"]

        try:
            create_contact = Contact.objects.create(
                Fisrt_Name=f_name,
                Last_Name=l_name,
                Email=email,
                Phone=phone,
                Message=msg
            )

            messages.success(request , 'Your Contact Successfully Submitted. Thank You')
            return redirect('/#queries-div')
            
        except:
            messages.success(request , 'Sorry something went wrong. Please Try Again')
            return redirect('/#queries-div')
       

    else:
        messages.success(request , 'Request Error')
        return redirect('/#queries-div')


    
# start dashboard APi 
def dashboard(request):
    cuurent_user_time(request)
    return render(request , 'app/dashboard.html')
 
   

@login_required(login_url='/login/')
def profile(request):
    if request.user.is_authenticated:
        # import pytz
        time_zone_list = pytz.all_timezones_set
       
        # for timeZone in :
        #     time_zone_list.append(timeZone)

        # todayDate = timezone.make_aware(now.date(), timezone=settings.TIME_ZONE)
        check_alread_resgi = UserProfile.objects.filter(user=request.user).exists()

        if check_alread_resgi:
            return redirect("/dashboard/")
        else:
            if request.method == "POST":
                Firstname= request.POST['Firstname']
                Lastname = request.POST['Lastname']
                email = request.POST['email']
                phone_number = request.POST['can_number']
                Wallet = request.POST['Wallet']
                time_zone = request.POST['time_zone']
                Language = request.POST['Language']
                photo = request.FILES.get('photo')
                try:
                    create_user_profile = UserProfile.objects.create(
                        user=request.user,
                        First_Name = Firstname , 
                        Last_Name = Lastname ,
                        Email = email ,
                        Phone_Number = phone_number ,
                        Wallet_Address = Wallet , 
                        Time_Zone = time_zone ,
                        Language = Language , 
                        Profile_DP = photo , 

                    )
                    messages.success(request, f'Hi , {Firstname} Your Profile han been Saved')
                    
                    return redirect("/dashboard/")
                except:
                    messages.error(request, 'You have entered an invalid details. please try again')
                    return redirect("/profile/")

            params = {
                'time_zone_list':time_zone_list
            }

            return render(request, 'app/profile.html' , params) 
        
    else:
        return redirect("/signup/")




# passsword change function 
@login_required(login_url='/')
def change_password(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            fm = PasswordChangeForm(user=request.user , data=request.POST)
            if fm.is_valid():
                fm.save()
                update_session_auth_hash(request , fm.user)
                messages.success(request , "Your Password has been Change")
                if request.user.is_authenticated:
                    return redirect('/settings/')
                else:
                    return redirect('/')
            else:
                messages.error(request , "Sorry your Password is not correct")
                if request.user.is_authenticated:
                    return redirect('/settings/')
                else:
                    return redirect('/')
    else:
        return redirect('/')
    

@login_required(login_url='/')
def change_password_validation(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            fm = PasswordChangeForm(user=request.user , data=request.POST)
            if fm.is_valid():
                return JsonResponse({'data':'success' , 'msg':'Password is valid'})
            else:
                return JsonResponse({'data':'error' , 'msg':'Sorry your Password is not correct'})
    else:
        return JsonResponse({'data':"error"  , 'msg':'Bad request 404' })
    


@login_required(login_url='/')
def change_without_password(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            fm = SetPasswordForm(user=request.user , data=request.POST)
            if fm.is_valid():
                fm.save()
                update_session_auth_hash(request , fm.user)
                messages.success(request , "Your Password has been Change")
                if request.user.is_authenticated:
                    return redirect('/student_setting/')
                else:
                    return redirect('/')
            else:
                messages.error(request , "Sorry your Password is not correct")
                if request.user.is_authenticated:
                    return redirect('/student_setting/')
                else:
                    return redirect('/')
            
    else:
        return redirect('/')


@login_required(login_url='/')
def fname_lname_api(request):
    fname = request.GET['fname']
    lname = request.GET['lname']

    find_user = User.objects.filter(id=request.user.id , username=request.user.username)
    if find_user:
        find_user.update(first_name=fname , last_name=lname)
        return JsonResponse({'data':'user_updated'})
    else:
        return JsonResponse({'data':'error'})

def marketplace(request):
    return render(request , 'app/marketplace.html')


@login_required(login_url='/login/')
def My_farm(request):
    if request.user.is_authenticated:
        return render(request , 'app/myfarm.html')
    else:
        return redirect('/login/')


def live_farm(request):
    all_farm = Farm.objects.filter(Status="Active")
    appointment_booked = Appointment.objects.filter(Status="Booked").order_by('-id')[:10]
    appointment_complate = Appointment.objects.filter(Status="Completed").order_by('-id')[:10]
    # create appointment 
    if request.method == "POST":
        Farm_id = request.POST['Farm_id']
        select_camera = request.POST['select_camera']
        fullname= request.POST['fullname']
        phone = request.POST['phone']
        email = request.POST['email']
        appointment_date = request.POST['date']
        appointment_time = request.POST['time']
        address = request.POST.get('address')
        city = request.POST.get('city')
        state = request.POST.get('state')
        post_code = request.POST.get('post_code')
        confirmation = request.POST['confirmation']


        start_date_time_concatinate = datetime.combine(datetime.strptime(appointment_date , "%Y-%m-%d") , datetime.strptime(appointment_time , "%H:%M").time())
        appo_time = datetime.strptime(appointment_time, "%H:%M")
        time_plus_30_mint =  datetime.strptime(str(appo_time + timedelta(minutes=30)) , "%Y-%m-%d %H:%M:%S").strftime("%H:%M")
        end_date_time_concatinate = datetime.combine(datetime.strptime(appointment_date , "%Y-%m-%d") , datetime.strptime(time_plus_30_mint , "%H:%M").time())


        start_check_appointment_already = Appointment.objects.filter(Appointment_Date=appointment_date, Start_Appointment_Time__gte=start_date_time_concatinate.time() , Start_Appointment_Time__lte=end_date_time_concatinate.time() , Status="Booked")

        end_check_appointment_already = Appointment.objects.filter(Appointment_Date=appointment_date, End_Appointment_Time__gte=start_date_time_concatinate.time() , End_Appointment_Time__lte=end_date_time_concatinate.time() , Status="Booked")

        if start_check_appointment_already or end_check_appointment_already:
            messages.error(request , f'Appointment Already Booked for {appointment_date} at {appointment_time}')
            return redirect('/live_farm/')
        else:
            try:
                farm = Farm.objects.get(id=Farm_id , Status="Active")
            except:
                messages.error(request , 'Sorry Farm Not Exist Please Select Farm')
                return redirect('/live_farm/')
            
            if farm:
                create_appointment = Appointment.objects.create(
                    farm=farm,
                    Live_streaming_via = select_camera,
                    Full_Name=fullname,
                    Phone_Number=phone,
                    Email=email,
                    Appointment_Date=appointment_date,
                    Start_Appointment_Time=appointment_time,
                    End_Appointment_Time=end_date_time_concatinate.time(),
                    Address=address,
                    City=city,
                    State=state,
                    Post_Code=post_code,
                    Confirmation=confirmation

                )


                date_formet = datetime.strptime(appointment_date, "%Y-%m-%d").strftime("%B , %d , %Y")
                time_12housr = datetime.strptime(appointment_time, "%H:%M").strftime("%I:%M %p")

                current_site = Site.objects.get_current()
                
                try:
                    html_message = render_to_string('app/appointment_mail_template.html',
                    {   
                        'form':create_appointment,
                        'date_formet':date_formet,
                        'time_12housr':time_12housr,
                        'domain':current_site.domain
                        
                    })
                    plain_message = strip_tags(html_message)
                    send_mail(
                        'TheAgriverse.com Appointment Submitted Successfully.',
                        plain_message,
                        DEFAULT_FROM_EMAIL,
                        [email , EMAIL_HOST_USER],
                        html_message=html_message
                    )
                except:
                    pass

            
                con_params = {'form':create_appointment, 'request':request, 'date_formet':date_formet, 'time_12housr':time_12housr,}
                return render(request , 'app/appointmnet_confirm.html' , con_params)




    params = {
        'all_farm':all_farm,
        'appointment_booked':appointment_booked,
        'appointment_complate':appointment_complate
    }
    return render(request , 'app/livefarm.html' , params)




def appo_confirm(request ,  id):
    form  = Appointment.objects.get(id=id)
    params = {"form":form}
    return render(request , 'app/appointmnet_confirm.html' , params)





def Game(request):
    return render(request , 'app/dashboard.html')


def swap(request):
    return render(request , 'app/swap.html')

def buy_now(request):
    return render(request , 'app/buy.html')


@login_required(login_url='/profile/')
def settings(request):
    if request.user.is_authenticated:
        try:
            userprofile = UserProfile.objects.get(user=request.user)
        except:
            return redirect('/profile/')
        
        time_zone_list = pytz.all_timezones_set
        lanf_lis = MyLanguageField.Lang_list()

        fm_with = PasswordChangeForm(user=request.user)
        fm_without = SetPasswordForm(user=request.user)
       

        if request.method == "POST":
            Firstname= request.POST['Firstname']
            Lastname = request.POST['Lastname']
            email = request.POST['email']
            phone_number = request.POST['can_number']
            Wallet = request.POST['Wallet']
            time_zone = request.POST['time_zone']
            Language = request.POST['Language']
            photo = request.FILES.get('photo')

            fss = FileSystemStorage(location=UPLOAD_ROOT , base_url='app/image')
            # logo 
            if photo:
                logo_filename = fss.save(photo.name,photo)
                image = f"app/image/{logo_filename}"

            else:
                image = userprofile.Profile_DP
            

            # try:
            create_user_profile = UserProfile.objects.filter(user=request.user).update(
                user=request.user,
                First_Name = Firstname , 
                Last_Name = Lastname ,
                Email = email ,
                Phone_Number = phone_number ,
                Wallet_Address = Wallet , 
                Time_Zone = time_zone ,
                Language = Language , 
                Profile_DP = image , 
            )
            messages.success(request, f'Your Profile has Been Updated.')
            return redirect("/settings/")
            # except:
            #     messages.error(request, 'You have entered an invalid details. please try again')
            #     return redirect("/settings/")

        params = {
            'time_zone_list':time_zone_list,
            'userprofile': userprofile,
            'lanf_lis':lanf_lis,
            "form":fm_with , "form_without":fm_without
        }
        return render(request , 'app/settings.html' , params)
    else:
        return redirect('/')



# @login_required(login_url='/')
def change_theme(request):
    if request.user.is_authenticated:
        try:
            get_apprancee = request.GET['theme_mode']
            get_profile = UserProfile.objects.filter(user=request.user).update(color_theme=get_apprancee)
            return JsonResponse({'data':'success' , 'msg':'Theme change'})
        except:
            return JsonResponse({'data':'error' , 'msg':'Profile Error'})
        
    else:
        try:
            get_apprancee = request.GET['theme_mode']
            request.session['theme_mode'] = get_apprancee
            return JsonResponse({'data':'success' , 'msg':'Theme change'})
        except:
            return JsonResponse({'data':'error' , 'msg':'Profile Error'})
        
    

@login_required(login_url='/')
def Account_switch(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            try:
                get_status = request.POST['status']
                get_profile = UserProfile.objects.filter(user=request.user).update(Account_switch=get_status)
                return JsonResponse({'data':'success' , 'msg':f'Account is {get_status}'})
            except:
                return JsonResponse({'data':'error' , 'msg':'Profile Error'})
        
    else:
        return JsonResponse({'data':'error' , 'msg':'Request Bad 404'})
    


def carbon_footprint_calculator(request):
    return render(request , 'app/carbon_footprint_calculator.html')




def agrigpt(request):

    if request.user.is_authenticated:
        save_chat =  SaveChats.objects.filter(user=request.user).order_by('-id').distinct()
    else:
        save_chat = []

    
    # pageintion
    paginator = Paginator(save_chat, per_page=100)
    page_number = request.GET.get('page' , 1)
    page_obj = paginator.get_page(page_number)

    params = {
        'save_chat' : page_obj.object_list,
        'paginator':paginator,
        'page_obj':page_obj,
        'page_number':int(page_number),
    }
    
    return render(request , 'app/Agrigpt.html' , params)


def agrigptapi(request):
    openai.api_key = "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"
    get_question = request.GET['question']
    get_save_chat_switch = request.GET['save_chat_switch']
    get_from_save_data = request.GET.get('save_chat')

    if request.user.is_authenticated and get_from_save_data == "save_chat":
        try:
            get_user_chat_similar_question = SaveChats.objects.get(user=request.user , question=get_question)
        except:
            get_user_chat_similar_question = []
    else:
        get_user_chat_similar_question = []


    if get_user_chat_similar_question:
        return JsonResponse({"status":"success" , 'question':get_question , 'answer':get_user_chat_similar_question.answer})
    
    else:
        try:
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=get_question,
                temperature=0.7,
                max_tokens=256,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )

            if request.user.is_authenticated:
                check_aleady = SaveChats.objects.filter(user=request.user , question=get_question).exists()
                if check_aleady == False:
                    if get_save_chat_switch == "on" and get_question != '':
                        chat_obj = SaveChats.objects.create(user=request.user , question=get_question , answer=response["choices"][0]["text"][2:])

            return JsonResponse({"status":"success" , 'question':get_question , 'answer':response["choices"][0]["text"][2:]})
        except:
            return JsonResponse({"status":"error" , 'question':'' , 'answer':''})





def chats_delete_api(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            get_chat_id = request.POST['chat_id']
            filter_chat = SaveChats.objects.filter(user=request.user , id=get_chat_id).delete()
            return JsonResponse({"status":"success" , "msg":'chat deleted success'})
        else:
            return JsonResponse({"status":"error" , "msg":'request 404 Error'})

    else:
        return JsonResponse({"status":"error" , "msg":'authentication Error'})






def appointment_check_api(request):
    get_date = request.GET['date']
    get_time = request.GET['time']

    start_date_time_concatinate = datetime.combine(datetime.strptime(get_date , "%Y-%m-%d") , datetime.strptime(get_time , "%H:%M").time())

    appo_time = datetime.strptime(get_time, "%H:%M")
    time_plus_30_mint =  datetime.strptime(str(appo_time + timedelta(minutes=30)) , "%Y-%m-%d %H:%M:%S").strftime("%H:%M")
    end_date_time_concatinate = datetime.combine(datetime.strptime(get_date , "%Y-%m-%d") , datetime.strptime(time_plus_30_mint , "%H:%M").time())

    start_check_appointment_already = Appointment.objects.filter(Appointment_Date=get_date, Start_Appointment_Time__gte=start_date_time_concatinate.time() , Start_Appointment_Time__lte=end_date_time_concatinate.time() , Status="Booked")

    end_check_appointment_already = Appointment.objects.filter(Appointment_Date=get_date, End_Appointment_Time__gte=start_date_time_concatinate.time() , End_Appointment_Time__lte=end_date_time_concatinate.time() , Status="Booked")

    date_formet = datetime.strptime(get_date, "%Y-%m-%d").strftime("%B , %d , %Y")
    time_12housr = datetime.strptime(get_time, "%H:%M").strftime("%I:%M %p")
                     

  
    if start_check_appointment_already or end_check_appointment_already:
        return JsonResponse({"data":"appointment_not_available" , "ava_date":str(date_formet) , 'time_12housr':str(time_12housr)})
    else:
        return JsonResponse({"data":"appointment_available" , "ava_date":str(date_formet) , 'time_12housr':str(time_12housr)})
    



# end dashboard api 









