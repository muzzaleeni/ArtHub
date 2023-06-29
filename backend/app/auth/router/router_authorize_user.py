from fastapi import Depends

from ...utils import AppModel

from ..service import Service, get_service
from ..utils.security import check_password
from . import router
from .errors import InvalidCredentialsException


class AuthorizeUserResponse(AppModel):
    access_token: str
    token_type: str = "Bearer"


class AuthorizeUserRequest(AppModel):
    email: str
    password: str


@router.post("/users/tokens", response_model=AuthorizeUserResponse)
def authorize_user(
        input: AuthorizeUserRequest,
        svc: Service = Depends(get_service),
) -> AuthorizeUserResponse:
    user = svc.repository.get_user_by_email(input.email)

    if not user:
        raise InvalidCredentialsException

    if not check_password(input.password, user["password"]):
        raise InvalidCredentialsException

    return AuthorizeUserResponse(
        access_token=svc.jwt_svc.create_access_token(user=user),
    )
