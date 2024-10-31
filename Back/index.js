require('dotenv').config()
//@Initialize express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

//@Port
const port = 443

//@Initialize socket.io
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' } })

//@Authentication
const jwt = require('jsonwebtoken')

function authenticateUserToken(req, res, next) {
	const token = req.headers['authorization']
	if (!token) return res.status(401).json({ error: 'Unauthorized' })

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: 'Forbidden' })
		}
		req.body.user_id = decoded.user_id
		next()
	})
}

//@Database
const { uniqueUsernameController, registerController, loginController, forgotPasswordController } = require('./controllers.js')
const { getProfileController, editProfileController, editAvatarController } = require('./controllers.js')
const { getCoursesController, getCourseController, advanceCourseController } = require('./controllers.js')
const { getForumsController, getForumMessagesController, sendMessageController } = require('./controllers.js')
const { getLeaderboardController } = require('./controllers.js')
const { sendVerificationCodeController } = require('./controllers.js')

//@Socket.io
const connectedUsers = {}
const forumsParticipants = {
	1: 0,
	2: 0,
	3: 0,
}

//@Routes
app.post('/unique-username', uniqueUsernameController)
app.post('/register', registerController)
app.post('/login', loginController)
app.post('/forgot-password', forgotPasswordController)

app.get('/user', authenticateUserToken, getProfileController)
app.post('/edit-profile', authenticateUserToken, editProfileController)
app.post('/edit-avatar', authenticateUserToken, editAvatarController)

app.get('/courses', authenticateUserToken, getCoursesController)
app.get('/course/:id/:chapter', authenticateUserToken, getCourseController)
app.post('/advance-course', authenticateUserToken, advanceCourseController)

app.get('/forums', authenticateUserToken, (req, res) => getForumsController(req, res, forumsParticipants))
app.get('/forum-messages/:id', authenticateUserToken, getForumMessagesController)
app.post('/send-message', authenticateUserToken, sendMessageController)

app.get('/leaderboard', authenticateUserToken, getLeaderboardController)

app.post('/send-verification-code', authenticateUserToken, sendVerificationCodeController)

app.get('/', (req, res) => {
	res.json({ message: 'Server is running!' })
})

server.listen(port, () => console.log(`Server running on port ${port}`))

io.on('connection', (socket) => {
	socket.on('setId', (user_id, forum_id) => {
		connectedUsers[user_id] = socket.id
		forumsParticipants[forum_id] += 1
	})

	socket.on('sendMessage', (forum_id, messages) => {
		io.emit('receiveMessage', messages, forum_id)
	})

	socket.on('leaveForum', (forum_id) => {
		forumsParticipants[forum_id] -= 1
	})

	socket.on('disconnect', () => {
		const disconnectedUserId = Object.keys(connectedUsers).find((userId) => connectedUsers[userId] === socket.id)
		delete connectedUsers[disconnectedUserId]
	})
})
