import shortid from 'shortid';

import {HomeContainer, LoginContainer, NotFoundContainer} from '~/containers';

import paths from './paths';

const routes = [
  {
    id: shortid.generate(),
    path: paths.login,
    Component: LoginContainer,
  },
  {
    id: shortid.generate(),
    path: paths.homepage,
    Component: HomeContainer,
    isPrivate: true,
  },
  {
    id: shortid.generate(),
    path: paths.notFound,
    Component: NotFoundContainer,
    notFound: true,
  },
];

export default routes;
