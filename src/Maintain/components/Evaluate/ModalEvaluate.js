import React, {Component} from 'react'
import {Modal, Row, Col, Form, Rate, Divider, Input, Notification} from 'antd'
import {Icon} from 'react-fa'
const {TextArea} = Input;
const FormItem = Form.FormItem
export default class ModalEvaluate extends Component{
    cancel(){
        const {actions: {setShowEvalute}} = this.props;
        setShowEvalute(false)
    }
    render(){
        const {visible = false, evaluteData} = this.props;
        let evalute = JSON.parse(evaluteData.evalute);
        return (
            <Modal
                visible = {true}
                width = '60%'
                onCancel = {this.cancel.bind(this)}
                footer = {null}
            >
                <h3 style={{textAlign: 'center'}}>维修评价，单号：{evaluteData.code}</h3>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col  span = {3} offset = {4}>
                            <span>维修速度：</span>
                        </Col>
                        <Col span = {4}>
                            <Rate disabled = {true} style={{fontSize: '14px'}} allowHalf defaultValue={evalute.speed} />
                        </Col>
                        <Col  span = {3} offset = {2}>
                            <span>维修质量：</span>
                        </Col>
                        <Col span = {4}>
                            <Rate  disabled = {true} style={{fontSize: '14px'}} allowHalf defaultValue={evalute.quality}/>
                        </Col>
                    </Row>
                    <Row style = {{marginTop: '25px'}}>
                        <Col span = {20} offset={4} >
                            <span >评语：</span>
                        </Col>
                        <Col offset={4} span = {15}>
                            <TextArea style = {{color: 'red', marginTop: '10px'}}  disabled = {true} rows = {8} value={evalute.word} />
                        </Col>
                    </Row>

                </Form>
            </Modal>
        )
    }
}
