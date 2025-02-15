import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Form.css';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const { handleLogin } = useAuth();

  const initialForm = {
    userInfo: 'emilys',
    passField: 'emilyspass',
    rememberMe: false,
  };


  const {
    register,
    handleSubmit,
    formState: { errors, isValid, values },
  } = useForm({
    defaultValues: initialForm,
    mode: 'all',
  });

  const handleSubmitCustom = (data) => {
    const loginData = {
      username: data.userInfo,
      password: data.passField,
      expiresInMins: 60,
      rememberMe: data.rememberMe,
    };

    handleLogin(loginData);
  };

  return (
    <>
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit(handleSubmitCustom)}
        className="flex column gap-s"
      >
        <div className="input-group">
          <label htmlFor="emailormobile">Email or mobile number</label>
          <input
            {...register('userInfo', {
              required: 'Email or mobile number is required',
            })}
            type="text"
            placeholder="your user info"
            id="emailormobile"
          />
        </div>
        {errors.userInfo && (
          <div className="error">{errors.userInfo?.message}</div>
        )}
        <div className="input-group">
          <label htmlFor="pass">Password</label>
          <input
            {...register('passField', {
              required: 'Please enter a password',
              minLength: {
                value: 8,
                message: 'Your password is shorter than expected',
              },
            })}
            type="password"
            placeholder="your password"
            id="pass"
          />
        </div>
        {errors.passField && (
          <div className="error">{errors.passField?.message}</div>
        )}
        <button
          disabled={!isValid}
          type="submit"
          className="primary-button large"
        >
          Sign In
        </button>
        <div className="text-center">OR</div>
        <button className="secondary-button large">Use a Sign-In Code</button>
        <Link to="/reset-password">Forgot Password?</Link>

        <div className="input-group">
          <input
            {...register('rememberMe')}
            type="checkbox"
            id="rememberUser"
          />
          <label htmlFor="rememberUser">Remember me</label>
        </div>
        <div>
          New to Witflix? <Link to="/register">Sign up now</Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
