import React, {Component} from 'react';
import {Tree} from 'antd';
const {TreeNode} = Tree;
export default class PermTree extends Component{
    constructor(props){
        super(props);
        this.state = {
            treeData: []
        }
    }
    componentDidMount(){
        const tree = [{
            title: '管理员',
            key: 'dor'
        },{
            title: '业主',
            key: 'stu'
        },{
            title: '维修人员',
            key: 'rep'
        }];
        let treeData = this.generateTreeData(tree);
        this.setState({treeData});
    }
    generateTreeData(data){
        return data.map((item, index) => {
            return <TreeNode
                title = {item.title}
                key = {item.key}
            />
        })
    }
    async select(node){
        if(node.length === 0){
            return;
        }
        const {actions: {saveFlag, getPermission, savePermission}, permissions} = this.props;
        saveFlag(node[0]);
        let keys = JSON.parse(this.findData(node[0], permissions));
        savePermission(keys);
    }
    findData(node, permissions){
        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i].perm_name === node) {
                return permissions[i].perm_value;
            }
        }
    }
    render(){
        return (
            <Tree
                showLine
                onSelect = {this.select.bind(this)}
                defaultSelectedKeys = {['dor']}
            >
                {this.state.treeData}
            </Tree>
        )
    }
}
