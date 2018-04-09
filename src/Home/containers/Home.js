import React, {Component} from 'react';
import {connect} from 'react-redux';
import {injectReducer} from '../../store';
import {News} from '../components/News';
import {Notice} from '../components/Notice';
import {Students} from '../components/Students';
import {Row, Col} from 'antd';
export default class Home extends Component{
    async componentDidMount(){
        const {default: reducer} = await import('../store');
        // 要把注册reducer放到渲染组件之前
        injectReducer('home', reducer);
    }
    render(){
        return (
            <div>
                <Row gutter={10} style={{margin: '5px, 5px ,5px ,5px'}}>
                    <Col span={11}>
                        <Notice {...this.props} />
                    </Col>
                    <Col span={11}>
                        <Students {...this.props} />
                    </Col>
                </Row>
                {/* <Row>
                    <Col span={11}>
                        <News {...this.props} />
                    </Col>
                </Row> */}
            </div>
        )
    }
}
