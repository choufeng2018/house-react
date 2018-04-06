import React, {Component} from 'react';
import {Modal, Col, Row, Form, Notification, Input, Divider, DatePicker} from 'antd';
import {Icon} from 'react-fa';
const FormItem = Form.Item;
class CreateVisit extends Component{
    ok(){
        const {form: {validateFields}, actions: {postData, showCreate, isFresh}} = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                let data = {
                    goods_name: values['goods_name'],
                    goods_dor: values['goods_dor'],
                    goods_desc: values['goods_desc'],
                    goods_leave: values['goods_leave'],
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
                <section style = {{marginBottom: 240}}>
                    <h1 style={{textAlign: 'center'}}>新建拜访</h1>
                    <Divider><Icon name='cut' /></Divider>
                    <Form>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '姓名'>
                                    {getFieldDecorator('goods_name', {
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
                                <FormItem {...formItemLayout} label = '宿舍号'>
                                    {getFieldDecorator('goods_dor', {
                                        rules: [{required: true, message: '请输入宿舍号'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入宿舍号' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '物品描述'>
                                    {getFieldDecorator('goods_desc', {
                                        rules: [{required: true, message: '请输入物品描述'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入物品描述' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '离开时间'>
                                    {getFieldDecorator('goods_leave', {
                                        rules: [{required: true, message: '请选择离开时间'}],
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
export default Form.create()(CreateVisit);
