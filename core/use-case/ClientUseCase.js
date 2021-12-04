const Client = require("../domain/Client.js")
const Product = require("../domain/Product.js")
const clientOutput = require("../../adapter/output/clientOutput.js")
const productOutput = require('../../adapter/output/productOutput.js')
const validations = require('../use-case/validations.js')
const utils = require('../../utils/utils.js')

class ClientUseCase {

	//GET
	async getClientByRequest(idClient) {

		try {

			//Validation
			const clientNotExist = await validations.verifyClientNotFound(idClient)

			if (clientNotExist) {
				return validations.responseUserNotFound();
			}
			//

			const responseClient = await clientOutput.getClientOutput(idClient)
			const client = this.mountObjectClient(responseClient)

			return utils.mountResponseObject(client, "", 200)

		}
		catch (error) {

			return utils.mountResponseObject("", error, 500)
		}
	}

	async getClient(idClient) {

		try {

			//Validation
			const clientNotExist = await validations.verifyClientNotFound(idClient)

			if (clientNotExist) {
				throw validations.responseUserNotFound();
			}
			//

			const responseClient = await clientOutput.getClientOutput(idClient)
			const client = this.mountObjectClient(responseClient)

			return client

		}
		catch (error) {
			throw error
		}

	}

	async getListClient(req) {
		const responseListClient = await clientOutput.getListClientOutput();

		return utils.mountResponseObject(responseListClient, "", 200)

	}

	//POST
	async addClient(req) {

		const name = req.body.name
		const email = req.body.email

		try {

			const emailAlreadyInUse = await validations.verifyEmail(email)

			if (emailAlreadyInUse) {
				return utils.mountResponseObject(null, "This email already in use", 422)
			}

			let client = new Client(null, name, email, [])

			const responseCreateClient = await clientOutput.createClient(client)

			client = this.mountObjectClient(responseCreateClient);

			return utils.mountResponseObject(client, "Client created successful", 200)

		}
		catch (error) {
			console.log(error, "<--- Error")
			return utils.mountResponseObject(null, error, 500)
		}
	}

	//PUT
	async updateClient(req) {

		let client = {
			name: req.body.name ? req.body.name : "",
			email: req.body.email ? req.body.email : "",
			favoriteProducts: []
		}

		const idClient = req.params.id

		try {

			// Validations
			if (client.email === "") {
				return utils.mountResponseObject("", "E-mail cannot be empty", 400)
			}

			if (client.name === "") {
				return utils.mountResponseObject("", "Name cannot be empty", 400)
			}

			const oldDataClient = await this.getClient(idClient)

			if (client.email !== oldDataClient.email) {
				const emailAlreadyInUse = await validations.verifyEmail(client.email)

				if (emailAlreadyInUse) {
					return utils.mountResponseObject(null, "This email already in use", 422)
				}
			}
			//

			client.favoriteProducts = oldDataClient.favoriteProducts

			const responseUpdateClient = await clientOutput.updateClientOutput(idClient, client)
			const updatedClient = this.mountObjectClient(responseUpdateClient)

			return utils.mountResponseObject(updatedClient, "Client update sucessful", 200)

		}
		catch (error) {

			console.log(error, "<--- Error")

			if (error.status === 404) {
				return error
			}
			else {
				return utils.mountResponseObject(null, error, 500)
			}

		}

	}



	//DELETE
	async removeClient(req) {
		const respRemoveClient = await clientOutput.deleteClientOutuput(req.params.id)

		switch (respRemoveClient) {
			case "OK":
				return utils.mountResponseObject(null, "Client removed sucessful", 200)

			case "NOT_FOUND":
				return utils.mountResponseObject(null, "Client not found", 404)

			default:
				return utils.mountResponseObject(null, respRemoveClient, 500);

		}


	}

	async addProductInWhishlist(req) {

		const idProduct = req.body.idProduct
		const idClient = req.params.id

		try {

			let client = await this.getClient(idClient)

			//Validations
			const productNotExist = await validations.verifyProductNotFound(idProduct)

			if (productNotExist) {
				return validations.responseProductNotFound()
			}

			const existProductInClient = await validations.verifyProductInClient(idClient, idProduct)

			if (existProductInClient) {
				return utils.mountResponseObject(null, "This product already been in wishlist", 422)
			}
			//

			const responseProduct = await productOutput.getProduct(idProduct)
			const product = this.mountObjectProduct(responseProduct)

			client.favoriteProducts.push(product)

			const responseUpdateClient = await clientOutput.updateClientOutput(client.id, client)

			client = this.mountObjectClient(responseUpdateClient)

			return utils.mountResponseObject(client, "Product added successful", 200)

		}
		catch (error) {
			console.log(error, "<--- Error")
			if (error.status === 404) {
				return error
			}
			else {
				return utils.mountResponseObject(null, error, 500)
			}
		}

	}


	async removeProductInWhishlist(req) {

		const idProduct = req.body.idProduct
		const idClient = req.params.id

		try {

			let client = await this.getClient(idClient)

			//Validations
			const productNotExist = await validations.verifyProductNotFound(idProduct)

			if (productNotExist) {
				return validations.responseProductNotFound()
			}

			const existProductInClient = await validations.verifyProductInClient(idClient, idProduct)

			if (!existProductInClient) {
				return utils.mountResponseObject(null, "This product not exists in wishlist", 422)
			}
			//

			const responseProduct = await productOutput.getProduct(idProduct)
			const product = this.mountObjectProduct(responseProduct)

			const newArrayProducts = client.favoriteProducts.filter(productArray => productArray.id !== product.id);
			client.favoriteProducts = newArrayProducts;

			const responseUpdateClient = await clientOutput.updateClientOutput(client.id, client)
			client = this.mountObjectClient(responseUpdateClient)

			return utils.mountResponseObject(client, "Product removed successful", 200)

		}
		catch (error) {
			console.log(error, "<--- Error")
			if (error.status === 404) {
				return error
			}
			else {
				return utils.mountResponseObject(null, error, 500)
			}
		}
	}

	async getListProductsByClient(idClient) {

		try {

      const client = await this.getClient(idClient)

      return utils.mountResponseObject(client.favoriteProducts, "", 200)
      
		}
		catch (error) {
      
			console.log(error, "<--- Error")

			if (error.status === 404) {
				return error
			}
			else {
				return utils.mountResponseObject(null, error, 500)
			}
		}
	}

	mountObjectClient(objectParam) {
		const client = new Client(objectParam._id.valueOf(), objectParam.name, objectParam.email, objectParam.favoriteProducts)

		return client
	}

	mountObjectProduct(objectParam) {
		const product = new Product(objectParam.title, objectParam.image, objectParam.price, objectParam.id)

		return product
	}

}

module.exports = new ClientUseCase
