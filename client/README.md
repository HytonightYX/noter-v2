

# webpack-noter-optimization





第一次

![image-20200304205939420](http://qn-noter.yunxi.site/imagehost/m9qjl.png)



![image-20200304211848832](http://qn-noter.yunxi.site/imagehost/ub6m7.png-style1)



## 移除 semantic.min.css，采用CDN引入





## hash标记包

```javascript
output: {
  path: path.resolve(__dirname, '../dist'),
  filename: devMode ? 'js/[name].[hash].js' : 'js/[name].[contenthash].js',
  chunkFilename: devMode ? 'chunks/[name].[hash:4].js' : 'chunks/[name].[contenthash].js',
},
```

`chunkname`我的理解是未被列在`entry`中，却又需要被打包出来的文件命名配置。什么场景需要呢？我们项目就遇到过，在按需加载（异步）模块的时候，这样的文件是没有被列在`entry`中的，如使用CommonJS的方式异步加载模块：

- ExtractTextPlugin：提取样式到css文件

![image-20200305101609119](http://qn-noter.yunxi.site/imagehost/k8ogm.png-style1)



## 打包开缓存

.cache 文件夹



## happypack

![image-20200305102135980](http://qn-noter.yunxi.site/imagehost/8qtqg.png-style1)





## 路由懒加载

![image-20200305114153334](http://qn-noter.yunxi.site/imagehost/ckh1w.png-style1)

```jsx
// lazy.js 二次封装lazy
const retry = (fn, retriesLeft = 5, interval = 500) => {
	return new Promise((resolve, reject) => {
		fn()
			.then(resolve)
			.catch((error) => {
				setTimeout(() => {
					if (retriesLeft === 1) {
						reject(error)
					} else {
						retry(fn, retriesLeft - 1, interval).then(resolve, reject)
					}
				}, interval)
			})
	})
}

const lazy = (fn) => React.lazy(() => retry(fn))
export default lazy

// WaitingComponent
export default (Component) => {
	return props => (
		<Suspense fallback={<div>Loading...</div>}>
			<Component {...props} />
		</Suspense>
	)
}

// App.js
const Find = lazy(() => import('./page/find'))
const Write = lazy(() => import('./page/write'))
const Profile = lazy(() => import('./page/profile'))
const Login = lazy(() => import('./page/login'))
const MyNote = lazy(() => import('./page/mynote'))
const Note = lazy(() => import('./page/note'))
const Edit = lazy(() => import('./page/edit'))
const Setting = lazy(() => import('./page/setting'))

<Route exact path='/' component={WaitingComponent(Find)} />
...
```





## source-map

https://segmentfault.com/a/1190000020320871



## 阶段性成果

![image-20200305114858851](http://qn-noter.yunxi.site/imagehost/o774l.png-style1)

在 fast 3G 速度下，已经可以达到10s加载了

![image-20200305114955719](http://qn-noter.yunxi.site/imagehost/o5y3z.png-style1)

![image-20200305115105726](http://qn-noter.yunxi.site/imagehost/i5n8s.png-style1)



目前测一下，??? 才17分？？

![image-20200305122518922](http://qn-noter.yunxi.site/imagehost/3ojbr.png-style1)





目前来看还有两个问题

- antd 的 icons 全量引入问题
- 第三方库没有单独打包

接下来进行代码分割。



## 代码分割

第三方库单独打包有几个好处。

首先，第三方库其实改动不大的，经常改的其实是我们业务代码。所以第三方库单独打包，也就是有独有的 hash，这样做了缓存之后就能长期让用户命中强缓存，而我们业务代码改来改去也不会影响第三方库的缓存。

![image-20200305132245077](http://qn-noter.yunxi.site/imagehost/cfhkc.png-style1)

![image-20200305132212935](http://qn-noter.yunxi.site/imagehost/gey5r.png-style1)

这么打完之后，发现其实主要还是第三方库的问题（就是你，antd）



## antd图标处理

```javascript
// 安装@ant-design/icons
// yarn add @ant-design/icons

// src/icons.js
export {
  ArrowUpOutline,
  EditOutline,
  UserOutline,
  PlusOutline,
  LoadingOutline,
  GithubOutline,
  BarChartOutline,
} from '@ant-design/icons/lib/index.es'

// webpack.prod.js
...
resolve: {
  alias: {
    "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
  }
},
...
```



方法二：升级到 antd 4.0



## Nginx Gzip 压缩

![image-20200305131314343](http://qn-noter.yunxi.site/imagehost/tiqrv.png-style1)

立竿见影

![image-20200305131641917](http://qn-noter.yunxi.site/imagehost/5txq0.png-style1)

速度有了一倍左右的提升。

![image-20200305131729013](http://qn-noter.yunxi.site/imagehost/emeho.png-style1)







坑：SVG 转 base64 无法显示+报错

