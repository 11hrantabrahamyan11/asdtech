import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {Paper, LinearProgress, Grid, Typography} from '@material-ui/core';

import {HelmetLayout} from '~/layouts';
import {useRootStyles} from '~/styles';
import {selectWssURL, subscribe} from '~/ducks/auth';

const Home = () => {
  const dispatch = useDispatch();
  const classes = useRootStyles();
  const wssURL = useSelector(selectWssURL);
  const [isLoading, setIsLoading] = useState(false);

  const subscribeHandler = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        await dispatch(subscribe());
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
  };

  const {readyState, lastMessage} = useWebSocket(wssURL, {
    onClose: subscribeHandler,
    onError: subscribeHandler,
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 3000,
    retryOnError: true,
  });

  const connectionStatus = {
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    subscribeHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HelmetLayout metaDescription="Lets just enjoy this page" title="Home">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="body2">
          The WebSocket is currently {connectionStatus}
        </Typography>
        {(isLoading || !lastMessage) && <LinearProgress />}
        {lastMessage && !isLoading && (
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.timeContainer}>
            <Typography>
              {moment(lastMessage.data.server_time).format('DD.MM.YY HH:mm:ss')}
            </Typography>
          </Grid>
        )}
      </Paper>
    </HelmetLayout>
  );
};

export default Home;
