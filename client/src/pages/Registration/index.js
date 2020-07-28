import React, { useState } from 'react';
import Container from '../../components/Container'
import API from '../../services/API'
import './style.css';

function Registration({ history }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = async evt => {
        evt.preventDefault();
        try {
            if (
                email !== '' &&
                password !== '' &&
                firstName !== '' &&
                lastName !== '') {
                const response = await API.post('./api/users', { firstName, lastName, email, password })
                // const userId = response.data._id || false;
                const user = response.data.user || false;
                const user_id = response.data.user_id || false;
                if (user && user_id) {
                    localStorage.setItem('user', user)
                    localStorage.setItem('user_id', user_id)
                    history.push('/')
                } else {
                    const { message } = response.data
                    setError(true)
                    setErrorMessage(message)
                    setTimeout(() => {
                        setError(false)
                        setErrorMessage("")
                    }, 2000)
                }
            }
            else {
                setError(true)
                setErrorMessage("You need to fill all the input")
                setTimeout(() => {
                    setError(false)
                    setErrorMessage("")
                }, 2000)

            }

        } catch (error) {
            Promise.reject(error);
            console.log(error.message);
        }
    }

    return (
        <Container>
            <div>
                <h1 className="regHeader"> Register</h1>
                <p>Please <strong>Register</strong> for a new account</p>
                <div className="field" >
                    <div className="control">
                        <input className="input is-warning" type="text" placeholder="First Name" name="firstName" id="firstName" onChange={evt => setFirstName(evt.target.value)} />
                    </div>
                </div>
                <div className="field" >
                    <div className="control">
                        <input className="input is-success" type="text" placeholder="Last Name" name="lastName" id="lastName" onChange={evt => setLastName(evt.target.value)} />
                    </div>
                </div>
                <div className="field" >
                    <div className="control">
                        <input className="input is-warning" type="email" placeholder="Your email" name="email" id="email" onChange={evt => setEmail(evt.target.value)} />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="input is-info" type="password" name="password" id="password" placeholder="Password" onChange={evt => setPassword(evt.target.value)} />
                    </div>
                </div>

                <div className="control">
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>

                <div className="control">
                    <button className="login-btn" onClick={() => history.push('/')}>Login</button>
                </div>

                {error ? (
                    <div className="notification is-danger is-light event-validation"> {errorMessage}</div>
                ) : ''}
            </div>
        </Container>
    )
}


export default Registration;
