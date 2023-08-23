import fetchData from './request.js'

const http = require('node:http')

const PORT = 3030


const server = http.createServer((req, res) => {
    fetchData()
        .then((data) => {
            if (data.status === 200) {
                res.statusCode = 200
                res.end(data.Result)
            }
        })
        .catch((err) => {
            res.statusCode = 400
            res.end({ Error: err })
        })
})

server.listen(PORT, () => {
    console.log(`data server is listening on port ${PORT}`)
})
