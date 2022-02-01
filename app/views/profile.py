from flask import Blueprint, render_template
from app.config.config_handling import get_config_value
from app.views.util import process_src_image_list, get_user_params, verify_request
import requests, json

profile = Blueprint('profile', __name__)

@profile.route('/profile/<artist_address>')
def render_profile(artist_address):
    db_host = get_config_value('db_api', 'db_host')

    profile_details = verify_request(
        requests.get(f'{db_host}/profile/{artist_address}')
    )
    created_nft_list = json.loads(
        requests.get(
            f'{db_host}/nfts/{artist_address}/created?count=10&order_by=latest'
        ).content
    )
    
    return render_template(
        "profile.html",
        profile_details = profile_details,
        created_nft_list = process_src_image_list(created_nft_list)
    )