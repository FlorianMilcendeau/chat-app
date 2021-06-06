import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import type { rootState } from '../../../redux';
import { channelsSelector } from '../../../redux/channel/selectors';
import Loading from '../../HOC/Loading/Loading';
import InitialName from '../InitialName/InitialName';

import styles from './ChannelsList.module.css';

const ChannelsList = ({ channels }: TConnectedProps) => (
    <ul>
        {channels.length &&
            channels.map((channel) => (
                <li key={channel.id} className={styles.channelItem}>
                    <InitialName name={channel.name} />
                    {channel.name}
                </li>
            ))}
    </ul>
);

const mapStateToProps = (state: rootState) => ({
    channels: channelsSelector(state),
});

const connector = connect(mapStateToProps);
type TConnectedProps = ConnectedProps<typeof connector>;

export default connector(Loading<TConnectedProps>('channels')(ChannelsList));
