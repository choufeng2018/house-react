import React, {Component} from 'react';
import {Tree, Row, Col, Button, Input, Notification, Spin} from 'antd';
import {Icon} from 'react-fa'
const {Search} = Input;
const {TreeNode} = Tree;
export default class SubTree extends Component{
    constructor(props){
        super(props);
        this.state = {
            search: false,
            type: 'building',
            buildTree: [],
            spin: true
        }
    }
    searchKeyword(){

    }
    select(node){
        if (node.length === 0) {
            return;
        }
        const {actions: {setDorState, saveNode}} = this.props;
        let arr = node[0].split('--');
        let type = node[0].split('--')[4];
        this.setState({type})
        setDorState(type)
        saveNode([{
            buil_no: arr[0],
            buil_name: arr[1],
            buil_desc: arr[2],
            buil_admin: arr[3],
            buil_type: arr[4]
        }])
    }
    componentWillReceiveProps(nextProps){
        const {actions: {is_fresh}, fresh = false} = nextProps;
        if (fresh) {
            this.componentDidMount();
            is_fresh(false)
        }
    }
    async componentDidMount(){
        this.setState({spin: true})
        const {actions: {getBuilding, saveNode}} = this.props;
        // 获取宿舍楼树
        let rst = await getBuilding();
        if (rst) {
            this.setState({spin: false, buildTree: rst})
            saveNode([rst[0]]);
        }
        this.setState({spin: false});
    }
    loop(data){
        if (data.length === 0) {
            return;
        }
        return data.map((item, index) => {
            if (item.children && item.children.length > 0) {
                return <TreeNode
                            title = {item.buil_name}
                            key = {`${item.buil_no}--${item.buil_name}--${item.buil_desc}--${item.buil_admin}`}
                        >
                            {this.loop(item.children)}
                        </TreeNode>
            }
            return <TreeNode
                        title = {item.buil_name}
                        key = {`${item.buil_no}--${item.buil_name}--${item.buil_desc}--${item.buil_admin}--${item.buil_type}`}
                    />
        })
    }
    // 新建宿舍楼
    addBuilding(){
        const {actions: {setCreateShow}} = this.props;
        setCreateShow({
            show: true,
            type: 'add'
        })
    }
    // 新建宿舍号
    addDomitory(){
        const {actions: {setCreateDormShow}} = this.props;
        setCreateDormShow({
            show: true,
            type: 'add'
        })
    }
    render(){
        return (
            <Spin spinning = {this.state.spin}>
                <div>
                    <Row>
                        <Col span={24}>
                            <div style={{borderBottom: 'solid 1px #999', paddingBottom: 5, marginBottom: 5}}>
                                <Button onClick={this.addBuilding.bind(this)}>新建单元楼</Button>
                            </div>
                        </Col>
                    {
                        this.state.search && <Col>
                            <Search
                                ref="keyword"
                                placeholder="请输入关键字"
                                onSearch={this.searchKeyword.bind(this)}
                            />
                        </Col>
                    }
                </Row>
                <Tree
                    showLine
                    onSelect = {this.select.bind(this)}
                    >
                        {this.loop(this.state.buildTree)}
                    </Tree>
                </div>
            </Spin>
        )
    }
}
