import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyService } from '../../services/verify/verify.service';
import styles from './index.module.scss';

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailVerifyToken: string = searchParams.get('token') ?? '';
  let isVerifyEmail: boolean;
  useEffect(() => {
    (async () => {
      isVerifyEmail = await verifyService.verifyEmail(emailVerifyToken);

      if (isVerifyEmail) {
        navigate('/conversations');
        return;
      }

      navigate('/login');
    })();
  }, []);

  return (
    <div className={styles['verify-email-container']}>
      <div className={styles['verify-email-box']}>
        <h1>Email Verification</h1>
        <p className={styles['verify-email-message']}>
          We're verifying your email address. Please wait a moment.
        </p>
        <div className={styles['loader-container']}>
          <div className={styles.loader}></div>
        </div>
      </div>
    </div>
  );
};
