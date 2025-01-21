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


const EditTreeNodeModal: FC = observer(() => {
    const [loading, setLoading] = useState<boolean>(false);
    const { editTreeNode, setEditTreeNode } = modalStore
    const { setTree } = treeStore

    const handleClick = async () => {
        setLoading(true);
        try {
            await TreeService.renameNode(treeName, editTreeNode.nodeId, editTreeNode.name)
            const response = await TreeService.getTree(treeName);
            setTree(response.data);
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
        setLoading(false);
        setEditTreeNode({ isOpen: false })
    }


    return (
        <ModalWrapper
            isOpen={editTreeNode.isOpen}
            setIsOpen={() => setEditTreeNode({ isOpen: false })}
            title='Rename'
        >
            <div className={styles.body}>
                <div className={styles.inputBlock}>
                    <p className={styles.name}>New Node Name</p>
                    <input
                        placeholder={'Enter new node name...'}
                        className={styles.input}
                        value={editTreeNode.name}
                        onChange={(e) => setEditTreeNode({ isOpen: editTreeNode.isOpen, nodeId: editTreeNode.nodeId, name: e.target.value })}
                        type="text"
                        maxLength={200}
                    />
                </div>

                <div className={styles.bottom}>
                    <div className={styles.buttons}>
                        <button onClick={() => setEditTreeNode({ isOpen: false })} className={styles.cancel}>
                            <p className={styles.text}>Cancel</p>
                        </button>
                        <button disabled={loading} onClick={handleClick} className={styles.send}>
                            <p className={styles.text}>Rename</p>
                            {loading && <Loader size={18} color='#fff' />}
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
});

export default EditTreeNodeModal;