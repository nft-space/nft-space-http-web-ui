from flask import Blueprint, render_template
from app.config.config_handling import get_config_value
from app.views.util import process_src_image_list, verify_request
import requests

index = Blueprint('index', __name__)

@index.route('/')
def home():
    db_host = get_config_value('db_api', 'db_host')
    trending_nft_list = verify_request(
        requests.get(f'{db_host}/nfts/random/created?count=14&')
    )
    hot_collection_list = verify_request(
        requests.get(f'{db_host}/collections')
    )

    return render_template(
        "index.html",
        trending_nft_list = process_src_image_list(trending_nft_list),
        hot_collection_list = hot_collection_list,
    )