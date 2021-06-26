import React, { ComponentType, ReactElement } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { rootState } from '../../../redux';

import { currentChannelsSelector } from '../../../redux/channel/selectors';

import SideBar from '../../views/SideBar/SideBar';

import styles from './MainLayout.module.css';

interface IDashboardLayoutProps extends TConnectedProps {
    component: ComponentType;
}

const DashboardLayout = ({
    component: Component,
    channel,
}: IDashboardLayoutProps): ReactElement => (
    <main className={styles.wrapperDashboard}>
        <div className={styles.menu}>
            <SideBar />
        </div>
        <div className={styles.messageArea}>
            <Component />
        </div>
        <div className={styles.banner}>
            <h3>{channel.name}</h3>
        </div>
    </main>
);

const mapStateToProps = (state: rootState) => ({
    channel: currentChannelsSelector(state),
});

const connector = connect(mapStateToProps);
type TConnectedProps = ConnectedProps<typeof connector>;

export default connector(DashboardLayout);
