import React, { ReactElement } from 'react';
import Loader from '../Loader/Loader';
import styles from './Button.module.css';

interface IProps {
    submit?: boolean;
    value: string;
    click: (e: any) => void;
    isDisabled: boolean;
    style: string;
    loading?: boolean;
}

const defaultProps = {
    submit: false,
    loading: false,
};

const Button = ({
    submit,
    value,
    click,
    isDisabled = false,
    style = '',
    loading,
}: IProps & typeof defaultProps): ReactElement => (
    <button
        className={`${styles.Button} ${!isDisabled ? style : ''}`}
        type={submit ? 'submit' : 'button'}
        disabled={isDisabled}
        onClick={(e) => click(e)}
    >
        {loading ? <Loader size="xs" color="white" /> : value}
    </button>
);

Button.defaultProps = defaultProps;

export default Button;
