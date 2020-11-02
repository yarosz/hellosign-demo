import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './form.jsx';

class HelloSignEmbedded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
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
            AccountID: {data.account.account_id}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </>
      );
    }
  }
};

ReactDOM.render(<HelloSignEmbedded />, document.getElementById("app"))