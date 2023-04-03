const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

const users = []
const texts = []

app.use('/assets', express.static(path.join(__dirname, '../public/assets/')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

io.on('connection', (socket) => {
    socket.emit('texts positions', texts)

    socket.on('user', user => {
        user.id = socket.id

        let index = users.findIndex(u => u.id === user.id)

        if (index === -1) {
            users.push(user)
        } else {
            users[index] = user
        }

        socket.broadcast.emit('users positions', users)
    })
    
    socket.on('add text', text => {
        if (text.text.length > 0 && text.text.length < 600) {
            texts.push(text)
        }
        socket.emit('texts positions', texts)
        socket.broadcast.emit('texts positions', texts)
    })

    socket.on('disconnect', () => {
        const index = users.findIndex((u) => u.id === socket.id)
        if (index !== -1) {
          users.splice(index, 1)
        }
        socket.broadcast.emit('users positions', users)
    })
})

server.listen(8888, () => {
  console.log('listening on http://localhost:8888')
})