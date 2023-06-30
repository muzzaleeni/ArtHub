from fastapi import Depends, HTTPException
from ...auth.adapters.jwt_service import JWTData
from ...auth.router.dependencies import parse_jwt_user_data
from ...utils import AppModel
from ...drawings.service import Service, get_service
from . import router
from typing import List


class GetDrawingsResponse(AppModel):
    drawings: List[dict]


@router.get("/personal", response_model=GetDrawingsResponse)
def get_user_drawings(
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
) -> GetDrawingsResponse:
    drawings_list = svc.repository.get_drawings_by_user_id(jwt_data.user_id)
    print(drawings_list)
    return GetDrawingsResponse(drawings=drawings_list)
