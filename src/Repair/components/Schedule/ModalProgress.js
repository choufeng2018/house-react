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
        const {progressShow = false, progressData = {}} = this.props;
        return (
            <Modal
                visible = {progressShow}
                width = '50%'
                footer = {null}
                onCancel = {this.cancel.bind(this)}
            >
                <h3 style = {{textAlign: 'center'}}>维修单号：{progressData.code}</h3>
                <Divider><Icon name = 'cut' /></Divider>
                <Steps current={parseInt(progressData.current)}>
                    <Step title="接单" />
                    <Step title="维修中" />
                    <Step title="已维修" />
                    <Step title="评价" />
                </Steps>
            </Modal>
        )
    }
}
