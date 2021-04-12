import React from 'react';

export const SaveScoreForm = ({ score, topic}) => {

    return (
        <div>
            <div className='bg-primary1 p-2 my-4'>
                <h1 className='large'>Review Your Score</h1>
                <p className="lead">Quiz ended! Your score is: {Math.round((score/topic.length) * 100)}%</p>
                <p>Save your score to your profile or go back to topics.</p>
            </div>
        </div>
    );
};



export default SaveScoreForm;