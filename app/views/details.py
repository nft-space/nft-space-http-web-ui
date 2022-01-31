from flask import Blueprint, render_template

details = Blueprint('details', __name__)

@details.route('/details')
def render_details():
    return render_template("details.html")