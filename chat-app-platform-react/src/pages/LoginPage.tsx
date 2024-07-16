import { LoginForm } from '../components/forms';
import { Page } from '../utils/styles';

export const LoginPage = () => {
  return (
    <Page display='flex' justifyContent='center' alignItems='center'>
      <LoginForm />
    </Page>
  );
};
