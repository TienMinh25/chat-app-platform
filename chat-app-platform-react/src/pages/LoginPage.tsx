import { LoginForm } from '../components/forms';
import { Page } from '../utils/styles';

export const LoginPage: React.FC = () => {
  return (
    <Page display='flex' justifyContent='center' alignItems='center'>
      <LoginForm />
    </Page>
  );
};
