# Linux

一些日常工作中用到过的命令

## 获取临时的root权限执行命令

```sh
sudo su root
```

## 删除当前文件夹下所有文件
```sh
rm -rf *
```

## 解压文件
```sh
unzip xxx.zip
```

## 创建文件夹

```sh
mkdir xxx
```

## 查看文件夹权限

```sh
ll
```

## 赋予文件夹777权限

```sh
sudo chmod 777 node
```

## 查看文件夹路径
```sh
pwd
```

## 服务端跑接口

```sh
# -H header
# -X 请求类型
# -d body体
curl -X POST -H "Content-Type: application/json" -d '{"userName":"xxx", "password":"123"}' xx.com/api/login
```