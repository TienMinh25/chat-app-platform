import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles';
import styles from './index.module.scss';

export const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <InputContainer>
        <InputLabel htmlFor='email'>Email</InputLabel>
        <InputField type='email' id='email'></InputField>
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor='firstName'>First Name</InputLabel>
          <InputField type='text' id='firstName'></InputField>
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor='lastName'>Last Name</InputLabel>
          <InputField type='text' id='lastName'></InputField>
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor='password'>Password</InputLabel>
        <InputField type='password' id='password'></InputField>
      </InputContainer>
      <Button className={styles.button}>Create new account</Button>
    </form>
  );
};
