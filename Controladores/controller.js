const Produto = require('../Models/produto');
const Cotacao = require('../Models/cotação');


const CadastroProduto = {
    cadastro: async (req, res)=>{
        const product = new Produto ({
            nome: req.body.nome,
            marca: req.body.marca,
            unidade: req.body.unidade     
    })
    try {
        const savedProduct = await product.save()
        res.send(savedProduct)

    }catch (error) {
        res.status(400).send(error)}},
            
    criarListdeCotação: async (req, res)=>{
        const cotacao = new Cotacao ({
            cotacaoName: req.body.cotacaoName,
            products: [],
            status: req.body.status,
            sellerAmount: req.body.sellerAmount
        })
    try {
    const savedList = await cotacao.save()
    res.send(savedList)
    }catch (error) {
     res.status(400).send(error)}
    }, 
    
    updatestatus: async (req, res)=>{
        const query ={_id:req.params.id}
        const update = {status: req.body.status}
        let options = { new: true };
        Cotacao.findOneAndUpdate(query, update,options, (err, doc) =>{ 
            if (err) {
              throw err;
            }
            res.status(200).send(doc.status)

        })},

    criarProdutosDaLista: async (req, res)=>{
        const idList = req.params.id;
        const newProduct = {
            name: req.body.name,
            marca: req.body.marca,
            unidade: req.body.unidade,
            quantidade: req.body.quantidade,
            produto_id: req.body.produto_id
        }
        let query = {_id:idList}    
        let update = {$push:{products: newProduct}};
        let options = { new: true };
        Cotacao.findOneAndUpdate(query, update,options, (err, doc) =>{ 
            if (err) {
              throw err;
              
            }
            console.log(doc)
            res.status(200).send(doc.products[doc.products.length-1])
            // res.send (update.$push.products)
        })
        
    },
    ObtemProdutosDaLista: async (req, res)=>{

        const idList = req.params.id
        try {
            const ListProductofListCotacao =  await Cotacao.findById(idList);
            res.send(ListProductofListCotacao)
            }
        catch (error) {
             res.status(400).send(error)} 
    },
    products: async (req, res)=>{
        try {
            const listOfProducts =  await Produto.find({});
            res.send(listOfProducts)
            }
        catch (error) {
             res.status(400).send(error)}
    },
    product: async (req, res)=>{
        const idProduct = req.params.id
        try {
            const produ =  await Produto.findById(idProduct);
            res.send(produ)
            }
        catch (error) {
             res.status(400).send(error)}
    },
    editProduct: async (req, res)=>{
        const idProduct = req.params.id
        const update = {
            nome: req.body.nome,
            marca: req.body.marca,
            unidade: req.body.unidade 
        }
        try {
            await Produto.findByIdAndUpdate(idProduct, update);
            const produ =  await Produto.findById(idProduct)
            res.send(produ)}
        catch (error) {
             res.status(400).send(error)}
    },
    editProductsList: async (req, res)=>{
        const idProduct = req.params.id
        const idList = req.params.idlist
        const query = {"_id":idList, "products._id":idProduct}
        const edited = {
            name: req.body.name,
            unidade: req.body.unidade,
            quantidade: req.body.quantidade
        }
        const update = {"$set": {
            "products.$": edited
        }}
             Cotacao.findOneAndUpdate(query, update,(err, doc)=>{
                res.send(doc)
                
            })
    },
    editListCotacao: async(req, res)=>{
        const query = req.params.id
        const update = req.body
               
        Cotacao.findOneAndUpdate(query, update,(err, doc)=>{
            console.log(err)
            res.send(doc)})
            
    },
    criacaodelista: async(req, res)=>{
        const query = req.params.id
        const update = req.body
        const data =  new Cotacao (update)
    try{
                const savedProduct = await data.save()
                res.send(savedProduct)
        }
    catch(error){
        res.status(400).send(error)}
    },
    ObtemListofLists: async(req, res)=>{
    try{
                const savedProduct = await Cotacao.find()
                res.send(savedProduct)
        }
    catch(error){
        res.status(400).send(error)}
    },
    deletecotacao: async (req, res)=>{
        const idList = req.params.id
            Cotacao.findByIdAndDelete(idList, (err, doc)=>{       
                if (err){
                    res.send(err)
                }
                res.send(doc)
    })},
    deleteproduct: async (req, res)=>{
        const idList = req.params.id
            Produto.findByIdAndDelete(idList, (err, doc)=>{       
                if (err){
                    res.send(err)
                }
                res.send(doc)
    })},
    deleteproductofcotacao: async (req, res)=>{
        const idList = req.params.id
        const idProduct = req.params.id_product
        Cotacao.findOneAndUpdate({ _id: idList }, { "$pull": { "products": { "_id": idProduct } }}, { safe: true, multi:true }, function(err, obj) {
            if(err) res.status(400).send(err)          
            res.send(obj)

        });}
        
}
module.exports = CadastroProduto;