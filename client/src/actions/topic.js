import api from '../utils/api'

import {
  GET_TOPIC,
  GET_TOPICS,
  GET_FACTSHEET,
  TOPIC_ERROR,
} from './types';

// Get all topics
export const getTopics = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    const res = await api.get(`/topics?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: GET_TOPICS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// GET Topic by ID

export const getTopicById = (id) => async dispatch => {
    try {
      const res = await api.get(`/topics/${id}`);

      const formatedData = res.data.quiz.map((quizes) => {
        const incorrectAnswersIndexs = quizes.incorrect_answers.length;
        const randomIndex = Math.random() * (incorrectAnswersIndexs - 0) + 0
        quizes.incorrect_answers.splice(randomIndex, 0, quizes.correct_answer);
        return {
          ...quizes,
          answers: quizes.incorrect_answers,
        };
      });

    dispatch({
      type: GET_TOPIC,
      payload: formatedData
    });
        
  } catch (err) {
    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });   
 }
};


// Get FactSheet by ID

export const getFactSheetById = (id) => async dispatch => {
  try {
    const res = await api.get(`/topics/${id}`)

    dispatch({
      type: GET_FACTSHEET,
      payload: res.data
    })
    
  } catch (err) {
    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });   
    
  }
}














