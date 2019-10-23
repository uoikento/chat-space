# chat-space データベース設計

## usersテーブル
|Column|Type|options|
|------|----|-------|
|name|string|null: false|
|email|sring|nul: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups

## groupsテーブル
|Column|Type|options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users_groups
- has_many :users, through: :users_groups 
- has_many :messages

## messagesテーブル
|Column|Type|options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group