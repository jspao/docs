# Linux 常用命令

日常服务器运维和开发中常用的 Linux 命令速查。

## 文件操作

### 目录管理

```bash
# 查看当前路径
pwd

# 创建目录
mkdir project
mkdir -p project/src/components  # 递归创建

# 删除文件/目录
rm file.txt          # 删除文件
rm -rf directory/    # 强制删除目录及内容（⚠️ 慎用）

# 复制
cp file.txt backup.txt
cp -r src/ dist/     # 复制目录

# 移动/重命名
mv old.txt new.txt
mv file.txt /path/to/
```

### 压缩解压

```bash
# ZIP 格式
unzip archive.zip           # 解压
zip -r archive.zip folder/  # 压缩

# TAR 格式
tar -xvf archive.tar        # 解压
tar -czvf archive.tar.gz folder/  # 压缩为 tar.gz
tar -xzvf archive.tar.gz    # 解压 tar.gz
```

### 权限管理

```bash
# 查看权限
ll
ls -la

# 修改权限
chmod 777 file      # 所有用户完全控制
chmod 755 file      # 所有者完全控制，其他只读
chmod +x script.sh  # 添加执行权限

# 修改所有者
chown user:group file
sudo chown -R $(whoami) ~/.npm  # 递归修改
```

## 用户与权限

```bash
# 切换到 root 用户
sudo su root

# 以 root 权限执行命令
sudo command

# 查看当前用户
whoami

# 查看用户组
groups
```

## 网络相关

```bash
# 测试网络连通
ping google.com

# 查看端口占用
netstat -tuln
ss -tuln

# 下载文件
wget https://example.com/file.zip
curl -O https://example.com/file.zip

# 发起 HTTP 请求
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"user":"admin","pass":"123"}' \
  https://api.example.com/login
```

## 进程管理

```bash
# 查看进程
ps aux
ps aux | grep node

# 查看系统资源
htop
top

# 结束进程
kill <PID>
kill -9 <PID>  # 强制结束

# 后台运行
nohup node app.js &
```

## 文本处理

```bash
# 查看文件内容
cat file.txt          # 显示全部
head -n 20 file.txt   # 前20行
tail -n 20 file.txt   # 后20行
tail -f log.txt       # 实时追踪

# 搜索内容
grep "error" log.txt
grep -r "pattern" ./src  # 递归搜索

# 编辑文件
vi file.txt
nano file.txt
```

## 磁盘与系统

```bash
# 查看磁盘空间
df -h

# 查看目录大小
du -sh directory/
du -h --max-depth=1

# 查看内存
free -h

# 查看系统信息
uname -a
cat /etc/os-release
```