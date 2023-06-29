from fastapi import APIRouter

from backend.app.utils import import_routers

router = APIRouter()
import_routers(__name__)
