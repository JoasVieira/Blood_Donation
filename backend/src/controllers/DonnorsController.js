const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const donnors = await connection('donnors').select('*').orderBy('id', 'desc').limit(4)

        return res.json(donnors)
    },

    async create(req, res) {
        const { name, email, type } = req.body

        const [id] = await connection('donnors').insert({
            name,
            email,
            type
        })

        return res.json({ id })
    }
}