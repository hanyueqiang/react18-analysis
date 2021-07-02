## React18-analysis

## 总结

1. react17 中，React 会自动替换 jsx 为 js
2. js 对象及 vdom,他能够完整描述 dom 结构
3. ReactDOM.render(vdom, container)可以将 vdom 转换为 dom 并追加 container 中
4. 实际上，转换过程需要经过一个 diff 过程

## 为什么需要 fiber

涉及到动画渲染，优先级较高,这时候按照递归处理，造成卡顿；
对于大型项目，组件树会很大，这个时候递归遍历成本会很高，会造成主线程倍持续占用，结果就是主线程布局、动画等周期性任务得不到立即处理，造成视觉上卡顿，影响用户体验

##
