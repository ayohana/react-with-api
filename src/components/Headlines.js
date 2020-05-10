import React from 'react';
import { connect } from 'react-redux';
import { makeApiCall } from '../actions/index';

class Headlines extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(makeApiCall());
  }
  // There is a downside to this - the potential to hit API limits very quickly. Any time the component is reloaded, another call will be made. If you're using this approach to make calls to an API that has strict limits, be careful about having a local server running while you're working - because every time you make a change to your code, it'll trigger a component reload and another API call.

  render() {
    const { error, isLoaded, headlines } = this.props;
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (!isLoaded) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>Headlines</h1>
          <ul>
            {headlines.map((headline, index) =>
              <li key={index}>
                <h3>{headline.title}</h3>
                <p>{headline.abstract}</p>
              </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    headlines: state.headlines,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(mapStateToProps)(Headlines);