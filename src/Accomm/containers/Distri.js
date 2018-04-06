import React, {Component} from 'react';
import {Aside} from '../../_platform/layout/Aside';
import {Body} from '../../_platform/layout/Body';
import {DynamicTitle} from '../../_platform/layout/DynamicTitle'
import {Sidebar} from '../../_platform/layout/SideBar'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {actions as platformActions} from '../../_platform/store/global';
import {Tabs, Button} from 'antd';
import {SubTree, CreateDistri, DistriDetail} from '../components/Distri';
import {actions} from '../store/createDistri';
@connect(
    state => {
        const {accomm: {createDistri}} = state;
        return {...createDistri}
    },
    dispatch => ({
        actions: bindActionCreators({...platformActions, ...actions}, dispatch)
    })
)
export default class Dirsti extends Component{
    constructor(props){
        super(props);
        this.state = {
            options_data: [],
            type: '',
            originData: []
        }
    }
    componentWillReceiveProps(nextProps){
        const {selectNode = []} = nextProps;
        if (selectNode.length === 0) {
            return;
        }
        let type = selectNode[0].split('--')[4];
        this.setState({type})
    }
    render(){
        const {distriDor = {show: false}} = this.props;
        return (
            <div style={{overflow: 'hidden', 'position':'relative'}}>
                <DynamicTitle title = "分配宿舍" {...this.props} />
                <Sidebar>
                    <SubTree {...this.props} />
                </Sidebar>
                {distriDor.show && <CreateDistri {...this.props} {...this.state} />}
                {this.state.type === 'dormitory' && <DistriDetail {...this.props} />}
            </div>
        )
    }
}
