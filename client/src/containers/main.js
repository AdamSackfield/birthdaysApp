import axios from 'axios';
import moment from 'moment';

import React, { Component } from 'react';
class Main extends Component {
	constructor(props) {
		super(props);

		this.getDate = () => {
			let date = new Date();
			let dd = date.getDate();
			let mm = date.getMonth();
			let yyyy = date.getFullYear();

			return `${yyyy}/${mm}/${dd}`;
		};

		this.state = {
			birthdays: [],
			dateToday: this.getDate(),
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:8080/api/birthdays')
			.then(response => {
				this.setState({ birthdays: response.data.birthdays });
			})
			.catch(error => {
				console.log('Error', error);
			});
	}

	checkDaysUntil = data => {
    // Arrays to hold users dependning on which category.
		let birthdayToday = [];
		let withinTwoWeeks = [];
		let tracking = [];

    // Map over all users
		data.map(user => {
      // Work Out Current Age
      user.age = moment().format('YYYY') - moment(user.birthday).format('YYYY');

      // Replace the Year of Birth with current year. Helps to calculate days until birthday.
      user.birthdayCalc = user.birthday.toString().replace(/[0-9]{4}/g, new Date().getFullYear());
      user.birthdayCalc = moment(user.birthdayCalc);
     
      // Used to retain actual Year of Birth - Also Formatting
      user.birthday = moment(user.birthday)
      user.birthday = user.birthday.format('DD/MM/YYYY')

      // Set today date and calculate difference in days
			let today = moment().format('YYYY-MM-DD');
			let diff = user.birthdayCalc.diff(today, 'days');
      
      // If Diff is negative then birthday has passed this year. So add on 366 days for next birthday. (Won't be accurate what with leap years. I tried 365 but it was out by a day, unless the site I used to check was out.)
      if (diff < 0) {
				diff += 366;
			}
			user.diff = diff;

      // Check which array to put the user. 
			if (user.birthdayCalc.isSame(today)) {
				birthdayToday.push(user);
			} else if (diff <= 14) {
				withinTwoWeeks.push(user);
			} else {
				tracking.push(user);
      }
      return 1
		});

    // Return the arrays as an Object
		return {
			birthdayToday,
			withinTwoWeeks,
			tracking,
		};
  };
  
  // Removes a user with given ID
  removeUser = id => {
    axios
    .delete('http://localhost:8080/api/delete/', { data: { _id: id }})
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

	render() {
    // Populates data once axios has filled birthdays array
		let data;
		if (this.state.birthdays.length >= 1) {
			data = this.checkDaysUntil(this.state.birthdays);
		}

    // If Data then maps over each array and outputs the users.
		if (data) {
			return (
				<div>
					<h1>Birthday App</h1>

					<section style={{ textAlign: 'center', marginBottom: '20px' }}>
						<h1>Today</h1>
						{
              data.birthdayToday.length > 0 ? (
                data.birthdayToday.map(user => {
                  return (
                    <div key={user._id}>
                      <p>It's {user.name}'s Birthday. {user.age} today</p>
                      <p>DOB: {user.birthday}</p>
                      <button onClick={() => this.removeUser(user._id)}>Remove</button>
                    </div>
                  );
                })
              ) :
              <p>No Birthdays Today</p>
            }
					</section>

					<section style={{ textAlign: 'center', marginBottom: '20px' }}>
						<h1>Within 2 Weeks</h1>
						{data.withinTwoWeeks.map(user => {
							return (
								<div key={user._id}>
									<p>{user.name} will be {user.age} years old in {user.diff} days</p>
									<p>DOB: {user.birthday}</p>
                  <button onClick={() => this.removeUser(user._id)}>Remove</button>
								</div>
							);
						})}
					</section>

					<section style={{ textAlign: 'center', marginBottom: '20px' }}>
						<h1>Tracking Users Birthdays</h1>
						{data.tracking.map(user => {
							return (
								<div key={user._id}>
									<p>Name: {user.name}</p>
									<p>DOB: {user.birthday}</p>
                  <button onClick={() => this.removeUser(user._id)}>Remove</button>
								</div>
							);
						})}
					</section>
				</div>
			);
		}
		return <p>Loading...</p>;
	}
}

export default Main;
