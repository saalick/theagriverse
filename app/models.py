from django.db import models
from django.contrib.auth.models import User, update_last_login
from django.utils.html import mark_safe
from django.utils.text import slugify
from ADA.settings import DEFAULT_FROM_EMAIL , EMAIL_HOST_USER  , ADMIN_URL , MEDIA_ROOT
from .languages_list import MyLanguageField
from .timezone_list import MyTimeZoneField
from colorfield.fields import ColorField
from datetime import datetime , timedelta
from location_field.models.plain import PlainLocationField
from django.template.loader import render_to_string
from django.core.mail import send_mail ,  EmailMessage
from django.utils.html import strip_tags

from django.contrib.sites.models import Site
# Create your models here.


LANGUAGES = MyLanguageField.Lang_list()

TIMEZONE_LIST  = MyTimeZoneField.tz_list()

THEME_COLOR = (
    ('Dark' , 'Dark'),
    ('Light' , 'Light'),
    ('System Color' , 'System Color')
)



STATUS  = (

    ('Active' , 'Active'),
    ('Deactive' , 'Deactive'),
)

SWITCH  = (

    ('Enable' , 'Enable'),
    ('Disable' , 'Disable'),
)



class UserProfile(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    First_Name = models.CharField(max_length=255 , default="")
    Last_Name = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Email = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Phone_Number = models.CharField(max_length=12 , default="" , blank=True , null=True)
    Wallet_Address = models.CharField(max_length=255 , default="")
    Time_Zone = models.CharField(max_length=255 , choices=TIMEZONE_LIST , default="" , blank=True , null=True)
    Language = models.CharField(max_length=255 , choices=LANGUAGES , default="en" , blank=True , null=True)
    Profile_DP = models.ImageField(upload_to="app/image", max_length=255 , default="app/image/profile_DP_def.jpg" , blank=True , null=True)
    color_theme = models.CharField(choices=THEME_COLOR,  max_length=50 , default='Light')
    Account_switch = models.CharField(max_length=50 , choices=SWITCH , default='Enable')
    status = models.CharField(max_length=50 , choices=STATUS , default='Deactive')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.First_Name + "-" + str(self.id)
    

    def profile_DP(self):
        if self.Profile_DP:
            return mark_safe('<img src="%s" width="50" height="50"/>' % (self.Profile_DP.url))
        else:
            return mark_safe('<img src="lms/images/noperview.jpg" width="50" height="50"/>')

    class Meta:
        verbose_name_plural = '01. Customer Profile'



class SaveChats(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    question = models.CharField(max_length=255 , default="" , blank=True , null=True)
    answer = models.TextField(max_length=9999999999999999999999 , default="" , blank=True , null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.question:
            return self.question
        else:
            return '---------'
        
    class Meta:
        verbose_name_plural = '05. Save Chats'



class Contact(models.Model):
    Fisrt_Name = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Last_Name = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Email = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Phone = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Message = models.TextField(max_length=5000 , default="" , blank=True , null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.Fisrt_Name:
            return self.Fisrt_Name
        else:
            return '---------'
        
    class Meta:
        verbose_name_plural = '04. Contact'



THEME_COLOR = (
    ('Dark' , 'Dark'),
    ('Ligth' , 'Light'),
    ('System Color' , 'System Color')
)

class Apparence(models.Model):
    user = models.ForeignKey(User ,  on_delete=models.SET_DEFAULT , blank=True , null=True , default=None)
    color_theme = models.CharField(choices=THEME_COLOR,  max_length=50 , default='Ligth')

    def __str__(self):
        if self.user.username:
            return self.user.username
        else:
            return '-'

    class Meta:
        verbose_name_plural = '06. Theme Apparence'

VISIT_STATUS = (
    ('Pending' , 'Pending'),
    ('Booked' , 'Booked'),
    ('Reject' , 'Reject'),
    ('Completed' , 'Completed'),
)

# Visits_Status = models.CharField(max_length=50 , choices=VISIT_STATUS , default='Pending')

class Farm(models.Model):
    user = models.ForeignKey(User ,  on_delete=models.SET_DEFAULT , blank=True , null=True , default=None)
    Farm_Name = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Land_Type = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Farm_contact_Email = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Farm_contact_phone =  models.CharField(max_length=255 , default="" , blank=True , null=True)
    total_area = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Number_of_trees = models.CharField(max_length=255 , default="" , blank=True , null=True)
    district = models.CharField(max_length=255 , default="" , blank=True , null=True)
    state = models.CharField(max_length=255 , default="" , blank=True , null=True)
    location = models.CharField(max_length=500 , default="" , blank=True , null=True)
    Map = PlainLocationField(based_fields=['location'], zoom=12 , default="" , blank=True , null=True)
    Farm_logo = models.ImageField(upload_to="app/image", max_length=255 , default="app/image/profile_DP_def.jpg" , blank=True , null=True)
    Status = models.CharField(max_length=50 , choices=STATUS , default='Deactive')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.Farm_Name:
            return self.Farm_Name
        else:
            return '-'
        
    def Farm_Logo(self):
        if self.Farm_logo:
            return mark_safe('<img src="%s" width="50" height="50"/>' % (self.Farm_logo.url))
        else:
            return mark_safe('<img src="lms/images/noperview.jpg" width="50" height="50"/>')
    
    class Meta:
        verbose_name_plural = '02. Farms'


SYMBOL = (
    ("$" , "$"),
    ("€" , "€"),
    ("£" , "£"),
    ("Rs" , "Rs"),
)


AVAILABLE_STAUTS = (
    ('Available' , 'Available'),
    ('Booked' , 'Booked'),
    ('Sold' , 'Sold'),
    ('Cancelled' , 'Cancelled'),

)


class Plot(models.Model):
    farm = models.ForeignKey(Farm , on_delete=models.CASCADE , blank=True , null=True , default=None)
    plot_Name = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Plot_Number = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Plot_type = models.CharField(max_length=255 , default="" , blank=True , null=True)
    features_geometry = models.TextField()
    features_geometry_color = ColorField(blank=True, default="#000000", help_text="#000000", max_length=100,)
    Available_Status = models.CharField(choices=AVAILABLE_STAUTS , max_length=100, default="Available", blank=True, null=True)
    Plot_Face = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Plot_Area_in_sqft = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Price = models.FloatField(default=0)
    Currency_Symbol = models.CharField(choices=SYMBOL , max_length=50, default="Rs", blank=True, null=True)
    Booked_Date = models.DateField(auto_now_add=False , blank=True, null=True)
    Status = models.CharField(max_length=50 , choices=STATUS , default='Deactive')
    Created_Date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        if self.plot_Name:
            return self.plot_Name
        else:
            return '-'
        
    def save(self, *args, **kwargs):
            
        if self.Available_Status == 'Booked':
            if self.Available_Status == None:
                now = datetime.now()
                self.Booked_Date = now

        super(Plot, self).save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = '05. Plots'


CAMERALIST = (
    ('Drone 1','Drone 1'),
    ('Drone 2','Drone 2'),
    ('Drone 3','Drone 3'),
    ('Camera 1','Camera 1'),
)

CONFIRMATION = (
    ('Email' , 'Email'),
    ('Phone' , 'Phone'),
)


EMAIL_SEND = (
    ('Yes' , 'Yes'),
    ('No' , 'No'),
)

class Appointment(models.Model):
    user = models.ForeignKey(User ,  on_delete=models.SET_DEFAULT , blank=True , null=True , default=None)
    farm = models.ForeignKey(Farm , on_delete=models.CASCADE , blank=True , null=True , default=None)
    Live_streaming_via = models.CharField(max_length=255 , default="Drone 1" , choices=CAMERALIST)
    # user details 
    Full_Name = models.CharField(max_length=255 , default="")
    Phone_Number = models.CharField(max_length=12 , default="")
    Email = models.CharField(max_length=255 , default="")
    Appointment_Date = models.DateField(auto_now_add=False , default=datetime.now)
    Start_Appointment_Time = models.TimeField(auto_now_add=False , default=datetime.now)
    End_Appointment_Time = models.TimeField(auto_now_add=False , default=datetime.now)
    
    # user Address Details 
    Address = models.TextField(max_length=5000 , default="" , blank=True , null=True)
    City =  models.CharField(max_length=255 , default="" , blank=True , null=True)
    State = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Post_Code = models.CharField(max_length=255 , default="" , blank=True , null=True)

    Confirmation = models.CharField(max_length=255 , default="Email" , choices=CONFIRMATION)
    Status = models.CharField(max_length=255 , choices=VISIT_STATUS , default='Pending')
    Date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        if self.Full_Name:
            return self.Full_Name
        else:
            return '----------'
        
    __original_Status = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_Status = self.Status


    def save(self, *args, **kwargs):
        super(Appointment, self).save(*args, **kwargs)
        if self.Status != self.__original_Status:
            print("changed")
            create_appointment = Appointment.objects.get(id=self.id)
            date_formet = datetime.strptime(str(self.Appointment_Date), "%Y-%m-%d").strftime("%B , %d , %Y")
            time_12housr = datetime.strptime(str(self.End_Appointment_Time), "%H:%M:%S").strftime("%I:%M %p")

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
                    f'TheAgriverse.com Appointment {self.Status} Successfully.',
                    plain_message,
                    DEFAULT_FROM_EMAIL,
                    [self.Email , EMAIL_HOST_USER],
                    html_message=html_message
                )
            except:
                pass
            # state changed - do something here

       
        self.__original_Status = self.Status

   
    

    class Meta:
        verbose_name_plural = '03. Appointment'
    



class EmailVerified(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_email = models.EmailField(max_length=254 , default='')
    verify = models.BooleanField(default= False)
    
    def __str__(self) :
        return self.user_email
    
    class Meta:
        verbose_name_plural = '13. Email Verify'