# PM2 进程管理器

PM2 是 Node.js 应用的进程管理器，提供进程守护、负载均衡、日志管理等功能，适合生产环境部署。

[官方文档](https://pm2.fenxianglu.cn/docs/start)

## 核心功能

- 🔄 **进程守护** - 应用崩溃自动重启
- 📊 **监控管理** - CPU、内存实时监控
- 📝 **日志管理** - 自动分割、压缩日志
- ⚡ **负载均衡** - 多进程模式提升性能
- 🚀 **开机自启** - 服务器重启后自动恢复

## 安装

```bash
# 全局安装
npm install -g pm2

# 或使用 pnpm
pnpm add -g pm2
```

## 常用命令

### 启动应用

```bash
# 基础启动
pm2 start app.js

# 指定名称启动
pm2 start app.js --name="my-app"

# 开发模式（文件变更自动重启）
pm2 start app.js --watch

# 指定运行参数
pm2 start app.js -- --port 3000

# 启动多个实例（负载均衡）
pm2 start app.js -i max  # 根据 CPU 核心数
pm2 start app.js -i 4    # 指定 4 个实例
```

### 查看状态

```bash
# 查看所有应用列表
pm2 list
pm2 ls

# 查看应用详情
pm2 show my-app

# 实时监控
pm2 monit

# 查看日志
pm2 logs
pm2 logs my-app
pm2 logs my-app --lines 100
```

### 管理应用

```bash
# 停止应用
pm2 stop my-app
pm2 stop all

# 重启应用
pm2 restart my-app
pm2 restart all

# 删除应用
pm2 delete my-app
pm2 delete all

# 重载应用（零停机）
pm2 reload my-app
```

### 日志管理

```bash
# 查看日志
pm2 logs

# 清空日志
pm2 flush

# 日志回滚
pm2 reloadLogs
```

### 开机自启

```bash
# 生成启动脚本
pm2 startup

# 保存当前应用列表
pm2 save

# 服务器重启后自动恢复
pm2 resurrect
```

## 配置文件

使用配置文件管理复杂应用：

```bash
# 生成示例配置
pm2 ecosystem
```

`ecosystem.config.js` 示例：

```javascript
module.exports = {
  apps: [{
    name: 'my-app',
    script: './app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    max_memory_restart: '500M'
  }]
}
```

启动配置：
```bash
pm2 start ecosystem.config.js
pm2 start ecosystem.config.js --env production
```

## 快速参考表

| 命令 | 说明 |
|------|------|
| `pm2 start app.js` | 启动应用 |
| `pm2 list` | 查看应用列表 |
| `pm2 stop all` | 停止所有应用 |
| `pm2 restart all` | 重启所有应用 |
| `pm2 delete all` | 删除所有应用 |
| `pm2 logs` | 查看日志 |
| `pm2 monit` | 监控面板 |
| `pm2 save` | 保存应用列表 |
| `pm2 startup` | 配置开机自启 |
