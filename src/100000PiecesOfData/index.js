// 请求函数
const getList = () => {
    return new Promise((resolve, reject) => {
        //步骤一:创建异步对象
        var ajax = new XMLHttpRequest();
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数
        ajax.open('get', 'http://127.0.0.1:8000');
        //步骤三:发送请求
        ajax.send();
        //步骤四:注册事件 onreadystatechange 状态改变就会调用
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
                resolve(JSON.parse(ajax.responseText))
            }
        }
    })
}


// 直接渲染
// 获取container对象
const container = document.getElementById('container');

const renderList_directRendering = async () => {
    console.time('列表时间')
    const list = await getList()
    list.forEach(item => {
        const div = document.createElement('div')
        div.className = 'sunshine'
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        container.appendChild(div)
    })
    console.timeEnd('列表时间')
}

// setTimeout分页渲染
const renderList_setTimeout = async () => {
    console.time('列表时间');
    const list = await getList()
    console.log(list);
    const total = list.length;
    const page = 0;
    const limit = 200;
    const totalPage = Math.ceil(total / limit);

    const render = (page) => {
        if (page > totalPage) return;
        setTimeout(() => {
            for (let i = page * limit; i < page * limit + limit; i++) {
                const item = list[i];
                const div = document.createElement('div');
                div.className = 'sunshine';
                div.innerHTML = `<img src= "${item.src}" /><span>${item.text}</span>`
                container.appendChild(div);
            }
            render(page + 1);
        }, 0)
    }
    render(page);
    console.timeEnd('列表时间');
}

// 使用requestAnimationFrame代替setTimeout，减少了重排的次数，极大提高了性能
const renderList_requestAnimationFrame = async () => {
    console.time('列表时间');
    const list = await getList();
    console.log(list);
    const total = list.length
    const page = 0;
    const limit = 200;
    const totalPage = Math.ceil(total / limit);

    const render = (page) => {
        if (page >= totalPage) return;
        // 使用requestAnimationFrame代替setTimeout
        requestAnimationFrame(() => {
            for (let i = page * limit; i < page * limit + limit; i++) {
                const item = list[i];
                const div = document.createElement('div');
                div.className = 'sunshine';
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`;
                container.appendChild(div);
            }
            render(page + 1);
        })
    }
    render(page);
    console.timeEnd('列表时间');
}

const renderList_fragment = async () => {
    console.time('列表时间')
    const list = await getList()
    console.log(list)
    const total = list.length
    const page = 0
    const limit = 200
    const totalPage = Math.ceil(total / limit)

    const render = (page) => {
        if (page >= totalPage) return
        requestAnimationFrame(() => {
            // 创建一个文档碎片
            const fragment = document.createDocumentFragment()
            for (let i = page * limit; i < page * limit + limit; i++) {
                const item = list[i]
                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                // 先塞进文档碎片
                fragment.appendChild(div)
            }
            // 一次性appendChild
            container.appendChild(fragment)
            render(page + 1)
        })
    }
    render(page)
    console.timeEnd('列表时间')
}




// renderList_directRendering();
// renderList_setTimeout();
// renderList_requestAnimationFrame();
renderList_fragment();

