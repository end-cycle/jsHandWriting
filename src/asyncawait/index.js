const { readFile } = require('fs/promises');


// async function read() {
//     let filePath = await readFile('./src/asyncawait/name.txt', 'utf8');
//     return await readFile(filePath, 'utf8');
// }

// read().then(res => console.log(res));



function* read() {
    let filePath = yield readFile('./src/asyncawait/name.txt', 'utf8');
    return yield readFile(filePath, 'utf8');
}


function co(it) {
    return new Promise((resolve, reject) => {
        let next = function (data) {
            let { value, done } = it.next(data);
            if (done) {
                resolve(value);
            } else {
                Promise.resolve(value).then(res => {
                    next(res);
                })
            }
        }
        next();
    })
}

let res = co(read());
res.then(res => {
    console.log(res);
})