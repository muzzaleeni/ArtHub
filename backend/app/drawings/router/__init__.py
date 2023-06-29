from fastapi import APIRouter

from ...utils import import_routers

router = APIRouter()
import_routers(__name__)
