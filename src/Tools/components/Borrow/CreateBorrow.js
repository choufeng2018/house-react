import React, {Component} from 'react';
import {Modal, Col, Row, Form, Notification, Input, Divider, DatePicker} from 'antd';
import {Icon} from 'react-fa';
const FormItem = Form.Item;
class CreateBorrow extends Component{
    ok(){
        const {form: {validateFields}, actions: {postData, showCreate, isFresh}} = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                let data = {
                    borrow_name: values['borrow_name'],
                    borrow_dor: values['borrow_dor'],
                    borrow_tools: values['borrow_tools'],
                    borrow_start: values['borrow_start'],
                    borrow_return: values['borrow_return'],
                }
                let rst = await postData({}, data);
                if (rst[0].status === 'ok') {
                    Notification.success({
                        message: '录入成功'
                    })
                    showCreate(false);
                    isFresh(true)
                }else{
                    Notification.warning({
                        message: '录入失败'
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
                    <h1>借用登记</h1>
                    <Divider><Icon name='cut' /></Divider>
                    <Form>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '姓名'>
                                    {getFieldDecorator('borrow_name', {
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
                                    {getFieldDecorator('borrow_dor', {
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
                                <FormItem {...formItemLayout} label = '借用工具'>
                                    {getFieldDecorator('borrow_tools', {
                                        rules: [{required: true, message: '请选择借用工具'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请选择借用工具' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '借用时间'>
                                    {getFieldDecorator('borrow_start', {
                                        rules: [{required: true, message: '请选择借用时间'}],
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
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '预计归还时间'>
                                    {getFieldDecorator('borrow_return', {
                                        rules: [{required: true, message: '预计归还时间'}],
                                        initial: ''
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            onChange = {this.changeLeave.bind(this)} />
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
