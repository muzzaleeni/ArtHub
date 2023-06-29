from datetime import datetime
from bson.objectid import ObjectId
from pymongo.database import Database
from typing import List


class DrawingRepository:
    def __init__(self, database: Database):
        self.database = database

    def create_drawing(self, user_id: str, drawing_data: dict) -> str:
        payload = {
            "created_by": ObjectId(user_id),
            "drawing_name": drawing_data["drawing_name"],
            "about": drawing_data["about"],
            "created_at": datetime.utcnow(),
        }

        result = self.database["drawings"].insert_one(payload)
        drawing_id = str(result.inserted_id)
        return drawing_id

    def get_drawings_by_user_id(self, user_id: str) -> List[dict]:
        drawings = self.database["drawings"].find({"created_by": ObjectId(user_id)})

        drawings_list = []

        for drawing in drawings:
            drawings_list.append(drawing)
        return drawings_list

    #
    # def update_tweet(self, tweet_id: str, updated_data: dict) -> bool:
    #     updated_data["updated_at"] = datetime.utcnow()
    #     result = self.database["tweets"].update_one(
    #         {"_id": ObjectId(tweet_id)}, {"$set": updated_data})
    #     return result.modified_count > 0
    #
    # def delete_tweet(self, tweet_id: str) -> bool:
    #     result = self.database["tweets"].delete_one(
    #         {"_id": ObjectId(tweet_id)})
    #     return result.deleted_count > 0
    #
    # def get_tweets_by_user_id(self, user_id: str) -> List:
    #     tweets = self.database["tweets"].find(
    #         {
    #             "created_by": user_id,
    #         }
    #     )
    #     result = []
    #     for tweet in tweets:
    #         result.append(tweet)
    #
    #     return result
    #
    # def add_comment_to_tweet(self, tweet_id: str, user_id: str, comment_text: str) -> str:
    #     comment_id = str(uuid.uuid4())  # Generate a unique ID for the comment
    #
    #     comment = {
    #         "_id": comment_id,
    #         "user_id": user_id,
    #         "text": comment_text,
    #     }
    #
    #     result = self.database["tweets"].update_one(
    #         {"_id": ObjectId(tweet_id)},
    #         {"$push": {"comments": comment}}
    #     )
    #
    #     if result.modified_count > 0:
    #         return comment_id
    #
    #     return ""
    #
    # def get_tweet_comments(self, tweet_id: str) -> List:
    #     tweet = self.database["tweets"].find_one({"_id": ObjectId(tweet_id)})
    #     if tweet and "comments" in tweet:
    #         return tweet["comments"]
    #     return []
    #
    # def get_comment_by_id(self, tweet_id: str, comment_id: str) -> dict:
    #     tweet = self.database["tweets"].find_one(
    #         {"_id": ObjectId(tweet_id)},
    #         {"comments": {"$elemMatch": {"_id": comment_id}}}
    #     )
    #     if tweet and "comments" in tweet:
    #         return tweet["comments"][0]
    #     return {}
    #
    # def update_comment(self, tweet_id: str, comment_id: str, updated_data: dict) -> bool:
    #     result = self.database["tweets"].update_one(
    #         {"_id": ObjectId(tweet_id), "comments._id": comment_id},
    #         {"$set": {"comments.$.text": updated_data.get("text")}}
    #     )
    #     return result.modified_count > 0
    #
    # def delete_comment(self, tweet_id: str, comment_id: str) -> bool:
    #     result = self.database["tweets"].update_one(
    #         {"_id": ObjectId(tweet_id)},
    #         {"$pull": {"comments": {"_id": comment_id}}}
    #     )
    #     return result.modified_count > 0
    #
