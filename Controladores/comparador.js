
const PriceList = require('../Models/priceList')


const comparador = {
    compara:  async (req, res)=>{
        const CotacaoId = req.params.id
        const cotacoes = await PriceList.find({cotacao_id:CotacaoId})
        const products = cotacoes.map((e)=>{return e.listOfProducts.map((i)=>{return i.valorUnitario})}) 
        const item = []
         for (let e = 0; e<products[e].length; e++){

            for (let i = 0; i<products.length; i++){

                item.push(products[i][e])

            }
            }
            const novoArray = []
            for (var i = 0; i < item.length; i = i + products.length) {
                novoArray.push(item.slice(i, i + products.length));
              }
            const productsName = cotacoes[0].listOfProducts.map((i)=>{return i.productName})


            const mergedPriceWithName =  []

            for (let i = 0; i<productsName.length; i++){
                mergedPriceWithName.push({nome: productsName[i], prices: novoArray[i] })
            }
            const lowerValue = mergedPriceWithName.map((e)=>{return e.prices.findIndex((i)=>{return i===Math.min(...e.prices)})})



        res.send(mergedPriceWithName)
        console.log(mergedPriceWithName)
        console.log(lowerValue)
    }


}


module.exports = comparador