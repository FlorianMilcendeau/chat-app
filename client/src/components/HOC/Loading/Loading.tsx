/* eslint-disable @typescript-eslint/ban-types */
import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';

import { backendReducer, rootState } from '../../../redux';
import Loader from '../../common/Loader/Loader';
import styles from './Loading.module.css';

const Loading = <WrappedProps extends object>(
    reducerName: keyof typeof backendReducer,
) => (Component: ComponentType<WrappedProps>) => {
    const WithLoading = (props: WrappedProps) => {
        const reducer = useSelector((state: rootState) => state[reducerName]);

        return reducer.loading ? (
            <div className={styles.wrapperLoader}>
                <Loader color="primary" />
            </div>
        ) : (
            <Component {...props} />
        );
    };

    return WithLoading;
};

export default Loading;
