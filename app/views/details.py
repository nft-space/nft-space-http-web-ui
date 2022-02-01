from flask import Blueprint, render_template
from app.config.config_handling import get_config_value
from app.views.util import process_src_image_list
import requests, json

details = Blueprint('details', __name__)

@details.route('/details/<nft_id>')
def render_details(nft_id):
    db_host = get_config_value('db_api', 'db_host')

    nft_details = json.loads(requests.get(f'{db_host}/nft/{nft_id}').content)
    owner_address = nft_details['owned_by']
    owner_details = json.loads(requests.get(f'{db_host}/profile/{owner_address}').content)
    is_listed = json.loads(requests.get(f'https://www.randswap.com/v1/nft-offers/{nft_id}').content)
    print('HHHHHHH', is_listed)

    return render_template(
        "details.html",
        nft_details = nft_details,
        owner_details = owner_details,
        is_listed = is_listed
    )