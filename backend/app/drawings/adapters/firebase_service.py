import firebase_admin
from firebase_admin import credentials
from typing import BinaryIO
from firebase_admin import storage


cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(
    cred, {"storageBucket": "nfactorial-hackathon-project.appspot.com"}
)


class FirebaseService:
    def __init__(self) -> None:
        self.bucket = storage.bucket()

    def upload_file(self, file: BinaryIO, destination_path: str) -> str:
        blob = self.bucket.blob(destination_path)
        blob.upload_from_file(file)
        blob.make_public()
        return blob.public_url
