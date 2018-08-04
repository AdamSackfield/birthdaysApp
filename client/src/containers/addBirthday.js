import React, { Component } from 'react'
import axios from 'axios'

  class AddBirthday extends Component {
    constructor(props) {
      super(props) 

      this.state = {
        name: '',
        birthday: ''
      }
    }

    onNameChange = (e) => {
      this.setState({ name: e.target.value })
    }

    onBirthdayChange = (e) => {
      this.setState({ birthday: e.target.value })
    }

    onSubmit = () => {
      axios
        .post('http://localhost:8080/api/new', { name: this.state.name, birthday: this.state.birthday})
        .then(response => {
          console.log('Date Added')
        })
        .catch(error => {
          console.log('Error', error)
        })

    }

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <label>Name</label>
          <input type="text" placeholder='Enter your name' onChange={this.onNameChange} value={this.state.name} />

          <label>Birthday</label>
          <input type="date" onChange={this.onBirthdayChange} value={this.state.birthday} />

          <button type='submit'>Add to Tracker</button>
        </form>
      )
    }
  }

export default AddBirthday