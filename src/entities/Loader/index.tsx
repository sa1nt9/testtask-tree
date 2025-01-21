import { FC } from 'react';
import styles from './index.module.scss';

interface PropsLoader {
    size?: number;
    color?: string
}

const Loader: FC<PropsLoader> = ({ size, color }) => {

    return (
        <div style={{ width: size || 20, border: ` ${size ? size / 5 : 4}px solid ${color || "#000"}` }} className={styles.loader}></div>
    )
}

export default Loader;