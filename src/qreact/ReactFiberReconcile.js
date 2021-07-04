
import { createFiber } from './fiber'

export function updateHostComponent(wip) {
    // 更新节点自己
    if(!wip.stateNode) {
        wip.stateNode = createNode(wip)
    }
    // 协调子节点（遍历）
    reconcileChildren(wip, wip.props.children)
    console.log('wip',wip)
}

export function updateFunctionComponent(wip) {
    // 更新节点自己

    // 协调子节点（遍历）
    const { type, props } = wip
    const children = type(props)
    reconcileChildren(wip, children)
}


// vnode -> node
function createNode(vnode) {
    const { type, props } = vnode
    // 原生js
    const node = document.createElement(type)
    // 处理子节点属性
    updateNode(node, props)
    // 遍历node下面子节点
    // reconcileChildren(node, props.children)
    return node
}

// 更新fiber结构过程
function reconcileChildren(wip, children) {
    if (typeof children === 'string') {
        return
    }
    const newChildren = Array.isArray(children) ? children : [children]
    let previousNewFiber = null
    for (let i = 0; i < newChildren.length; i++) {
        const newChild = newChildren[i]
        const newFiber = createFiber(newChild, wip)
        // 不判断节点复用
        if (previousNewFiber === null) {
            wip.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }
        previousNewFiber = newFiber
    }
}

// 处理子节点属性，属性在props内
function updateNode(node, nextVal) {
    Object.keys(nextVal).forEach((k) => {
        if(k === 'children') {
            // 有可能是文本
            if(typeof nextVal.children === 'string' || typeof nextVal.children === 'number') {
                node.textContent = nextVal.children + ''
            }
        }else if(k.slice(0, 2) === 'on') {
            const eventName = k.slice(2).toLocaleLowerCase()
            node.addEventListener(eventName, nextVal[k])
        }else {
            node[k] = nextVal[k]
        }
    })
}