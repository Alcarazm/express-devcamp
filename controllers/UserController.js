const { DataTypes, ValidationError} = require("sequelize");
const UserModel = require('../models/user');
const sequelize = require('../config/seq');

//Crear un objeto user
const User = UserModel(sequelize, DataTypes)
//Listar todos los bootcamps
    exports.getAllUsers =  async(req , res)=>{
        try {
            const allUsers = await User.findAll()
            res.status(200).json({"success" : true,"data": allUsers})
        } catch (error) {
            res.status(400).json({
                "success":true,
                "error":"error de servidor"
            })
            
        }
       
    }

//Listar un bootcamp por id
    exports.getSingleUser = async (req, res)=>{
        try {
            //seleccionar usuario por id
            const SingleUser = await User.findByPk(req.params.id)
            if(!SingleUser){
                res.status(400).json({
                    "success":false,
                    "error":"Usuario no encontrado"
                })
            }
            else{
                res.status(200).json({
                    "success":false,
                    "error":SingleUser
                })
            }
            //enviar response
            res.status(200).json({"success" : true,"data" :  SingleUser})         
        } catch (error) {
            res.status(400).json({
                "success":true,
                "error":"error de servidor"
            }) 
        }
          
    }

//Crear un bootcamp
    exports.createUser = async(req, res)=>{
        try {
            //Grabar nuevo usuario
            const createUser = await User.create(req.body);
            //enviar response con nuevo usuario
            res.status(201).json({"success" : true,"data": createUser})
        } catch (error) {
            if(error instanceof ValidationError){
                //recorrer el arreglo de errores
                //map
                const msg_errores=error.errors.map(errorItem=> errorItem.message)

                res.status(422).json({
                    "success":true,
                    "error": msg_errores
                })
            }else{
                res.status(400).json({
                    "success":true,
                    "error":"error de servidor"
                })
            }  
        }
        
    }
//Actualizar un bootcamp por id
    exports.updateUser = async(req, res)=>{
        try {
            const SingleUser = await User.findByPk(req.params.id)
            if(!SingleUser){
                res.status(400).json({
                    "success":false,
                    "error":"Usuario no encontrado"
                })
            }
            else{
                await User.update(req.body ,{
                    where: {
                      id : req.params.id
                    }
                })
                const updateUser = await User.findByPk(req.params.id)
                res.status(200).json({
                    "success":true,
                    "data":updateUser
                })
            }
            
        } catch (error) {
            res.status(400).json({
                "success":true,
                "error":"error de servidor"
            })
        }
    }
//Borrar un bootcamp por id
    exports.deleteUser = async(req, res)=>{
        try {
            const SingleUser = await User.findByPk(req.params.id)
            if(!SingleUser){
                res.status(400).json({
                    "success":false,
                    "error":"Usuario no encontrado"
                })
            }
            else{
                await User.destroy({
                    where: {
                      id: req.params.id
                    }
                });
                const deleteUser = await User.findByPk(req.params.id)
                res.status(200).json({"success" : true,"data":deleteUser})
            } 
        } catch (error) {
            res.status(400).json({
                "success":true,
                "error":"error de servidor"
            })
        }
        
          
    }