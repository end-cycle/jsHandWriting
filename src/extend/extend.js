function Father(name) {
    this.name = name;
}

Father.prototype.sayName = function () {
    console.log('My name is ' + this.name);
}

function Son(name, age) {
    Father.call(this, name);
    this.age = age;
}

function inheritPrototype(subType, superType) {
    //也就是__proto__
    let prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

inheritPrototype(Son, Father);


Son.prototype.sayAge = function () {
    console.log('I am ' + this.age + ' years old');
}

let mySon = new Son('Buddy', 3);


mySon.sayAge();
mySon.sayName();

// 具体可看我写的文章
// https://juejin.cn/post/7211687237020352569