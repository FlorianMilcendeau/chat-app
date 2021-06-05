import React, { ComponentType, ReactElement } from 'react';
import styles from './DashboardLayout.module.css';

interface IDashboardLayoutProps {
    component: ComponentType;
}

const DashboardLayout = ({
    component: Component,
}: IDashboardLayoutProps): ReactElement => (
    <main className={styles.wrapperDashboard}>
        <div className={styles.menu}>Menu</div>
        <div className={styles.messageArea}>
            <Component />
        </div>
        <div className={styles.banner}>
            <h2>Welcome</h2>
        </div>
    </main>
);

export default DashboardLayout;
