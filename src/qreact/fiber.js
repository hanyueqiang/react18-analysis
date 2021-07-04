
let Placement = 0  // 1更新 2删除

export function createFiber(vnode, returnFiber) {
    const fiber = {
        // 组件类型
        type: vnode.type,
        // 标记了当前层级唯一性
        key: vnode.key,
        props: vnode.props,
        // 第一个子节点
        child: null,
        // 下一个兄弟节点fiber
        sibling: null,
        // 父节点
        return: returnFiber,
        // 标记当前层级下位置
        index: 0,
        // 指dom节点 或者class实例 
        stateNode: null,
        // 标记fiber是插入、更新、删除
        flags: Placement
    }
    return fiber
}