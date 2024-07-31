import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';
import { RegisterProps } from './register.type';
import callApi from '../../utils/api';
import { useState } from 'react';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit: SubmitHandler<RegisterProps> = async (
    data: RegisterProps,
  ) => {
    try {
      const response = await callApi('auth/register', 'POST', data);

      if (response) {
        setIsRegistered(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isRegistered) {
    return (
      <div className={styles.messageContainer}>
        <div className={styles.messageIcon}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className={styles.iconSize}
          >
            <path
              fillRule='evenodd'
              d='M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className={styles.messageTitle}>ĐĂNG KÝ THÀNH CÔNG</div>
        <div className={styles.messageText}>
          <p>Chúc mừng! Bạn đã tạo tài khoản thành công.</p>
          <p>Vui lòng kiểm tra email để xác nhận.</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <InputContainer>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <InputField
            type='email'
            id='email'
            {...register('email', { required: 'Email is required' })}
          />
        </InputContainer>
        {errors.email && (
          <div className={styles.errorMessage}>{errors.email.message}</div>
        )}
      </div>

      <div>
        <InputContainer style={{ margin: '8px 0' }}>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <InputField
            type='text'
            id='username'
            {...register('username', { required: 'Username is required' })}
          />
        </InputContainer>
        {errors.username && (
          <div className={styles.errorMessage}>{errors.username.message}</div>
        )}
      </div>

      <div>
        <section className={styles.nameFieldRow}>
          <div className={styles.fieldWrapper}>
            <InputContainer>
              <InputLabel htmlFor='firstName'>First Name</InputLabel>
              <InputField
                type='text'
                id='firstName'
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
            </InputContainer>
            {errors.firstName && (
              <div className={styles.errorMessage}>
                {errors.firstName.message}
              </div>
            )}
          </div>
          <div className={styles.fieldWrapper}>
            <InputContainer>
              <InputLabel htmlFor='lastName'>Last Name</InputLabel>
              <InputField
                type='text'
                id='lastName'
                {...register('lastName', { required: 'Last name is required' })}
              />
            </InputContainer>
            {errors.lastName && (
              <div className={styles.errorMessage}>
                {errors.lastName.message}
              </div>
            )}
          </div>
        </section>
      </div>

      <div>
        <InputContainer>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <InputField
            type='password'
            id='password'
            {...register('password', { required: 'Password is required' })}
          />
        </InputContainer>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>

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
