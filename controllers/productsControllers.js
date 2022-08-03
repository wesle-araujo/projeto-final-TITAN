const productsFunctions = require("../functions/productsFunctions");

class ProductController {

    async getManageProducts (req, res) {
        const products = await productsFunctions.findAllProducts()
        
        res.render("manage-products", {products})
    }

    async getListProducts (req, res) {
        const products = await productsFunctions.findAllProducts()

        res.render("list-products", {products})
    }

    async createProduct (req, res) {

        const {name, price, stock} = req.body;
        
        await productsFunctions.createProduct(name, price, stock)
    
        res.redirect("/manage-products");
    }

    async getSingleProductEdit (req, res) {
        const productId = await req.params.productId

        const productIdInt = parseInt(productId)

        const product = await productsFunctions.findProductById(productIdInt)

        res.render("edit-product", {product})
    }

    async deleteProduct (req, res) {
        const productId = req.params.productId;

        const productIdInt = parseInt(productId)

        await productsFunctions.deleteProduct(productIdInt)

        res.redirect("/manage-products");
    }

    async updateProduct (req, res) {
        const {name, price, stock} = req.body;

        const productId = req.params.productId;

        const productIdInt = parseInt(productId)
        
        await productsFunctions.updateProduct(productIdInt, name, price, stock)
    
        res.redirect("/manage-products");
    }

    async buyProduct (req, res) {
        const {quantity} = req.body

        const productId = req.params.productId;

        const productIdInt = parseInt(productId)

        await productsFunctions.buyProduct(productIdInt, quantity)
        
        res.redirect(req.get('referer'));
    }

    async seeProduct (req, res) {
        const productId = await req.params.productId

        const productIdInt = parseInt(productId)

        const product = await productsFunctions.findProductById(productIdInt)

        res.render("see-product", {product})
    }
}

const productController = new ProductController

module.exports = productController