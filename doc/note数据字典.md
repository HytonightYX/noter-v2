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
|raw|text|json内容| | 存json |
|html|text|h5内容| | 存H5标签 |
|author|int|作者id| Foreign_Key(user) | |
|like_num|int|点赞数量| | 默认为0 |
|collect_num|int|收藏数量| | 默认为0 |
|tag|varchar(100)|文章类型| | TAG序号数组,比如1,2,3对应TAG表1,2,3 |
|status|int| 状态 | | 1-草稿;2-发布 |

## favor表
|字段名|类型|含义|约束|备注|
| :--------: | :---: | :----: | :--------: | :--------:|
| id | int | 记录id | Primary_Key(id) | |
| uid | int | 用户id| Foreign_Key(user)| |
| art_id | int | 笔记文章id | Foreign_Key(note) |
| type | int | 喜欢类型 | | 1-点赞 2-收藏 |

## TAG表
|字段名|类型|含义|约束|备注|
| :--------: | :---: | :----: | :--------: | :--------:|
| id | int | 记录id | Primary_Key(id) | |
| name | varchar(100) | TAG名称 | | |
| author | int | 用户id | Foreign_Key | 0-管理员,其他-用户(不加载) |
