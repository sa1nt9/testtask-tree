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


const AddTreeNodeModal: FC = observer(() => {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const { addTreeNode, setAddTreeNode } = modalStore
    const { setTree } = treeStore

    const handleClick = async () => {
        setLoading(true);
        try {
            await TreeService.createNode(treeName, addTreeNode.parentId, name)
            const response = await TreeService.getTree(treeName);
            setTree(response.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.message)
        }
        setLoading(false);
        setName('')
        setAddTreeNode({ isOpen: false })
    }


    return (
        <ModalWrapper
            isOpen={addTreeNode.isOpen}
            setIsOpen={() => setAddTreeNode({ isOpen: false })}
            title='Add'
        >
            <div className={styles.body}>
                <div className={styles.inputBlock}>
                    <p className={styles.name}>Node Name</p>
                    <input
                        placeholder={'Enter node name...'}
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        maxLength={200}
                    />
                </div>

                <div className={styles.bottom}>
                    <div className={styles.buttons}>
                        <button onClick={() => setAddTreeNode({ isOpen: false })} className={styles.cancel}>
                            <p className={styles.text}>Cancel</p>
                        </button>
                        <button disabled={loading} onClick={handleClick} className={styles.send}>
                            <p className={styles.text}>Add</p>
                            {loading && <Loader size={18} color='#fff' />}
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
});

export default AddTreeNodeModal;