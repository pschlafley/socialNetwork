const router = require('express').Router();

const {
    getAllThoughts,
    findThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeOneReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)
.post(createThought);

router
.route('/:id')
.get(findThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeOneReaction)

module.exports = router;