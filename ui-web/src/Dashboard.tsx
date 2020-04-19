import { FC, useEffect } from 'react';
import { webSocket } from 'rxjs/webSocket';

const Dashboard: FC<Props> = ({ wsUrl, running }) => {
  useEffect(() => {
    if (!running) {
      return;
    }
    const subject = webSocket(wsUrl);
    subject.subscribe();

    return () => subject.unsubscribe();
  }, [wsUrl, running]);

  return null;
};

interface Props {
  wsUrl: string;
  running: boolean;
}

export default Dashboard;
