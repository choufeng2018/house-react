import React, {Component} from 'react';
import {Modal, Table, Steps, Divider} from 'antd'
import {Icon} from 'react-fa'
const Step = Steps.Step;
export default class ModalProgress extends Component{
    constructor(props){
        super(props);
    }
    cancel(){
        const {actions: {setProgressShow}} = this.props;
        setProgressShow(false)
    }
    render(){
        const {progressShow = false} = this.props;
        return (
            <Modal
                visible = {progressShow}
                width = '50%'
                footer = {null}
                onCancel = {this.cancel.bind(this)}
            >
                <h3 style = {{textAlign: 'center'}}>维修进度，单号：01</h3>
                <Divider><Icon name = 'cut' /></Divider>
                <Steps current={1}>
                    <Step title="接单"  />
                    <Step title="修理"/>
                    <Step title="修理完成" />
                    <Step title="评价" />
                </Steps>
            </Modal>
        )
    }
}
