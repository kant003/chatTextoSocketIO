import { Socket } from 'dgram'
import express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app)
import {Server} from 'socket.io'
const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
});

io.on('connection', socketCliente =>{ // me llega un cliente nuevo
    console.log('Nuevo cliente conectado:',socketCliente.handshake.address)
   
    socketCliente.on('disconnect', ()=>{
        console.log('El cliente se desconectó')
    })

    socketCliente.on('frase', msg=>{
        const ip=socketCliente.handshake.address
        console.log(`Cliente ${ip}: ${msg}`)
        io.emit('texto', msg)
    })

})

server.listen(3000, ()=>{
    console.log('Servidor a la escucha en puerto 3000')
})