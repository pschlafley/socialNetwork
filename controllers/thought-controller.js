const { Thought, User } = require('../models');


const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    },

    findThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts found with this id!' })
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    },

    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts found with this id!' })
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    },

    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts found with this id!' })
                return;
            }
            res.json({ message: 'Thought deleted!'});
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        })
    },

    addReaction({params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { runValidators: true, new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(404).json(err))
    },

    removeOneReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } } ,
            { runValidators: true, new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No Thoughts found with this id!' })
                return;
            }
            res.json({ message: 'Thought deleted!'});
        })
        .catch(err => res.status(404).json(err));
    }
};

module.exports = thoughtController;