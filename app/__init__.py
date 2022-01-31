from flask import Flask

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('config')
    app.config.from_pyfile('config.py')
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
        return app
