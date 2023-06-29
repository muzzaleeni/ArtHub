from fastapi import Depends, UploadFile
from app.auth.adapters.jwt_service import JWTData
from app.auth.router.dependencies import parse_jwt_user_data
from app.drawings.service import Service, get_service
from . import router

# from typing import List


@router.post("/save")
def upload_files(
    file: UploadFile,
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
):
    user_id = jwt_data.user_id
