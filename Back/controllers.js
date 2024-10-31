require('dotenv').config()
const bcrypt = require('bcrypt')
const fs = require('fs')

//@Start the database
const mysql = require('mysql2')
const pool = mysql
	.createPool({
		host: `${process.env.DB_HOST}`,
		port: `${process.env.DB_PORT}`,
		user: `${process.env.DB_USER}`,
		password: `${process.env.DB_PASSWORD}`,
		database: `${process.env.DB_NAME}`,
		waitForConnections: true,
		connectionLimit: 75,
		queueLimit: 0,
	})
	.promise()

pool.query('SELECT 1 + 1 AS solution')
	.then((rows) => console.log('Database connected!', rows))
	.catch(console.log('Database connection failed!'))

//@JWT
const jwt = require('jsonwebtoken')

//@Nodemailer
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
	secure: true,
})

//@Utils
const generateRandomCode = (length) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let code = ''

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length)
		code += characters.charAt(randomIndex)
	}

	return code
}

const { uniqueUsername, register, login, forgotPassword, updatePassword } = require('./database.js')
const { user, editProfile, editAvatar } = require('./database.js')
const { getCourses, getCourse, advanceCourse } = require('./database.js')
const { getForums, getForumMessages, sendMessage } = require('./database.js')
const { getLeaderboard } = require('./database.js')

//@Controllers
exports.uniqueUsernameController = async (req, res) => {
	const { name } = req.body

	const connection = await pool.getConnection()
	try {
		const result = await uniqueUsername(connection, { name })
		result ? res.status(200).json({ message: 'Username is unique' }) : res.status(400).json({ error: 'Username already exists' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.registerController = async (req, res) => {
	const { name, password } = req.body

	const salt = Math.floor(Math.random() * 5) + 10
	const hash = await bcrypt.hash(password, salt)

	const connection = await pool.getConnection()

	try {
		const result = await register(connection, { name, password: hash })
		result ? res.status(200).json({ message: 'User registered successfully' }) : res.status(400).json({ error: 'User already exists' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.loginController = async (req, res) => {
	const { credential, password } = req.body
	const connection = await pool.getConnection()
	try {
		const result = await login(connection, { credential })
		if (result.length > 0) {
			const isPassword = await new Promise((resolve, reject) => {
				bcrypt.compare(password, result[0].password, (err, result) => {
					if (err) reject(err)
					resolve(result)
				})
			})

			if (isPassword) {
				const token = jwt.sign({ user_id: result[0].id }, process.env.JWT_SECRET)
				res.status(200).send({ token })
			} else res.status(400).json({ error: 'Invalid credentials' })
		} else {
			res.status(400).json({ error: 'Invalid credentials' })
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.forgotPasswordController = async (req, res) => {
	const { credential } = req.body
	const connection = await pool.getConnection()
	try {
		const result = await forgotPassword(connection, { credential })
		if (result.length > 0) {
			const code = generateRandomCode(8)
			const mailOptions = {
				from: process.env.EMAIL_USER,
				to: result[0].email,
				subject: 'Forgot Password',
				html: `<h1>Your password has been reset. Your new password is:<strong>${code}</strong> <br>If you didn't request this, please contact us as soon as possible.</h1>`,
			}

			await transporter.sendMail(mailOptions)

			const hash = await bcrypt.hash(code, 10)
			const result2 = await updatePassword(connection, { email: result[0].email, password: hash })
			result2
				? res.status(200).json({ message: 'Password updated and email sent' })
				: res.status(401).json({ error: 'Email sent but password not updated' })
		} else {
			res.status(400).json({ error: 'User not found' })
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.getProfileController = async (req, res) => {
	const { user_id } = req.body
	const connection = await pool.getConnection()
	try {
		const result = await user(connection, { user_id })
		result.length > 0 ? res.status(200).json({ user: result[0] }) : res.status(400).json({ error: 'User not found' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.editProfileController = async (req, res) => {
	const { user_id, email, password, dob, country, code } = req.body
	if (codes.has(email)) {
		if (codes.get(email) === code) {
			codes.delete(email)
		}
	} else {
		return res.status(401).json({ error: 'Invalid code' })
	}

	const hash = await bcrypt.hash(password, 10)
	const connection = await pool.getConnection()
	try {
		const result = await editProfile(connection, { user_id, email, password: hash, dob, country: country.code })
		result ? res.status(200).json({ user: result[0] }) : res.status(400).json({ error: 'User not found' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.editAvatarController = async (req, res) => {
	const { user_id, avatar } = req.body

	const connection = await pool.getConnection()
	try {
		const result = await editAvatar(connection, { user_id, avatar })
		result ? res.status(200).json({ user: result[0] }) : res.status(400).json({ error: 'User not found' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.getCoursesController = async (req, res) => {
	const connection = await pool.getConnection()
	try {
		const result = await getCourses(connection)
		res.status(200).json({ courses: result })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.getCourseController = async (req, res) => {
	const { id, chapter } = req.params

	const connection = await pool.getConnection()
	try {
		const result = await getCourse(connection, { id })
		//get the json pointer then get the chapter and display it to user
		result ? res.status(200).json({ course: res }) : res.status(400).json({ error: 'Course not found' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.advanceCourseController = async (req, res) => {
	const { user_id, course_id, chapter } = req.body

	const connection = await pool.getConnection()
	try {
		const result = await advanceCourse(connection, { user_id, course_id, chapter }) //Give the user his rewards
		result ? res.status(200).json({ message: 'Course advanced successfully' }) : res.status(400).json({ error: 'User or course not found' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.getForumsController = async (req, res, participants) => {
	const connection = await pool.getConnection()
	try {
		const result = await getForums(connection)
		result.forEach((f) => {
			f.participants = participants[f.id]
		})
		res.status(200).json({ forums: result })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.getForumMessagesController = async (req, res) => {
	const { id } = req.params
	const connection = await pool.getConnection()
	try {
		const result = await getForumMessages(connection, { id })
		res.status(200).json({ messages: result })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.sendMessageController = async (req, res) => {
	const { user_id, forum_id, message } = req.body

	const connection = await pool.getConnection()
	try {
		const result = await sendMessage(connection, { user_id, forum_id, message })
		res.status(200).json({ messages: result })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

exports.getLeaderboardController = async (req, res) => {
	const connection = await pool.getConnection()
	try {
		const result = await getLeaderboard(connection)
		result ? res.status(200).json({ leaderboard: result }) : res.status(400).json({ error: 'Leaderboard not found' })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	} finally {
		connection.release()
	}
}

//@Verification code email

const codes = new Map()

exports.sendVerificationCodeController = async (req, res) => {
	const { email } = req.body
	const code = generateRandomCode(8)
	codes.set(email, code)
	setTimeout(() => {
		delete codes[email]
	}, 600000)

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Verification Code',
		text: `Your verification code is: ${code}`,
	}

	try {
		await transporter.sendMail(mailOptions)
		res.status(200).json({ message: 'Email sent successfully' })
	} catch (error) {
		res.status(400).json({ error: 'Email not sent' })
	}
}
