const db = require('../models');

module.exports = {
    async createEvent(req, res) {
        try {
            const { title, description, cost, categories } = req.body;
            const { user_id } = req.headers;
            const { filename } = req.file;

            const user = await db.User.findById(user_id)

            if (!user) {
                return res.status(422).json({ message: 'User Id does not exists' })
            }

            const event = await db.Event.create({
                title,
                description,
                cost,
                categories,
                user: user_id,
                thumbnail: filename
            })
            return res.json(event);
        } catch (error) {
            throw Error(`Error while Creating  new Event :  ${error}`)
        }
    },

    getEventById(req, res) {
        const { eventId } = req.params;
        db.Event.findById(eventId)
            .then(event => res.json(event))
            .catch(err => res.status(422).json('Event Id does not exists'));
    },
    getAllEvents: function (req, res) {
     db.Event.find(req.query)
            .then(event => res.json(event))
            .catch(err => res.status(422).json('There is no Event'));
    },
    getEvent: function (req, res) {
        const { categories } = req.params;
        const { query } = { categories } || {}
        db.Event.find(query)
            .then(event => res.json(event))
            .catch(err => res.status(422).json('Gradient Id does not exists'));
    },

}