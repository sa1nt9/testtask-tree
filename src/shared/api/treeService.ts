import { AxiosResponse } from "axios";
import $api from ".";
import { ITreeNode } from "../typescript/interfaces/ITreeNode";

export default class TreeService {
    static async getTree(treeName: string): Promise<AxiosResponse<ITreeNode>> {
        return $api.post<ITreeNode>(`/api.user.tree.get?treeName=${treeName}`)
    }

    static async createNode(treeName: string, parentNodeId: number, nodeName: string): Promise<AxiosResponse<any>> {
        return $api.post<any>(`/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`)
    }

    static async deleteNode(treeName: string, nodeId: number): Promise<AxiosResponse<any>> {
        return $api.post<any>(`/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`)
    }

    static async renameNode(treeName: string, nodeId: number, newNodeName: string): Promise<AxiosResponse<any>> {
        return $api.post<any>(`/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`)
    }
}