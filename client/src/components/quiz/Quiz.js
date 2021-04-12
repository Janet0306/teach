import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import QuizItem from './QuizItem';
import { getTopicById } from '../../actions/topic';
import { saveScore } from '../../actions/profile';
import { SaveScoreForm } from './SaveScoreForm';


const Quiz = ({ getTopicById, topic: { topic }, saveScore,  match }) => {
    useEffect(() => {
        getTopicById(match.params.id);
    }, [getTopicById, match.params.id])

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false)
  

    const handleAnswer = (answer) => {
        if(!showAnswers) {
            if(answer === topic[currentIndex].correct_answer) {
                setScore(score + 1);
            }
        }
        setShowAnswers(true);
    };

    const handleNextQuestion = () => {
        setShowAnswers(false);

        setCurrentIndex(currentIndex + 1);
    }

    const id = match.params.id;
    let subjectType = "quiz"
    
    console.log(subjectType);
   

  return topic.length > 0 ? (
    <Fragment>
      <h1 className='large text-primary1 my-2'>Quiz</h1>
      <Link to="/topic" className="btn my-4"  title="Back to Topic">
          Back To Topics
      </Link>
      {currentIndex >= topic.length ? (
    <div>
     <SaveScoreForm topic={topic} score={score} />
        <button
          onClick={() => saveScore(id, {score, subjectType}, )}
          title="Save Quiz"
          type="button"
          className="btn btn-dark1"
        >
          Save Score
        </button>
    </div>
  ) : (
     <QuizItem 
        key={topic.question} 
        topic={topic[currentIndex]}
        showAnswers={showAnswers}
        handleNextQuestion={handleNextQuestion}
        handleAnswer={handleAnswer} 
      />
  )}
    </Fragment>
     ) : (
       <Spinner/>
  )
}

Quiz.propTypes = {
    getTopicById: PropTypes.func.isRequired,
    saveScore: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    topic: state.topic,
    showAnswers: state.showAnswers,
    handleNextQuestion: state.handleNextQuestion,
    handleAnswer: state.handleAnswer

})


export default connect(mapStateToProps, { getTopicById, saveScore })(Quiz)















