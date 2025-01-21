import { FC, useEffect, useState } from 'react';
import TreeService from '../../shared/api/treeService';
import { toast } from 'react-toastify';
import TreeNode from '../../entities/TreeNode';
import Loader from '../../entities/Loader';
import { treeName } from '../../shared/constants/treeName';
import { observer } from 'mobx-react-lite';
import treeStore from '../../shared/store/tree';


const Tree: FC = observer(() => {
    const [isLoadingTree, setIsLoadingTree] = useState<boolean>(false);

    const getTree = async () => {
        setIsLoadingTree(true);
        try {
            const response = await TreeService.getTree(treeName);
            treeStore.setTree(response.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.message)
        }
        setIsLoadingTree(false);
    }

    useEffect(() => {
        getTree()
    }, [])

    return (
        <div>
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