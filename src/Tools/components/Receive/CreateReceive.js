import React, {Component} from 'react';
import {Modal, Col, Row, Form, Notification, Input, Divider, DatePicker, TreeSelect} from 'antd';
import {Icon} from 'react-fa';
const FormItem = Form.Item;
class CreateBorrow extends Component{
    ok(){
        const {form: {validateFields}, actions: {postData, showCreate, isFresh}} = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                let data = {
                    receive_name: values['receive_name'],
                    receive_dor: values['receive_dor'],
                    receive_tools: values['receive_tools'],
                    receive_number: values['receive_number'],
                    receive_start: values['receive_start']
                }
                let rst = await postData({}, data);
                if (rst[0].status === 'ok') {
                    Notification.success({
                        message: '领用成功'
                    })
                    showCreate(false);
                    isFresh(true)
                }else{
                    Notification.warning({
                        message: '领用失败'
                    })
                }
            }
        })
    }
    cancel(){
        const {actions: {showCreate}} = this.props;
        showCreate(false)
    }
    changeEntry(){

    }
    changeLeave(){

    }
    render(){
        const formItemLayout = {
            labelCol: {span: 9},
            wrapperCol: {span: 15},
        };
        const {form: {getFieldDecorator}, createVisible = false} = this.props;
        return (
            <Modal
                visible = {createVisible}
                width = '35%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <section style = {{marginBottom: 300}}>
                    <h1>领用登记</h1>
                    <Divider><Icon name='cut' /></Divider>
                    <Form>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '姓名'>
                                    {getFieldDecorator('receive_name', {
                                        rules: [{required: true, message: '请输入姓名'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入姓名' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '宿舍'>
                                    {getFieldDecorator('receive_dor', {
                                        rules: [{required: true, message: '请输入宿舍'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入宿舍' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '领用工具'>
                                    {getFieldDecorator('receive_tools', {
                                        rules: [{required: true, message: '请选择领用工具'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请选择领用工具' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '领用数量'>
                                    {getFieldDecorator('receive_number', {
                                        rules: [{required: true, message: '请输入领用数量'}],
                                        initial: ''
                                    })(
                                        <Input type = 'number' placeHolder = '请输入领用数量' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '领用时间'>
                                    {getFieldDecorator('receive_start', {
                                        rules: [{required: true, message: '请选择领用时间'}],
                                        initial: ''
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            onChange = {this.changeEntry.bind(this)} />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                    </Form>
                </section>
            </Modal>
        )
    }
}
export default Form.create()(CreateBorrow);
