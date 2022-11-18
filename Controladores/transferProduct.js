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
                buyListSum: somaTotal.sum,
                vendedorID: e._id
            }
        })
        res.status(200).send(FitelredSellerwithTheProduct)

    }catch (error) {
        res.status(400).send(error)}},


    transferOneProduct : async (req, res)=>{
        const idCotacao = req.params.idcotacao;
        const idSeller = req.params.idSeller;
        const idproduto = req.params.idproduto;


            Listcomparada.findOne({_id:idCotacao},  
                function (e, data) {
                if (e) console.log(e);
                const productToDelete = data.listas.id(idSeller).ProductListToBuy.id(idproduto)

                if(productToDelete){
                    data.listas.id(idSeller).ProductListToBuy.id(idproduto).remove()
                    data.save(function (err, doc) {
                        if (err) return console.log(err);
                        res.status(200).send(doc)
                      });
                }
                else {
                    res.status(300).send('produto n existe no banco do de dados')
                }
            });
    
    },
    addProduct: async(req, res)=>{

        const idSeller = req.params.idSeller;
        const idproduto = req.params.idproduto;
        const idCotacao = req.params.idcotacao;

        const idSellerInsideCotacao = req.params.idSellerInsideCotacao; //adicionar na rota ainda
        const BuyListIdToAddProduct = req.params.BuyListIdToAddProduct;
        const SellerIdToBeUpdate =  req.params.SellerIdToBeUpdate;

        Listcomparada.findOne({_id:idCotacao},
              async function (es, dat) {
            if (es) console.log(es);
            const productToDelete = dat.listas.id(idSeller).ProductListToBuy.id(idproduto)
            
        const productIdOfProductToLookIntoListCotada = productToDelete.product_id
        console.log(idSellerInsideCotacao)
        const productOfSellerListToEnterTheToBuyList = await PriceList.findById(idSellerInsideCotacao)

        const productFound =  productOfSellerListToEnterTheToBuyList.listOfProducts.filter((element)=>{  return element.product_id == productIdOfProductToLookIntoListCotada})
        console.log(productFound)
            Listcomparada.findOne({_id:BuyListIdToAddProduct}, 
                function(e, data){
                    if (e) console.log(e);
                    const productToUpdate = data.listas.id(SellerIdToBeUpdate)
                    if(productToUpdate){
                        data.listas.id(SellerIdToBeUpdate).ProductListToBuy.push(productFound[0])
                        data.save(function (err, doc) {
                            if (err) return console.log(err);
                            res.status(200).send(doc)
                          })
                    }
                    else {
                        res.status(300).send('Nao foi possivel adicionar o produto')}

                })
            })

    }

    }


module.exports = transferProduct;