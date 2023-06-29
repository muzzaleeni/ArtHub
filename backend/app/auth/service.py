from pydantic import BaseSettings

from ..config import database

from .adapters.jwt_service import JwtService
from .repository.repository import AuthRepository
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
            repository: AuthRepository,
            jwt_svc: JwtService,

    ):
        self.repository = repository
        self.jwt_svc = jwt_svc


def get_service():
    repository = AuthRepository(database)
    jwt_svc = JwtService(config.JWT_ALG, config.JWT_SECRET, config.JWT_EXP)

    svc = Service(repository, jwt_svc)
    return svc
