
function render(vnode, container) {
    console.log(vnode)
    // 1.vnode -> node
    const node = createNode(vnode)
    // 2.node更新到container
    container.appendChild(node)
}

// vnode -> node
function createNode(vnode) {
    const { type, props } = vnode
    // 原生js
    const node = document.createElement(type)
    // 处理子节点属性
    updateNode(node, props)
    // 遍历node下面子节点
    reconcileChildren(node, props.children)
    return node
}

// 处理children数组节点
function reconcileChildren(parentNode, children) {
    if (typeof children === 'string') {
        return
    }
    for (let i = 0; i < children.length; i++) {
        const child = children[i]
        // 把vnode插入到父节点里
        render(child, parentNode)
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

export default { render }

