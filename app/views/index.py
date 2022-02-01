from flask import Blueprint, render_template
from app.config.config_handling import get_config_value
from app.views.util import process_src_image_list, get_user_params
import requests, json

index = Blueprint('index', __name__)

@index.route('/')
def home():
    db_host = get_config_value('db_api', 'db_host')
    user_params = get_user_params()
    trending_nft_list = json.loads(requests.get(f'{db_host}/nfts/random/created?count=14&{user_params}').content)
    hot_collection_list = json.loads(requests.get(f'{db_host}/collections').content)

    return render_template(
        "index.html",
        trending_nft_list = process_src_image_list(trending_nft_list),
        hot_collection_list = hot_collection_list,
    )