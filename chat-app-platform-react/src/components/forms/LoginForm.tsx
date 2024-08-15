import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/auth.service';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';
import { LoginProps } from './login.type';

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginProps>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginProps> = async (data: LoginProps) => {
    const isLoginSuccessful = await authService.login(data, setIsLogin);

    if (isLoginSuccessful) {
      navigate('/conversations');
      return;
    }

    setLoginError('Incorrect email or password. Please try again');
  };

  const emailValue = watch('email');
  const passwordValue = watch('password');

  useEffect(() => {
    if (loginError) {
      setLoginError('');
    }
  }, [emailValue, passwordValue]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputContainer>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <InputField
            type='email'
            id='email'
            {...register('email', { required: 'Email is required' })}
          ></InputField>
        </InputContainer>
        {errors.email && (
          <div className={styles.errorMessage}>{errors.email.message}</div>
        )}
      </div>
      <div>
        <InputContainer className={styles.loginFormPassword}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <InputField
            type='password'
            id='password'
            {...register('password', { required: 'Password is required' })}
          ></InputField>
        </InputContainer>
        {errors.password && (
          <div className={styles.errorMessage}>{errors.password.message}</div>
        )}
      </div>
      <Button className={styles.button}>
        {isLogin ? (
          <div className={styles['loader-container']}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          'Login'
        )}
      </Button>
      {loginError && <div className={styles.errorMessage}>{loginError}</div>}
      <div className={styles.footerText}>
        <span>Don't have an account?</span>
        <Link to={'/register'}>
          <span>Register</span>
        </Link>
      </div>
    </form>
  );
};
