function throttle(fn, delay) {

    // 创建last变量作为闭包的私有变量
    let last = 0;

    // 返回执行函数
    return function (...args) {

        // 获得当前时间
        const now = new Date();

        // 比较当前时间与上一次触发事件事件间隔是否大于delay
        if (now - last > delay) {

            // 更新上一次触发事件的时间
            last = now;

            // 触发事件
            fn.apply(this, args);
        }
    }
}


function task() {
    console.log("run task");
}

export default function () {
    const throttleTask = throttle(task, 1000);
    window.addEventListener("click", throttleTask);
}

