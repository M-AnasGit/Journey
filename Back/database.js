exports.uniqueUsername = async (connection, data) => {
	const { name } = data
	const query = `SELECT * FROM user WHERE name = ?`
	try {
		const res = await connection.query(query, [name])
		return res[0].length > 0 ? false : true
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.register = async (connection, data) => {
	const { name, password } = data
	const query = `INSERT INTO user (name, password) VALUES (?, ?)`
	try {
		const res = await connection.query(query, [name, password])
		return res[0].affectedRows > 0 ? true : false
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.login = async (connection, data) => {
	const { credential } = data
	const query = `SELECT * FROM user WHERE name = ? OR email = ? LIMIT 1`
	try {
		const res = await connection.query(query, [credential, credential])
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.forgotPassword = async (connection, data) => {
	const { credential } = data
	const query = `SELECT * FROM user WHERE email = ? OR name = ? LIMIT 1`
	try {
		const res = await connection.query(query, [credential, credential])
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.updatePassword = async (connection, data) => {
	const { email, password } = data
	const query = `UPDATE user SET password = ? WHERE email = ?`
	try {
		const res = await connection.query(query, [password, email])
		return res[0].affectedRows > 0 ? true : false
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.user = async (connection, data) => {
	const { user_id } = data
	const query = `SELECT * FROM user_info WHERE id = ?`
	try {
		const res = await connection.query(query, [user_id])
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.editProfile = async (connection, data) => {
	const { user_id, email, password, dob, country } = data
	const query = `UPDATE user SET email = ?, password = ?, dob = ?, country = ? WHERE id = ?`
	const user = `SELECT * FROM user_info WHERE id = ?`
	try {
		connection.beginTransaction()
		const res = await connection.query(query, [email, password, dob, country, user_id])
		const user_info = await connection.query(user, [user_id])
		connection.commit()
		return user_info[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.editAvatar = async (connection, data) => {
	const { user_id, avatar } = data
	const query = `UPDATE user SET avatar = ? WHERE id = ?`
	const user = `SELECT * FROM user_info WHERE id = ?`
	try {
		connection.beginTransaction()
		const res = await connection.query(query, [avatar, user_id])
		const user_info = await connection.query(user, [user_id])
		connection.commit()
		return user_info[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.getCourses = async (connection) => {
	const query = `SELECT * FROM course`
	try {
		const res = await connection.query(query)
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.getCourse = async (connection, data) => {
	const { id } = data
	const query = `SELECT (pointer) FROM course WHERE id = ?`
	try {
		const res = await connection.query(query, [id, chapter])
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.advanceCourse = async (connection, data) => {
	const { user_id, course_id, chapter } = data
	const chapters = `SELECT (chapters) FROM course WHERE id = ?`
	const query_if_first = `INSERT INTO user_courses (user_id, course_id, chapter, progress) VALUES (?, ?, ?, ?)`
	const query_if_not = `UPDATE user_courses SET chapter = ?, progress = ? WHERE user_id = ? AND course_id = ?`
	const rewards = `UPDATE user SET balance = balance + 100 WHERE id = ?`
	try {
		connection.beginTransaction()
		const no_of_chapters = await connection.query(chapters, [course_id])
		const res = await connection.query(chapter === 1 ? query_if_first : query_if_not, [user_id, course_id, chapter, (chapter / no_of_chapters[0]) * 100])
		await connection.query(rewards, [user_id])
		connection.commit()
		return res[0].affectedRows > 0 ? true : false
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.getForums = async (connection) => {
	const query = `SELECT * FROM forums_messages`
	try {
		const res = await connection.query(query)
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.getForumMessages = async (connection, data) => {
	const { id } = data
	const query = `SELECT * FROM message_info WHERE forum_id = ? ORDER BY created_at ASC`
	try {
		const res = await connection.query(query, [id])
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.sendMessage = async (connection, data) => {
	const { user_id, forum_id, message } = data
	const query = `INSERT INTO message (user_id, forum_id, content, created_at) VALUES (?, ?, ?, NOW())`
	const getter = `SELECT * FROM message_info WHERE forum_id = ? ORDER BY created_at ASC`
	try {
		connection.beginTransaction()
		await connection.query(query, [user_id, forum_id, message])
		const res = await connection.query(getter, [forum_id])
		console.log(res)
		connection.commit()
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}

exports.getLeaderboard = async (connection, data) => {
	const query = `SELECT id, name, avatar, experience FROM user ORDER BY balance DESC`
	try {
		const res = await connection.query(query)
		return res[0]
	} catch (error) {
		console.log(error)
		throw new Error(error)
	}
}
