import React from 'react';
import styles from './InitialName.module.css';

interface IInitialNameProps {
    name: string;
}

const InitialNameProps = ({ name }: IInitialNameProps) => {
    // I get the first two initials.
    let initial = '';
    if (name) {
        const split = name.split(' ');
        initial = split
            .map((el: string) => el[0].toUpperCase())
            .slice(0, 2)
            .join('');
    }

    // Random color.
    const palette = ['#ffb3ba', '#ffdfba', '#bae1ff'];
    const color = palette[Math.floor(Math.random() * palette.length)];

    return (
        <div style={{ backgroundColor: color }} className={styles.initialName}>
            {initial}
        </div>
    );
};

export default React.memo(InitialNameProps);
