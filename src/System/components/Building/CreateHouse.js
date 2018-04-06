import React, {Component} from 'react';
import {Modal, Notification, Col, Row, Input, Select, Divider, Form} from 'antd';
import {Icon} from 'react-fa';
const FormItem = Form.Item
class CreateHouse extends Component{
    constructor(props){
        super(props);
    }
    ok(){
        const {actions: {setCreateDormShow}} = this.props;
        setCreateDormShow({
            show: false,
        })
    }
    cancel(){
        const {actions: {setCreateDormShow}} = this.props;
        setCreateDormShow({
            show: false,
        })
    }
    render(){
        const { createDormShow= {show: false, type: 'add'}, form: {getFieldDecorator}} = this.props;
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        return(
            <Modal
                visible = {createDormShow.show}
                width = '50%'
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1 style={{textAlign: 'center'}}>新建宿舍号</h1>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col offset = {3} span = {16}>
                            <FormItem {...formItemLayout} label='宿舍编号'>
                                {getFieldDecorator('dor_no',{
                                    rules: [{required: true, message: '请输入宿舍编号'}]
                                })(
                                    <Input type='text' placeholder='请输入宿舍编号'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {3} span = {16}>
                            <FormItem {...formItemLayout} label='宿舍名称'>
                                {getFieldDecorator('dor_name',{
                                    rules: [{required: true, message: '请输入宿舍名称'}]
                                })(
                                    <Input type='text' placeholder='请输入宿舍名称'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset = {3} span = {16}>
                            <FormItem {...formItemLayout} label='宿舍描述'>
                                {getFieldDecorator('dor_desc',{
                                    rules: [{required: false, message: '请输入宿舍描述'}]
                                })(
                                    <Input type='text' placeholder='请输入宿舍描述' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(CreateHouse)
