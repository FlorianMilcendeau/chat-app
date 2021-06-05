import React, { ReactElement, useState } from 'react';
import styles from './Notification.module.css';

interface Props {
    message: string;
    success: boolean;
}

const Notification = ({ message, success }: Props): ReactElement => {
    const [onClose, setOnClose] = useState<boolean>(false);

    return (
        <div
            className={`${styles.notificationWrapper} ${
                onClose ? styles.notificationClose : styles.notificationOpen
            }`}
        >
            <div
                className={`${styles.notification} ${
                    success
                        ? styles.notificationValid
                        : styles.notificationError
                }`}
            >
                {message}
                <button
                    className={styles.notificationCloseButton}
                    type="button"
                    onClick={() => setOnClose(!onClose)}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default Notification;
