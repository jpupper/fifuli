const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 3002;

// Create HTTP server with proper file serving
const server = http.createServer((req, res) => {
  // What did we request?
  let pathname = req.url;
  
  // If blank let's ask for index.html
  if (pathname === '/' || pathname === '/fifuli/') {
    pathname = '/index.html';
  }
  
  // Skip socket.io requests - let socket.io handle these
  if (pathname.startsWith('/fifuli/socket.io/')) {
    return;
  }
  
  // Remove /fifuli prefix if present (for VPS environment)
  if (pathname.startsWith('/fifuli/')) {
    pathname = pathname.substring(7); // Remove '/fifuli' from the path
  }
  
  // Ok what's our file extension
  const ext = path.extname(pathname);
  
  // Map extension to file type
  const typeExt = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif'
  };
  
  // What is it? Default to plain text
  const contentType = typeExt[ext] || 'text/plain';
  
  // Now read and write back the file with the appropriate content type
  // Use the public directory as the root for serving files
  fs.readFile(path.join(__dirname, 'public', pathname), (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        return res.end(`File ${pathname} not found!`);
      } else {
        // Server error
        res.writeHead(500);
        return res.end(`Error loading ${pathname}: ${err.code}`);
      }
    }
    
    // Dynamically setting content type
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
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
  
  socket.on('mouse', mouseMsg);
  
  function mouseMsg(data){
    socket.broadcast.emit('mouse', data);
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
  console.log(`Socket.IO path: /fifuli/socket.io`);
  console.log(`Static files are being served from ${path.join(__dirname, 'public')}`);
});
