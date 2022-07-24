import { useState } from 'react';
import './App.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import firebaseConfigarationInitiliZing from './Firebase/firebase-initialize';


firebaseConfigarationInitiliZing();

const auth = getAuth();

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const toggleLogin = e => {
    setIsLogin(e.target.checked)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handleRegistration = e => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Paasword must be atLeast 6 characters long')
      return;
    }
    if (!/(?=.*[0-9])/.test(password)) {
      setError('Please Assert a string has at least one number')
      return;
    }

    isLogin ? processLogin(email, password) : newRegistration(email, password)

  }

  const newRegistration = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setError('');
        verifyEmail();
      })
      .catch(error => {
        setError(error.message);
      })
    console.log(email, password);
  }

  const processLogin = (email, password) => {

    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user)
        setError('')
      })
      .catch(error => {
        setError(error.message)
      })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log(result)
      })
  }

  return (
    <div className="m-5" >
      <form onSubmit={handleRegistration} >
        <div class="row mb-3">
          <h2 className="text-regular" >Please {isLogin ? 'Login' : 'Register'}</h2>
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input onBlur={handleEmailChange} type="email" class="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
          <div class="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" class="form-control" id="inputPassword3" required />
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-10 offset-sm-2">
            <div class="form-check">
              <input onChange={toggleLogin} class="form-check-input" type="checkbox" id="gridCheck1" />
              <label class="form-check-label" for="gridCheck1">
                Already Register ?
              </label>
            </div>
          </div>
        </div>
        <div className="text-danger" ><h3>{error}</h3></div>
        <button type="submit" class="btn btn-primary">{isLogin ? 'Log In' : 'Register'}</button>
      </form>
    </div>
  )
}

export default App;
