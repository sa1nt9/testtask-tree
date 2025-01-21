import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { ITreeNode } from '../../shared/typescript/interfaces/ITreeNode';
import TreeService from '../../shared/api/treeService';
import { toast } from 'react-toastify';
import TreeNode from '../../entities/TreeNode';
import Loader from '../../entities/Loader';
import { treeName } from '../../shared/constants/treeName';
import { observer } from 'mobx-react-lite';
import treeStore from '../../shared/store/tree';

interface PropsTree {

}

const Tree: FC<PropsTree> = observer(() => {
    const [isLoadingTree, setIsLoadingTree] = useState<boolean>(false);

    const getTree = async () => {
        setIsLoadingTree(true);
        try {
            const response = await TreeService.getTree(treeName);
            treeStore.setTree(response.data);
        } catch (error: any) {
            toast.error(error.message)
        }
        setIsLoadingTree(false);
    }

    useEffect(() => {
        getTree()
    }, [])

    return (
        <div className={styles.container}>
            {isLoadingTree
                ?
                <Loader size={50} />
                :
                treeStore.tree
                    ?
                    <TreeNode treeNode={treeStore.tree} />
                    :
                    <></>
            }
        </div>
    )
});

export default Tree;