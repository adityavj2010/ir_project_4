import os
from flask import Flask, send_from_directory
from src.api import api


def create_app():
    app = Flask(__name__,static_folder='./../frontend/build')
    app.register_blueprint(api, url_prefix='/api')
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000)
