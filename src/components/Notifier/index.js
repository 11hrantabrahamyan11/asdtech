import {useState} from 'react';
import {useSnackbar} from 'notistack';
import {useDispatch, useSelector} from 'react-redux';
import {removeNotification, selectNotifications} from '~/ducks/notifier';

const Notifier = () => {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const notifications = useSelector(selectNotifications);
  const [displayed, setDisplayed] = useState([]);

  notifications.forEach(({key, message, type}) => {
    setTimeout(() => {
      const filterDisplayed = displayed.filter(
        (displayedKey) => displayedKey === key,
      );
      if (filterDisplayed.length) {
        return;
      }

      enqueueSnackbar(message, {
        variant: type,
      });
      setDisplayed([...displayed, key]);
      dispatch(removeNotification(key));
    }, 300);
  });

  return null;
};

export default Notifier;
