const Menu = require('../models/Menu')

async function storeProducts(req, res) {
    const {dish, info, price, url } = req.body;
    const createdMenu = await Menu.create(
        {
            dish, 
            info,
            price, 
            url
        });
        console.log(createdMenu)
        return res.redirect('/administrador/lista-de-produtos')
}

async function listProduct(req, res){
    const products = await Menu.findAll()
    console.log(products)

    res.render('AdminProducts',{
        products,
        titulo: 'Produtos'
    })
}

async function editProducts (req, res) {
    const idProducts = req.params.id;
    const products = await Menu.findByPk(idProducts)

    return res.render('AdminProductsEdit', {
        products,
        titulo: `Editando Produtos`
    })
}

async function updateProducts(req, res) {
    const idUpdate = req.params.id;
    const  {dish, info, price, url} = req.body;

    const toUpdate = await Menu.update({
        dish,
        info,
        price,
        url
    },
    {
        where: {
            id:idUpdate
        }
    })

    console.log(toUpdate)
    return res.redirect('/administrador/lista-de-produtos')
}

async function destroyProducts(req, res) {
    const idToDelete =  req.params.id;
    Menu.destroy({ where: {id: idToDelete} });

    console.log(idToDelete)
    return res.redirect('/administrador/lista-de-produtos')
}

function pageProduct(req, res){
    res.render('AdminProductsCreate',{ 
        titulo: 'Cadastro de Produtos'
    })
}

module.exports = {
    //createProducts,
    storeProducts,
    listProduct,
    pageProduct,
    editProducts,
    updateProducts,
    destroyProducts
}
