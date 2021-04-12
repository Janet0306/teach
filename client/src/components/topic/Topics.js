import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Paginate from '../layout/Paginate'
import TopicItem from './TopicItem';
import { getTopics } from '../../actions/topic';



const Topics = ({ getTopics, topic: { topics, loading, pages, page }, match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    useEffect(() => {
        getTopics(keyword, pageNumber);
    }, [getTopics, keyword, pageNumber])

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="large text-primary1 my-2">Pick a Topic</h1>
                    <Link to="/topic" className="btn my-4"  title="Back to Topics">
                        Back To Topics
                    </Link>
                    <div className="card-grid-home">
                        {topics.length > 0 ? (
                            topics.map(topic => (
                                <TopicItem key={topic._id} topic={topic} />
                            ))
                        ) : (
                            <h4>No topics found......</h4>
                        
                        )}
                    </div>
                    <div className="my-5">
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )

};

Topics.prototype = {
    getTopics: PropTypes.func.isRequired,
    topic: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    topic: state.topic
})

export default connect(mapStateToProps, { getTopics })(Topics)













