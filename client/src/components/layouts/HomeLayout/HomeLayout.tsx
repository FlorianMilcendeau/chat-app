import React, { ComponentType, ReactElement } from 'react';

import logo from '../../../assets/logos/wribe-black.svg';
import picture from '../../../assets/pictures/pexels-anna-shvets-5231319.jpg';

import styles from './HomeLayout.module.css';

interface IHomeLayoutProps {
    component: ComponentType;
}

const HomeLayout = ({
    component: Component,
}: IHomeLayoutProps): ReactElement => (
    <main className={styles.home}>
        <section className={styles.sectionPicture}>
            <img
                className={styles.pictureCaroussel}
                src={picture}
                alt="caroussel"
            />
        </section>
        <section className={styles.sectionForm}>
            <img className={styles.homeLogo} src={logo} alt="logo Wribe" />
            <Component />
        </section>
    </main>
);

export default HomeLayout;
