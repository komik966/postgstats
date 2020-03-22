import { FC, useEffect } from 'react';
import { webSocket } from 'rxjs/webSocket';

const Dashboard: FC<Props> = ({ wsUrl }) => {
  useEffect(() => {
    const subject = webSocket(wsUrl);
    subject.subscribe();
    subject.next('foo');

    return () => {
      if (!subject.closed) {
        subject.unsubscribe();
      }
    };
  }, [wsUrl]);

  return null;
};

interface Props {
  wsUrl: string;
}

export default Dashboard;
