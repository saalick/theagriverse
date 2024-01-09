from django.contrib import admin
from .models import *
# Register your models here.



class CustomerAdmin(admin.ModelAdmin):
    fields = (
        ('First_Name' , 'Last_Name'),
        ('Email' , 'Phone_Number'),
        ('Wallet_Address'),
        ('Time_Zone' , 'Language' , 'color_theme'),
        ('Profile_DP'),
        ('user' , 'Account_switch' , 'status'),
    )

    list_display = ('First_Name' , 'Email' , 'Phone_Number' , 'created' ,'Account_switch' , 'status' , 'profile_DP')
    list_editable = ('Account_switch' , 'status')
    list_filter = ('First_Name' , 'Email' , 'Phone_Number' ,'Account_switch' , 'status' , 'created')
    search_fields = ('First_Name' , 'Email' , 'Phone_Number' ,'Account_switch' , 'status' , 'created' , 'Wallet_Address')


admin.site.register(UserProfile , CustomerAdmin)


admin.site.register(SaveChats)

 
class ContactAdmin(admin.ModelAdmin):
    fields = (
        ("Fisrt_Name" , "Last_Name"),
        ('Email' , 'Phone'),
        ('Message')
    )

    list_display = ('Fisrt_Name' , 'Last_Name' ,'Email' ,'Phone' ,'Message' ,'date')
    list_filter = ('Fisrt_Name' , 'Last_Name' ,'Email' ,'Phone' ,'date')

    search_fields =('Fisrt_Name' , 'Last_Name' ,'Email' ,'Phone' ,'Message' ,'date')

admin.site.register(Contact , ContactAdmin)

class ApparenceAdmin(admin.ModelAdmin):
    list_display = ('user' , 'color_theme')

admin.site.register(Apparence , ApparenceAdmin)


class FarmAdmin(admin.ModelAdmin):
    fields = (
        ("user" , "Farm_Name"),
        ("Farm_contact_Email" , "Farm_contact_phone"),
        ("Land_Type" , "total_area" , "Number_of_trees"),
        ("district" , "state"),
        ("location"),
        ("Map"),
        ("Farm_logo" , "Status"),

    )

    list_display = ('Farm_Name', 'Farm_contact_Email', 'Farm_contact_phone', 'total_area', 'Number_of_trees', 'district', 'location' , 'date', 'Status', 'Farm_Logo')
    list_filter = ('Farm_Name', 'Farm_contact_Email', 'Farm_contact_phone', 'total_area', 'Number_of_trees', 'district', 'location' , 'date', 'Status',)
    list_editable = ("Status",)
    search_fields = ('Farm_Name', 'Farm_contact_Email', 'Farm_contact_phone', 'total_area', 'Number_of_trees', 'district', 'location' , 'date', 'Status')

admin.site.register(Farm , FarmAdmin)

# admin.site.register(Plot)


class AppointmentAdmin(admin.ModelAdmin):
    fields = (
        ('user','farm' , 'Live_streaming_via'),
        ('Full_Name','Phone_Number' , 'Email'),
        ('Appointment_Date','Start_Appointment_Time' , 'End_Appointment_Time'),
        ('City','State' , 'Post_Code'),
        ('Confirmation','Status'),
        
    )

    list_display = ('Full_Name', 'Phone_Number', 'Email', 'farm', 'Live_streaming_via', 'Appointment_Date', 'Start_Appointment_Time', 'City', 'Confirmation', 'Date' , 'Status')

    list_editable = ('Status',)

    list_filter = ('Full_Name', 'Phone_Number', 'Email', 'farm', 'Live_streaming_via', 'Appointment_Date', 'Start_Appointment_Time', 'City', 'Confirmation', 'Date' , 'Status')

    search_fields =  ('Full_Name', 'Phone_Number', 'Email', 'farm__Farm_Name', 'Live_streaming_via', 'Appointment_Date', 'Start_Appointment_Time', 'City', 'Confirmation', 'Date' , 'Status', 'Address')

admin.site.register(Appointment , AppointmentAdmin)

admin.site.site_header="The Agriverse"
admin.site.site_title = "The Agriverse | Admin"
admin.site.index_title = "Welcome to The Agriverse"

admin.site.search_fields="search"