const PriceList = require('../Models/priceList')
const Listcomparada = require('../Models/listcotada')
const Vendedor = require('../Models/vendedor')
const Cotacao = require ('../Models/cotação')


const comparador = {
    compara:  async (req, res)=>{
        const CotacaoId = req.params.id

         const listaComparada = await Listcomparada.findOne({idCotacao:CotacaoId})
         console.log(listaComparada)
        if(!listaComparada) {
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
                return ((prev.valorUnitario===0?1000000000: prev.valorUnitario) < (curr.valorUnitario===0?100000000:curr.valorUnitario) ? prev : curr); 
            })) || null;
         })
         const VendedorFromDB = await Vendedor.find({})
         const ListReadyToSend = idOfEachSeller.map((e)=>{return VendedorFromDB.filter((i)=>{return i._id == e})}).flat(1)
         const FinalList = ListReadyToSend.map((seller)=>{return {
            nomeDoVendedor: seller.nome ,
            empresa: seller.empresa,
            ProductListToBuy: minPrices.filter((sellerProduct)=>{return sellerProduct.vendedorId == seller._id})}})

        const nomeDaCotacao = await Cotacao.findById(CotacaoId)
        console.log(nomeDaCotacao)

        const data =  new Listcomparada ({
            nomeDaCotacao: nomeDaCotacao.cotacaoName,
            listas:FinalList,
            idCotacao: CotacaoId
        })

         try{
             const savedList = await data.save()
            res.send(savedList)
             }
         catch(error){
            res.status(400).send(error)
         }
    
    }
    else {
        res.status(401).send({msg: "Lista de compra desta cotacao ja foi gerada"})
    }}
    ,
    getListReadyById:  async (req, res)=>{
        const idListComparada  = req.params.id
        try{
            const List = await Listcomparada.find({_id:idListComparada})
            console.log(idListComparada)
        res.send(List)
            }
        catch(error){
        res.status(400).send(error)
        }
    },
    getListsReady:  async (req, res)=>{
        try{
            const List = await Listcomparada.find()
        res.send(List)
            }
        catch(error){
        res.status(400).send(error)
        }
    },
    deleteById:  async (req, res)=>{
        idToDelete = req.params.id
         Listcomparada.findOneAndDelete({idCotacao: idToDelete}, function(err, obj) {
            if(err) {res.status(400).send(err)
            }
        res.status(200).send(obj)
        })
    }
}

module.exports = comparador