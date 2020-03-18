# Noter

## 服务端架构
![image.png](https://i.loli.net/2019/12/23/tUmcZPMHG7sVNwJ.png)

![@7R_VODYJ9P2PF_HB___NQC.png](https://i.loli.net/2019/12/23/4hCmX5dyPUAjuoc.png)

![__2_UPA5MH__DH70PO_071L.png](https://i.loli.net/2019/12/23/cVIAQ82Ty4mNUKJ.png)

![OPZI_1W_1KNJRHOV_D@O49T.png](https://i.loli.net/2019/12/23/tPXNOljIThSEL6z.png)

![UE3RW5T_6_8D6KOC__S@UU0.png](https://i.loli.net/2019/12/23/fgxz8I9PT42SKnJ.png)

![9_VN7DR_OX__N_IC__W583V.png](https://i.loli.net/2019/12/23/cBKatnh8pjoPYEy.png)


## 代码实现

### 服务端

- Node.js：**Koa**

- ORM：**Sequelize**
- 代码规范 / 格式化：**ESLint**
- 加密：**bcrypt.js**
- 参数校验：**validator.js**
- 数据模拟：**Faker.js**



### 其它

- 数据库：**MySQL 5.7**

- 服务器：**Nginx 反向代理**

- 进程守护：**PM2**



### 前端

- React 

- AntD + Semantic UI 



## 功能

#### 业务

- 作为一个内容型网站所必须的CRUD
  - 发现
    - 所有笔记
    - 根据标签筛选笔记
    - 最热、精选列表
    - 点赞、收藏数目
  - 我的笔记
    - 编辑我的笔记
    - 删除我的笔记
  - 查看笔记
    - 点赞、收藏
  - 写文章（**富文本编辑器**）
  - 个人主页
    - 个人成就
    - 个人信息
  - 账号设置
- Github **OAuth2 一键登录**
- **全局消息提示**
- **全局请求异常拦截**（axios 拦截器）
  - 例如未登录——提示并跳转登录页



#### 系统

- 服务端全局异常处理
- 路由参数自定义校验
- Token 令牌认证机制
- 鉴权（游客、用户）
- 记住用户，自动登录
- 图片采用七牛云OSS + 压缩 + **懒加载**，减少服务端下行压力





## 内存

前端打包大小约 **5MB**

服务端打包约 **12MB**，运行时内存约 **40MB**







## 响应时间

服务器响应 < **30ms**

最复杂页面约 **1.5S**

已缓存情况下网页加载**< 150ms**







## 解决的大问题

#### OAuth2 登录

采用相对复杂和严格的授权码模式。

通过客户端的后台服务器，与"服务提供商"的认证服务器进行互动。

https://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html



#### 大量的图片

内容型网站，大量图片需要加载。

使用七牛云 OSS 对象存储，配合图片压缩解决，不受限于 1Mbps 带宽。



#### 响应速度慢

**减小首屏加载速度**

- 路由拆分 + 懒加载
- nginx 缓存
- 减小请求响应体积

**减少打包大小**

- 大型库使用替代版本（moment.js => day.js）
- Webpack rewireUglifyjs 插件 -50%

- CDN 引入库文件
- 删除SourceMap文件 - 60%



#### 刷新404

前端路由，刷新会服务器请求真实路径，结果404。

采用 History + Nginx 配置解决。



### 富文本编辑器适配

原本的编辑器很好用，但是仍然需要自定义一些功能。
