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
                    visit_name: values['visit_name'],
                    visit_person: values['visit_person'],
                    visit_rela: values['visit_rela'],
                    visit_acti: values['visit_acti'],
                    visit_entry: values['visit_entry'],
                    visit_leave: values['visit_leave'],
                    visit_dor: values['visit_dor']
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
                <section style = {{marginBottom: 430}}>
                    <h1 style={{textAlign: 'center'}}>新建拜访</h1>
                    <Divider><Icon name='cut' /></Divider>
                    <Form>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '来访人姓名'>
                                    {getFieldDecorator('visit_name', {
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
                                <FormItem {...formItemLayout} label = '访问宿舍'>
                                    {getFieldDecorator('visit_dor', {
                                        rules: [{required: true, message: '请输入访问宿舍'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入访问宿舍' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '访问人'>
                                    {getFieldDecorator('visit_person', {
                                        rules: [{required: true, message: '请输入访问人'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入访问人' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '与被访者关系'>
                                    {getFieldDecorator('visit_rela', {
                                        rules: [{required: true, message: '请输入与被访者关系'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入与被访者关系' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '访问活动'>
                                    {getFieldDecorator('visit_acti', {
                                        rules: [{required: true, message: '请输入访问活动'}],
                                        initial: ''
                                    })(
                                        <Input placeHolder = '请输入访问活动' />
                                    )}
                                </FormItem>
                            </Row>
                        </Col>
                        <Col span = {16} offset = {3}>
                            <Row>
                                <FormItem {...formItemLayout} label = '访问时间'>
                                    {getFieldDecorator('visit_entry', {
                                        rules: [{required: true, message: '请选择访问时间'}],
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
                                <FormItem {...formItemLayout} label = '预计离开时间'>
                                    {getFieldDecorator('visit_leave', {
                                        rules: [{required: true, message: '预计离开时间'}],
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
export default Form.create()(CreateVisit);
