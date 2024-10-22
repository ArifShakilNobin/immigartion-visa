import { environment } from 'src/environment/environment';
import { read } from 'xlsx';

export const applicationUrls = {
  authentication: {
    create: 'create-permission',
    read: 'read-permissions',
    update: 'update-permission',
    delete: 'delete-permission',
  },
  authorization: {
    create: 'create-permission',
    read: 'read-permissions',
    update: 'update-permission',
    delete: 'delete-permission',
  },
  test: {
    getTest: environment.baseApiUrl + 'test',
  },
  user: {
    login: environment.baseApiUrl + 'auth/login',
    register: environment.baseApiUrl + 'auth/register',
  },

};
