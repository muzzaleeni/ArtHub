from fastapi import Depends, UploadFile
from ..adapters.jwt_service import JWTData
from app.drawings.service import Service, get_service
from . import router
from app.auth.router.dependencies import parse_jwt_user_data

@router.get("/get")