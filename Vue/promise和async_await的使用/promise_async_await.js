
/*
* 前言，Javascript语言的执行环境是"单线程"（single thread）。
* 1：什么是单线程
    所谓"单线程"，就是指一次只能完成一件任务。
    如果有多个任务，就必须排队，前面一个任务完成，再执行后面一个任务，以此类推。
    这种模式的好处是实现起来比较简单，执行环境相对单纯；
    坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。
    常见的浏览器无响应（假死），往往就是因为某一段Javascript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。
    为了解决这个问题，Javascript语言将任务的执行模式分成两种：同步（Synchronous）和异步（Asynchronous）。
*/
1:试例回调  假定有两个函数f1和f2，后者等待前者的执行结果。

f1();
f2();
function f1(callback){
    setTimeout(function () {
        // f1的任务代码
        callback();
    }, 1000);
}
f1(f2); // 执行
采用这种方式，我们把同步操作变成了异步操作，f1不会堵塞程序运行，相当于先执行程序的主要逻辑，将耗时的操作推迟执行。
回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，各个部分之间高度耦合，流程会很混乱，而且每个任务只能指定一个回调函数。

2.Promise
Promises对象是CommonJS工作组提出的一种规范，目的是为异步编程(操作)提供统一接口。
简单说，它的思想是， 每一个异步任务返回一个Promise对象，
该对象有一个then方法，允许指定回调函数。
Promises的出现大大改善了异步变成的困境，避免出现回调地狱，嵌套层级得到改善。

基本Api

Promise.resolve() // 返回正确的处理结果 常用
Promise.reject()// 返回错误的处理结果  常用
Promise.prototype.then()
Promise.prototype.catch()
Promise.all()  // 所有的完成  并发请求，常用
Promise.race() // 竞速，完成一个即可

// 模拟两个异步请求
function getData1 () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('1执行了')
            resolve('请求到模拟数据1111拉')
        }, 2000)
    })
}
// 2请求
function getData2 (params) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('2执行了')
            resolve('请求到模拟数据22222拉！params：' + params)
        }, 1500)
    })
}

// 2：promise 实现异步回调 异步列队
// 1请求完成后，把1的响应参数传入2，在发2请求
function promiseDemo () {
    getData1()
        .then(res => {
            return getData2(res)
        })
        .then(res => {
            console.log(res)
        })
}
promiseDemo()
// 1执行了
// 2执行了
// 请求到模拟数据22222拉！params：请求到模拟数据1111拉   用时 3500 ms

// 3： promise.all() 实现异步回调 并发 所有的完成
// 1请求、2请求同时发,两条响应都收到后在执行
function promiseDemo () {
    Promise.all([getData1(), getData2()]).then(function (res) {
        console.log(res)
    })
}
// 2执行了
// 1执行了
// ["请求到模拟数据1111拉", "请求到模拟数据22222拉！params：undefined"]   用时 2000 ms

//4：promise.race() 实现异步回调 并发 竞速
// 1请求、2请求同时发，其中一条收到请求就执行
function promiseDemo () {
    Promise.race([getData1(), getData2()]).then(function (res) {
        console.log(res)
    })
}
// 2执行了
// 请求到模拟数据22222拉！params：undefined    用时 1500 ms
// 1执行了
总结：Promise对象主要解决一部操作，杜绝回调地狱，但太常得请求还是有点繁琐（async/await 解决这个问题）
async/await 是建立在promise 之上。
1：async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。
2：当函数执行的时候，一旦遇到 await 就会先返回一个 Promise 对象，等到异步操作完成，再接着执行函数体内后面的语句。
3：可以返回一变量值
async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value); // 上面代码指定50毫秒以后，输出hello world。
}

asyncPrint('hello world', 50);

async 异步回调 并发
1请求、2请求同时发,规定请求到达的顺序
async function asyncDemo2 () {
    const arr = [getData1, getData2]
    const textPromises = arr.map(async function (doc) {
        const response = await doc()
        return response
    })
    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}
// 2执行了            (因为2是 1500ms后执行) 所以2先执行
// 1执行了
// 请求到模拟数据1拉  (for .. of )规定了输出的顺序
// 请求到模拟数据22222拉！params：undefined
面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。
后面的for..of循环内部使用了await，因此实现了按顺序输出
