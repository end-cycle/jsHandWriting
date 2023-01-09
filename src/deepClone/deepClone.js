function deepClone(obj, cache = new WeakMap()) {

    // 如果是基本类型直接返回，null是对象需要特判
    if (obj === null || typeof obj !== 'object') return obj;

    // 如果是Date、RegExp也需要特判
    if (obj instanceof Date) return new Date(obj);
    // 网上看有人说RegExp类型拷贝要带上flags
    if (obj instanceof RegExp) return new RegExp(obj);

    // 使用WeakMap缓存解决循环引用
    if (cache.has(obj)) return cache.get(obj);

    //  复制原对象的构造函数
    let cloneObj = new obj.constructor();

    // 哈希表存储对象key防止循环引用，map、WeakMap都可以,使用Map后续不想要cloneObj时将cloneObj赋值为null时Map还会保存引用无法回收，WeakMap因其弱引用机制可以正常回收
    cache.set(obj, cloneObj);

    // 递归拷贝所有项
    for (const key in obj) {
        // hasOwnProperty判断属性是否定义在对象本身而不是继承自原型链
        if (obj.hasOwnProperty(key)) {
            // 递归拷贝
            cloneObj[key] = deepClone(obj[key], cache);
        }
    }
    // 返回递归拷贝的值
    return cloneObj;
}

export { deepClone as default }

const obj = { name: 'Jack', address: { x: 100, y: 200 } };
obj.a = obj;
const newObj = deepClone(obj);
console.log(newObj.address === obj.address);
// console.dir(newObj);
// console.dir(obj);

/* 
JS基本数据类型
* number
* boolean
* undefind
* null
* string
* symbol
* bigInt
引用数据类型
* object
* Array
* function
* Date
* RegExp
 */

/* 
null为object的原因
https://2ality.com/2013/10/typeof-null.html
在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。
对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"。
 */

/*
原生的 WeakMap 持有的是每个键对象的 “弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行。
原生 WeakMap 的结构是特殊且有效的，其用于映射的 key 只有在其没有被回收时才是有效的。 
 */