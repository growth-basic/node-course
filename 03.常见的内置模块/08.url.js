const url = require('url')

let urlString = 'https://www.baidu.com/path?a=张三&b=2#hash=3'
const myURL = new URL('https://a:b@測試?abc#foo');
console.log(myURL.href)

console.log(url.parse(urlString, true))
console.log(url.format(myURL, {
    unicode: true
}))
