import React, { ReactElement } from 'react';
import styles from './TextError.module.css';

interface Props {
  value: string | undefined;
}

const TextError = ({ value }: Props): ReactElement => {
  return <span className={styles.textError}>{value}</span>;
};

export default TextError;
