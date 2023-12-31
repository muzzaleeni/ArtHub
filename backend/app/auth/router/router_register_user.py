from fastapi import Depends, HTTPException, status

from ...utils import AppModel

from ..service import Service, get_service
from . import router


class RegisterUserRequest(AppModel):
    username: str
    password: str


class RegisterUserResponse(AppModel):
    username: str


@router.post(
    "/users", status_code=status.HTTP_201_CREATED, response_model=RegisterUserResponse
)
def register_user(
    input: RegisterUserRequest,
    svc: Service = Depends(get_service),
) -> RegisterUserResponse:
    if svc.repository.get_user_by_username(input.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username is already taken.",
        )

    svc.repository.create_user(input.dict())

    return RegisterUserResponse(username=input.username)
