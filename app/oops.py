
user_list_dict = {
   1:{"username":"arbab" , "password":"asdf1234"},
   2:{"username":"hussain00" , "password":"qwer1234"},
   3:{"username":"alikhan" , "password":"zxcv1234"},
}


class UserAuth:

    def __init__(self , username , password):
        self.username = username
        self.password = password
    
    def authfunc(self , inp_username , inp_password):
        if inp_username == self.username and inp_password == self.password:
            print(f'welcome To {self.username} Your Login success !')
        else:
            print("please enter invalid credentials")
 


user_input = input("Enter Your UserName: \n")

set_UserAuth_details_in_class_objects = None

for i in user_list_dict:
    loop_current_user = user_list_dict[i]['username']
    if loop_current_user == user_input:
        set_UserAuth_details_in_class_objects = UserAuth(user_input , user_list_dict[i]['password'])
        break


if set_UserAuth_details_in_class_objects:
    user_pass = input("Enter Your Password: \n")
    set_UserAuth_details_in_class_objects.authfunc(user_input , user_pass)
else:
    print("Sorry User Not Exist")
    


    


