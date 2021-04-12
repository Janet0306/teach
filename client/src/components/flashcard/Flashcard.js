import React, {Fragment, useEffect} from 'react'
import PropType from 'prop-types'
import { getTopicById } from '../../actions/topic'
import { Link } from 'react-router-dom';
import FlashcardItem from './FlashcardItem'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { saveScore } from '../../actions/profile';

const Flashcard = ({ getTopicById, topic: { topic, loading }, saveScore, match }) => {
    useEffect(() => {
        getTopicById(match.params.id);
    }, [getTopicById, match.params.id])


    let subjectType = "flashcard"
   
    const id = match.params.id


    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
        <Fragment>
           <h1 className='large text-primary1 my-2'>Flashcard</h1>
            <Link to="/topic" className="btn my-4"  title="Back to Topic">
                Back To Topics
            </Link>
            <button
                onClick={() => saveScore(id, {subjectType})}
                title="Save Flashcard"
                type="button"
                className="btn btn-dark1 my-2"
            >
                Save FlashCard
            </button>
            <div className="card-grid">
                {topic.length > 0 ? (
                topic.map(topic => (
                    <FlashcardItem key={topic.question} topic={topic} />
                ))
                ) : (
                    <h4>No Flashcard found</h4>
                )}
            </div>
        </Fragment>
    )}
    </Fragment>
    );
}

Flashcard.propType = {
    getTopicById: PropType.func.isRequired,
    saveScore: PropType.func.isRequired,
    topic: PropType.object.isRequired
}

const mapStateToProps = state => ({
    topic: state.topic
})

export default connect(mapStateToProps, { getTopicById, saveScore })(Flashcard)



