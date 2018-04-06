import React, {Component} from 'react';
import {Modal, Table, Form, Col, Row, Input, Select, Divider, Notification} from 'antd';
import {Icon} from 'react-fa'
const FormItem = Form.Item;
const {Option} = Select;
class CreateBuilding extends Component{
    constructor(props){
        super(props);
        this.state = {
            options: [],
            dorAdmin: []
        }
    }
    async ok(){
        const {
            actions: {setCreateShow, postBuilding, is_fresh},
            form:{validateFields, setFieldsValue}
        } = this.props;
        validateFields( async (err, values) => {
            if (!err) {
                let data = {
                    buil_no: values["buil_no"],
                    buil_name: values["buil_name"],
                    buil_admin: values["buil_admin"],
                    buil_desc: values["buil_desc"]
                }
                let rst_new = await postBuilding({},data);
                if (rst_new[0].status === "ok") {
                    Notification.success({
                        message: '创建成功'
                    })
                    setCreateShow({
                        show: false,
                        type: 'add'
                    })
                    setFieldsValue({
                        buil_no: '',
                        buil_name: '',
                        buil_admin: '',
                        buil_desc: ''
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
        const {actions: {setCreateShow}} = this.props;
        setCreateShow({
            show: false,
            type: 'add'
        })
    }
    componentWillReceiveProps(nextProps){
        const {dorAdmin = []} = nextProps;
        this.setState({dorAdmin});
    }
    loop(data){
        let options = data.map((item, index) => {
            return <Option value={item.doradmin_name}>{item.doradmin_name}</Option>
        })
        return options;
    }
    render(){
        const formItemLayout = {
			labelCol: {span: 8},
			wrapperCol: {span: 16},
		};
        const {form: {getFieldDecorator}, createShow = {show: false, type:'add'}} = this.props;
        return (
            <Modal
                visible = {createShow.show}
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
                width = '50%'
            >
                <h1 style={{textAlign: 'center'}}>新建单元楼</h1>
                <Divider><Icon name='cut' /></Divider>
                <Form>
                    <Row>
                        <Col span = {16} offset = {3}>
                            <FormItem {...formItemLayout} label = '单元楼编号'>
                                {getFieldDecorator('buil_no',{
                                    rules: [{required: true, message: '请输入单元楼编号'}],
                                    initialValue: ''
                                })(
                                    <Input type='text' placeholder='请输入单元楼编号'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={3}>
                            <FormItem {...formItemLayout} label = '单元楼名称'>
                                {getFieldDecorator('buil_name', {
                                    rules: [{required: true, message: '请输入单元楼名称'}]
                                })(
                                    <Input type='text' placeholder='请输入单元楼名称' />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span = {16} offset={3}>
                            <FormItem {...formItemLayout} label='管理员名称'>
                                {getFieldDecorator('buil_admin',{
                                    rules: [{required: true, message: '请分配管理员人员'}]
                                })(
                                    <Select placeholder = '请分配管理员'>
                                        {this.loop(this.state.dorAdmin)}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} offset={3}>
                            <FormItem {...formItemLayout} label='描述'>
                                {getFieldDecorator('buil_desc',{
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
export default Form.create()(CreateBuilding)
