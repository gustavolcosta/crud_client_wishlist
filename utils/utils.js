function mountResponseObject(data, message, status) {
	let responseObject = {
		data: null,
		message: null,
		status: null
	};

	responseObject.data = data
	responseObject.message = message
	responseObject.status = status

	return responseObject
}

module.exports = {
	mountResponseObject
}