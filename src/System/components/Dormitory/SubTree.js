import React, {Component} from 'react';
import {Tree, Row, Col, Button, Input, Notification, Spin, Divider} from 'antd';
import {Icon} from 'react-fa';
const {Search} = Input;
const {TreeNode} = Tree;
export default class SubTree extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            spin: false
        }
    }
    addDormitory(){
        const {selectNode = [], actions: {showCreateDor}} = this.props;
        if (selectNode.length === 0 || selectNode[0].split("--")[4] !== "building") {
            Notification.warning({
                message: '请先选中宿舍楼',
                duration: 2
            })
            return;
        }
        showCreateDor(true)
    }
    componentWillReceiveProps(nextProps){
        const {actions: {is_fresh}, fresh} = nextProps;
        if (fresh) {
            is_fresh(false);
            this.componentDidMount();
        }
    }
    async componentDidMount(){
        this.setState({spin: true})
        const {actions: {getBuilding}} = this.props;
        let rst = await getBuilding()
        let new_rst = rst.map((item, index) => {
            return {
                ...item,
                children: []
            }
        })
        this.setState({data: new_rst, spin: false})
    }
    loop(data){
        return data.map((item, index) => {
            if (item.children && item.children.length > 0) {
                return <TreeNode
                    title = {item.buil_name}
                    key = {`${item.buil_no}--${item.buil_name}--${item.buil_desc}--${item.buil_admin}--${item.buil_type}`}
                    dataRef={item}
                    >
                        {this.loop(item.children)}
                    </TreeNode>
                }
                return <TreeNode
                    title = {item.buil_name}
                    key = {`${item.buil_no}--${item.buil_name}--${item.buil_desc}--${item.buil_admin}--${item.buil_type}`}
                    dataRef={item}
                />
            })
    }
    select(node){
        if (node.length===0) {
            return;
        }
        const {actions: {saveBuilding, saveDormitory}} = this.props;
        // 保存当前点击的节点
        saveBuilding(node);
        let data = node[0].split('--');
        if (data[4] === "dormitory") {
            let node1 = [{
                dor_no: data[0],
                dor_name: data[1],
                dor_desc: data[2],
                dor_type: data[4]
            }]
            saveDormitory(node1)
        }
    }
    onLoadData = async (treeNode) => {
        let buil_no = treeNode.props.eventKey.split('--')[0];
        const {actions: {getDormitoryAc}} = this.props;
        let rst = await getDormitoryAc({buil_no: buil_no});
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                let arr = rst.map((item, indx) => {
                    return {
                        buil_no: item.dor_no,
                        buil_name: item.dor_name,
                        buil_type: 'dormitory',
                        buil_admin: '李明阳',
                        buil_desc: item.dor_desc
                    }
                })
                treeNode.props.dataRef.children = arr;
                this.setState({
                    data: [...this.state.data],
                });
                resolve();
            }, 0);
        });
    }
    render(){
        return (
            <Spin spinning = {this.state.spin}>
                <div style={{borderBottom: 'solid 1px #999', padding: '0 0 5px 0', marginBottom: 5}}>
                    <Button style = {{marginLeft: '20px'}} onClick={this.addDormitory.bind(this)}>新建单元房</Button>
                </div>
                <Tree
                    autoExpandParent={true}
                    defaultExpandAll = {true}
                    showLine
                    onSelect = {this.select.bind(this)}
                    loadData={this.onLoadData.bind(this)}
                >
                    {this.loop(this.state.data)}
                </Tree>
            </Spin>
        )
    }
}
