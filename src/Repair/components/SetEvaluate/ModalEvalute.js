import React, {Component} from 'react'
import {Modal, Row, Col, Form, Rate, Divider, Input, Notification} from 'antd'
import {Icon} from 'react-fa'
const {TextArea} = Input;
const FormItem = Form.FormItem
class ModalEvalute extends Component{
    async ok(){
        const {actions: {setShowEvalute, setEvalute, isFresh}, evaluteData} = this.props;
        let value = JSON.stringify(this.state);
        let rst = await setEvalute({},{evalute: value, code: evaluteData.code});
        if (rst[0].status === 'ok') {
            Notification.success({
                message: '评价成功'
            })
        }else{
            Notification.warning({
                message: '评价失败'
            })
        }
        isFresh(true);
        setShowEvalute(false);
    }
    cancel(){
        const {actions: {setShowEvalute}} = this.props;
        setShowEvalute(false)
    }
    change(flag, value){
        switch (flag) {
            case 'speed':{
                this.setState({speed: value})
                break;
            }
            case 'quality':{
                this.setState({quality: value})
                break;
            }
            case 'word': {
                this.setState({word: value.target.value})
                break;
            }
        }
    }
    render(){
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        const {showEvalute = {show: false, disabled: false}, form: {getFieldDecorator}, evaluteData} = this.props;
        let evalute = {speed:0, quality:0, word: ''};
        if (showEvalute.disabled) {
            evalute = JSON.parse(evaluteData.evalute);
        }
        return (
            <Modal
                visible = {showEvalute.show}
                width = '60%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h3 style={{textAlign: 'center'}}>维修评价，单号：{evaluteData.code}</h3>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col  span = {3} offset = {4}>
                            <span>维修速度：</span>
                        </Col>
                        <Col span = {4}>
                            <Rate disabled = {showEvalute.disabled} style={{fontSize: '14px'}} allowHalf defaultValue={0 || evalute.speed} onChange = {this.change.bind(this, 'speed')}/>
                        </Col>
                        <Col  span = {3} offset = {2}>
                            <span>维修质量：</span>
                        </Col>
                        <Col span = {4}>
                            <Rate  disabled = {showEvalute.disabled} style={{fontSize: '14px'}} allowHalf defaultValue={0 || evalute.quality} onChange = {this.change.bind(this, 'quality')}/>
                        </Col>
                    </Row>
                    <Row style = {{marginTop: '25px'}}>
                        <Col span = {20} offset={4} >
                            <span >评语：</span>
                        </Col>
                        <Col offset={4} span = {15}>
                            {showEvalute.disabled && <TextArea onChange = {this.change.bind(this, 'word')} style = {{color: 'red', marginTop: '10px'}}  disabled = {showEvalute.disabled} rows = {8} value={evalute.word} />}
                            {showEvalute.disabled || <TextArea onChange = {this.change.bind(this, 'word')} style = {{marginTop: '10px'}}  disabled = {showEvalute.disabled} rows = {8}  />}
                        </Col>
                    </Row>

                </Form>
            </Modal>
        )
    }
}
export default Form.create()(ModalEvalute)
