import React, {Component} from 'react'
import {Modal, Row, Col, Form, Rate, Divider, Input} from 'antd'
import {Icon} from 'react-fa'
const {TextArea} = Input;
const FormItem = Form.FormItem
class ModalEvalute extends Component{
    ok(){
        const {actions: {setShowEvalute}} = this.props;
        setShowEvalute(false)
    }
    cancel(){
        const {actions: {setShowEvalute}} = this.props;
        setShowEvalute(false)
    }
    render(){
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        const {showEvalute = {show: false, disabled: false}, form: {getFieldDecorator}} = this.props;
        return (
            <Modal
                visible = {showEvalute.show}
                width = '60%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
                footer = {null}
            >
                <h3 style={{textAlign: 'center'}}>维修评价</h3>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col  span = {3} offset = {4}>
                            <span>维修速度：</span>
                        </Col>
                        <Col span = {4}>
                            <Rate disabled = {showEvalute.disabled} style={{fontSize: '14px'}} allowHalf defaultValue={2.5} />
                        </Col>
                        <Col  span = {3} offset = {2}>
                            <span>维修质量：</span>
                        </Col>
                        <Col span = {4}>
                            <Rate  disabled = {showEvalute.disabled} style={{fontSize: '14px'}} allowHalf defaultValue={2.5} />
                        </Col>
                    </Row>
                    <Row style = {{marginTop: '25px'}}>
                        <Col span = {20} offset={4} >
                            <span >评语：</span>
                        </Col>
                        <Col offset={4} span = {15}>
                            {showEvalute.disabled && <TextArea style = {{color: 'red', marginTop: '10px'}}  disabled = {showEvalute.disabled} rows = {7} value='老王的维修速度很快，态度很好' />}
                            {showEvalute.disabled || <TextArea style = {{marginTop: '10px'}}  disabled = {showEvalute.disabled} rows = {7} value='老王的维修速度很快，态度很好' />}
                        </Col>
                    </Row>

                </Form>
            </Modal>
        )
    }
}
export default Form.create()(ModalEvalute)
