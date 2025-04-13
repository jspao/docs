# 日常笔记

日常一些小工具及随手记

## 实用小工具

| 插件名称                     | 描述             |
|---------------------------|------------------|
|[TableConvert](https://tableconvert.com/html-to-markdown)| 一款table html 转 markdown table 的工具！|
|[字库星球](https://www.mfonts.cn/)| 免费商用字体资源下载|
|[Transfonter](https://transfonter.org/)| 字体转换工具，可以转换成web支持字体|
|[Base64.Guru](https://base64.guru/converter/encode/image/svg)| svg 转 base64|

## MacOS 相关

### 查当前机器IP

```sh
ipconfig getifaddr en0
```

### 查端口占用及kill

```sh
# 查端口
sudo lsof -i:8300
# kill
sudo kill -9 PID
```

### MacOs 生成的._文件剔除方式

git bash 进入指定工程，然后执行命令 `find . -name "._*"|xargs rm`

### 修改hosts配置

-  `sudo vi /etc/hosts`
-  输入本机密码后，打开hosts文件，键盘输入 i （插入），修改hosts文件后，按 esc 键退出,再按shift+：键，再输入w和q，保存退出
-  不保存退出，则按q和！键

## UI设计

- DIN Alternate 用在数字上，很好用 [下载字体文件](/fonts/d_din_pro.zip)

## 堡垒机提权及上传文件步骤

``` sh
# 进入指定项目目录
# 创建目录
mkdir node
# 给目录设置权限，就可以上传文件了
sudo chmod 777 node
# 进入node文件夹
cd node
# 提升root权限,输入对应root密码
sudo su root
# 最才可使用服务器内置的一些指令如：pnpm yarn ...
```
