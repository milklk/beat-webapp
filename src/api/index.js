import axios from "./axios";
import { api } from "./proxy";
/**
 * 登录
 * @param {String} authCode code
 */
export const login = authCode =>
  axios(`${api}/login`, { type: 2, authCode }, "post");

/**
 * 公告列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 */
export const noticesList = (pageNumber, pageSize) =>
  axios(`${api}/notice/list`, { pageNumber, pageSize }, "get");

/**
 * 公告详情
 * @param {String} noticeId 公告标识id
 */
export const noticesDetail = noticeId =>
  axios(`${api}/notice/list`, { noticeId }, "get");
/**
 * 公告已读
 * @param {Array} ids 公告id
 */
export const noticesRead = ids => axios(`${api}/notice/isRead`, { ids }, "get");

/**
 * 公告全部已读
 */
export const noticesReadAll = () => axios(`${api}/notice/readAll`);

/**
 * 衔接列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 */
export const joinsList = (pageNumber, pageSize) =>
  axios(`${api}/personJoin/list`, { pageNumber, pageSize }, "get");
/**
 * 衔接详情
 * @param {String} id 人员Id
 */
export const joinsDetail = id =>
  axios(`${api}/personJoin/detail`, { id }, "get");
/**
 * 衔接拒绝
 * @param {String} id 人员Id
 * @param {String} reason 拒绝原因
 * @param {String} refuse 拒绝为1
 */
export const joinsUpdateFalse = (id, reason, refuse = "1") =>
  axios(`${api}/personJoin/update`, { id, reason, refuse }, "post");
/**
 * 衔接确认
 * @param {String} id 人员Id
 * @param {String} joinTime 时间
 * @param {String} joinArea 地点
 * @param {String} refuse 确认为2
 */
export const joinsUpdateTrue = (id, joinTime, joinArea, refuse = "0") =>
  axios(`${api}/personJoin/update`, { id, joinTime, joinArea, refuse }, "post");
/**
 * 消息列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 */
export const notifyList = (pageNumber, pageSize) =>
  axios(`${api}/notify/list`, { pageNumber, pageSize }, "get");

/**
 * 消息详情
 * @param {String} noticeId 公告标识id
 */
export const notifyDetail = notifyId =>
  axios(`${api}/notify/list`, { notifyId }, "get");

/**
 * 消息已读
 * @param {Array} ids 消息id
 */
export const notifyRead = ids => axios(`${api}/notify/isRead`, { ids }, "get");

/**
 * 消息全部已读
 */
export const notifyReadAll = () => axios(`${api}/notify/readAll`);

/**
 * 知识库类型
 */
export const knowledgeType = () => axios(`${api}/knowledgeType/list`);

/**
 * 知识库列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 * @param {String} typeId 知识库类型
 */
export const knowledgeList = (pageNumber, pageSize, typeId) =>
  axios(`${api}/knowledge/list`, { pageNumber, pageSize, typeId }, "get");

/**
 * 知识详情
 * @param {String} noticeId 公告标识id
 */
export const knowledgeDetail = id =>
  axios(`${api}/knowledge/list`, { id }, "get");

/**
 * 通讯录列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 * @param {String} keyword 搜索关键字
 */
export const archivesList = (pageNumber, pageSize, keyword) =>
  axios(`${api}/archivesList`, { pageNumber, pageSize, keyword }, "get");

/**
 * 获取图片地址
 * @param {String} attId iid
 */
export const headPhoto = attId => `${api}/attachment/download?attId=${attId}`;

/**
 * 人员详情
 * @param {String} archivesCode 人员Id
 */
export const archivesDetail = archivesCode =>
  axios(`${api}/archives/basePersonInfo`, { archivesCode }, "get");

/**
 * 人员记录
 * @param {String} archivesCode 人员Id
 */
export const archivesRecordAll = archivesCode =>
  axios(`${api}/archives/archivesDetail`, { archivesCode }, "get");

/**
 * 签到
 * @param {string} archivesCode 人员Id
 * @param {string} signTime 签到时间
 * @param {string} signAddress 签到地点
 * @param {string} signRemark 代签事由
 * @param {string} fileIdTmp 附件Id
 */
export const personSignAdd = (
  archivesCode,
  signTime,
  signAddress,
  signRemark,
  fileIdTmp
) =>
  axios(
    `${api}/personSign/add`,
    { signTime, signAddress, archivesCode, signRemark, fileIdTmp },
    "post"
  );
/**
 * 签到记录
 * @param {String} archivesCode 人员Id
 */
export const personSignRecord = () => axios(`${api}/personSign/list`);

/**
 * 尿检
 * @param {string} checkTime 尿检时间
 * @param {string} checkResult 尿检结果
 * @param {string} checkAddress 尿检地点
 * @param {string} checkRemark 代上传事由
 * @param {string} archivesCode 人员Id
 * @param {string} fileIdTmp 附件Id
 */
