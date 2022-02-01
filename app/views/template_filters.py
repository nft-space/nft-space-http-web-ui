from flask import Blueprint, url_for

template_filters = Blueprint('template_filters', __name__)

@template_filters.app_template_filter()
def image_src(filename_string):
    return url_for(
        'static', filename="/img/{}.png".format(filename_string), _external=True
    )

@template_filters.app_template_filter()
def gif_src(filename_string):
    return url_for(
        'static', filename="/img/{}.gif".format(filename_string), _external=True
    )


@template_filters.app_template_filter()
def username_truncated(username_string):
    return username_string[0:11] + "..."

@template_filters.app_template_filter()
def profile_name_truncated(username_string):
    return username_string[0:3] + "..." + username_string[-3:]

@template_filters.app_template_filter()
def collection_url_trim(url_string):
    return "/" + "/".join(url_string.split("/")[3:5])

