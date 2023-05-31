import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    fetchPeople()
  }, []) // runs once on load.

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    axios.get('/people')
      .then((response) => {
        console.log(response.data);
        setPeopleArray(response.data)
      }).catch ((err) => {
        console.log(err);
      })


  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database
   axios.post('/people', {
    name:famousPersonName,
    role:famousPersonRole
   }).then((response) => {
    fetchPeople();
    // half of the job to empty the input
    famousPersonName('')
    famousPersonRole('')

   }).catch((err) => {
    console.log(err);
   })

    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {/* {famousPersonName} is famous for "{famousPersonRole}". */}
        </p>
        <ul>
        {/* {famousPersonName} is famous for "{famousPersonRole}". */}
          {/* TODO: Render the list of famous people */}
          {famousPeopleArray.map(famous => (
            <li key={famous.name}>
              {famous.name} is famous for {famous.role}

            </li>
          ))}
        </ul>
      </section>
    );
}

export default FamousSection;
