from flask import Flask
from app.extensions import db, migrate, babel, login_manager
from app.models import User

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('config')
    app.config.from_pyfile('config.py')
    # db initate
    db.init_app(app)
    # Extensions
    migrate.init_app(app, db)
    babel.init_app(app)
    login_manager.init_app(app)
    # Login manager required config 
    @login_manager.user_loader
    def load_user(user_id):
        if user_id is not None:
            return User.query.get(user_id)
        return None

    with app.app_context():
        # db.create_all()
        from app.views.index import index
        app.register_blueprint(index)
        from app.views.discover import discover
        app.register_blueprint(discover)
        from app.views.profile import profile
        app.register_blueprint(profile)
        from app.views.details import details
        app.register_blueprint(details)
        from app.views.template_filters import template_filters
        app.register_blueprint(template_filters)
        return app
