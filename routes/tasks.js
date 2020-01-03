module.exports = (app) => {
    app.get('/tasks', (req, res) => {
        res.render('tasks')
    })
}