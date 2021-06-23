import React, { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import type { IMessage } from '../../../redux/types';
import type { rootState } from '../../../redux';

import { messagesSelector } from '../../../redux/channel/selectors';

import InitialName from '../InitialName/InitialName';

import styles from './MessagesList.module.css';

dayjs.extend(relativeTime);

const MessageItem = ({ messages }: TConnectedProps): ReactElement => (
    <ul>
        {messages.length &&
            messages.map((message: IMessage) => (
                <li key={message.id} className={styles.wrapperMessage}>
                    <InitialName name={message.user.name as string} />
                    <div className={styles.messageContent}>
                        <div className={styles.messageAuthor}>
                            {message.user.name as string}
                        </div>
                        <time className={styles.messageCreatedAt}>
                            {dayjs(message.createdAt).fromNow()}
                        </time>
                        <div className={styles.message}>{message.content}</div>
                    </div>
                </li>
            ))}
    </ul>
);

const mapStateToProps = (state: rootState) => ({
    messages: messagesSelector(state),
});

const connector = connect(mapStateToProps);
type TConnectedProps = ConnectedProps<typeof connector>;

export default connector(MessageItem);
