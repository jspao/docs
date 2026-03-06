# 项目开发Gitlab分支说明

- 版本号规范：v1.1.1 （主版本号.次版本号.修订号，每位数字都可以无限大）

## 概览

| 分支           | 是否默认   | 是否锁定   | 用途     |
| -------------- | ---------- | ---------- | -------- |
| **develop**    | ✅ 默认分支 | 🔒 建议锁定 | 开发主干 |
| **main**       | ❌          | 🔒 必须锁定 | 生产环境 |
| **feature/***  | ❌          | ❌ 不锁定   | 功能开发 |
| **hotfix/***   | ❌          | ❌ 不锁定   | 紧急修复 |
| **release/***  | ❌          | 🔒 建议锁定 | 发版准备 |
| **customer/*** | ❌          | ❌ 视情况   | 客户定制 |

## 分支命名规范

- feature/功能名
- hotfix/问题名
- release/版本号
- customer/客户名

例如：

- feature/login-page
- hotfix/payment-error
- release/1.4.0
- customer/cmcc

## 一、标准开发到发版流程

### 流程图

```
develop (默认分支)
    │
    ├── 1. 创建功能分支
    ▼
feature/login-page
    │
    ├── 2. 开发功能
    ▼
feature/login-page
    │
    ├── 3. 合并到develop
    ▼
develop (功能集成)
    │
    ├── 4. 创建release分支
    ▼
release/1.0.0
    │
    ├── 5. 测试与Bug修复
    ▼
release/1.0.0
    │
    ├── 6. 合并到main
    ▼
main (生产环境)
    │
    ├── 7. 打标签
    ▼
tag v1.0.0 (正式上线)
```

### 详细步骤

1. **创建功能分支**
   - 从 `develop` 分支创建 `feature/功能名`
   - 命名示例：`feature/user-auth`, `feature/payment-module`

2. **功能开发**
   - 在功能分支上进行开发
   - 提交代码遵循 commit 规范
   - 定期 rebase 或 merge develop 保持同步

3. **合并到 develop**
   - 功能开发完成后，发起 Merge Request 到 `develop`
   - Code Review 通过后合并
   - 删除功能分支

### Feature 分支使用规范

**什么时候创建 feature 分支？**

| 场景 | 是否需要 feature 分支 |
|------|----------------------|
| 开发新功能 | ✅ 需要 |
| 修复非紧急 Bug | ✅ 需要 |
| 代码重构 | ✅ 需要 |
| 文档更新（独立文件）| ❌ 可直接在 develop 修改 |
| 紧急线上问题 | ❌ 使用 hotfix 分支 |

**Feature 分支生命周期：**

```
develop
    │
    ├── 需求确定，开始开发
    ▼
feature/login-page  ← 从 develop 切出
    │
    ├── 功能开发
    ├── 定期 rebase develop（保持同步）
    ├── 开发完成，发起 MR
    ▼
Code Review 通过
    │
    ├── 合并到 develop
    ▼
删除 feature/login-page 分支
```

**关键原则：**

1. **单一职责** —— 一个 feature 分支只做一个功能或修复一个 Bug，便于 Code Review 和回滚
2. **及时同步** —— 开发周期较长时，定期 rebase develop，避免最后合并时出现大量冲突
3. **快速合并** —— 功能完成后尽快发起 MR，减少分支存活时间，降低冲突风险
4. **合并即删** —— 合并到 develop 后立即删除 feature 分支，保持仓库整洁

**什么时候删除 feature 分支？**

| 场景 | 操作 | 说明 |
|------|------|------|
| 功能开发完成，已合并到 develop | ✅ 删除 | 代码已集成，使命完成 |
| 功能废弃或需求变更 | ✅ 删除 | 避免遗留无用分支 |
| 长期功能（跨迭代开发）| ❌ 保留 | 如大型重构，需持续多个迭代 |
| 合并后发现严重问题需回滚 | ❌ 保留 | 保留分支便于快速修复后重新合并 |

**删除 feature 的原因：**

- **避免分支堆积** —— feature 分支数量最多，及时删除保持仓库整洁
- **代码已在 develop** —— 合并后代码已保存，分支历史价值有限
- **防止误操作** —— 删除后避免在旧分支上继续开发
- **明确开发边界** —— 删除表示此功能开发周期已结束

---

4. **创建 release 分支**
   - 从 `develop` 创建 `release/版本号`
   - 命名示例：`release/1.0.0`
   - 此阶段不再添加新功能，只修复 Bug
   - **核心作用**：功能冻结，隔离测试与开发

5. **测试与 Bug 修复**
   - 在 release 分支上进行集成测试
   - 发现 Bug 直接在 release 分支修复
   - 修复后同步回 develop 分支

6. **合并到 main**
   - 测试通过后，将 release 分支合并到 `main`
   - 合并后删除 release 分支

7. **打标签**
   - 在 main 分支上打版本标签
   - 标签格式：`v1.0.0`
   - 标签用于记录发布版本

---

## 二、生产环境 Bug 修复流程 (Hotfix)

### 流程图

```
tag v1.0.0 (线上运行版本)
    │
    ├── 1. 发现线上Bug
    ▼
hotfix/payment-error
    │
    ├── 2. 紧急修复
    ▼
hotfix/payment-error
    │
    ├── 3. 测试验证
    ▼
hotfix/payment-error
    │
    ├── 4a. 合并到main
    ├── 4b. 合并到develop
    ▼
main + develop (同步修复)
    │
    ├── 5. 打标签
    ▼
tag v1.0.1 (热修复版本)
```

### 详细步骤

1. **发现线上 Bug**
   - 从线上运行的 `tag` 创建 `hotfix/问题描述`
   - 命名示例：`hotfix/login-error`, `hotfix/data-loss`
   - 命令示例：`git checkout -b hotfix/login-error v1.0.0`

2. **紧急修复**
   - 在 hotfix 分支上快速修复问题
   - 保持修复最小化，只修复关键问题

3. **测试验证**
   - 快速验证修复是否有效
   - 确保不会引入新问题

4. **合并分支**
   - 合并到 `main` 分支（立即上线）
   - 合并到 `develop` 分支（保持同步）
   - 删除 hotfix 分支

5. **打标签**
   - 在 main 分支上打热修复标签
   - 标签格式：`v1.0.1`（修订号+1）

### release 分支使用说明

**什么时候需要 release 分支？**

| 场景 | 是否需要 release |
|------|-----------------|
| 功能开发完成，进入测试阶段 | ✅ 需要 |
| develop 需要继续开发新功能 | ✅ 需要（隔离测试与开发）|
| 版本发布需要审批/等待窗口 | ✅ 需要（作为待发版状态）|
| 单人项目，测试直接在 develop 完成 | ❌ 可省略 |

**release 的生命周期：**

```
develop (继续开发新功能)
    │
    ├── 功能 A、B 完成，准备测试
    ▼
release/1.0.0  ← 切出，冻结功能 A+B
    │
    ├── 测试人员进行集成测试
    ├── 发现 Bug → 在 release 上修复
    ├── 修复同步回 develop
    ▼
测试通过
    │
    ├── 合并到 main，打 tag v1.0.0
    ├── 合并回 develop（确保同步）
    ▼
删除 release/1.0.0 分支
```

**关键原则：**

1. **功能冻结** —— 从 develop 切出后，不再接受新功能，只修 Bug
2. **双向同步** —— release 上的 Bug 修复必须同步回 develop
3. **临时存在** —— 测试完成、合并到 main 后即可删除

**什么时候删除 release 分支？**

| 场景 | 操作 | 说明 |
|------|------|------|
| 正常版本迭代（如 v1.0.0 → v1.1.0）| ✅ 删除 | 版本已发布，tag 已打，使命完成 |
| 一次性发版，无需长期维护 | ✅ 删除 | 避免分支堆积，保持仓库整洁 |
| 发版后发现问题，已用 hotfix 修复 | ✅ 删除 | hotfix 直接从 tag 创建，不经过 release |

**什么时候保留 release 分支？**

| 场景 | 操作 | 说明 |
|------|------|------|
| 长期支持版本（LTS）| ❌ 保留 | 如 `release/1.x`，需要持续维护旧版本 |
| 客户定制版本 | ❌ 保留 | 如 `release/cmcc-v1.0.0`，客户可能需要补丁更新 |
| 多版本并行维护 | ❌ 保留 | 同时维护 v2.x 和 v1.x 两个版本线 |
| 发版流程需要审批/等待 | ❌ 保留 | 作为"待发版"状态，等待上线窗口 |

**删除 release 的原因：**

- **避免分支堆积** —— 每次发版都留分支，一年后难以管理
- **版本信息在 tag 中** —— `git tag` 可查看所有历史版本，无需保留分支
- **防止误操作** —— 删除后彻底明确"此版本已发布"
- **保持工作流清晰** —— 只保留进行中的分支（main、develop、feature、hotfix）

**与 hotfix 的区别：**

| | release | hotfix |
|---|---|---|
| 目的 | 准备新版本发布 | 修复线上紧急 Bug |
| 起点 | develop | 线上运行的 tag |
| 时机 | 计划内的版本迭代 | 紧急响应 |
| 是否存在 | 发版前存在，发版后删除 | 修复前创建，修复后删除 |

---

### 注意事项

- Hotfix 流程用于**紧急**生产问题修复
- 非紧急问题走标准 feature → develop → release → main 流程
- 必须同时合并到 develop，避免代码不一致

---

## 三、客户定制到发版流程

### 流程图

```
develop (默认分支)
    │
    ├── 1. 创建客户定制分支
    ▼
customer/cmcc
    │
    ├── 2. 客户定制开发
    ▼
customer/cmcc
    │
    ├── 3. 客户验收测试
    ▼
customer/cmcc
    │
    ├── 4a. 合并到develop (通用功能)
    ├── 4b. 创建release分支 (定制发版)
    ▼
release/cmcc-v1.0.0
    │
    ├── 5. 定制版本测试
    ▼
release/cmcc-v1.0.0
    │
    ├── 6. 合并到main
    ▼
main (生产环境)
    │
    ├── 7. 打标签
    ▼
tag v1.0.0-cmcc (客户定制版本)
```

### 详细步骤

1. **创建客户定制分支**
   - 从 `develop` 分支创建 `customer/客户名`
   - 命名示例：`customer/cmcc`, `customer/unicom`

2. **客户定制开发**
   - 在客户分支上进行定制开发
   - 可能包含：UI 定制、功能扩展、接口适配等

3. **客户验收测试**
   - 与客户联调测试
   - 根据反馈进行调整

4. **分支处理**
   - **通用功能**：将可复用的功能合并回 `develop`
   - **定制发版**：从客户分支创建 `release/客户名-版本号`

5. **定制版本测试**
   - 在 release 分支上进行定制版本测试
   - 确保定制功能正常运行

6. **合并到 main**
   - 测试通过后，将 release 分支合并到 `main`
   - 合并后删除 release 分支
   - 客户分支可保留用于后续维护

7. **打标签**
   - 在 main 分支上打客户定制版本标签
   - 标签格式：`v1.0.0-cmcc` 或 `v1.0.0-customer-cmcc`

### 注意事项

- 客户定制分支可长期保留，便于后续维护
- 定期将 develop 的更新同步到客户分支
- 通用功能应及时合并回 develop，避免重复开发

---

## 四、流程对比总结

| 流程类型 | 起始分支 | 结束分支 | 标签格式 | 适用场景 |
| -------- | -------- | -------- | -------- | -------- |
| 标准开发 | develop | main | v1.0.0 | 常规功能开发 |
| 热修复 | main | main | v1.0.1 | 紧急生产问题 |
| 客户定制 | develop | main | v1.0.0-cmcc | 客户定制需求 |

---

## 五、Git 操作命令示例

### 标准开发流程

```bash
# 1. 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/login-page

# 2. 开发完成后合并到 develop
git checkout develop
git merge feature/login-page
git push origin develop
git branch -d feature/login-page

# 3. 创建 release 分支
git checkout -b release/1.0.0

# 4. 测试完成后合并到 main
git checkout main
git merge release/1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
git branch -d release/1.0.0
```

### 热修复流程

```bash
# 1. 从线上 tag 创建 hotfix 分支（确保基于精确的运行版本）
git fetch origin --tags
git checkout -b hotfix/critical-bug v1.0.0

# 2. 修复问题并提交
git add .
git commit -m "fix: 修复关键Bug"

# 3. 修复完成后合并到 main
git checkout main
git merge hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix version 1.0.1"
git push origin main --tags

# 4. 同步合并到 develop
git checkout develop
git merge hotfix/critical-bug
git push origin develop

# 5. 删除 hotfix 分支
git branch -d hotfix/critical-bug
```

### 客户定制流程

```bash
# 1. 创建客户定制分支
git checkout develop
git pull origin develop
git checkout -b customer/cmcc

# 2. 开发完成后创建 release 分支
git checkout -b release/cmcc-v1.0.0

# 3. 测试完成后合并到 main
git checkout main
git merge release/cmcc-v1.0.0
git tag -a v1.0.0-cmcc -m "Customer CMCC version 1.0.0"
git push origin main --tags

# 4. 保留客户分支用于后续维护
# git branch -d customer/cmcc  # 不删除
```
