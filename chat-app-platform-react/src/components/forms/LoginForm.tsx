import { Link } from 'react-router-dom';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginProps } from './login.type';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = (data: LoginProps) => {
    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor='email'>Email</InputLabel>
        <InputField
          type='email'
          id='email'
          {...register('email', { required: 'Email is required' })}
        ></InputField>
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <InputField
          type='password'
          id='password'
          {...register('password', { required: 'Password is required' })}
        ></InputField>
      </InputContainer>
      <Button className={styles.button}>Login</Button>
      <div className={styles.footerText}>
        <span>Don't have an account?</span>
        <Link to={'/register'}>
          <span>Register</span>
        </Link>
      </div>
    </form>
  );
};
