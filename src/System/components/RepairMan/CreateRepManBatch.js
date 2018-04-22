import React, {Component} from 'react';
import {Modal, Table, Notification, Upload, Divider, Popconfirm, Button, Icon} from 'antd';
import {REPMAN_MUBAN, FILE_API} from '../../../_platform/api';
export default class CreateRepManBatch extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }
    // 下载文件
    download(){
        let a = document.createElement('a');
        a.href = `${REPMAN_MUBAN}`;
        a.click();
    }
    ok(){
        const {actions: {postRepman, setCreateBatch, isFresh}} = this.props;
        let promise = this.state.dataSource.map((item, index) => {
            return postRepman({}, item)
        })
        Promise.all(promise).then(rst => {
            if (rst.length === this.state.dataSource.length) {
                Notification.success({
                    message: '创建成功'
                })
            }
            setCreateBatch(false);
            isFresh(true);
        })
    }
    cancel(){
        const {actions: {setCreateBatch}} = this.props;
        setCreateBatch(false)
    }
    handleExcelData(data){
        data.splice(0, 1);
        let dataSource = data.map((item, index) => {
            return {
                index: index + 1,
                repman_no: item[0],
                user_name: item[1],
                repman_sex: item[2],
                repman_tel: item[3],
                repman_adr: item[4]
            }
        })
        this.setState({dataSource});
    }
    render(){
        const {batchShow = false} = this.props;
        let jthis = this;
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
                visible = {batchShow}
                width = "80%"
                onOk = {this.ok.bind(this)}
                onCancel = {this.cancel.bind(this)}
            >
                <h1>维修人员信息批量录入</h1>
                <Table
                    bordered
                    columns = {this.columns}
                    dataSource = {this.state.dataSource}
                    rowKey = "repman_no"
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
        dataIndex: 'index',
        key: 'index'
    },{
        title: '工号',
        dataIndex: 'repman_no',
        key: 'repman_no'
    },{
        title: '姓名',
        dataIndex: 'user_name',
        key: 'user_name'
    },{
        title: '性别',
        dataIndex: 'repman_sex',
        key: 'repman_sex'
    },{
        title: '联系方式',
        dataIndex: 'repman_tel',
        key: 'repman_tel'
    },{
        title: '住址',
        dataIndex: 'repman_adr',
        key: 'repman_adr'
    }]
}
