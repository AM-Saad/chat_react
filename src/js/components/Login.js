import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { post_login } from "../actions/index";


const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }

  }
}
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.length  > 0 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.length  > 0}

  }
}
function Form() {
  const dispatch = useDispatch();
  const authMeta = useSelector(state => state.authMeta)
  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: null })
  const [formIsValid, setFormIsValid] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)




  // Submit user name
  function submit(e) {
    // Dispatch the user email to the store
    e.preventDefault()
    dispatch(post_login(emailState.value, passwordState.value))
  }

  const emailChangeHandler = (e) => {
    dispatchEmailState({ type: 'USER_INPUT', value: e.target.value })
  }
  const checkEmailValidity = (e) => {
    dispatchEmailState({ type: 'INPUT_BLUR' })

  }
  const passwordChangeHandler = (e) => {
    dispatchPasswordState({ type: 'USER_INPUT', value: e.target.value })
  }
  const checkPasswordValidity = (e) => {
    dispatchPasswordState({ type: 'INPUT_BLUR' })

  }

  const {isValid: emailValid} = emailState
  const {isValid: passwordValid} = passwordState

  useEffect(() => {
    setErrorMsg(authMeta.error)
    setFormIsValid(emailValid && passwordValid)
  }, [authMeta,emailValid, passwordValid])

  const SubmitButton = () => {
    if (authMeta.loading) {
      return <button
        className="opacity-30 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Loading...
      </button>
    } else {
      return <button
        type="submit"
        disabled={authMeta.loading || !formIsValid}
        className={`${!formIsValid ? 'opacity-30 ': ' '}  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        Sign in
      </button>

    }
  }

  return <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{' '}
        <a href="" className="font-medium text-indigo-600 hover:text-indigo-500">
          Register Here
        </a>
      </p>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={(e) => submit(e)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={emailChangeHandler}
                onBlur={checkEmailValidity}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={passwordChangeHandler}
                onBlur={checkPasswordValidity}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <p className="text-red-500">{errorMsg}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            {SubmitButton()}
          </div>
        </form>
      </div>
    </div>
  </div>
}

export default Form;