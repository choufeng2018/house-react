import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button, Checkbox, Form, Icon, Notification, Row, Col} from 'antd';
import {Icon as Icon2} from 'react-fa';
import {actions} from '../store/login'
import {injectReducer} from '../../store'
import {Link} from 'react-router-dom'
import reducer from '../store/login'
import img from './img/intro.png';
import {addCookie, deleteCookie, getCookie} from '../../_platform/cookie';
import moment from 'moment';
import './Login.less';
import './loading.css';
import './animate.css';
const FormItem = Form.Item;
@connect(
    state => {
        const {login = {}} = state;
        return {...login}
    },
    dispatch => ({
        actions:bindActionCreators({...actions},dispatch)
    })
)
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
    }
    login(){
        const {
            actions:{getLogin, getPermission, setVisit},
            form:{validateFields}
        } = this.props;
        validateFields(async (err, values) => {
            if (!err) {
                console.log("this.state.checkCode:",this.state.checkCode)
                if (values['code'] !== this.state.checkCode) {
                    Notification.warning({
                        message: '验证码错误'
                    })
                    return;
                }
                let login_info = {
                    user_name:values["userName"],
                    user_pass:values["password"]
                }
                let res = await getLogin(login_info);
                if (res.length > 0) {
                    let permission = await getPermission({perm_name: res[0].flag});
                    deleteCookie('keys');
                    addCookie('keys', '[]', 1000000000);
                    if (permission && permission.length > 0) {
                        let keys = permission[0].perm_value;
                        deleteCookie('key');
                        addCookie('keys', keys, 1000000000);
                    }
                    let data = JSON.stringify(res)
                    deleteCookie('login');
                    addCookie('login', data, 1000000000);
                    Notification.success({
                        icon: <Icon type="smile-o" style={{ color: '#108ee9' }}/>,
                        duration:2,
                        message:"登录成功!!"
                    })
                    let date = moment().format('YYYY-MM-DD');
                    let rst = await setVisit({visit_time: date});
                    // 登录成功，跳转
                    const {history} = this.props;
                    history.replace('/home')
                }else{
                    Notification.warn({
                        icon: <Icon type="frown-o" style={{ color: '#108ee9' }}/>,
                        duration:2,
                        message:'账号或密码不匹配!!'
                    })
                }
            }
        })
    }
    code(){
        let canvas = document.getElementById('checkCode');
        var ctx = canvas.getContext("2d");
        //随机函数
        function randomNum(m, n) {
        	return Math.floor(Math.random() * (n - m + 1) + m)
        }
        //随机颜色
        function randomColor() {
        	return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
        }
        var checkCodes = [2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var checkCode = "";
        var code;
        //生成验证码
        function generateCode() {
        	checkCode = "";
        	ctx.clearRect(0, 0, canvas.width, canvas.height);
        	ctx.beginPath();
        	ctx.fillStyle = "#DFF0D8";
        	ctx.fillRect(0, 0, canvas.width, canvas.height);
        	for (var i = 0; i < 4; i++) {
        		code = checkCodes[randomNum(0, checkCodes.length - 1)];
        		checkCode += code;
        		ctx.save();
        		ctx.beginPath();
        		ctx.fillStyle = "white";
        		ctx.strokeStyle = randomColor();
        		ctx.font = "30px serif";
        		ctx.rotate(Math.PI / 180 * randomNum(-8, 8));
        		ctx.strokeText(code, 10 + i * 15, 25);
        		ctx.beginPath();
        		ctx.moveTo(randomNum(0, canvas.width), randomNum(0, canvas.height));
        		ctx.lineTo(randomNum(0, canvas.width), randomNum(0, canvas.height));
        		ctx.stroke();
        		ctx.restore();
        	}
        	return checkCode;
        }
        let code1 = generateCode();
        this.setState({checkCode: code1})
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({loading: false});
            this.code();
        }, 2800)

        if(this.state.loading){
            return;
        }

    }
    changeCheck(){
        this.code();
    }
    render(){
        const {actions:{changeAdditionField},form:{validateFields, getFieldDecorator}} = this.props;
        return (
            <div className="wrap">
                {this.state.loading ? <div className="htmleaf-container">
            		<div className="demo" >
            	        <div className="container">
            	            <div className="row">
            	                <div className="col-md-12">
            	                    <div className="loader">
            	                        <div className="loading-1"></div>
            	                        <div className="loading-2">Loading...</div>
            	                    </div>
            	                </div>
            	            </div>
            	        </div>
            	    </div>
            	</div>
                :
                <div className="wrap_content">
                    <div className="login_box">
                        <div className = 'left'>
                            <img src={img}/>
                        </div>
                        <div className = 'right'>
                            <div className="wel">欢迎登录</div>
                            <Form className="login-form">
                                <Row>
                                    <Col>
                                        <FormItem>
                                            {getFieldDecorator('userName', {
                                                rules: [{ required: true, message: '请输入用户名' }],
                                            })(
                                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormItem>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: '请输入密码' }],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span = {13}>
                                        <FormItem>
                                            {getFieldDecorator('code', {
                                                rules: [{required: true, message: '请输入验证码'}]
                                            })(
                                                <Input prefix = {<Icon type="key" />} placeholder = 'Checkcode'/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span = {7}>
                                        <FormItem >
                                            <canvas onClick = {this.changeCheck.bind(this)} width = '74' height = '30' style={{margin: '5px 0 0 20px'}} id="checkCode"></canvas>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col>
                                        <FormItem>
                                            {getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                            })(
                                                <Checkbox style={{position: 'absolute', bottom: '40px'}}>记住密码</Checkbox>
                                                )}
                                            {/* <a className="login-form-forgot" href="">忘记密码</a> */}
                                            <Button type="primary" htmlType="submit" onClick = {this.login.bind(this)} className="login-form-button">
                                                登录
                                            </Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}
export default Form.create()(Login)
