import React, { ReactElement } from 'react';
import ChannelList from '../../common/ChannelsList/ChannelsList';

const SideBar = (): ReactElement => (
    <aside>
        <h3>Channels</h3>
        <ChannelList />
    </aside>
);

export default SideBar;
