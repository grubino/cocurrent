#!/usr/bin/env python3

import connexion
from werkzeug.contrib.profiler import ProfilerMiddleware

from .encoder import JSONEncoder
from flask_cors import CORS
import os

if __name__ == '__main__':
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = JSONEncoder
    app.app.config['PROFILE'] = True
    app.app.wsgi_app = ProfilerMiddleware(app.app.wsgi_app, restrictions=[30])
    app.add_api('swagger.yaml', arguments={'title': 'illustrate the intersection of properties of database objects'})
    CORS(app.app)
    app.run(host=os.getenv('COCURRENT_HOST', 'localhost'), port=os.getenv('COCURRENT_PORT', 8080))
