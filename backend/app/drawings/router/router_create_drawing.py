from fastapi import Depends, HTTPException
from  ...auth.adapters.jwt_service import JWTData
from ...auth.router.dependencies import parse_jwt_user_data
from pydantic import BaseModel
from ..service import Service, get_service
from . import router


class CreateDrawingRequest(BaseModel):
    type: str
    price: int
    address: str
    area: float
    rooms_count: int
    description: str


class CreateDrawingResponse(BaseModel):
    drawing_id: str


@router.post("/", response_model=CreateDrawingResponse)
def create_drawing(
        tweet_data: CreateDrawingRequest,
        jwt_data: JWTData = Depends(parse_jwt_user_data),
        svc: Service = Depends(get_service)
) -> CreateDrawingResponse:
    # Extract the user ID from the JWT data
    user_id = jwt_data.user_id
    # Create a new ad with the provided data
    temp_drawing_id: str = svc.repository.create_drawing(
        user_id,
        {
            "type": tweet_data.type,
            "price": tweet_data.price,
            "address": tweet_data.address,
            "area": tweet_data.area,
            "rooms_count": tweet_data.rooms_count,
            "description": tweet_data.description,
        },
    )

    if not temp_drawing_id:
        raise HTTPException(status_code=500, detail="Failed to create drawing")

    # Return the ID of the created ad
    return CreateDrawingResponse(drawing_id=temp_drawing_id)
