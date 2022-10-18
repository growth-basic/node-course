const http = require('http')

const server = http.createServer((req, res) => {

    // res.writeHead(200, {
    //     "Content-Type": 'application/javascript'
    // })
    const jsonString = JSON.stringify({ name: '张三' })
    res.writeHead(200, {
        "Content-Type": 'application/json;charset=utf8'
    })

    res.end(jsonString)
})

server.listen(8090, 'localhost', () => {
    console.log('server is running 8090')
})