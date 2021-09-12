const express = require('express')
const http = require('http');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const coreRouting = require("./routes")
require('dotenv').config()


const app = express()

app.use(bodyParser.json())

//app middleware

app.use(morgan('dev'));

const httpServer = http.createServer(app);

app.use(cors())

const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'stdout',
            level: 'error',
        },
        {
            emit: 'stdout',
            level: 'info',
        },
        {
            emit: 'stdout',
            level: 'warn',
        },
    ],
});


async function checkPrismaConnection() {
    const obj = {
        include: {transactions: true}
    }
    try {
        // const result = await prisma.product.findMany({
        //     include: {transactions: false}
        // });
        const result = await prisma.user.findMany();
        console.log(result);
    } catch (e) {
        console.log(e);

    }
}

//checkPrismaConnection();


app.use(coreRouting);


app.get('/test/route', (req, res) => res.send('Hello World!'))
const serverPort = process.env.PORT || 9000


httpServer.listen(serverPort, async () => {
    await prisma.$connect();
    // prisma.$on('query', (e) => {
    //     console.log('Query: ' + e.query)
    //     console.log('Duration: ' + e.duration + 'ms')
    // })
    console.log("Server Started...")
});

