export const DOMAIN = "http://localhost";
export const PORT = "80";
export const LOGIN_API = `${DOMAIN}:${PORT}/house-php/login`;
export const SERVICE_API = `${DOMAIN}:${PORT}/house-php/service`;
export const FILE_API = `${DOMAIN}:${PORT}/house-php/fileService`
// 文件下载api
export const DOWNLOAD_API = `${DOMAIN}:${PORT}/house-php/fileService`;
// 宿管信息批量上传模板下载
export const DORADMIN_MUBAN =  `${DOWNLOAD_API}/fileDownload.php`;
export const REPMAN_MUBAN =  `${DOWNLOAD_API}/fileDownloadRep.php`;
export let MODULES = [{
    module: '综合展示',
    checked: false,
    key: 'dashboard'
},{
    module: '综合管理',
    checked: false,
    key: 'overall',
    children: [
    //     {
    //     module: '新闻管理',
    //     checked: false,
    //     key: 'news'
    // },
    {
        module: '公告管理',
        checked: false,
        key: 'notice'
    }]
},{
    module: '报修管理',
    checked: false,
    key: 'repair',
    children: [{
        module: '报修单管理',
        checked: false,
        key: 'order'
    },{
        module: '维修进度查看',
        checked: false,
        key: 'schedule'
    },{
        module: '维修评价',
        checked: false,
        key: 'setevaluate'
    }]
},{
    module: '维修管理',
    checked: false,
    key: 'maintain',
    children: [{
        module: '接单管理',
        checked: false,
        key: 'receive'
    },{
        module: '设置维修进度',
        checked: false,
        key: 'setprogress'
    },{
        module: '查看评价',
        checked: false,
        key: 'evaluate'
    }]
},{
    module: '业主管理',
    checked: false,
    key: 'accomm',
    children: [{
        module: '业主登记',
        checked: false,
        key: 'distri'
    }]
},{
    module: '门禁管理',
    checked: false,
    key: 'access',
    children: [{
        module: '来访人登记',
        checked: false,
        key: 'visit',
    }
    // ,{
    //     module: '外带物品登记',
    //     checked: false,
    //     key: 'goods',
    // }
]
},{
    module: '留言管理',
    checked: false,
    key: 'MsgManage',
    children: [{
        module: '留言管理',
        checked: false,
        key: 'message',
    },{
        module: '留言查看',
        checked: false,
        key: 'msgdetail',
    }]
},{
    module: '个人中心',
    checked: false,
    key: 'self',
    children: [{
        module: '个人信息',
        checked: false,
        key: 'selfinfo'
    },{
        module: '个人密码',
        checked: false,
        key: 'selfpass'
    }]
},{
    module: '系统配置',
    checked: false,
    key: 'setup',
    children: [{
        module: '宿管信息',
        checked: false,
        key: 'dorAdmin',
    },{
        module: '宿舍楼信息',
        checked: false,
        key: 'building',
    },{
        module: '宿舍信息',
        checked: false,
        key: 'dormitory',
    },{
        module: '权限配置',
        checked: false,
        key: 'permission',
    }]
}]
