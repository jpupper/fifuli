const http = require('http');
const socketIo = require('socket.io');

const hostname = '0.0.0.0';
const port = 3002;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Carga server fifuli ');
});

// Adjuntar socket.io al servidor HTTP
const io = socketIo(server, {
	path: '/fifuli/socket.io',  // Configura el path correcto para socket.io
    cors: {
        origin: "*", // Asegúrate de configurar correctamente los CORS según tus necesidades
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Cliente conectado: ' + socket.id);
	
    socket.on('mouse',mouseMsg);
	
	function mouseMsg(data){
		socket.broadcast.emit('mouse',data);
		//io.sockets.emit("mouse",data);
		console.log(data);
	}	

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado: ' + socket.id);
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
