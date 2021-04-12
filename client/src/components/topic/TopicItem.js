import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ShowMoreText from 'react-show-more-text';


const TopicItem = ({
    topic: {
        _id,
        subject,
        level,
        imagePath,
        text
    }
}) => {

     const executeOnClick = (isExpanded) => {
        console.log(isExpanded);
    }

    return (
        <div>
        <CardGroup>
        <Card className="card-topic" style={{ width: '18rem'}}>
            <Card.Img variant="top" src={imagePath} alt='' />
            <Card.Body>
                <Card.Title className="lead">Subject: {subject}</Card.Title>
                <Card.Text><strong>Level: {level}</strong></Card.Text>
                <ShowMoreText
                    lines={3}
                    more='Show more'
                    less='Show less'
                    className='topic-text'
                    anchorClass='my-anchor-css-class'
                    onClick={executeOnClick}
                    expanded={false}
                >
                    {text}
                </ShowMoreText>
          
                <Link to={`/topic/factsheet/${_id}`} className='btn btn-primary1 my-1'  title="FactSheet">
                    Fact Sheet
                </Link>
                <Link to={`/topic/quiz/${_id}`} className='btn btn-primary1 my-1'  title="Quiz">
                    Quiz
                </Link>
                <Link to={`/topic/flashcard/${_id}`} className='btn btn-primary1 my-1'  title="Flashcard">
                    Flash Card
                </Link>
            </Card.Body>
        </Card>
        </CardGroup>
    </div>
    )
};

TopicItem.propTypes = {
    topic: PropTypes.object.isRequired
}

export default TopicItem;
















