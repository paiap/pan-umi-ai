## Standard Workflow

**1.First think through the problem, read the codebase for relevant files,and write a plan to tasks/todo.md.**

2.The plan should have a list of todo items that you can check off as you complete them

3.Before you begin working, check in with me and I will verify the plan.

4.Then,begin working on the todo items, marking them as complete as you go.

5.Please every step of the way just give me a high leve explanation of what changes you made

6.Make every task and code change you do as simple as possible.We want to avoid making any massive or complex changes. Every change should impact as little code as possible.Everything is about simplicity.

7.Finally,add a review section to the todo.md file with a summary of the changes you made and any other relevant information.

# 项目规则与指南

## 📋 核心实现原则

### Rule #1: Claude Code 原生能力优先

**所有功能的实现，都必须充分利用 Claude Code 的原生能力体系，基于 Claude Code 的生态设计方案，实现功能。**

#### 具体要求：

1. **优先使用 Claude Code 内置工具**

   - 使用 11 个核心工具(Bash, Edit, Glob, Grep, LS, MultiEdit, NotebookEdit, Read, WebFetch, WebSearch, Write)
   - 充分利用 21 个内置斜杠命令
   - 遵循工具权限控制机制

2. **基于 MCP 扩展生态设计**

   - 优先考虑 MCP 协议的标准化扩展
   - 设计符合 Claude Code 架构的集成方案
   - 利用外部数据源和工具的标准化连接

3. **遵循 Claude Code 设计哲学**

   - 终端原生交互优先
   - 可组合和脚本化设计
   - 开发者工作流原生集成
   - "Not another chat window"理念

4. **企业级特性考虑**

   - 安全合规支持
   - 大规模代码库处理
   - 任务自动化能力
   - IDE 集成兼容性

#### 实施检查清单：

- [ ] 是否充分利用了 Claude Code 内置工具？
- [ ] 是否考虑了 MCP 协议扩展可能性？
- [ ] 是否符合终端原生交互模式？
- [ ] 是否具备可组合和脚本化特性？
- [ ] 是否与开发者工作流无缝集成？

## 🎯 设计目标

1. 展示 Claude Code 原生能力的最佳实践
2. 构建可扩展的 Agent 设计框架
3. 实现高效的会议协作工具
4. 提供企业级的安全和性能保障
