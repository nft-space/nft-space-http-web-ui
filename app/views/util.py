import json
from flask_login import current_user


def get_user_params():
    # If the user is signed in, addtional parameters may be required
    if current_user.is_authenticated:
        user_address = current_user.get_id()
        user_params = f'user_address={user_address}' #additional(/optional) GET parameter
    else:
        user_params = ""  
    return user_params 


def verify_request(request):
   
    if request.status_code == 200:
        return json.loads(request.content)
    else:
        return []


def replace_ipfs_url(url:str):
        
    #AB2 uses ipfs://... instead of https://ipfs.io/ipfs/.
    if url.startswith('ipfs://'):
        url = url.replace('ipfs://', 'https://ipfs.io/ipfs/')

    # pinata restricts api calls and it is likely some images will fail to load
    elif url.startswith('https://gateway.pinata.cloud'):
        url = url.replace('gateway.pinata.cloud', 'ipfs.io')

    return url

def process_src_image_list(image_list:list):

    for image_param in image_list:
        try:
            image_param['src'] = replace_ipfs_url(image_param['src'] )
        except:
            try:
                image_param['img_url'] = replace_ipfs_url(image_param['img_url'] )
            except:
                pass

    
    return image_list
        
def address_short(address:str):

    if not address:
        return "unknown"

    if len(address) >11 and address!= "multiple owners":
        return(address[0:4] + '...' + address[-4:])

    else:
        return address