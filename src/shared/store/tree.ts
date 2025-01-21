import { makeAutoObservable } from 'mobx'
import { ITreeNode } from '../typescript/interfaces/ITreeNode';

class Tree {
    tree: ITreeNode | null = null;
    focusedItemId: number = -1;

    constructor() {
        makeAutoObservable(this)
    }

    setFocusedItemId = (focusedItemId: number) => {
        this.focusedItemId = focusedItemId
    }

    setTree = (tree: ITreeNode) => {
        this.tree = tree
    }
}

const treeStore = new Tree()

export default treeStore