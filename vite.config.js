import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';

const plugin =
	{
		name: 'sveltekit-socket-io',
		configureServer(server) {
			const io = new Server(server.httpServer);

			// This is located in the svelte config (see above "Socket.IO stuff goes here")
			io.on('connection', (socket) => {
				// Generate a random username and send it to the client to display it
				let username = `User ${Math.round(Math.random() * 999999)}`;
				socket.emit('name', username);

				// Receive incoming messages and broadcast them
				socket.on('message', (message) => {
					io.emit('message', {
						from: username,
						message: message,
						time: new Date().toLocaleString()
					});
				});
			});

			console.log('SocketIO injected');
		}
	}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), plugin]
};

export default config;
