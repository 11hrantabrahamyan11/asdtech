import {makeStyles} from '@material-ui/core/styles';

const useRoot = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flex: 1,
    color: '#fff',
  },
  timeContainer: {
    height: '100%',
  },
  paper: {
    height: 320,
    maxWidth: 300,
    width: '100%',
    margin: '0 10px',
    padding: 10,
  },
  appButton: {
    marginLeft: 8,
  },
  main: {
    minHeight: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    marginBottom: '30px !important',
  },
  listContainer: {
    marginTop: '20px !important',
    padding: '0 15px !important',
    textAlign: 'center',
  },
  fieldError: {
    borderColor: '#f44336',
  },
  lockIcon: {
    width: 40,
    height: 40,
    display: 'flex',
    margin: '0 auto',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
    color: '#fff',
  },
}));

export default useRoot;
