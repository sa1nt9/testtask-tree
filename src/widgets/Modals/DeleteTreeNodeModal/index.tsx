import { FC, useState } from 'react';
import ModalWrapper from '../../ModalWrapper';
import styles from './index.module.scss';
import Loader from '../../../entities/Loader';
import { observer } from 'mobx-react-lite';
import modalStore from '../../../shared/store/modals';
import TreeService from '../../../shared/api/treeService';
import { treeName } from '../../../shared/constants/treeName';
import { toast } from 'react-toastify';
import treeStore from '../../../shared/store/tree';


const DeleteTreeNodeModal: FC = observer(() => {
    const [loading, setLoading] = useState<boolean>(false);
    const { deleteTreeNode, setDeleteTreeNode } = modalStore
    const { setTree } = treeStore

    const handleClick = async () => {
        setLoading(true);
        try {
            await TreeService.deleteNode(treeName, deleteTreeNode.nodeId)
            const response = await TreeService.getTree(treeName);
            setTree(response.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.message)
        }
        setLoading(false);
        setDeleteTreeNode({ isOpen: false })
    }


    return (
        <ModalWrapper
            isOpen={deleteTreeNode.isOpen}
            setIsOpen={() => setDeleteTreeNode({ isOpen: false })}
            title='Delete'
        >
            <div className={styles.body}>
                <p className={styles.text}>Do you want to delete {deleteTreeNode.name}?</p>

                <div className={styles.bottom}>
                    <div className={styles.buttons}>
                        <button onClick={() => setDeleteTreeNode({ isOpen: false })} className={styles.cancel}>
                            <p className={styles.text}>Cancel</p>
                        </button>
                        <button disabled={loading} onClick={handleClick} className={styles.send}>
                            <p className={styles.text}>Delete</p>
                            {loading && <Loader size={18} color='#fff' />}
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
});

export default DeleteTreeNodeModal;