export const urineAdd = (
  checkTime,
  checkResult,
  checkAddress,
  checkRemark,
  archivesCode,
  fileIdTmp
) =>
  axios(
    `${api}/urine/add`,
    {
      checkTime,
      checkResult,
      checkAddress,
      checkRemark,
      archivesCode,
      fileIdTmp
    },
    "post"
  );
/**
 * 尿检记录
 * @param {String} archivesCode 人员Id
 */
export const urineRecord = archivesCode =>
  axios(`${api}/urine/list`, { archivesCode }, "get");
/**
 * 谈话
 * @param {String} archivesCode 人员Id
 * @param {String} talkTitle 谈话摘要
 * @param {String} talkContent 谈话内容
 * @param {String} talkMode 谈话渠道
 * @param {String} talkTime 谈话日期
 * @param {String} fileIdTmp 附件Id
 */
export const personTalkAdd = (
  archivesCode,
  talkTitle,
  talkContent,
  talkMode,
  talkTime,
  fileIdTmp
) =>
  axios(
    `${api}/personTalk/add`,
    {
      archivesCode,
      talkTitle,
      talkContent,
      talkMode,
      talkTime,
      fileIdTmp
    },
    "post"
  );
/**
 * 谈话记录
 * @param {String} archivesCode 人员Id
 */
export const personTalkRecord = archivesCode =>
  axios(`${api}/personTalk/list`, { archivesCode }, "get");

/**
 * 拜访
 * @param {String} archivesCode 人员Id
 * @param {String} visitTitle 拜访摘要
 * @param {String} visitContent 拜访内容
 * @param {String} visitTime 拜访日期
 * @param {String} fileIdTmp 附件id
 */
export const personVisitAdd = (
  archivesCode,
  visitTitle,
  visitContent,
  visitTime,
  fileIdTmp
) =>
  axios(
    `${api}/personVisit/add`,
    {
      archivesCode,
      visitTitle,
      visitContent,
      visitTime,
      fileIdTmp
    },
    "post"
  );
/**
 * 拜访记录
 * @param {String} archivesCode 人员Id
 */
export const personVisitRecord = archivesCode =>
  axios(`${api}/personVisit/list`, { archivesCode }, "get");

/**
 * 请假
 * @param {String} archivesCode 人员Id
 * @param {String} leaveTime 请假申请时间
 * @param {String} reason 请假事由
 * @param {String} visitOrg 被访单位
 * @param {String} visitUser 被访人姓名
 * @param {String} visitUserMobile 被访人电话
 * @param {String} relationship 双方关系
 * @param {String} startTime 请假开始时间
 * @param {String} endTime 请假结束时间
 * @param {String} activitiyRange 活动范围
 */
export const personLeaveAdd = (
  archivesCode,
  leaveTime,
  reason,
  visitOrg,
  visitUser,
  visitUserMobile,
  relationship,
  startTime,
  endTime,
  activitiyRange
) =>
  axios(
    `${api}/personLeave/add`,
    {
      archivesCode,
      leaveTime,
      reason,
      visitOrg,
      visitUser,
      visitUserMobile,
      relationship,
      startTime,
      endTime,
      activitiyRange
    },
    "post"
  );

/**
 * 请假记录
 * @param {String} archivesCode 人员Id
 */
export const personLeaveRecord = archivesCode =>
  axios(`${api}/personLeave/list`, { archivesCode }, "get");

/**
 * 评估
 * @param {String} archivesCode 人员Id
 * @param {String} assessTitle 评估摘要
 * @param {String} assessRemark 评估情况
 * @param {String} assessTime 评估时间
 * @param {String} ids 小组人员id，用逗号隔开
 * @param {String} fileIdTmp 附件Id
 */
export const personAssessAdd = (
  archivesCode,
  assessTitle,
  assessRemark,
  assessTime,
  ids,
  fileIdTmp
) =>
  axios(
    `${api}/personAssess/add`,
    {
      archivesCode,
      assessTitle,
      assessRemark,
      assessTime,
      ids,
      fileIdTmp
    },
    "post"
  );

/**
 * 评估记录
 * @param {String} archivesCode 人员Id
 */
export const personAssessRecord = archivesCode =>
  axios(`${api}/personAssess/list`, { archivesCode }, "get");

/**
 * 救助
 * @param {String} archivesCode 人员Id
 * @param {String} helpTitle 救助摘要
 * @param {String} helpContent 救助情况
 * @param {String} assessTime 救助时间
 * @param {String} fileIdTmp 附件Id
 */
export const personHelpAdd = (
  archivesCode,
  helpTitle,
  helpContent,
  helpTime,
  fileIdTmp
) =>
  axios(
    `${api}/personHelp/add`,
    {
      archivesCode,
      helpTitle,
      helpContent,
      helpTime,
      fileIdTmp
    },
    "post"
  );

/**
 * 救助记录
 * @param {String} archivesCode 人员Id
 */
export const personHelpRecord = archivesCode =>
  axios(`${api}/personHelp/list`, { archivesCode }, "get");

