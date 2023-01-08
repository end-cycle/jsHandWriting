function debounce(fn, delay) {

    // 创建timer变量作为闭包中定时器的私有变量
    let timer;

    // 返回执行函数
    return function (...args) {

        // 如果已存在定时器则取消定时器
        if (timer) {
            clearTimeout(timer);
        }

        // 创建定时器
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay)
    }
}

function task() {
    console.log("run task");
}

export default function () {
    const debounceTest = debounce(task, 1000);
    window.addEventListener('click', debounceTest);
}
