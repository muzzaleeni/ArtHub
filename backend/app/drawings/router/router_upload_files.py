from fastapi import Depends, UploadFile
from ..adapters.jwt_service import JWTData
from app.drawings.service import Service, get_service
from . import router
from app.auth.router.dependencies import parse_jwt_user_data
from typing import List


@router.post("/uploadfile")
def upload_file(
    files: List[UploadFile],
    drawing_id: str,
    commit: str,
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
):
    url_list = []
    url_list.append({"commit": commit})
    for file in files:
        filename = f"{drawing_id}/{file.filename}"
        result = svc.firebase.upload_file(file.file, filename)
        url_list.append(result)

    svc.repository.insert_files(url_list, jwt_data.user_id, drawing_id=drawing_id)

    return url_list
