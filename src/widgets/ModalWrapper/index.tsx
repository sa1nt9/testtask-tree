import { FC, PropsWithChildren, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import CloseSvg from "/src/assets/img/icons/close.svg?react";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";


interface PropsModalWrapper {
    isOpen: boolean;
    setIsOpen: any;
    title: string;
    maxWidth?: number;
}

const ModalWrapper: FC<PropsWithChildren<PropsModalWrapper>> = observer(({ isOpen, setIsOpen, title, children, maxWidth }) => {
    const scrollRef = useRef<number>(0)

    useEffect(() => {
        if (isOpen) {
            scrollRef.current = window.scrollY;
            document.body.classList.add('menu-open')
            document.body.style.top = `-${scrollRef.current}px`;
            document.body.style.width = '100%';
            console.log('open')

        } else {
            document.body.classList.remove('menu-open')
            document.body.style.removeProperty('top');

            window.scrollTo(0, scrollRef.current);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`${styles.container} ${isOpen ? styles.isOpen : ""}`}
                >
                    <div className={styles.blur} onClick={() => isOpen && setIsOpen(false)}></div>
                    <div className={styles.modal} style={{ maxWidth: maxWidth || 600 }}>
                        <div className={styles.header}>
                            <h2 title={title} className={styles.title}>{title}</h2>
                            <div className={styles.block}>
                                <div
                                    onClick={() => setIsOpen(false)}
                                    className={styles.close}
                                >
                                    <CloseSvg className={styles.image} />
                                </div>
                            </div>
                        </div>
                        {children}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
});

export default ModalWrapper;