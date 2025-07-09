# rn-emitter

`rn-emitter` 是一个轻量级的前端事件发布/订阅（EventEmitter）库，适用于 Web 和 React Native 场景。它提供了简单易用的 API，支持事件的添加、移除、触发等操作，方便在组件间或模块间进行事件通信。

## 特性

- 支持标准的事件监听、移除、批量移除等操作
- 兼容 React Native 事件订阅/发布用法
- 体积小巧，零依赖
- TypeScript 支持，类型安全

## 适用场景

- 前端应用中的模块通信
- React Native 组件间事件传递
- 替代 Node.js EventEmitter 的轻量实现

## 安装

```sh
npm install rn-emitter
```

## 快速上手

```typescript
import EventEmitter from 'rn-emitter';

const emitter = new EventEmitter();

function onEvent(data) {
  console.log('事件触发', data);
}

emitter.addListener('myEvent', onEvent);
emitter.emit('myEvent', { foo: 'bar' });
emitter.removeListener('myEvent', onEvent);

const subscriber = emitter.addListener('myEvent', onEvent);
subscriber.remove();
```

## React Native 用法

在 React Native 项目中可直接用作全局事件总线，支持常见的事件订阅/移除模式。

---

如需详细 API 说明和高级用法，请查阅源码或 issue。
