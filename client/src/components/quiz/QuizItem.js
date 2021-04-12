import React from 'react'


const QuizItem = ({ showAnswers, handleAnswer, handleNextQuestion, topic: {question, correct_answer, answers}}) => {

    return (
        <div className='quiz-container'>
            <div className="quiz-question">
            <h2 className="lead" dangerouslySetInnerHTML={{ __html: question}} />
            </div>
            <div className="quiz-answer">
                {answers.map((answer,index) => {
                    const textColor = showAnswers ? answer === correct_answer ? 'btn-correct' : 'btn-incorrect' : 'quiz-answer-button';
                    return (
                    <button
                        key={index}
                        className={`${textColor}`}
                        onClick={() => handleAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }} 
                    />
                );
            })}
            </div>
            {showAnswers && (
            <button
                onClick={handleNextQuestion}
                 title="next question"
                className="quiz-next-btn">
                Next Question
            </button>
         )}
    </div>
    )

}

export default QuizItem
