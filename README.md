## mini-redux

从零到实现 redux 的过程，更好的学习 redux，更轻松的理解 redux 原理。

## 为什么要实现 mini-redux

个人愚见：Redux 的源码特别难看懂，也可能是 Redux 的源码是以实用为目的，看起来没什么头绪；

所以我一步一步实现一个 Redux，其中也有一些坑，通过手写 redux，我们基本可以理解 redux 的实现

## 亮点

- commit 信息详细，每个 commit 都是一个小的功能点，可以很方便的查看每个 commit 的变化
- 接口和官方几乎一致
- 实现过程清晰详细，概览 redux 核心概念
  - 使用 `context` 来读写数据
  - 数据从哪里来
  - 如何获取数据
  - 如何修改数据
  - 理解 `reducer` 的由来
  - `reducer` 雏形 —— `createNewState`
  - `reducer` 的两个参数
  - `dispatch` 规范 `setState` 的流程
  - 高阶组件 `connect` 的实现
  - 避免多余的 `render`
  - `redux` 雏形
  - 让 `connect` 支持 `selector`
  - 使用 `selector` 来实现精准渲染
  - `connect` 的第二个参数：`mapDispatchToProps`
  - api 的完善
  - `connect` 的意义
  - 封装 `Provider` 和 `createStore`

## 如何预览

```bash
pnpm i
pnpm dev
```
