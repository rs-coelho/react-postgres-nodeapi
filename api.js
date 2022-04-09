const express = require("express");
// import { encode } from "./encoder_decoder.js";
const bodyParser = require('body-parser')
const api = express();
// const apilist = [{cpf_cnpj:12345678901,nome:"Teste000"}];
// const {PrismaClient} = require("@prisma/client");

// const prisma = new PrismaClient();

function encode(s){
    // quebrar string ao meio e invertendo as
    if (typeof s==='string'){

        s = s.toString()
    }
        
    var middle = Math.floor(s.length / 2);
    var before = s.lastIndexOf('', middle);
    var after = s.indexOf('', middle + 1);
    
    if (middle - before < after - middle) {
    middle = before;
    } else {
    middle = after;
    }
    var s1 = s.substr(0, middle);
    var s2 = s.substr(middle);
    // inverter a posição das duas strings
    s2 = s2.split("").reverse().join("");
    s1 = s1.split("").reverse().join("");
    //Realizando a troca de posição novamente
    let k= s1+s2;
    // Realizando o Hash da string em base64
    return Buffer.from(k).toString('base64');
}

function decode(k){
    // Realizando o Hash da string em base64
    let s = Buffer.from(k,"base64").toString();
    // quebrar string ao meio
    var middle = Math.floor(s.length / 2);
    var before = s.lastIndexOf('', middle);
    var after = s.indexOf('', middle + 1);
    
    if (middle - before < after - middle) {
    middle = before;
    } else {
    middle = after;
    }
    var s1 = s.substr(0, middle);
    var s2 = s.substr(middle);
    // inverter a posição das duas strings
    s2 = s2.split("").reverse().join("");
    s1 = s1.split("").reverse().join("");
    //Realizando a troca de posição novamente
    let r= s1+s2;
    return r;
}
api.use(bodyParser.json())

api.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const db = require('./db/db.config.js');
const Cadastro = db.Cadastro;
api.get("/",async (req,res)=>{
    res.status(200).json("Server Up")
});


// Create ok
api.post("/create",async (req,res)=>{
    let cadastro = {};
    

    try{
        if((req.body.cpf_cnpj.length===11 || req.body.cpf_cnpj.length===14) && typeof Number(req.body.cpf_cnpj)==="number"){
        // Building Cadastro object from upoading request's body
        cadastro.cpf_cnpj = req.body.cpf_cnpj;
        cadastro.nome = req.body.nome;
        cadastro.senha = encode(req.body.senha);
    
        // Save to Postgres database
        await Cadastro.create(cadastro, 
                          {attributes: ['cpf_cnpj', 'nome']})
                    .then(result => {    
                      res.status(200).json({
                          message:'Cadastro Created',
                        'cpf_cnpj' : req.body.cpf_cnpj,
                        'nome': req.body.nome
                      });
                    });
        }else {
            res.status(400).json({
                message: "Invalid CPF | CNPJ"
            });
        }
    }catch(error){
        res.status(500).json({
            message: "This CPF | CNPJ already exists",
            error: error.message
            
        });
        
        
    }
});

// Read Full List ok
api.get("/get/all", async (req,res)=>{
    try{
        await Cadastro.findAll({attributes: ['cpf_cnpj', 'nome']})
        .then(cadastro => {
            res.status(200).json(cadastro);
        })
    }catch(error) {
        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
});

// Read 1 item ok
api.get("/get", async (req,res)=>{
    try{
        let cadastro = await Cadastro.findByPk(req.body.cpf_cnpj,{attributes: ['cpf_cnpj', 'nome']})
        if(!cadastro){
            res.status(404).json({
                message: "Not Found for updating a Cadastro with CPF_CNPJ = " + req.body.cpf_cnpj,
                error: "404"
            });
        } else {
            res.status(200).json(cadastro)
        }
    }catch(error) {
        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
    // return res.status(201).json(apilist);
});

// Update ok
api.put("/update", async (req,res)=>{
    try{
        let cadastro = await Cadastro.findByPk(req.body.cpf_cnpj,{attributes: ['cpf_cnpj', 'nome']});
    
        if(!cadastro){
            res.status(404).json({
                message: "Not Found for updating a Cadastro with CPF_CNPJ = " + req.body.cpf_cnpj,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                nome: req.body.nome,
                senha: encode(req.body.senha)
            }
            let result = await Cadastro.update(updatedObject,{where: {cpf_cnpj: req.body.cpf_cnpj}});

            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Cadastro with cpf_cnpj = " + req.body.cpf_cnpj,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message:"Cadastro with CPF_CNPJ = "+req.body.cpf_cnpj+" was updated"
            });
        }
        
    }catch(error) {
        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
});

// Delete ok
api.delete("/delete",async(req,res)=>{
    try{
        let cadastro = await Cadastro.findByPk(req.body.cpf_cnpj)
        if(!cadastro){
            res.status(404).json({
                message: "Does Not exist a Cadastro with CPF_CNPJ = " + req.body.cpf_cnpj,
                error: "404",
            });
        } else {
            await cadastro.destroy();
            res.status(200).json({
                message: "Cadastro with CPF_CNPJ = "+req.body.cpf_cnpj+" was deleted",
            });
        }
    }catch(error) {

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
    // return res.status(201).json(apilist);
});

try{
    db.sequelize.sync({force: false});
        api.listen(3333,()=> console.log("Server up in 3333"));
    } catch (error) {
        console.error(error);
    }
