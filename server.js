const express = require('express')
const socketio = require('socket.io')
const mongoose = require('mongoose')

const app = express()
const SERVER_PORT = 3000

const DB_NAME=''
const DB_USERNAME='akeen'
const DB_PASSWORD='akeen'
const CLUSTER_ID = '31yoe'
const DB_CONNECTION = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@gbc-full-stack.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=GBC-full-stack`
mongoose.connect(DB_CONNECTION,)

const server = app.listen(SERVER_PORT, () => {
    console.log("Chat Room running on http://localhost:3000")
})

//localhost:3000
app.get("/", (req,res) => {
    res.sendFile(__dirname + '/views/chat.html')
})

app.get("/room", (req,res) => {
    res.sendFile(__dirname + '/views/chatroom.html')
})

const io = socketio(server)

io.on('connection', (socket) => {
    console.log(`New Socket: ${socket.id}`)

    socket.on('disconnect',()=>{
        console.log(`User disconnected ${socket.id}`)
    })

    socket.on('message', (data) => {
        console.log(`Message from ${socket.id}:${data}`)
    })

    socket.on('chat_message', (data) => {
        data.clientId = socket.id
        console.log(JSON.stringify(data))
        //socket.emit('chat_message', data)
        io.emit('chat_message', data)
    })
})