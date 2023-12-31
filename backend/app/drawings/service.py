from pydantic import BaseSettings
from ..config import database
from .adapters.firebase_service import FirebaseService
from .adapters.jwt_service import JwtService
from .repository.repository import DrawingRepository
import os
from dotenv import load_dotenv

load_dotenv()


class AuthConfig(BaseSettings):
    JWT_ALG: str = os.getenv("JWT_ALG")
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    JWT_EXP: int = os.getenv("JWT_EXP")


config = AuthConfig()


class Service:
    def __init__(
        self,
        repository: DrawingRepository,
        jwt_svc: JwtService,
        firebase: FirebaseService,
    ):
        self.firebase = firebase
        self.repository = repository
        self.jwt_svc = jwt_svc


def get_service():
    repository = DrawingRepository(database)
    jwt_svc = JwtService(config.JWT_ALG, config.JWT_SECRET, config.JWT_EXP)
    firebase = FirebaseService()

    svc = Service(repository, jwt_svc, firebase)
    return svc
