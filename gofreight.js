// 實作 sleep function，參數為 sleep time 及對應的 callback 函式
function sleep(ms, callback) {
    setTimeout(callback, ms);
}
sleep(1000, () => console.log('hi'));

// 將 sleep function 透過 Promise 改寫
function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve('hi'), ms));
}
sleep(1000).then(success => {
    console.log(success);
})

// 將 .then 裡的 callback 改為傳進 sleep function
function sleep(ms, callback) {
    return new Promise(resolve => setTimeout(() => resolve(callback), ms));
}
sleep(1000, () => console.log('hi')).then(success => {
    success();
});

// 將 Promise的部分抽離成獨立的 function，並允許傳入 sleep function 作為參數使用
function promisify(fn) {
    return (ms) => {
        return new Promise(resolve => fn(ms, () => resolve('hi')));
    }
}

function sleep(ms, callback) {
    setTimeout(callback, ms);
}

promisify(sleep)(1000).then(success => {
    console.log(success);
});

// 允許 sleep function 可接收多個參數
function promisify(fn) {
    return (...args) => {
        return new Promise(resolve => fn(...args, () => resolve('hi')));
    }
}

function sleep(ms, p1, p2, p3, callback) {
    setTimeout(callback, ms);
}

promisify(sleep)(1000, 1, 2, 3).then(success => {
    console.log(success);
});

// 給定一 obj 及 fn 如下，判斷 console.log() 分別印出的訊息
const obj = {
    foo: 1,
    f: function () {
        console.log(this.foo);
    },
    arrowF: () => {
        console.log(this.foo);
    },
    promisified: promisify(fn)
}
    
function fn () {
    console.log(this.foo);
}
  
obj.f(); // 1
obj.arrowF(); // undefined
obj.promisified(); // undefined

// 給定一 source array，實作 autocomplete function
<form autocomplete="off">
    <input type="text" onkeydown="showResults(this.value)" />
    <div id="result"></div>
</form>

const source = ['aaa', 'bbb', 'ccc'];

function showResults(val) {
    res = document.getElementById('result');
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);
    for (i = 0; i < terms.length; i++) {
        list += '<li>' + terms[i] + '</li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}

function autocompleteMatch(input) {
    if (input === '') {
        return [];
    }
    return source.filter(element => element.indexOf(input) !== 1);
}

// 若 source 改為遠端 AJAX 呼叫，實作 debounce function 來接收 autocomplete function
<form autocomplete="off">
    <input type="text" onkeydown="debounce(() => showResults(this.value), 1000)" />
    <div id="result"></div>
</form>

const source = await getApi();

function debounce(fn, delay) {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    }
}
  