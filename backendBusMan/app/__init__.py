# app/__init__.py

from flask_restx import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns
from .main.controller.manager_controller import api as man
from .main.controller.map_controller import api as map
from .main.controller.bus_controller import api as bus
from .main.controller.feedback_controller import api as feedback
blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API FOR BUSMANAGE',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(auth_ns)
api.add_namespace(man)
api.add_namespace(map)
api.add_namespace(bus)
api.add_namespace(feedback)