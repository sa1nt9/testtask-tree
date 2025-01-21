import { makeAutoObservable } from 'mobx';


interface IModalState {
    isOpen: boolean;
}

interface IAddTreeNodeModal extends IModalState {
    parentId: number;
}

interface IEditTreeNodeModal extends IModalState {
    nodeId: number;
    name: string;
}

interface IDeleteTreeNodeModal extends IModalState {
    nodeId: number;
    name: string;
}


const defaultAddTreeNodeModal: IAddTreeNodeModal = { isOpen: false, parentId: -1 };
const defaultEditTreeNodeModal: IEditTreeNodeModal = { isOpen: false, nodeId: -1, name: '' };
const defaultDeleteTreeNodeModal: IDeleteTreeNodeModal = { isOpen: false, nodeId: -1, name: '' };


class Modals {
    addTreeNode = defaultAddTreeNodeModal;
    editTreeNode = defaultEditTreeNodeModal;
    deleteTreeNode = defaultDeleteTreeNodeModal;

    constructor() {
        makeAutoObservable(this);
    }

    setModalState = <K extends keyof this>(modalName: K, state: Partial<this[K]>) => {
        this[modalName] = { ...this[modalName], ...state };
    };


    setAddTreeNode = (payload: Partial<IAddTreeNodeModal> = {}) => {
        this.setModalState('addTreeNode', { ...defaultAddTreeNodeModal, ...payload });
    };

    setEditTreeNode = (payload: Partial<IEditTreeNodeModal> = {}) => {
        this.setModalState('editTreeNode', { ...defaultEditTreeNodeModal, ...payload });
    };

    setDeleteTreeNode = (payload: Partial<IDeleteTreeNodeModal> = {}) => {
        this.setModalState('deleteTreeNode', { ...defaultDeleteTreeNodeModal, ...payload });
    };
}

const modalStore = new Modals();
export default modalStore;

