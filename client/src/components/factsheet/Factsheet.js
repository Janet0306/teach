import React, {Fragment, useEffect} from 'react'
import api from '../../utils/api'
import PropType from 'prop-types'
import { Link } from 'react-router-dom';
import { getFactSheetById} from '../../actions/topic'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { saveScore } from '../../actions/profile';
import download from 'downloadjs'


const Factsheet = ({ getFactSheetById, topic: { topic, loading }, saveScore, match}) => {
    useEffect(() => {
        getFactSheetById(match.params.id);
    }, [getFactSheetById, match.params.id])


    const downloadFile = async (id, path, mimetype) => {
        try {
            const res = await api.get(`/topics/download/${id}`, {
                responseType: 'blob'
            });
            const split = path.split('/');
            const filename = split[split.length - 1];
            return download(res.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Error while downloading file. Try again later');
            }
            
        }
    };

    let subjectType = "factsheet"
    const id = match.params.id
 
    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
            <Fragment>
            <h1 className='large text-primary1 my-2'>Fact Sheet</h1>
        <div>
            <h3>{topic.subject} - {topic.level}</h3>
        </div>
        <Link to="/topic" className="btn my-4"  title="Back to Topics">
            Back To Topics
        </Link>
        <button 
        className="btn btn-primary1 my-4"
         title="Download File"
        onClick={() => downloadFile( topic._id, topic.filePath, topic.fileMimeType )}
        >
            Download File
        </button>
        <button
            onClick={() => saveScore(id, {subjectType})}
            title="Save FactSheet"
            type="button"
            className="btn btn-dark1 my-4"
        >
            Save FactSheet
        </button>
            <Fragment>
	            {topic.factSheet && topic.factSheet.map((topic, index) => (
		            <div key={index}>
			        <p>{topic}</p>
		            </div>
	            ))} : <Fragment><h4>No Factsheet Available</h4></Fragment>
          </Fragment>
        <button 
        className="btn btn-primary1 my-4"
        title="Download File"
        onClick={() => downloadFile( topic._id, topic.filePath, topic.fileMimeType )}
        >
            Download File
        </button>
      
        </Fragment>
    )}
    </Fragment>
    )
}




Factsheet.propType = {
    getFactSheetById: PropType.func.isRequired,
    saveScore: PropType.func.isRequired,
    topic: PropType.object.isRequired,
}

const mapStateToProps = state => ({
    topic: state.topic
})

export default connect(mapStateToProps, { getFactSheetById, saveScore })(Factsheet)