# NOTER数据字典
## user表
|字段名|类型|含义|约束|备注|
| :--------: | :---: | :----: | :--------: | :--------: |
|id|int|记录id|Primary_Key(id)|  |
|user_name|varchar(64)|用户名| |  |
|password|varchar(128)|密码| | 加盐哈希 |
|github_id|int|githubId| | |
|real_name|varchar(64)|真实姓名| | |
|sex|int|性别| | 1-男;2-女 |
|email|varchar(255)|邮箱| | |
|expertise|varchar(255)|专长| | |
|desc|varchar(255)|简介| | |

## note表
|字段名|类型|含义|约束|备注|
| :--------: | :---: | :----: | :--------: | :--------:|
|id|int|记录id|Primary_Key(id)|  |
|title|varchar(255)|标题| |  |
|content|text|内容| | 存H5标签 |
|images|varchar(500)|图片路径| | 图片存路径，多张图片路径用;分隔 |
|writer_id|int|作者id| Foreign_Key(user) | |

## like表
|字段名|类型|含义|约束|备注|
| :--------: | :---: | :----: | :--------: | :--------:|
| id | int | 记录id | Primary_Key(id) | |
| user_id | int | 用户id| Foreign_Key(user)| |
| note_id | int | 笔记文章id | Foreign_Key(note) |

## collection
|字段名|类型|含义|约束|备注|
| :--------: | :---: | :----: | :--------: | :--------:|
| id | int | 记录id | Primary_Key(id) | |
| user_id | int | 用户id| Foreign_Key(user)| |
| note_id | int | 笔记文章id | Foreign_Key(note) |