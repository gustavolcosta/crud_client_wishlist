const clientDB = require('../../adapter/output/clientSchema.js');


function getClientOutput(id) {
  
	return clientDB.findById({
		_id: id
	}).then(function(respClient) {
		return respClient

	}).catch(error => {
    throw error.message
		
	})
}

function getListClientOutput() {
	return clientDB.find().then(function(respListClient) {
		return respListClient

	}).catch(error => {
		return error.message
	})
}

function updateClientOutput(id, body) {
	return clientDB.findByIdAndUpdate({
		_id: id
	}, body).then(function(respClient) {
		return clientDB.findOne({
			_id: id
		}).then(function(respClient) {
			return respClient
		});
	}).catch(error => {
		throw error.message
	});
}

function deleteClientOutuput(id) {
	return clientDB.findByIdAndRemove({
		_id: id
	}).then((response) => {
		if (response === null) {
			return "NOT_FOUND"
		}
		else {
			return "OK"
		}

	}).catch(error => {
		throw error.message
	})
}

function createClient(body) {
	return clientDB.create(body).then(function(respClient) {

		return respClient

	}).catch(error => {
		throw error.message
	});
}


module.exports = {
	getClientOutput,
	updateClientOutput,
	createClient,
	getListClientOutput,
	deleteClientOutuput
}
