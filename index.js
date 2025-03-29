const express = require('express')
const livereload = require('livereload')
const connectLivereload = require('connect-livereload')
const app = express()
const PORT = 3000

// Enable LiveReload
const liveReloadServer = livereload.createServer()
liveReloadServer.watch(__dirname + '/public')

// Use LiveReload middleware
app.use(connectLivereload())

// Serve static files from the "public" directory
app.use(express.static('public'))

// Default route
app.get('/', (req, res) => {
	res.send(
		'<h1>Welcome to Farkle Dice Studio!</h1><p>Make changes and refresh to see updates.</p>'
	)
})

// Notify LiveReload server on changes
liveReloadServer.server.once('connection', () => {
	setTimeout(() => {
		liveReloadServer.refresh('/')
	}, 100)
})

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
