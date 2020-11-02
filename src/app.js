import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class HelloSignEmbedded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/test')
      // .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data)
          this.setState({
            isLoaded: true,
            data: result.data
          });
        }
      )
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      })
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <h1>Title </h1>
          <h3>Subtitle</h3>
          <div>
            {data}
          </div>
        </>
      );
    }
  }
};

ReactDOM.render(<HelloSignEmbedded />, document.getElementById("app"))