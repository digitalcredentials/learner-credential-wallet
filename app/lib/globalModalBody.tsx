import React from 'react';
import { Text } from 'react-native-elements';
import { LoadingIndicatorDots } from '../components';
import { useDynamicStyles } from '../hooks';

type GlobalModalBodyProps = {
  message: string;
  loading?: boolean;
};

export default function GlobalModalBody({
  message,
  loading=false
}: GlobalModalBodyProps): JSX.Element {
  const { mixins } = useDynamicStyles();
  return (
    <>
      <Text style={mixins.modalBodyText}>
        {message}
      </Text>
      {loading && <LoadingIndicatorDots />}
    </>
  );
}

export const getGlobalModalBody = (message: string, loading?: boolean): JSX.Element => {
  return <GlobalModalBody message={message} loading={loading} />;
};
