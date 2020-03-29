const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./start.db')

db.serialize(function() {

    //Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
        
    `)


    //Inserir dados na tabela
    /*const query = `
    INSERT INTO ideias(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);`

    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Cursos de Programação",
        "Estudo",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ullam facere praesentium saepe, iste tempore, mollitia temporibus maxime inventore beatae, consequatur incidunt aut dicta minus illum unde quis cupiditate. Excepturi.",
        "https://rocketseat.com.br"        
    ]

    db.run(query, values, function(err) {
        if (err) return console.log(err)

        console.log(this)
    })*/

    //Deletar um dado da tabela (DESAFIO)
    /*const id_item = [13]
    db.run(`DELETE FROM ideias WHERE id = ?`, id_item, function(err) {
        if (err) return console.log(err)

        console.log("ITEM DELETADO", this)
    })*/

    //Consultar dados na tabela
    db.all(`SELECT * FROM ideias`, function(err, rows) {
        if (err) return console.log(err)

        console.log(rows)
    })

})

module.exports = db