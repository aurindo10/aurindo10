const PriceList = require('../Models/priceList')
const Listcomparada = require('../Models/listcotada')


const transferProduct = {
    valueOfEachProductOnListCotada: async (req, res)=>{
        const productId = req.params.idproduct
        const cotacaoId = req.params.idcotacao
    try {
        const allSellerThatCotainsTheProduct = await PriceList.find(
            {
                cotacao_id: cotacaoId,
            }
        )
        const listComparadaPorCotacao = await Listcomparada.find(         
            {idCotacao: cotacaoId}
        )
        
        const sumList = listComparadaPorCotacao[0].listas.map((lista)=>{
            let sum = 0
            for (let i = 0; i < lista.ProductListToBuy.length; i++) {

                sum = sum + lista.ProductListToBuy[i].valorUnitario*lista.ProductListToBuy[i].quantidade
            }
            return {
                sum: sum
            }
        })
        const FitelredSellerwithTheProduct = allSellerThatCotainsTheProduct.map((e)=>{
            const product = e.listOfProducts.filter((i)=>{return i.product_id==productId})
            const somaTotal = sumList[allSellerThatCotainsTheProduct.indexOf(e)]
            return {
                vendedor: e.vendedor,
                productName: product[0].productName,
                valorUnitario: product[0].valorUnitario,
                buyListSum: somaTotal.sum

            }
        })
        res.status(200).send(FitelredSellerwithTheProduct)

    }catch (error) {
        res.status(400).send(error)}}}


module.exports = transferProduct;