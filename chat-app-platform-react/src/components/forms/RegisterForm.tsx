import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';
import { RegisterProps } from './register.type';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>();

  console.log(errors);
  const onSubmit: SubmitHandler<RegisterProps> = (data: RegisterProps) => {
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
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor='firstName'>First Name</InputLabel>
          <InputField
            type='text'
            id='firstName'
            {...register('firstName', { required: 'First name is required' })}
          ></InputField>
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor='lastName'>Last Name</InputLabel>
          <InputField
            type='text'
            id='lastName'
            {...register('lastName', { required: 'Last name is required' })}
          ></InputField>
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <InputField
          type='password'
          id='password'
          {...register('password', { required: 'Password is required' })}
        ></InputField>
      </InputContainer>
      <Button className={styles.button}>Create new account</Button>
      <div className={styles.footerText}>
        <span>Already have an account?</span>
        <Link to={'/login'}>
          <span>Login</span>
        </Link>
      </div>
    </form>
  );
};
