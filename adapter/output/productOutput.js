const fetch = require('node-fetch')
const constants = require('../../utils/constants')

async function getProduct(idProduct) {

	const endpointRequest = constants.endpointApiProducts + idProduct + '/'

	const responseFetch = await fetch(endpointRequest)
	const response = responseFetch.json()
	return response
}

module.exports = {
	getProduct
}
