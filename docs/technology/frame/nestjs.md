# NestJS 服务端框架

NestJS 是一个用于构建高效、可扩展的 Node.js 服务端应用的框架。它使用 TypeScript 构建，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应编程）的元素。

[官方文档](https://nestjs.bootcss.com/)

## 核心特性

- 🏗️ **模块化架构** - 使用模块组织代码，易于维护和扩展
- 📝 **TypeScript 支持** - 原生支持 TS，提供类型安全
- 🔌 **依赖注入** - 内置 IoC 容器，管理依赖关系
- 🛡️ **可扩展性** - 丰富的生态系统和第三方库支持
- 🧪 **测试友好** - 内置测试工具和最佳实践

## 快速开始

```bash
# 安装 CLI
npm i -g @nestjs/cli

# 创建项目
nest new project-name

# 启动开发服务器
npm run start:dev
```

## 核心概念

### 模块 (Module)

```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
```

### 控制器 (Controller)

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  findAll() {
    return [];
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return '创建成功';
  }
}
```

### 服务 (Service)

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  findAll() {
    return this.users;
  }

  create(user: any) {
    this.users.push(user);
    return user;
  }
}
```

## CLI 命令

```bash
# 生成模块
nest g module users

# 生成控制器
nest g controller users

# 生成服务
nest g service users

# 生成 CRUD
nest g resource users
```