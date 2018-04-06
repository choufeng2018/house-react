import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Button, Form, Col, Row, Input, Select} from 'antd';
import {Icon} from 'react-fa';
const FormItem = Form.Item;
const {Option} = Select;
class CreateAdmin extends Component{
    ok(){
        const {
            actions: {showCreateModal, postDorAdminAc, isFresh},
            form:{validateFields}
        } = this.props;
        validateFields( async (err, values) => {
            if (!err) {
                let data = {
                    doradmin_no: values['doradmin_no'],
                    doradmin_name: values['doradmin_name'],
                    doradmin_sex: values['doradmin_sex'],
                    doradmin_tel: values['doradmin_tel']
                }
                let rst = await postDorAdminAc({},data);
                if (rst[0].status === 'ok') {
                    Notification.success({
                        message: '录入成功'
                    })
                    isFresh(true)
                    showCreateModal(false)
                }else{
                    Notification.warning({
                        message: '录入失败'
                    })
                }
            }
        })
    }
    cancel(){
        const {actions: {showCreateModal}} = this.props;
        showCreateModal(false)
    }
    render(){
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 15, offset: 1}
        }
        const {form: {getFieldDecorator}, createModal} = this.props;
        return (
            <Modal
                visible = {createModal}
                width = '50%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1>管理员信息录入</h1>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col offset = {3} span = {16}>
                            <FormItem {...formItemLayout} label='工号'>
                                {getFieldDecorator('doradmin_no',{
                                    rules: [{required: true, message: '请输入工号'}],
                                    initialValue: ''
                                })(
                                    <Input type="text" placeholder = '请输入工号'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {3} span = {16}>
                            <FormItem {...formItemLayout} label='姓名'>
                                {getFieldDecorator('doradmin_name',{
                                    rules: [{required: true, message: '请输入姓名'}],
                                    initialValue: ''
                                })(
                                    <Input type="text" placeholder = '请输入姓名'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {3} span = {16}>
                            <FormItem {...formItemLayout} label='性别'>
                                {getFieldDecorator('doradmin_sex',{
                                    rules: [{required: true, message: '请选择性别'}],
                                })(
                                    <Select placeholder='请选择性别'>
                                        <Option value='男'>男</Option>
                                        <Option value='女'>女</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {3} span = {16}>
                            <FormItem {...formItemLayout} label='电话'>
                                {getFieldDecorator('doradmin_tel',{
                                    rules: [{required: true, message: '请输入电话'}],
                                    initialValue: ''
                                })(
                                    <Input type="text" placeholder="请输入电话"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(CreateAdmin)
