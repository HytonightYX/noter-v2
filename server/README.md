# yunxi-cms

## 代码审查说明
### 基本上每个必要的地方都写了注释，如果评委们还是不放心的话↓↓↓:
- 本项中的代码已使用ESLint规范化过，代码规范问题不必担心
- 服务端接口代码在/server/app/v1/目录下
- 数据库交互采用ORM，处理业务代码在/server/models/目录下 
- 校验器在/server/validators/目录下

## 进度

| 日期  | 模块  | 学习内容                             | 其他 |
| ---- | ---- | ------------------------------------ | ---- |
| 11.28 | 底层 | 深入学习async/await及其在koa中的用法 |      |
| 11.29 | 底层 | koa自定义参数校验                    |      |
| 11.30 | 底层 | 全局异步异常捕捉中间件                   |   同理,日志也可以类似处理吧   |
| 12.1 | 底层 | LinValidator校验库，初步sequelize |  |
| 12.2 | 底层 | 自定义异常, user接口, 密码加密 |  |
| 12.3 | 基础 | 用户登录逻辑, Token令牌 |  |
| 12.5 | 业务 | token生成、校验业务逻辑                   |  |
| 12.6 | 业务 | note、user、tag业务模型，业务表、实体表区别 |  |
| 12.7 | 业务 | 点赞、收藏业务 |  |
| 12.8 | 业务 | 整理业务 |  |
| 12.9 | 业务 | 文章管理相关业务、JSON序列化 |  |
| 12.20| 业务 | 文章展示接口 | |
| 12.21| 业务 | github一键登录接口 |  |
| 12.22| 基础 | 代码规范化审查、文档撰写 | |

## Best Practice
### 安全
- uid 号码放在auth中传递,禁止让客户端作为参数传递(篡改).例如用户A篡改uid后获取的token,可以套出数据库中所有其他用户的数据
- 报`Internal Server Error`错误,多半是没加await
- 二次重发机制,用户无感知地刷新令牌

### 缓存
- 期刊的标题/描述/图片/出版日期等,这些都是数据库生成后基本不会改变的内容,因此非常适合将其缓存到客户端中
- 但是有些数据经常改变,比如点赞数,这就适合单独再做一个接口
- 相比后端缓存,前端缓存是解决性能问题的最有效方案
- 但是前端缓存局限性很大

### 转型
- JSON传输可以识别字符串or数字
- URL或者params传输的是字符串,服务器手动转型

### 数据库/ORM
- MYSQL
- Sequelize的一个bug,查询后对数据修改,必须设置`useScope=false`
- 禁止在循环中查询数据库,因为查询次数受数据影响. 改为使用in查询
- Sequelize千万千万别在Model子类下面写构造函数!

### JS
- 所有对象的`key`都是字符串!!! 如果是 [key], 则key可以是一个表达式,但是最终结果还是字符串!!! 
- `for...in` 和 `for...of`循环的区别
- forEach() 内不得用 async/await
- 不知道什么原因报BUG,看看有没有循环导入!

### 其他
- 并发/并行
- js宏任务/微任务, EventLoop

### 数据过滤/JSON序列化
- sequelize查询的时候使用scope
- 查出来之后,手动挑一些字段,包装成一个对象返回,这样很呆,数据简单的时候可以做
- JSON序列化的时候过滤字段(定义`toJSON`方法)

  - 那也就是说，在`Model`类上定义toJSON方法即可实现过滤模型
- 别把exclude的字段挂到原型链上,这样是把代码写死了,最好在API层面决定要过滤哪些字段,麻烦就麻烦点吧,但是确保了安全和灵活

## 后端目录结构
```
|---server
| |---app
| |	|---api
| |	| |---v1
| |	| |	|---like.js
| |	| |	|---note.js
| |	| |	|---tag.js
| |	| |	|---token.js
| |	| |	|---upload.js
| |	| |	|---user.js
| | |---lib
| | | |---auth.js
| | | |---exception.js
| | |---models
| | | |---bookComment.js
| | | |---favor.js
| | | |---note.js
| | | |---tag.js
| | | |---user.js
| | |---services
| | | |---wx.js
| | |---validators
| | | |---validator.js
| | |---config
| | | |---config.js
| | |---core
| | | |---db.js
| | | |---httpExcepyion.js
| | | |---init.js
| | | |---lin-validator-v2.js
| | | |---lin-validator.js
| | | |---utils.js
| | |---middlewares
| | | |---auth.js
| | | |---exception.js
| | |---upload	
```