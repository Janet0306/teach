import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTopic } from '../../actions/profile';

const TopicDetail = ({ 
    topic: {
        topic,
    _id,
    subjectType,
    score,
       },
    deleteTopic

    }) => {
    return (
        <div className="topic bg-white p-2 my-2">
            <div className="row">
            <div className="column"><p className="lead">{ subjectType && subjectType[0].toUpperCase() + subjectType.substring(1)}</p></div>
            <div className="column"><p className="lead">{topic.subject && topic.subject[0].toUpperCase() + topic.subject.substring(1)}</p></div>
            <div className="column hide-sm"><p className="lead">{topic.level && topic.level[0].toUpperCase() + topic.level.substring(1)}</p></div>
            <div className="column"><p className="lead">{score > 0 ? (score) + "/10" : (<span> </span>)}</p></div>
                <button
                    onClick={() => deleteTopic(_id)}
                    className="btn btn-danger m-2"
                    title="Delete Topic"
                >
                <i className="fas fa-times" />
                </button>
                <button
                    className="btn btn-white my-2"
                    title="Go to Topic"
                >
                <Link className="myLink" to={`/topic/${subjectType}/${topic._id}`}>
                <i className="fas fa-file fa-1x py-2 "></i>
                </Link>
                </button>
            </div>
        </div>
	)
}


TopicDetail.propTypes = {
    topic: PropTypes.object.isRequired,
    deleteTopic: PropTypes.func.isRequired
}

export default connect(null, { deleteTopic })(TopicDetail);






           
           
          
