
const PriceList = require('../Models/priceList')
// const Listcomparada = require('../Models/listcotada')



const comparador = {
    compara:  async (req, res)=>{
        const CotacaoId = req.params.id
        const cotacoes = await PriceList.find({cotacao_id:CotacaoId})
        const products = cotacoes.map((e)=>{return e.listOfProducts.map((i)=>{return i.valorUnitario})}) 
        console.log(products)
        const item = [];
         for (let e = 0; e<products[e]?.length || 0; e++){
            console.log(products[e])
            
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



        
        // console.log(mergedPriceWithName)
        // console.log(lowerValue)
        // console.log(cotacoes)
        

        // const listReady = cotacoes.map((e)=>{return e.findIndex((i)=>{return i===e})})
        const items = []
        for  (let i = 0; i<lowerValue.length; i++){
            for  (let e = 0; e<cotacoes.length; e++){
                if (lowerValue[i]==e) {
                    items.push( cotacoes[e].vendedor)
                }
            }
        }
        const listall = []
        for ( i = 0; i<cotacoes.length; i++){
            
           for (e = 0; e<items.length; e++){
            if (cotacoes[i].vendedor===items[e]){
                const hs = {seller: cotacoes[i].vendedor,produtos:cotacoes[i].listOfProducts[e]}
            listall.push(hs)
            }}

        }



            const sellersName = cotacoes.map((e)=>{return {vendedor: e.vendedor, produtos: listall.filter((u)=>{
                return u.seller === e.vendedor

            })}})

        console.log(sellersName)

        res.send(sellersName)

        
    }


}


module.exports = comparador