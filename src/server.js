const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express:server,
    noCache: true,
})

const proffys = [
    {
        name: "Aline Capoani",
        avatar: "https://avatars2.githubusercontent.com/u/64864279?s=460&u=77d9cc560fe6fe7ff71947f8e65672d9d0ac5e0e&v=4",
        whatsapp: "484884848",
        bio: "teste",
        subject: "Artes",
        cost: "20",
        weekday: [0],
        time_from: [700],
        time_to: [1000]
    }
]


const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req,res) {
    return res.render("index.html")
}

function pageStudy(req,res) {
    const filters = req.query;
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req,res) {
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0

    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        
        return res.redirect("/study")
    }

    return res.render("give-classes.html", {subjects, weekdays})
}

server.use(express.static("public"))

.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

.listen(3000);