from fastapi import Depends, HTTPException
from app.auth.adapters.jwt_service import JWTData
from app.auth.router.dependencies import parse_jwt_user_data
from pydantic import BaseModel
from app.drawings.service import Service, get_service
from . import router


class CreateDrawingRequest(BaseModel):
    drawing_name: str
    about: str


class CreateDrawingResponse(BaseModel):
    drawing_id: str


@router.post("/", response_model=CreateDrawingResponse)
def create_drawing(
    drawing_data: CreateDrawingRequest,
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
) -> CreateDrawingResponse:
    # Extract the user ID from the JWT data
    user_id = jwt_data.user_id
    # Create a new ad with the provided data
    temp_drawing_id: str = svc.repository.create_drawing(
        user_id,
        drawing_data.dict(),
    )

    if not temp_drawing_id:
        raise HTTPException(status_code=500, detail="Failed to create drawing")

    # Return the ID of the created ad
    return CreateDrawingResponse(drawing_id=temp_drawing_id)
