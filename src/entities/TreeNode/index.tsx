import { FC, useState } from 'react';
import styles from './index.module.scss';
import { ITreeNode } from '../../shared/typescript/interfaces/ITreeNode';
import ArrowSvg from '/src/assets/img/icons/arrow.svg?react';
import AddSvg from '/src/assets/img/icons/add.svg?react';
import EditSvg from '/src/assets/img/icons/edit.svg?react';
import DeleteSvg from '/src/assets/img/icons/delete.svg?react';
import { observer } from 'mobx-react-lite';
import treeStore from '../../shared/store/tree';
import modalStore from '../../shared/store/modals';


interface PropsTreeNode {
    treeNode: ITreeNode
}

const TreeNode: FC<PropsTreeNode> = observer(({ treeNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClickRoot = () => {
        setIsOpen(prev => !prev)
        treeStore.setFocusedItemId(treeNode.id)
    }

    const handleClickAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        modalStore.setAddTreeNode({ isOpen: true, parentId: treeNode.id })
    }

    const handleClickEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        modalStore.setEditTreeNode({ isOpen: true, nodeId: treeNode.id, name: treeNode.name })
    }

    const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        modalStore.setDeleteTreeNode({ isOpen: true, nodeId: treeNode.id, name: treeNode.name })
    }

    return (
        <div className={styles.container}>
            <div onClick={handleClickRoot} className={`${styles.row} ${isOpen ? styles.opened : ''} ${treeStore.focusedItemId === treeNode.id ? styles.focused : ''}`}>
                <div className={`${styles.arrowIcon} ${treeNode.children.length > 0 ? styles.show : ''}`}>
                    <ArrowSvg className={styles.arrow} />
                </div>
                <div className={styles.block}>
                    <p className={styles.name}>{treeNode.name}</p>
                    <div className={styles.icons}>
                        <button onClick={handleClickAdd} className={`${styles.button} ${styles.add}`}>
                            <AddSvg className={styles.icon} />
                        </button>
                        <button onClick={handleClickEdit} className={`${styles.button} ${styles.edit}`}>
                            <EditSvg className={styles.icon} />
                        </button>
                        <button onClick={handleClickDelete} className={`${styles.button} ${styles.delete}`}>
                            <DeleteSvg className={styles.icon} />
                        </button>
                    </div>
                </div>
            </div>
            {(treeNode.children.length > 0 && isOpen) &&
                <div className={styles.children}>
                    {treeNode.children.map(i =>
                        <TreeNode key={i.id} treeNode={i} />
                    )}
                </div>
            }
        </div>
    )
});

export default TreeNode;