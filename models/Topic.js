const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    
    question: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    incorrect_answers: [String],
    correct_answer: { type: String, required: true }

},
{
    timestamps: true,
}
)

const topicSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
    },
    imageOrginalName: {
        type: String,
    },
    quiz: [quizSchema],
    factSheet: {
        type: [String],
        required: true
  },
    filePath: {
        type: String
    },
    Text: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
}

)

module.exports = mongoose.model('topic', topicSchema);