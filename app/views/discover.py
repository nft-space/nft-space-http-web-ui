from flask import Blueprint, render_template
from app.config.config_handling import get_config_value
from app.views.util import process_src_image_list, verify_request
import requests

discover = Blueprint('discover', __name__)

@discover.route('/discover')
def render_discover():
    db_host = get_config_value('db_api', 'db_host')
    discover_artist_list = verify_request(
        requests.get(f'{db_host}/artists')
    )
    discover_collection_list = verify_request(
        requests.get(f'{db_host}/collections')
    )
    discover_nft_list = verify_request(
        requests.get(f'{db_host}/nfts/random/created?count=8&')
    )
        

    return render_template(
        "discover.html",
        discover_artist_list = discover_artist_list,
        discover_collection_list = discover_collection_list,
        discover_nft_list =  process_src_image_list(discover_nft_list)  
    )