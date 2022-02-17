# new-kg-web

## 环境要求

需要 [nodejs 环境](http://nodejs.cn/download/),下载最新的 LTS 版本
进行安装后，在终端输入 node

## step1: 通过 git 拉取网易云的开源后端服务

```shell
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

$ npm install

$ node app.js
```

通过浏览器访问 http://localhost:3000

## step2: 通过 git 将 github 上的代码拉取至本地

```
1、git clone git@github.com:SevenTrap/new-kg-web.git
2、采用vscode打开new-kg-web文件夹
3、在终端中输入npm install安装依赖包
4、在终端输入npm run serve
5、在浏览器里访问: http://localhost:8086/
```

## 几点规则

- 1、在 public 文件夹下的 URL_CONFIG.js 文件存放的是所有 API 接口的域名，打包上线也具备修改的能力
- 2、
