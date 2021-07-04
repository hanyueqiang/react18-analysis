
import { updateHostComponent, updateFunctionComponent } from './ReactFiberReconcile'

// work in proress
// let wip = null;
let wipRoot = null

// 定义变量，标记是否闲时
let nextUnitofWork = null;


// 从根节点更新
export function scheduleUpdateOnFiber(fiber) {
    wipRoot = fiber
    wipRoot.sibling = null
    nextUnitofWork = wipRoot
}

// 更新当前任务。返回下一个任务
function performUnitOfWork(wip) {
    // 1.更新当前任务
    const { type } = wip
    if (typeof type === 'string') {
        // 原生标签
        updateHostComponent(wip)
    } else if (typeof type === 'function') {
        console.log('执行了function')
        updateFunctionComponent(wip)
    }

    // 2.返回下一个任务
    // 深度优先
    if(wip.child) {
        return wip.child
    }
    let next = wip
    while(next) {
        // 是否存在兄弟节点
        if(next.sibling) {
            return next.sibling
        }
        // 没有 就从父级找。返回父节点
        next = next.return;
    }

    return null
}

function workLoop(IdleDeadLine) {
    // 有更新的值 && 浏览器空闲时间段内
    while(nextUnitofWork && IdleDeadLine.timeRemaining() > 0) {
        // 1. 更新当前任务 2.返回下一个任务
        nextUnitofWork = performUnitOfWork(nextUnitofWork)
    }

    // 没有任务了
    if(!nextUnitofWork && wipRoot) {
        commitRoot()
    }
}

requestIdleCallback(workLoop)


// 顶层container不需要更新
function commitRoot() {
    commitWorker(wipRoot.child)
}

function commitWorker(wip) {
    if(!wip) {
        return
    }
    // 更新自己
    // vnode -> node
    const { stateNode } = wip
    // let parentNode = wip.return.stateNode
    let parentNode = getParentNode(wip)
    if(stateNode) {
        parentNode.appendChild(stateNode)
    }

    // 更新子节点
    commitWorker(wip.child)
    // 更新兄弟
    commitWorker(wip.sibling)
}

function getParentNode(wip) {
    let tem = wip
    while(tem) {
        if(tem.stateNode) {
            return tem.stateNode
        }
        tem = tem.return
    }
}