import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Modal} from 'react-native-paper';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  dismissable?: boolean;
  onDismiss?(): void;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const BSModal: React.FC<Props> = props => {
  return (
    <Modal
      dismissable={props.dismissable}
      visible={props.visible}
      onDismiss={props.onDismiss}
      contentContainerStyle={props.contentContainerStyle}>
      {props.children}
    </Modal>
  );
};

BSModal.defaultProps = {
  contentContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  visible: false,
  dismissable: false,
};

export default BSModal;
