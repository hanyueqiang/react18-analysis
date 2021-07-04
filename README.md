## React18-analysis

## 什么是fiber
fiber 是指组件上将要完成或者已经完成的任务。每个组件可以一个或者多个。

## fiber节点下有哪些属性

chld: FiberNode对象 标记了链表结构
index:0 标记了当前层级下的下标 （对比新老节点位置）
key:0 当前层级唯一
sibling: 标记下一个兄弟节点
type: 'div' 组件类型 原生标签是节点
memoizedProps: { children: Array(4)}对象 ，已经更新到界面上props
return 指向父节点
stateNode: div.box 指dom节点

## 实现fiber
window.requestIdeCallback()
在浏览器空闲时间段内调用函数排队，react调度初期思想，

## 总结

1. react17 中，React 会自动替换 jsx 为 js
2. js 对象及 vdom,他能够完整描述 dom 结构
3. ReactDOM.render(vdom, container)可以将 vdom 转换为 dom 并追加 container 中
4. 实际上，转换过程需要经过一个 diff 过程

1. 为什么需要 fiber
涉及到动画渲染，优先级较高,这时候按照递归处理，造成卡顿；
对于大型项目，组件树会很大，这个时候递归遍历成本会很高，会造成主线程倍持续占用，结果就是主线程布局、动画等周期性任务得不到立即处理，造成视觉上卡顿，影响用户体验
2. 任务分解的意义，解决上面的问题
3. 增量渲染（把渲染任务拆分成块。匀到多帧）
4. 更新时能够暂停、终止、复用渲染任务
5. 给不同类型的更新赋予优先级
6. 并发方面新的基础能力
7. 更流畅
