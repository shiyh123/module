
// 整理了数组中的所有方法
// Es5 中数组的常用方法 concat、join、pop、push、shift、unshift、reverse、sort、slice、splice、toString、indexOf、find

/*#################### Array.concat() #########################*/
/**
 * @description - 将多个数组连接成一个数组
 */
let number = [1, 2];
let numbers = [3, 4];
number.concat(numbers) // [1,2,3,4]
/*#################### Array.splice() / Array.length / Array.slice #########################*/
/**
 * @description - 截取数组,并改变元素的长度
 */
let number = [1, 2,3];
number.splice(0,2) // [1,2]
number.length = 2 // [1,2]
/**
 * @description - slice不会改变数组的长度，(截取的开始从0，从0截取的位置)
 */
number.slice(0,2) //[ 1,2,3]
/*#################### Array.push() / Array.pop / Array.unshift / Array.shift #########################*/
/**
 * @description - Array.push() 添加一个或多个到数组的末尾 ，返回新的长度
 * @description - Array.pop() 数组尾部删除 pop（）方法用于删除并返回数组的最后一个元素
 */
let number = [1, 2,3];
number.push(4) // [1,2,3,4]
number.pop() // [1, 2,3]

/**
 * @description - Array.unshift() 数组头部添加 unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度
 * @description - Array.shift() 数组头部删除 shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
 */
var arr = [1,2,3,4,5]
arr.unshift('w')
alert(arr) //w,1,2,3,4,5
alert(arr)//w,1,2,3,4

/*#################### Array.join() / Array.concat  #########################*/
// 数组连接 concat（） 方法用于连接两个或多个字符串。该方法没有改变原有字符串，但是会返回连接两个或多个字符串新字符串
var a = [1,2,3]
var b = [4,5,6]
var arr = a.concat(b)
arr //1,2,3,4,5,6
// 数组分隔 join（）方法用于把数组中的所有元素放入一个字符串。
var a = [1,2,3,4,5,6]
a.join('-')//1-2-3-4-5-6
/*#################### Array.from() #########################*/
/**
 * @description - 从一个类似数组或可迭代对象中创建一个新的数组实例
 * (伪数组对象:拥有一个 length 属性和若干索引属性的任意对象;可迭代对象:可以获取对象中的元素,如 Map和 Set 等)
 * @param arrayLike - 想要转换成数组的伪数组对象或可迭代对象.
 * @param mapFn - 可选参数，如果指定了该参数，新数组中的每个元素会执行该回调函数.
 * @param thisArg - 可选参数，执行回调函数 mapFn 时 this 对象.
 * @return { Array } - 一个新的数组实例
 */

// Array from a String
Array.from('foo');
// ["f", "o", "o"]

// Array from a Set
let s = new Set(['foo', window]);
Array.from(s)
// ["foo", window]

// Array from a Map
let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m);
// [[1, 2], [2, 4], [4, 8]]

// Array from an Array-like object (arguments)
function f() {
    return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]

// 在Array.from中使用箭头函数
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]

// 伪数组
getElementsByTagName(),getElementsByName(),argumens,string
Array.from({length: 5});
// [undefined, undefined, undefined, undefined, undefined]
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]

