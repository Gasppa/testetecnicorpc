const MongoClient = require('mongodb').MongoClient
const connString = 'mongodb://mean:vitorslipk1501@meancluster-shard-00-00-debpj.gcp.mongodb.net:27017,meancluster-shard-00-01-debpj.gcp.mongodb.net:27017,meancluster-shard-00-02-debpj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=MEANCluster-shard-0&authSource=admin&retryWrites=true&w=majority'                   
const connString3 = 'mongodb+srv://mean:vitorslipk1501@meancluster-debpj.gcp.mongodb.net/test?retryWrites=true&w=majority'
var clientMongoDB = async () => {

    try {
        const client = await MongoClient.connect(connString3, { useUnifiedTopology: true })
        const db = client.db('bravos')

        return { client: client, db: db }

    } catch (error) {
        console.error(error)
    }

}

module.exports = () => clientMongoDB