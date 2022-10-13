const PriceList = require('../Models/priceList')
const Listcomparada = require('../Models/listcotada')


const comparador = {
    compara:  async (req, res)=>{
        const CotacaoId = req.params.id
        const cotacoes = await PriceList.find({cotacao_id:CotacaoId})
        const allProductMergedinArrayInsideArray = cotacoes.map((e)=>{
            return (e.listOfProducts.map((i)=>{return i}))
        })
        const allProductMerged = allProductMergedinArrayInsideArray.flat(1)
        const idOfEachProdut = cotacoes[0].listOfProducts.map((e)=>{return e.product_id})
        const productsInArrayofArrayById = idOfEachProdut.map((i)=>{return (allProductMerged.filter((e)=>{return e.product_id == i}))})
        const idOfEachSeller = cotacoes.map((i)=>{return i.listOfProducts[0].vendedorId})

        const minPrices = productsInArrayofArrayById.map ( (oneArryofTheSameProduct)=>{
            const checker = (o, i) => typeof(o) === 'object' 
            return (oneArryofTheSameProduct.length && oneArryofTheSameProduct.reduce(function(prev, curr){
                const prevOk = checker(prev, curr);
                const currOk = checker(curr, curr);
                if (!prevOk && !currOk) return {};
                if (!prevOk) return curr;
                if (!currOk) return prev;
                return prev.valorUnitario < curr.valorUnitario ? prev : curr; 
            })) || null;
         })
         console.log(idOfEachSeller)
         const ListReady = idOfEachSeller.map((i)=>{return (minPrices.filter((e)=>{return e.vendedorId === i}))})
         res.send(ListReady)
    }
}

module.exports = comparador