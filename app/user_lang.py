from .models import UserProfile


def userlang(request):
    try:
        check_profile = UserProfile.objects.get(user=request.user)
    except:
        check_profile = []

    if check_profile and check_profile.Language:
        print(check_profile.Language)
        params =  {'User_lang':check_profile.Language}
        return params
    else:
        params = {'User_lang':'en'}
        return params
