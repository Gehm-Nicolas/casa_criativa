//Express para criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")


/*
const ideias = [
    {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam facere praesentium saepe, iste tempore, mollitia temporibus maxime inventore beatae, consequatur incidunt aut dicta minus illum unde quis cupiditate. Excepturi.",
    url: "https://rocketseat.com.br"
    },
    {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam facere praesentium saepe, iste tempore, mollitia temporibus maxime inventore beatae, consequatur incidunt aut dicta minus illum unde quis cupiditate. Excepturi.",
        url: "https://rocketseat.com.br"
    },
    {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Saúde Espiritual",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam facere praesentium saepe, iste tempore, mollitia temporibus maxime inventore beatae, consequatur incidunt aut dicta minus illum unde quis cupiditate. Excepturi.",
        url: "https://rocketseat.com.br"
    },
    {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaokê",
    category: "Diversão em Família",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam facere praesentium saepe, iste tempore, mollitia temporibus maxime inventore beatae, consequatur incidunt aut dicta minus illum unde quis cupiditate. Excepturi.",
        url: "https://rocketseat.com.br"
    },
    {
    img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
    title: "Pintura",
    category: "Hobby",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam facere praesentium saepe, iste tempore, mollitia temporibus maxime inventore beatae, consequatur incidunt aut dicta minus illum unde quis cupiditate. Excepturi.",
    url: "https://rocketseat.com.br"
    },
    {
    img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
    title: "Recortes",
    category: "Hobby",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam facere praesentium saepe, iste tempore, mollitia temporibus maxime inventore beatae, consequatur incidunt aut dicta minus illum unde quis cupiditate. Excepturi.",
    url: "https://rocketseat.com.br"
    },
]
*/


//console.log(express)
//console.log(server)

// Configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true}))

//Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//Rota "/"
//e capturo o pedido do cliente para responder
server.get("/", function(req, res) {


    db.all(`SELECT * FROM ideias`, function(err, rows) {

        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let ideia of reversedIdeas) {
            //console.log(ideia)
            if(lastIdeas.length < 2) {
                lastIdeas.push(ideia)
            }
        }
    
        return res.render("index.html", {ideias: lastIdeas})
        //return res.send("Resposta do servidor")
    })




})

server.get("/ideias", function(req, res) {

    //?title=asjhdks&category=sldjfdsfkl&image= ...

    db.all(`SELECT * FROM ideias`, function(err, rows) {
        
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideias: reversedIdeas})
        //return res.send("Resposta do servidor")

    })
})

server.post("/", function(req, res) {
    //Inserir dados na tabela
    const query = `
    INSERT INTO ideias(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")

    })
})

// Liguei meu servidor na porta 3000
server.listen(3000)