/**
 * 违反协议
 * @param {String} archivesCode 人员Id
 * @param {String} assessTitle 违反协议摘要
 * @param {String} violationContent 违反协议情况
 * @param {String} violationTime 违反协议时间
 * @param {String} fileIdTmp 附件Id
 */
export const personViolationAdd = (
  archivesCode,
  violationTitle,
  violationContent,
  violationTime,
  fileIdTmp
) =>
  axios(
    `${api}/personViolation/add`,
    {
      archivesCode,
      violationTitle,
      violationContent,
      violationTime,
      fileIdTmp
    },
    "post"
  );

/**
 * 违反协议记录
 * @param {String} archivesCode 人员Id
 */
export const personViolationRecord = archivesCode =>
  axios(`${api}/personViolation/list`, { archivesCode }, "get");

/**
 * 查找脱失
 * @param {String} archivesCode 人员Id
 * @param {String} findTitle 查找脱失摘要
 * @param {String} findContent 查找脱失情况
 * @param {String} findTime 查找脱失时间
 * @param {String} fileIdTmp 附件Id
 */
export const personFindAdd = (
  archivesCode,
  findTitle,
  findContent,
  findTime,
  fileIdTmp
) =>
  axios(
    `${api}/personFind/add`,
    {
      archivesCode,
      findTitle,
      findContent,
      findTime,
      fileIdTmp
    },
    "post"
  );

/**
 * 查找脱失记录
 * @param {String} archivesCode 人员Id
 */
export const personFindRecord = archivesCode =>
  axios(`${api}/personFind/list`, { archivesCode }, "get");

/**
 *
 * @param {String} archivesCode 人员Id
 * @param {String} useTime 药物治疗时间
 * @param {String} useAmount 服药剂量
 * @param {String} treatArea 药物治疗地点
 * @param {String} doctor 医务人员
 * @param {String} doctorMobile 医务人员电话
 * @param {String} tradeTable 药物治疗单
 * @param {String} checkReport 医学检查报告
 */
export const personMedicationAdd = (
  archivesCode,
  useTime,
  useAmount,
  treatArea,
  doctor,
  doctorMobile,
  tradeTable,
  checkReport
) =>
  axios(
    `${api}/personMedication/add`,
    {
      archivesCode,
      useTime,
      useAmount,
      treatArea,
      doctor,
      doctorMobile,
      tradeTable,
      checkReport
    },
    "post"
  );

/**
 * 药物维持记录
 * @param {String} archivesCode 人员Id
 */
export const personMedicationRecord = archivesCode =>
  axios(`${api}/personMedication/list`, { archivesCode }, "get");
/**
 * 附件上传
 * @param {File} file
 */
export const fileAdd = file =>
  axios(`${api}/attachment/upload`, { file }, "file");
/**
 * 个人信息
 */
export const mineDetail = () => axios(`${api}/user/getCurrentUserInfo`);

/**
 *  个人信息修改
 * @param {String} id 用户Id
 * @param {String} realname 用户名
 * @param {String} address 居住地址
 * @param {String} idCard 身份证号
 * @param {String} userMobile 联系方式
 */
export const mineDetailUpdate = (id, realname, idCard, userMobile, address) =>
  axios(
    `${api}/user/save`,
    { id, realname, idCard, userMobile, address },
    "post"
  );
/**
 * 移交列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 * @param {String} keyword 查询条件（姓名）
 */
export const archives = (pageNumber, pageSize, keyword) =>
  axios(
    `${api}/archives/archivesList`,
    { pageNumber, pageSize, keyword },
    "get"
  );
/**
 * 接收列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 * @param {String} keyword 查询条件（姓名）
 */
export const archivesUsers = (pageNumber, pageSize, keyword) =>
  axios(`${api}/user/getUsers`, { pageNumber, pageSize, keyword }, "get");

/**
 * 移交
 * @param {Array} archivesCodes 移交人Id
 * @param {String} userId 接收人Id
 */
export const archivesTransfer = (archivesCodes, userId) =>
  axios(`${api}/archives/transfer`, { archivesCodes, userId }, "post");

/**
 * 审批列表
 * @param {Number} pageNumber 列表页码
 * @param {Number} pageSize 每页列数
 * @param {String} type 1待处理2已处理
 * @param {String} keyword 申请人姓名
 */
export const approvesList = (pageNumber, pageSize, type, keyword) =>
  axios(
    `${api}/change/leaveList`,
    { pageNumber, pageSize, type, keyword },
    "get"
  );
/**
 * 审批详情
 * @param {String} id 人员id
 */
export const approvesDetail = id =>
  axios(`${api}/change/leaveDetail`, { id }, "get");
/**
 * 审批操作
 * @param {String} id 人员id
 */
export const approvesEdit = (status, id, fileIdTmp2, remark = "") =>
  axios(`${api}/change/authLeave`, { status, id, fileIdTmp2, remark }, "get");
/**
 * 审批列表
 * @param {Number} personId 人员id
 */
export const approvesRecord = personId =>
  axios(`${api}/change/leaveList`, { personId }, "get");

/**
 * 人员统计
 */
export const personList = () => axios(`${api}/person/list`);
