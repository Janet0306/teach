import {
  GET_TOPIC,
  GET_TOPICS,
  GET_FACTSHEET,
  TOPIC_ERROR,
} from '../actions/types';

const initialState = {
  topic: [],
  topics: [],
  loading: true,
  error: {}
};

function topicReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TOPIC:
    case GET_FACTSHEET:
      return {
        ...state,
        topic: payload,
        loading: false
      };
    case GET_TOPICS:
      return {
        ...state,
        topics: payload.topics,
        pages: payload.pages,
        page: payload.page,
        loading: false
      };
    case TOPIC_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        topic: null
      };
    default:
      return state;
  }
}

export default topicReducer;

