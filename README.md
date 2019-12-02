# Noter在线笔记共享平台



## 笔记API 

| 功能           | 请求类型 | 路径            | 传输类型 |
| -------------- | -------- | --------------- | ---- |
| 笔记测试接口 | GET      | api/notes/test |      |
| 所有笔记 | GET      | api/notes       |  |
| 添加笔记 | POST | api/notes | JSON |
| 根据id获取笔记 | GET | api/notes/:id |      |
| 更新笔记 | PATCH | api/notes | JSON |
| 根据所有者id获取他的所有笔记 | GET | Api/notes/owner/:ownerId | |
| 删除笔记 | DELETE | api/notes/:id | |



## 用户API

| 功能         | 请求类型 | 路径           | 传输类型 |
| ------------ | -------- | -------------- | -------- |
| 用户测试接口 | GET | api/users/test |          |
|     获取用户详情         | GET | api/users/:id |          |
| 新用户注册 | POST | api/users/register | 暂时废弃 |
| 修改用户信息 | PATCH | api/users/:id | {newUser} |



