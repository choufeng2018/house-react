import React, {Component} from 'react';
import {Modal, Table, Form, Col, Row, Input, Select, Divider, Notification} from 'antd';
import {Icon} from 'react-fa';
const FormItem = Form.Item;
const {Option} = Select;
class CreateDormitory extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: []
        }
    }
    async ok(){
        const {
            actions: {showCreateDor, postDormitory, is_fresh},
            form:{validateFields, setFieldsValue},
            selectNode = []
        } = this.props;
        let buil_no = selectNode[0].split('--')[0];
        validateFields( async (err, values) => {
            if (!err) {
                let data = {
                    dor_no: values["dor_no"],
                    dor_name: values["dor_name"],
                    dor_desc: values["dor_desc"],
                    buil_no: buil_no
                }
                let rst = await postDormitory({},data);
                if (rst[0].status === "ok") {
                    Notification.success({
                        message: '创建成功'
                    })
                    showCreateDor(false)
                    setFieldsValue({
                        dor_no: '',
                        dor_name: '',
                        dor_desc: ''
                    })
                    is_fresh(true)
                }else{
                    Notification.warning({
                        message: '创建失败'
                    })
                }
            }
        })
    }
    cancel(){
        const {actions: {showCreateDor}} = this.props;
        showCreateDor(false);
    }
    loop(data){
        let options = data.map((item, index) => {
            return <Option value={item}>{item}</Option>
        })
        return options;
    }
    render(){
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        const {form: {getFieldDecorator}, createDormitory = false} = this.props;
        return (
            <Modal
                visible = {createDormitory}
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
                width = '50%'
            >
                <h1 style={{textAlign: 'center'}}>新建单元房</h1>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col span = {16} offset = {3}>
                            <FormItem {...formItemLayout} label = '单元房编号'>
                                {getFieldDecorator('dor_no',{
                                    rules: [{required: true, message: '请输入单元房编号'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' placeholder='请输入单元房编号'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={3}>
                            <FormItem {...formItemLayout} label = '单元房名称'>
                                {getFieldDecorator('dor_name', {
                                    rules: [{required: true, message: '请输入单元房名称'}]
                                })(
                                    <Input type='text' placeholder='请输入单元房名称' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={3}>
                            <FormItem {...formItemLayout} label='描述'>
                                {getFieldDecorator('dor_desc',{
                                    rules: [{required: false, message: '请输入描述信息'}]
                                })(
                                    <Input type='text' placeholder = '请输入描述'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(CreateDormitory)
