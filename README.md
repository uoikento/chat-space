# chat-space データベース設計

## usersテーブル
|Column|Type|options|
|------|----|-------|
|name|string|null: false, index: true|
|email|sring|nul: false, unique:true|
|password|string|null: false, unique:true|
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups

## groupsテーブル
|Column|Type|options|
|------|----|-------|
|name|string|null: false, index: true|
### Association
- has_many :users_groups
- has_many :users, through: :users_groups 
- has_many :messages

## users_groupsテーブル
|Column|Type|options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|options|
|------|----|-------|
|body|text||
|image|string||
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group