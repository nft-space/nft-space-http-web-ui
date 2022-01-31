from flask import Blueprint, render_template

discover = Blueprint('discover', __name__)

@discover.route('/discover')
def render_discover():
    return render_template("discover.html")