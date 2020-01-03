module.exports = (app) => {
    app.get('/', async (req, res) => {

        const convertArrayToObject = (array, key) => {};



        try {
            let { client, db } = await app.config.dbConnection();
            let collection = db.collection('correntistas');

            let contasAtivas = await collection.find({
                isAlive: 1
            }).count();

            let dividas = await collection.aggregate([
                {$group: { 
                    _id: null,
                     totalValue: {$sum: "$Divida"}
                }}
            ]).toArray()

            let pagamentoAnual = await collection.aggregate([
                {
                    $group: {
                        _id: null,
                        totalValue: {
                            $sum: "$capacidadePgtoAnual"
                        }
                    }
                }
            ]).toArray()

            let group = await collection.aggregate([
                {
                    $group: {
                        _id: {
                            $cond: {
                                if: {
                                    $ne: ['$house', ""]
                                },
                                then: "$house",
                                else: "Sem Família/Aliança"
                            }
                        },
                        value: {
                            $sum: {
                                $cond: [{$eq: ["$isAlive", 0]}, 0,1]
                            }
                        }
                    }
                },
                {
                    $sort: {value: -1}
                },
                {
                    $limit: 20
                }
            ]).toArray()

            let groupPgtoAnual = await collection.aggregate([
                {
                    $group: {
                        _id: {
                            $cond: {
                                if: {
                                    $ne: ['$house', ""]
                                },
                                then: "$house",
                                else: "Sem Família/Aliança"
                            }
                        },
                        value: {
                            $sum: {
                                $cond: [{$eq: ["$isAlive", 0]}, 0,"$capacidadePgtoAnual"]
                            }
                        }
                    }
                },
                {
                    $sort: {value: -1}
                },
                {
                    $limit: 20
                }
            ]).toArray()

            let groupDividas = await collection.aggregate([
                {
                    $group: {
                        _id: {
                            $cond: {
                                if: {
                                    $ne: ['$house', ""]
                                },
                                then: "$house",
                                else: "Sem Família/Aliança"
                            }
                        },
                        value: {
                            $sum: {
                                $cond: [{$eq: ["$isAlive", 0]}, 0,"$Divida"]
                            }
                        }
                    }
                },
                {
                    $sort: {value: -1}
                },
                {
                    $limit: 20
                }
            ]).toArray()

            let groupRendaLiquida = await collection.aggregate([
                {
                    $group: {
                        _id: {
                            $cond: {
                                if: {
                                    $ne: ['$house', ""]
                                },
                                then: "$house",
                                else: "Sem Família/Aliança"
                            }
                        },
                        rendaLiquida: {
                            $sum: {
                                $cond: [{$eq: ["$isAlive", 0]}, 0,"$rendaLiquida"]
                            }
                        }
                    }                
                },
                {
                    $sort: {rendaLiquida: -1}
                }
            ]).toArray()



            // amount: { $sum: { $add : [ 
            //     '$NumberOfItemsShipped', '$NumberOfItemsUnshipped' 
            // ]}},
            
            let contasAtivasPorFamilia = []
            let pgtoAnualPorFamilia = []
            let dividaAnualPorFamilia = []
            let rendaLiquidaPorFamilia = []

            group.forEach(familia => {
                contasAtivasPorFamilia.push(Object.values(familia))                
            });

            groupPgtoAnual.forEach(familia => {
                pgtoAnualPorFamilia.push(Object.values(familia))                
            });

            groupDividas.forEach(familia => {
                dividaAnualPorFamilia.push(Object.values(familia))                
            });

            groupRendaLiquida.forEach(familia => {
                rendaLiquidaPorFamilia.push(Object.values(familia))                
            });

            console.log(rendaLiquidaPorFamilia.length);            

            res.render('index_ptecnica', {
                contasAtivas: contasAtivas,
                dividasTotais: dividas[0].totalValue,
                pagamentoAnual: pagamentoAnual[0].totalValue,
                contasAtivasPorFamilia: contasAtivasPorFamilia,
                pgtoAnualPorFamilia: pgtoAnualPorFamilia,
                dividaAnualPorFamilia: dividaAnualPorFamilia,
                rendaLiquidaPorFamilia: rendaLiquidaPorFamilia
            });
        } catch (error) {
            console.log(error);            
        }
    })

}