import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Form from './form.jsx';
import HelloSign from 'hellosign-embedded';

const client = new HelloSign();


class HelloSignEmbedded extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      value: '',
      claimUrl: "https:\/\/embedded.hellosign.com\/prep-and-send\/embedded-request?cached_params_token=f461071145d759d6bd45d6808ded06f9"
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
    axios.get('http://localhost:3000/api/embedded_request')
      // .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data)
          this.setState({
            isLoaded: true,
            data: result.data,
            claimUrl: result.data.unclaimed_draft.claim_url
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
    const { error, isLoaded, data , value, claimUrl } = this.state;
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
            ClaimUrl: {claimUrl}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          {client.open(claimUrl,
      { clientId: '60f263538a0ebaf73b1e3cc745e6d787',
        skipDomainVerification: false
    })}
        </>
      );
    }
  }
};

ReactDOM.render(<HelloSignEmbedded />, document.getElementById("app"))