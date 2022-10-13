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
        res.send(cotacoes)


        const minPrices = productsInArrayofArrayById.map ( (e)=>{
            const checker = (o, i) => typeof(o) === 'object'
            return (e.length && e.reduce(function(prev, curr){
                const prevOk = checker(prev, curr);
                const currOk = checker(curr, curr);
                if (!prevOk && !currOk) return {};
                if (!prevOk) return curr;
                if (!currOk) return prev;
                return prev.valorUnitario < curr.valorUnitario ? prev : curr; 
            })) || null;
         })
         console.log(minPrices)
    }
}

module.exports = comparador