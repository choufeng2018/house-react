/**
 * 批量创建管理员人员
 */
import React, {Component} from 'react';
import {Modal, Table, Notification, Upload, Divider, Popconfirm, Button, Icon} from 'antd';
import {DORADMIN_MUBAN, FILE_API} from '../../../_platform/api';
export default class CreateAdminBatch extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    ok(){
        const {actions: {showCreateBatch, postDorAdminAc, isFresh}} = this.props;
        let promise = this.state.dataSource.map((item, index) => {
            return postDorAdminAc({}, item)
        });
        Promise.all(promise).then(rst => {
            if (rst.length === this.state.dataSource.length) {
                Notification.success({
                    message: '创建成功'
                })
            }
            showCreateBatch(false);
            isFresh(true)
        })
    }
    cancel(){
        const {actions: {showCreateBatch}} = this.props;
        showCreateBatch(false);
    }
    // 下载文件
    download(){
        let a = document.createElement('a');
        a.href = `${DORADMIN_MUBAN}`;
        a.click();
    }
    handleExcelData(data){
        data.splice(0, 1);
        let dataSource = data.map((item, index) => {
            return {
                doradmin_no: item[0],
                doradmin_name: item[1],
                doradmin_sex: item[2],
                doradmin_tel: item[3]
            }
        })
        this.setState({dataSource});
    }
    render(){
        const {createBatch = false} = this.props;
        let jthis = this;
        console.log("DORADMIN_MUBAN:",DORADMIN_MUBAN);
        const props = {
            name: 'file',
            action: `${FILE_API}/fileUpload.php`,
            headers: {

            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                }
                if (info.file.status === 'done') {
                    Notification.success({
                        message: `${info.file.name} 文件上传成功`
                    });
                    jthis.handleExcelData(info.fileList[0].response);
                } else if (info.file.status === 'error') {
                    Notification.success({
                        message: `${info.file.name} 文件上传失败.`
                    })
                }
            },
        }
        return (
            <Modal
                visible = {createBatch}
                width = "80%"
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1>管理员信息批量录入</h1>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    rowKey = "doradmin_no"
                />
                <Button style = {{margin: '20px 20px 0 0'}} onClick = {this.download.bind(this)}>
                    <Icon type="download" />模板下载
                </Button>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 上传并预览
                    </Button>
                </Upload>
            </Modal>
        )
    }
    columns = [{
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
            record.index = index + 1;
            return (
                <span>{record.index}</span>
            )
        }
    },{
        title: '工号',
        dataIndex: 'doradmin_no',
        key: 'doradmin_no'
    },{
        title: '姓名',
        dataIndex: 'doradmin_name',
        key: 'doradmin_name'
    },{
        title: '性别',
        dataIndex: 'doradmin_sex',
        key: 'doradmin_sex'
    },{
        title: '联系方式',
        dataIndex: 'doradmin_tel',
        key: 'doradmin_tel'
    }]
}
