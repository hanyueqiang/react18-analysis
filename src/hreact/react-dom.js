
function render(vnode, container) {
    console.log(vnode)
    // No.1 vnode转化为node
    const node = createNode(vnode)
    // No.2 node更新到container
    container.appendChild(node)
}

// vnode转化为真实node
function createNode(vnode) {
    const { type, props } = vnode
    // 原生js创建dom
    const node = document.createElement(type)

    // 处理节点属性,把属性挂到真实dom下，例如class、href、事件等
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
        // vnode下的节点依然是vnode,任然需要转化为真是节点node
        // 把vnode插入到父节点里
        render(child, parentNode)
    }
}

// 处理节点属性，属性在props内,将class类名、绑定事件挂载到真实dom节点上
function updateNode(node, propsVals) {
    Object.keys(propsVals).forEach(k => {
        if(k === 'children') {
            // 有可能是文本
            if(typeof propsVals.children === 'string' || typeof propsVals.children === 'number') {
                node.textContent = propsVals.children + ''
            }
        }else if(k.slice(0, 2) === 'on') {
            const eventName = k.slice(2).toLocaleLowerCase()
            node.addEventListener(eventName, propsVals[k])
        }else {
            node[k] = propsVals[k]
        }
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { render }

