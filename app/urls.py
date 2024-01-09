
from django.urls import path
from . import views

from django.contrib.auth.views import PasswordResetView , PasswordResetDoneView , PasswordResetConfirmView , PasswordResetCompleteView

urlpatterns = [
    
    path('' , views.index , name="home"),
    path('contact/' , views.contact , name="contact"),
    

    # auth setting 
    path('change_password_validation/' , views.change_password_validation , name="change_password_validation"),
    path('change-password/' , views.change_password , name="change_password"),
    path('change-without-password/' , views.change_without_password , name="change_without_password"),

    path('password_reset/' , PasswordResetView.as_view(template_name='app/reset_password.html') , name="password_reset"),
    path('password_reset/done/' , PasswordResetDoneView.as_view(template_name='app/reset_password_done.html') , name="password_reset_done"),
    path('password_reset_confirm/<uidb64>/<token>/' , PasswordResetConfirmView.as_view(template_name='app/reset_password_confirm.html') , name="password_reset_confirm"),
    path('password_reset_complete/' , PasswordResetCompleteView.as_view(template_name='app/reset_password_complete.html') , name="password_reset_complete"),
    path('fname_lname_api/', views.fname_lname_api , name='fname_lname_api'),
    

    # athuenticated
    path('login/', views.loginsys , name="loginsys"),
    path('logout/', views.logoutsys , name="logoutsys"),
    path('signup/', views.singup , name="singup"),
    path('activate/<uidb64>/<token>/',views.activate, name='activate'),
    path('usercheck/' , views.usercheck , name="usercheck"),


    # dasboard api 

    path('profile/', views.profile , name="profile"),
    path('dashboard/' , views.dashboard , name="dashboard"),
    path('marketplace/', views.marketplace , name="marketplace"),
    path('My_farm/', views.My_farm , name="My_farm"),
    path('live_farm/', views.live_farm , name="live_farm"),
    path('Game/', views.Game , name="Game"),
    path('swap/', views.swap , name="swap"),
    path('buy_now/', views.buy_now , name="buy_now"),
    path('settings/', views.settings , name="settings"),
    path('change_theme/', views.change_theme , name="change_theme"),
    path('Account_switch/', views.Account_switch , name="Account_switch"),
    path('carbon_footprint_calculator/', views.carbon_footprint_calculator , name="carbon_footprint_calculator"),
    path('agrigpt/', views.agrigpt , name="agrigpt"),
    path('agrigptapi/', views.agrigptapi , name="agrigptapi"),
    path('chats_delete_api/', views.chats_delete_api , name="chats_delete_api"),
    path('appointment_check_api/', views.appointment_check_api , name="appointment_check_api"),


    # for checking puepos 
    path('appo_confirm/<int:id>/', views.appo_confirm , name="appo_confirm"),


    

    


] 