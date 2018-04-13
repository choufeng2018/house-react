import React, {Component} from 'react';
import {Table, Modal, Notification, Divider, Button, Form, Col, Row, Input, Select} from 'antd';
import {Icon} from 'react-fa';
import {getCookie} from '../../../_platform/cookie';
const FormItem = Form.Item;
const {Option} = Select;
class SelfPassDor extends Component{
    ok(){
        const {
            actions: {putDorPass, isFresh},
            form:{validateFields}
        } = this.props;
        validateFields( async (err, values) => {
            if (!err) {
                if (values['old_pass'] !== this.state.login_info[0].doradmin_pass) {
                    Notification.warning({
                        message: '旧密码输入错误',
                        duration: '1'
                    })
                    return;
                }
                if (values['new_pass'] !== values['new_pass_again']) {
                    Notification.warning({
                        message: '两次密码输入不一致',
                        duration: '1'
                    })
                    return;
                }
                let data = {
                    doradmin_no: values['doradmin_no'],
                    doradmin_pass: values['new_pass'],
                }
                let rst = await putDorPass({},data);
                if (rst[0].status === 'ok') {
                    Notification.success({
                        message: '修改成功，请您在2s后重新登录'
                    })
                    setTimeout(() => {
                        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                        if(keys) {
                            for(var i = keys.length; i--;)
                            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                        }
                        window.location.href = '/';
                    },2000)
                }else{
                    Notification.warning({
                        message: '录入失败'
                    })
                }
            }
        })
    }
    async componentWillMount(){
        let login_info = JSON.parse(getCookie('login'));
        this.setState({login_info});
    }
    render(){
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 15, offset: 1}
        }
        const {form: {getFieldDecorator}, } = this.props;
        return (
            <div>
                <h1>修改个人密码</h1>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col offset = {7} span = {8}>
                            <FormItem {...formItemLayout} label='工号'>
                                {getFieldDecorator('doradmin_no',{
                                    rules: [{required: true, message: '请输入工号'}],
                                    initialValue: this.state.login_info[0].doradmin_no
                                })(
                                    <Input type="text" disabled placeholder = '请输入工号'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {7} span = {8}>
                            <FormItem {...formItemLayout} label='姓名'>
                                {getFieldDecorator('doradmin_name',{
                                    rules: [{required: true, message: '请输入姓名'}],
                                    initialValue: this.state.login_info[0].doradmin_name
                                })(
                                    <Input type="text" disabled placeholder = '请输入姓名'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {7} span = {8}>
                            <FormItem {...formItemLayout} label='旧密码'>
                                {getFieldDecorator('old_pass',{
                                    rules: [{required: true, message: '请填写旧密码'}],
                                })(
                                    <Input type="password" placeholder="旧密码"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {7} span = {8}>
                            <FormItem {...formItemLayout} label='新密码'>
                                {getFieldDecorator('new_pass',{
                                    rules: [{required: true, message: '请输入6到10位的新密码', max: 10, min: 6}],
                                })(
                                    <Input type="password"  placeholder="请输入6到10位的新密码"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {7} span = {8}>
                            <FormItem {...formItemLayout} label='再次输入新密码'>
                                {getFieldDecorator('new_pass_again',{
                                    rules: [{required: true, message: '再次输入新密码', }],
                                })(
                                    <Input type="password"  placeholder="再次输入新密码"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {10} span = {8}>
                            <FormItem>
                                <Button type="primary" htmlType="submit" onClick = {this.ok.bind(this)} className="login-form-button">
                                    确认更改
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default Form.create()(SelfPassDor)
