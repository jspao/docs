# 开发工具箱

日常开发中常用的在线工具、系统命令和配置技巧。

## 在线工具推荐

| 工具名称 | 用途 | 链接 |
|---------|------|------|
| TableConvert | HTML 表格转 Markdown | [访问](https://tableconvert.com/html-to-markdown) |
| 字库星球 | 免费商用字体下载 | [访问](https://www.mfonts.cn/) |
| Transfonter | 字体格式转换（支持 Web 字体） | [访问](https://transfonter.org/) |
| Base64.Guru | SVG 转 Base64 | [访问](https://base64.guru/converter/encode/image/svg) |

## macOS 常用操作

### 查看本机 IP

```bash
# 查看 WiFi 地址
ipconfig getifaddr en0

# 查看所有网络接口
ifconfig
```

### 端口管理

```bash
# 查看指定端口占用
sudo lsof -i:8300

# 根据 PID 结束进程
sudo kill -9 <PID>

# 查看所有监听端口
sudo lsof -i -P | grep LISTEN
```

### 清理系统文件

macOS 会自动生成 `._` 开头的隐藏文件，上传到 Git 时可能造成污染：

```bash
# 删除所有 ._ 文件
find . -name "._*" | xargs rm

# 添加到 .gitignore
.DS_Store
._*
```

### 修改 Hosts 文件

```bash
# 使用管理员权限编辑
sudo vi /etc/hosts

# 或使用 nano（对新手更友好）
sudo nano /etc/hosts
```

编辑完成后：
- `Ctrl + O` → 回车保存
- `Ctrl + X` → 退出

## 设计资源

### 推荐字体

| 字体 | 特点 | 下载 |
|------|------|------|
| DIN Alternate | 数字显示效果极佳 | [下载](/fonts/d_din_pro.zip) |

## Linux 服务器操作

### 文件上传准备

```bash
# 1. 创建目录
mkdir project

# 2. 设置权限（777 表示所有用户可读可写可执行）
sudo chmod 777 project

# 3. 进入目录
cd project

# 4. 切换 root 用户
sudo su root

# 5. 现在可以使用全局命令了
pnpm install
yarn install
```

### 权限说明

| 权限 | 数值 | 说明 |
|------|------|------|
| rwxrwxrwx | 777 | 所有用户完全控制 |
| rwxr-xr-x | 755 | 所有者完全控制，其他只读 |
| rw-r--r-- | 644 | 所有者读写，其他只读 |
