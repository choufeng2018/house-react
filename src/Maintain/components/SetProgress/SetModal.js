import React, {Component} from 'react';
import {Modal, Steps, Button, Notification} from 'antd';
import './Modal.less';
const {Step} = Steps;

export default class SetModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: 2,
            update: false,
        }
    }
    async ok(){
        const {actions: {setStep}, progressData = []} = this.props;
        let rst = await setStep({code: progressData[0].code});
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '进度更新成功'
            })
            this.props.getData();
            this.setState({current: 2, update: true});
        }else{
            Notification.warning({
                message: '进度更新失败'
            })
        }
    }
    cancel(){
        this.setState({proVis: false})
    }
    render(){
        const {proVis, progressData = []} = this.props;
        return (
            <Modal
                visible = {proVis}
                width = '50%'
                onOk = {this.ok.bind(this)}
                // 调用父组件的方法
                onCancel = {this.props.cancel}
                okText = '进入下一步'
                footer
            >
                <h1 style={{fontSize: '20px'}}>维修单号：{progressData[0].code}</h1>
                <div style={{marginTop: '50px', height: '120px'}}>
                    {   this.state.update ?
                        <Steps current={this.state.current}>
                            <Step title="接单" />
                            <Step title="维修中" />
                            <Step title="已维修" />
                            <Step title="评价" />
                        </Steps> : <Steps current={parseInt(progressData[0].current)}>
                            <Step title="接单" />
                            <Step title="维修中" />
                            <Step title="已维修" />
                            <Step title="评价" />
                        </Steps>
                }
                {!this.state.update && parseInt(progressData[0].current) < 2 && <Button onClick={this.ok.bind(this)} type='primary' className = 'nextStep'>进入下一步</Button>}
                </div>
            </Modal>
        )
    }
}
