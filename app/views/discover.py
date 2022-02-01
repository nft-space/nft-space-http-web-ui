from flask import Blueprint, render_template
from app.config.config_handling import get_config_value
from app.views.util import process_src_image_list, get_user_params
import requests, json

discover = Blueprint('discover', __name__)

@discover.route('/discover')
def render_discover():
    db_host = get_config_value('db_api', 'db_host')
    user_params = get_user_params()
    discover_artist_list = json.loads(requests.get(f'{db_host}/artists').content)
    discover_collection_list = json.loads(requests.get(f'{db_host}/collections').content)
    discover_nft_list = json.loads(requests.get(f'{db_host}/nfts/random/created?count=8&{user_params}').content)

    return render_template(
        "discover.html",
        discover_artist_list = discover_artist_list,
        discover_collection_list = discover_collection_list,
        discover_nft_list =  process_src_image_list(discover_nft_list)  
    )