// 改变回调函数 mapFn 时 this 对象
Array.from({[1, 2, 3], function(){console.log(this)});
// 浏览器环境下是三次 Window对象

var obj ={name: 'obj'}
Array.from({[1, 2, 3], function(){console.log(this)}, obj);
// 三次 obj 对象
/*#################### Array.copyWithin() #########################*/
/**
 * @description - 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。
 * @param target - 0 为基底的索引，复制序列到该位置。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length.
 * @param start - 0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制.
 * @param end - 0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算.
 * @return { array } - 改变后的数组
 */

let numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(-2);
// [1, 2, 3, 1, 2]

numbers.copyWithin(0, 3);
// [4, 5, 3, 4, 5]

numbers.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

numbers.copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({ length: 5, 3: 1 }, 0, 3);
// {0: 1, 3: 1, length: 5}

// ES2015 Typed Arrays are subclasses of Array
var i32a = new Int32Array([1, 2, 3, 4, 5]);

i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// On platforms that are not yet ES2015 compliant:
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
/*#################### Array.some() #########################*/
/**
 * @description - 测试数组的元素是否至少一个通过了指定函数的测试。
 * @param callback - 用来测试每个元素的函数。
 * @param thisArg - 执行 callback 时使用的 this 值。
 * @return { Boolean } - 是否通过测试。
 */
function isBiggerThan10(element, index, array) {
    return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10); // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true

/*#################### Array.every() #########################*/
/**
 * @description - 测试数组的所有元素是否都通过了指定函数的测试。
 * @param callback - 用来测试每个元素的函数。
 * @param thisArg - 执行 callback 时使用的 this 值。
 * @return { Boolean } - 是否通过测试。
 */
function isBigEnough(element, index, array) {
    return element >= 10;
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true

/*#################### Array.flat() #########################*/
/**
 * @description - 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
 * @param depth - 指定要提取嵌套数组的结构深度, 默认值为 1。
 * @return { array } - 一个包含将数组与子数组中所有元素的新数组。
 */
var arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity);
// [1, 2, 3, 4, 5, 6]

// 会移除数组中的空项
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]

/*#################### Array.flatMap() #########################*/
/**
 * @description - 使用映射函数映射每个元素，然后将结果压缩成一个新数组。
 * @param callback - 可以生成一个新数组中的元素的函数，可以传入三个参数：
 *         @param currentValue - 当前正在数组中处理的元素。
 *         @param index - 可选的。数组中正在处理的当前元素的索引。
 *        @param array - 可选的。被调用的 map 数组。
 * @param thisArg - 可选的。执行 callback 函数时 使用的this 值。
 * @return { array } - 一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
 */
let arr = ["今天天气不错", "", "早上好"];

arr.map(s => s.split(""));
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]

arr.flatMap(s => s.split(""));
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]

/*#################### Array.includes() #########################*/
/**
 * @description - 用来判断一个数组是否包含一个指定的值。包含则返回 true，否则返回 false。
 * @param valueToFind - 需要查找的元素值。
 * @param fromIndex - 可选的。从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。
 * @return { Boolean } - 是否包含。
 *  @param valueToFind - 对象数组不能使用 includes 方法来检测
 */

[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true

/*#################### Array.lastIndexOf() #########################*/
/**
 * @description - 返回指定元素在数组中的最后一个的索引。
 * @param searchElement - 被查找的元素。
 * @param fromIndex - 可选的。从此位置开始逆向查找。
 * @return { Boolean } - 是否包含。
 */
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, 2);
// index is 0
index = array.lastIndexOf(2, -2);
// index is 0
index = array.lastIndexOf(2, -1);
// index is 3

/*#################### Array.reduce() #########################*/
/**
 * @description - 对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。
 * @param callback - 执行数组中每个值的函数，包含四个参数：
 *         @param accumulator - 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue。
 *         @param currentValue - 当前正在数组中处理的元素。
 *         @param index - 可选的。数组中正在处理的当前元素的索引。
 *        @param array - 可选的。被调用的 map 数组。
 * @param initialValue - 可选的。作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 * @return - 函数累计处理的结果。
 */
// 数组中最大值
var arr = [10, 0, 100, 99, 48, 101];
var reducer = (x, y) => Math.max(x, y);
arr.reduce(reducer); // 101

// 累加
var reducer2 = (x, y) => x + y;
arr.reduce(reducer2); // 358
/**
 * @description - 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
 * @return { Array Iterator } - 一个新的 Array 迭代器对象。
 */
arr.entries();
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);
/*
    Array Iterator {}
         __proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/

for (let e of iterator) {
    console.log(e);
}

// [0, "a"]
// [1, "b"]
// [2, "c"]


/*#################### Array.entries() #########################*/
/*#################### Array.copyWithin() #########################*/
/*#################### Array.copyWithin() #########################*/
/*#################### Array.copyWithin() #########################*/
/*#################### Array.copyWithin() #########################*/
