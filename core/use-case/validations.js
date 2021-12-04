const clientDB = require('../../adapter/output/clientSchema.js')
const clientOutput = require('../../adapter/output/clientOutput.js')
const productOutput = require('../../adapter/output/productOutput.js')

async function verifyProductInClient(idClient, idProduct) {

	const client = await clientOutput.getClientOutput(idClient)
	let existProductInClient = false

	client.favoriteProducts.forEach((product) => {

		if (product.id === idProduct) {
			existProductInClient = true
		}
	})

	if (existProductInClient) {
		return true
	}
	else {
		return false
	}

}

async function verifyEmail(email) {

	let emailAlreadyInUse = false

	return clientDB
		.findOne({
			email: email,
		})
		.then((respClient) => {
			if (respClient === null) {
				return emailAlreadyInUse
			}
			else {
				emailAlreadyInUse = true
				return emailAlreadyInUse
			}
		})
		.catch((error) => {
			throw error.message
		})
}

async function verifyProductNotFound(idProduct) {

	const product = await productOutput.getProduct(idProduct)

	if (product.code === 'not_found') {
		return true
	}
	else {
		return false
	}
}

async function verifyClientNotFound(idClient) {

	try {
		const client = await clientOutput.getClientOutput(idClient)
		
		if (client === null) {
			return true
		}
		else {
			return false
		}
	}
	catch (error) {
    throw error
	}


}

//Response functions
function responseUserNotFound() {
	let responseObject = {
		data: null,
		message: null,
		status: null,
	}
	responseObject.message = 'User not found'
	responseObject.status = 404

	return responseObject
}

function responseProductNotFound() {
	let responseObject = {
		data: null,
		message: null,
		status: null,
	}
	responseObject.message = 'Product not found'
	responseObject.status = 404

	return responseObject
}

module.exports = {
	verifyProductInClient,
	responseUserNotFound,
	verifyEmail,
	responseProductNotFound,
	verifyProductNotFound,
	verifyClientNotFound
}
