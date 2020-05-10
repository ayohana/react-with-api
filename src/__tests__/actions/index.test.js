import * as actions from './../../actions';
import * as c from './../../actions/ActionTypes';

describe('headline reducer actions', () => {
  it('requestHeadlines should create REQUEST_HEADLINES action', () => {
    expect(actions.requestHeadlines()).toEqual({
      type: c.REQUEST_HEADLINES
    });
  });

  it('getHeadlinesSuccess should create GET_HEADLINES_SUCCESS action', () => {
    const headlines = "A headline";
    expect(actions.getHeadlinesSuccess(headlines)).toEqual({
      type: c.GET_HEADLINES_SUCCESS,
      headlines
    });
  });

  it('getHeadlinesFailure should create GET_HEADLINES_FAILURE action', () => {
    const error = "An error";
    expect(actions.getHeadlinesFailure(error)).toEqual({
      type: c.GET_HEADLINES_FAILURE,
      error
    });
  });
});