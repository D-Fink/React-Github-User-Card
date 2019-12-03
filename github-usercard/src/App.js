import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      followers: []
    }
  }
  componentDidMount() {
    Promise.all([
      fetch("https://api.github.com/users/D-Fink"),
      fetch("https://api.github.com/users/D-Fink/followers")
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1, data2]) => this.setState({
      user: data1,
      followers: data2
    }))
  }
  render() {
    console.log(this.state)
    return (
      <div className='user'> 
        <img src={this.state.user.avatar_url}/>
        <h2>{this.state.user.name}</h2>
        <p>{this.state.user.bio}</p>
        <h3>Followers:</h3>
        <div className='followerContainer'>
          {this.state.followers.map(item =>
          <div className='follower' key={item.id}>
            <img src={item.avatar_url}/>
            <h3>{item.login}</h3>
            <a href={item.html_url}>Checkout profile</a>
            <hr/>
          </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
