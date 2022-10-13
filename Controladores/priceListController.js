const PriceList = require('../Models/priceList')
const Vendedor = require('../Models/vendedor')

const cadastroListofPrice =  {
    
cadastro: async(req, res)=>{
    const update = req.body
    console.log(update)
    const data =  new PriceList (update)
try{
            const savedProduct = await data.save()
            res.send(savedProduct)
    }
catch(error){
    res.status(400).send(error)}
},
list: async(req, res)=>{
    try{
        const savedList = await PriceList.find()
        res.send(savedList)
    }
    catch(error){
    res.status(400).send(error)}
    },
onelist: async(req, res)=>{
    const query = req.params.id
    try{
        const list = await PriceList.findById(query)
        res.send(list)
    }
    catch(error){
    res.status(400).send(error)}
},
updatelist:  async(req, res)=>{
        const query = req.params.id
        const update = req.body
        const list =  PriceList.findByIdAndUpdate(query, update,(err, doc)=>{
            if (err){
                res.send(err)
            }
            res.send(doc)
        })
    },
deletelist:  async(req, res)=>{
        const query = req.params.id
        PriceList.findByIdAndDelete(query, (err, doc)=>{       
            if (err){
                res.send(err)
            }
            res.send(doc)
        })
    },
cadastraVendedor:  async(req, res)=>{
    const update = req.body
     console.log(update)
     const data =  new Vendedor (update)
try{
    const savedProduct = await data.save()
    res.send(savedProduct)
}
catch(error){
    res.status(400).send(error)}
}
}



module.exports = cadastroListofPrice