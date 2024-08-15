import { RegisterForm } from '../components/forms';
import { Page } from '../utils/styles';

export const RegisterPage: React.FC = () => {
  return (
    <Page display='flex' justifyContent='center' alignItems='center'>
      <RegisterForm />
    </Page>
  );
};
