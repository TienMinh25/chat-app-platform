import { RefreshToken } from '@modules/auth/refresh-token.entity';
import { User } from '../../modules/user/user.entity';

const entities = [User, RefreshToken];

export { entities, User, RefreshToken };
