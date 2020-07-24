import React, { useState } from 'react';
import API from '../../services/API'
import './style.css';

function Registration({history}) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async evt => {
        evt.preventDefault();
        console.log("result of submit", email, password, firstName, lastName);

        const response = await API.post('/api/registration', { firstName, lastName, email, password })
        const userId = response.data._id || false;
        if (userId) {
            localStorage.setItem('user', userId)
            history.push('/dashboard')
        } else {
            const { message } = response.data
            console.log(message)
        }
    }

    return (
        <div>
            <div className="field" >
                <div className="control">
                    <input className="input is-danger" type="text" placeholder="First Name" name="firstName" id="firstName" onChange={evt => setFirstName(evt.target.value)} />
                </div>
            </div>
            <div className="field" >
                <div className="control">
                    <input className="input is-success" type="text" placeholder="Last Name" name="lastName" id="lastName" onChange={evt => setLastName(evt.target.value)} />
                </div>
            </div>
            <div className="field" >
                <div className="control">
                    <input className="input is-danger" type="email" placeholder="Your email" name="email" id="email" onChange={evt => setEmail(evt.target.value)} />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input is-info" type="password" name="password" id="password" placeholder="Password" onChange={evt => setPassword(evt.target.value)} />
                </div>
            </div>
            <div className="control">
                <button className="button is-link" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default Registration;
