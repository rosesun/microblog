/*
 * GET home page.
 */
var mongoose = require('mongoose');
var uri = 'mongodb://localhost/nodetest1';
var db = mongoose.connect(uri);
var fs = require('fs');  //node.js核心的文件处理模块
var formidable = require('formidable');//文件上传插件
//var db = mongoose.createCollection('mongodb://127.0.0.1:27017/nodetest1');

var schema = mongoose.Schema({
    title: String,
    des: String
});

var schemaU = mongoose.Schema({
    username: String,
    password: String,
    identity: String
})
var schemaC = mongoose.Schema({
    id: Number,
    name: String,
    teacher:String
})
var schemaA = mongoose.Schema({
    id: Number,
    course_name: String,
    stu_name: String,
    teac_name:String
})
var schema
var schemaW = mongoose.Schema({
    stu_name: String,
    title: String,
    question: String,
    answer: String,
    course_title:String,
    course_teacher:String,
    file_name: String,
    file_path: String
});
var schemaS = mongoose.Schema({
    teacher:String,
    work_title:String,
    course_title:String,
    require:String,
    file_name: String,
    file_path: String
})
var schemaR = mongoose.Schema({
    teacher:String,
    work_title:String,
    course_title:String,
    stu_name:String,
    check_content:String
})
var User = mongoose.model('User', schemaU);//用户表
var Book = mongoose.model('Book', schema);//教师机构
var Course = mongoose.model('Course', schemaC);//课程列表
var addCourse = mongoose.model('addCourse', schemaA);//学生添加课程后的列表
var Work = mongoose.model('Work', schemaW);//学生提交作业的表
var workTeacher = mongoose.model('workTeacher',schemaS);//教师发布作业的表
var Evaluation = mongoose.model('Evaluation',schemaR);//教师发布评论的表

var book = new Book({
    title: "教师机构",
    des: "我们的教师主要有相关的职级的排名"
});

//book.save(function (err) {
//    console.log(err);
//});

var crypto = require('crypto');
//var User = require('../models/user.js');
//var Post = require('../models/post.js');

//用户注册render数据
exports.reg = function (req, res) {
    res.render('reg', {
        title: "用户注册",
        navNum: 9,
        error: req.flash('error'),
        username: req.session.username
    });
}
//首页的render数据
exports.index = function (req, res) {
    var news = [
        {num: 1, list: '名家进校园系列讲座'},
        {num: 2, list: '实验室的交流大会于0322教室成功举行'},
        {num: 3, list: '名家进校园系列讲座'},
        {num: 4, list: '实验室的交流大会于0322教室成功举行'},
        {num: 5, list: '名家进校园系列讲座'},
        {num: 6, list: '实验室的交流大会于0322教室成功举行'},
        {num: 7, list: '实验室的装修整理'},
        {num: 8, list: '实验室的交流大会于0322教室成功举行'},
        {num: 9, list: '实验室的管理老师心得交流'}
    ];
    var video = [
        {list: 'tobtobitobitobitobitobitobitobii'},
        {list: 'loki'},
        {list: 'loki'},
        {list: 'loki'},
        {list: 'loki'},
        {list: 'loki'},
        {list: 'loki'},
        {list: 'loki'},
        {list: 'loki'},
        {list: 'jane'}
    ];
    var source = [
        {list: '实验报告的参考java程序设计与实现', url: '../img/22.png'},
        {list: '实验报告的参考', url: '../img/22.png'},
        {list: '实验报告的参考java程序设计与实现', url: '../img/22.png'},
        {list: '实的参考java程序设计与实现', url: '../img/22.png'},
        {list: '实验报计与实现', url: '../img/22.png'},
        {list: '实验报告的参考java程序设计与实现', url: '../img/22.png'},
        {list: '实验报告的参程序设计与实现', url: '../img/22.png'},
        {list: '实告的参考java程序设计与实现', url: '../img/22.png'},
        {list: '实验报告的参考j计与实现', url: '../img/22.png'}
    ];
    var course = [
        {list: '《计算机网络》'},
        {list: '《jsp开发》'},
        {list: '《数据挖掘》'},
        {list: '《Java应用与开发》'},
        {list: '《Android应用程序开发与实践》'},
        {list: '《web网页开发》'},
        {list: '《数据库应用程序开发》'},
        {list: '《计算机网络》'},
        {list: '《计算机网络》'},
        {list: '《计算机网络》'}
    ];
    var laboratory = [
        {list: '2508教室', status: 1,},
        {list: '2507教室', status: 0,},
        {list: '2507教室', status: 1,},
        {list: '2507教室', status: 0,},
        {list: '2507教室', status: 1,},
        {list: '2507教室', status: 0,},
        {list: '2507教室', status: 1,},
        {list: '2507教室', status: 1,},
        {list: '2507教室', status: 1,},
        {list: '2507教室', status: 0,}
    ];

    //Post.get(null, function (err, posts) {
    //    if (err) {
    //        posts = [];
    //    }
    res.render('index', {
        title: '首页',
        navNum: 1,
        news: news,
        video: video,
        source: source,
        course: course,
        laboratory: laboratory,
        username: req.session.username,
        identity: req.session.identity
        //posts: posts,
        //user: req.session.user,
        //success: req.flash('success').toString(),
        //error: req.flash('error').toString()
    });
    //});
};
//师资队伍
exports.centerTeacher = function (req, res) {
    var data = [
        {img_src: "../images/teacher.jpg", name: "小李", job_title: "教授", position: "讲课"},
        {img_src: "../images/teacher.jpg", name: "小李", job_title: "教授", position: "讲课"},
        {img_src: "../images/teacher.jpg", name: "小李", job_title: "教授", position: "讲课"},
        {img_src: "../images/teacher.jpg", name: "小李", job_title: "教授", position: "讲课"},
        {img_src: "../images/teacher.jpg", name: "小李", job_title: "教授", position: "讲课"},
        {img_src: "../images/teacher.jpg", name: "小李", job_title: "教授", position: "讲课"},
        {img_src: "../images/teacher.jpg", name: "小李", job_title: "教授", position: "讲课"}
    ];
    res.render('centerTeacher', {
        title: "师资队伍",
        navNum: 2,
        navFirst: 1,
        data: data,
        username: req.session.username,
        identity: req.session.identity
        //user: req.session.user,
        //success: req.flash('success').toString(),
        //error: req.flash('error').toString()
    });
};
//机构设置
exports.institutionalSettings = function (req, res) {

    Book.find({}, function (err, doc) {
        res.render('institutionalSettings', {
            title: "机构设置",
            navNum: 2,
            navFirst: 2,
            con: doc,
            username: req.session.username,
            identity: req.session.identity
        })
    })

    //db.on('error',function(error){
    //    console.log(error);
    //})
    //
    //User.find({'username':'test3'},function(err,docs){
    //    res.render('institutionalSettings',{
    //        title:"机构设置",
    //        con:docs
    //    });
    //})
    //res.render('institutionalSettings', {
    //    title: "机构设置",
    //    //user: req.session.user,
    //    //success: req.flash('success').toString(),
    //    //error: req.flash('error').toString()
    //});
};
//中心介绍
exports.introduction = function (req, res) {
    res.render('introduction', {
        title: "中心简介",
        navNum: 2,
        navFirst: 3,
        username: req.session.username,
        identity: req.session.identity
        //user: req.session.user,
        //success: req.flash('success').toString(),
        //error: req.flash('error').toString()
    });
};
//最新动态
exports.news = function (req, res) {
    var data = [
        {num: 1, title: "实验室的所有系统都更新了", con: "今日大家的电脑都更新了,"},
        {num: 2, title: "实验室的所有系统都更新了", con: "今日大家的电脑都更新了,"},
        {num: 3, title: "实验室的所有系统都更新了", con: "今日大家的电脑都更新了,"},
        {num: 4, title: "实验室的所有系统都更新了", con: "今日大家的电脑都更新了,"},
        {num: 5, title: "实验室的所有系统都更新了", con: "今日大家的电脑都更新了,"},
        {num: 6, title: "实验室的所有系统都更新了", con: "今日大家的电脑都更新了,"}
    ]
    res.render('news', {
        title: "最新动态",
        data: data,
        navNum: 3,
        username: req.session.username,
        identity: req.session.identity
        //user: req.session.user,
        //success: req.flash('success').toString(),
        //error: req.flash('error').toString()
    });
};
//学校制度
exports.schoolSystem = function (req, res) {
    var data = {
        rules: "是指用人单位的规章制度是用人单位制定的组织劳动过程和进行劳" +
        "动管理的规则和制度的总和。也称为内部劳动规则，是企业内部的“法律”。规章制度内容广泛，" +
        "包括了用人单位经营管理的各个方面。根据1997年11月劳动部颁发的《劳动部关于对新开办用人" +
        "单位实行劳动规章制度备案制度的通知》，规章制度主要包括：劳动合同管理、工资管理、社会" +
        "保险福利待遇、工时休假、职工奖惩，以及其他劳动管理规定。" +
        "用人单位制定规章制度，要严格执行国家法律、法规的规定，保障劳动者的劳动权利，督促劳动" +
        "者履行劳动义务。制定规章制度应当体现权利与义务一致、奖励与惩罚结合，不得违反法律、法规的" +
        "规定。否则，就会受到法律的制裁。本法第七十九条规定：“用人单位制度的直接劳动者切身利益的规章" +
        "制度违反法律、法规规定的，由劳动行政部门责令改正，给予警告；给劳动者造成损害的，用人单位应当" +
        "承担赔偿责任。”"
    };
    res.render('schoolSystem', {
        title: "学校制度",
        data: data,
        navNum: 4,
        navFirst: 1,
        username: req.session.username,
        identity: req.session.identity
        //user: req.session.user,
        //success: req.flash('success').toString(),
        //error: req.flash('error').toString()
    });
};
//中心制度
exports.laboratorySys = function (req, res) {
    var data = {
        rules: "是指用人单位的规章制度是用人单位制定的组织劳动过程和进行劳" +
        "动管理的规则和制度的总和。也称为内部劳动规则，是企业内部的“法律”。规章制度内容广泛，" +
        "包括了用人单位经营管理的各个方面。根据1997年11月劳动部颁发的《劳动部关于对新开办用人" +
        "单位实行劳动规章制度备案制度的通知》，规章制度主要包括：劳动合同管理、工资管理、社会" +
        "保险福利待遇、工时休假、职工奖惩，以及其他劳动管理规定。" +
        "用人单位制定规章制度，要严格执行国家法律、法规的规定，保障劳动者的劳动权利，督促劳动" +
        "者履行劳动义务。制定规章制度应当体现权利与义务一致、奖励与惩罚结合，不得违反法律、法规的" +
        "规定。否则，就会受到法律的制裁。本法第七十九条规定：“用人单位制度的直接劳动者切身利益的规章" +
        "制度违反法律、法规规定的，由劳动行政部门责令改正，给予警告；给劳动者造成损害的，用人单位应当" +
        "承担赔偿责任。”"
    };
    res.render('laboratorySys', {
        title: "中心制度",
        data: data,
        navNum: 4,
        navFirst: 2,
        username: req.session.username,
        identity: req.session.identity
        //user: req.session.user,
        //success: req.flash('success').toString(),
        //error: req.flash('error').toString()
    });
}
//教学理念
exports.teachingIdeas = function (req, res) {
    var data = [
        {
            title: "学校的制度",
            ideas: "1.关注学生的进步和发展。首先，要求教师有“对象”意识。教学不是唱独角戏，离开“学”，就无所谓“教”，因此，教师必须确立学生的主体地位，树立“一切为了学生的发展”的思想。其次，要求教师有“全人”的概念。学生发展是全面的发展，而不是某一方面或某一学科的发展。教师千万不能过高地估计自己所教学科的价值，而且也不能仅把学科价值定位在本学科上，而应定位在对一个完整的人的发展上."
        },
        {
            title: "学校的制度",
            ideas: "heeehhehehehehehe"
        },
        {
            title: "学校的制度",
            ideas: "heeehhehehehehehe"
        },
        {
            title: "学校的制度",
            ideas: "heeehhehehehehehe"
        }
    ];
    res.render('teachingIdeas', {
        title: "教学理念",
        data: data,
        navNum: 5,
        navFirst: 1,
        username: req.session.username,
        identity: req.session.identity
    })
}
//课程概况
exports.courseOverview = function (req, res) {
    res.render('courseOverview', {
        title: "课程概况",
        navNum: 5,
        navFirst: 2,
        username: req.session.username,
        identity: req.session.identity
    })
}
//教学资源
exports.teachSource = function (req, res) {
    var data = [
        {
            src: "../images/teacher.jpg",
            title: "图片设计",
            content: "第一的设计，你值得拥有，巴巴爸爸那爸爸爸爸啦啦啦"

        },
        {
            src: "../images/teacher.jpg",
            title: "图片设计",
            content: "第一的设计，你值得拥有，巴巴爸爸那爸爸爸爸啦啦啦"

        },
        {
            src: "../images/teacher.jpg",
            title: "图片设计",
            content: "第一的设计，你值得拥有，巴巴爸爸那爸爸爸爸啦啦啦"

        },
        {
            src: "../images/teacher.jpg",
            title: "图片设计",
            content: "第一的设计，你值得拥有，巴巴爸爸那爸爸爸爸啦啦啦"

        },
        {
            src: "../images/teacher.jpg",
            title: "图片设计",
            content: "第一的设计，你值得拥有，巴巴爸爸那爸爸爸爸啦啦啦"

        },
        {
            src: "../images/teacher.jpg",
            title: "图片设计",
            content: "第一的设计，你值得拥有，巴巴爸爸那爸爸爸爸啦啦啦"

        }
    ];
    res.render('teachSource', {
        title: "教学资源",
        navNum: 5,
        navFirst: 3,
        data: data,
        username: req.session.username,
        identity: req.session.identity
    })
}
//实验室列表
exports.laboratoryList = function (req, res) {
    var data = {
        available: [123, 344, 555, 666, 22, 444, 555, 222, 555, 22, 44, 222, 55, 66, 7756465, 33],
        disavailable: [00, 34, 66, 12, 13, 14, 15, 15, 16, 161661]
    }
    res.render('laboratoryList', {
        title: '实验室列表',
        navNum: 5,
        navFirst: 4,
        data: data,
        username: req.session.username,
        identity: req.session.identity
    })
}
//设备环境
exports.equipment = function (req, res) {
    var data = [
        {
            src: "../images/teacher.jpg",
            des: "教师中心的设备展示"
        },
        {
            src: "../images/teacher.jpg",
            des: "教师中心的设备展示"
        },
        {
            src: "../images/teacher.jpg",
            des: "教师中心的设备展示"
        },
        {
            src: "../images/teacher.jpg",
            des: "教师中心的设备展示"
        },
    ]
    res.render('equipment', {
        title: "设备环境",
        navNum: 6,
        data: data,
        username: req.session.username,
        identity: req.session.identity
    })
}
//下载中心
exports.downloadCenter = function (req, res) {
    var data = [
        {src: "../images/download.png", title: "图书下载", con: "PC 安全性、优化和 IT 工具。"},
        {src: "../images/download.png", title: "图书下载", con: "PC 安全性、优化和 IT 工具。"},
        {src: "../images/download.png", title: "图书下载", con: "PC 安全性、优化和 IT 工具。"},
        {src: "../images/download.png", title: "图书下载", con: "PC 安全性、优化和 IT 工具。"},
        {src: "../images/download.png", title: "图书下载", con: "PC 安全性、优化和 IT 工具。"}
    ]
    res.render('downloadCenter', {
        title: "下载中心",
        navNum: 7,
        navFirst: 1,
        data: data,
        username: req.session.username,
        identity: req.session.identity
    })
}


//学生任务render
exports.student = function (req, res) {
    res.render('student', {
        title: "学生任务",
        navNum: 10,
        username: req.session.username,
        identity: req.session.identity
    })
}
//获取所有的课程
exports.getDataOne = function (req, res) {
    // var index = req.body.index_id;
    var newCourse = new Course(
        {
            id: 1,
            name: 'java应用程序开发',
            teacher: '李老师'

        });
    //newCourse.save();
    Course.find({}, function (err, course) {
        res.send(course);
    })
}
//学生添加课程
exports.addCourse = function (req, res) {
    var index = req.body.index_id;
    var course = req.body.course;
    var teacher = req.body.teacher;
    var newcourse = new addCourse({
        id: index,
        course_name: course,
        teac_name:teacher,
        stu_name: req.session.username
    })
    addCourse.find({'id': newcourse.id, 'stu_name': newcourse.stu_name}, function (err, course) {
        if (course.length != 0) {
            res.send('你已经添加过改课程');
            return false;
        } else {
            newcourse.save(function () {
                res.send('添加成功');
            });
        }
    })
}
//学生删除已选课程
exports.removeCourse = function (req, res) {
    var id = req.body.index_id;
    addCourse.remove({id: id}, function () {
        res.send('成功删除');
    })
}
//学生上传作业
exports.upload = function (req, res, next) {

    var message = '';
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public/uploads';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {
        var filename = files.upload.name;
        var filepath = files.upload.path;

        var work = new Work({
            stu_name: req.session.username,
            title: fields.title,
            course_title:fields.course_title,
            course_teacher:fields.course_teacher,
            question: fields.question,
            answer: fields.answer,
            file_name: filename,
            file_path: filepath
        });
        if( work.stu_name == ""
            || work.title == ""
            || work.course_title == ""
            || work.course_teacher == ""
            || work.question == ""
            || work.answer == ""
            || work.file_name == ""
            || work.file_path == "" ){
            req.flash("error","请填写所有内容后再提交");
            return res.redirect('/student');

        } else {
            work.save(function (err) {
                if (err) {
                    req.flash("err", "提交失败");
                    return;
                } else {
                    req.flash("success", "提交成功");
                    return res.redirect('/student');
                }

            })
        }

    });
}
//学生查看已选的课程
exports.courseChosed = function (req, res) {
    var stu_name = req.body.stuName;
    addCourse.find({'stu_name': stu_name}, function (err, course) {
        if (course.length != 0) {
            res.send({
                success: true,
                con: course
            });
            return false;
        } else {
            res.send({
                success: false,
                con: '尚未发现已选的课程'
            });
        }
    })
}
//学生获取评价信息
exports.getCheck = function(req,res){
    var stuName = req.session.username;
    Evaluation.find({stu_name:stuName},function(err,con){
        if(err){
            res.send({
                success:false,
                error:"查询失败"
            })
        }
        if(con.length != 0){
            res.send({
                success:true,
                con:con
            })
        } else {
            res.send({
                success:false,
                error:"暂时没有评论"
            })
        }
    })
}
//学生查看课程作业
exports.showWork = function(req,res){
    var teacher = req.query.teacher;
    var course = req.query.course;
    console.log(teacher);
    workTeacher.find({teacher:teacher,course_title:course},function(err,con){
        console.log(con);
        if(err){
            res.send({
                success:false,
                error:"查询失败"
            })
        }
        if(con.length != 0){
            res.send({
                success:true,
                con:con
            })
        } else {
            res.send({
                success:false,
                error:"暂时没有作业"
            })
        }
    });
}


//老师页面的render
exports.teacher = function (req, res) {
    res.render('teacher', {
        title: "教师任务",
        navNum: 10,
        username: req.session.username,
        identity: req.session.identity
    })
}
//老师页面获取课程
exports.getCourse = function (req, res) {
    Course.find({}, function (err, con) {
        if (err) {
            res.send("获取课程失败");
        }
        if (con.length === 0) {
            res.send({
                success: false,
                error: "暂时没有课程"
            })
        } else {
            res.send({
                success: true,
                con: con
            });
        }

    })
}
//教师发布作业
exports.uploadTeacher = function (req,res,next) {
    var message = '';
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './public/uploads';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {
        if (err) {
            req.flash('error', '文件上传失败');
        }
        var filename = files.upload.name;
        var filepath = files.upload.path;

        var workteacher = new workTeacher({
            teacher:req.session.username,
            work_title:fields.work_title,
            course_title:fields.course_title,
            require:fields.demand,
            file_name: filename,
            file_path: filepath
        });
        console.log(workteacher.teacher);
        if (workteacher.teacher === "" || workteacher.work_title === "" || workteacher.require === "") {
            req.flash("error", "请填写完全再提交");
            return res.redirect('/teacher');
        } else {
            workteacher.save(function (err) {
                if (err) {
                    req.flash("error", "提交失败");
                    return res.redirect('/teacher');
                } else {
                    req.flash("success", "提交成功");
                    return res.redirect('/teacher');
                }
            })
        }

    });
}
//教师查收作业
exports.checkJob = function(req,res) {
    var teacher = req.session.username;
    Work.find({'course_teacher':teacher},function(err,con){
        if( con.length != 0){
            res.send({
                success:true,
                con:con
            });
        } else {
            res.send({
                success:false,
                error:"获取数据失败"
            })
        }

    })
}
//教师查看作业详情
exports.workDetail = function (req, res) {
    var courseTitle = req.query.course_title;
    var stuName = req.query.stu_name;
    Work.find({'course_title':courseTitle,'stu_name':stuName},function(err,con){
        if(err){
            req.flash("error","作业获取失败");
        }
        console.log(stuName)
        if (con.length != 0) {
            res.render('workDetail', {
                title: "作业详情",
                navNum: 10,
                username: req.session.username,
                identity: req.session.identity,
                stuName: stuName,
                courseTitle: courseTitle,
                con: con
            })
        }
    })
}
//老师查看选课学生
exports.courseList = function (req, res) {
    var courseName = req.body.course_name;
    var teacherName = req.body.teac_name;
    addCourse.find({course_name: courseName,teac_name: teacherName}, function (err, con) {
        if (con.length != 0) {
            res.send({
                success: true,
                con: con
            })
        } else {
            res.send({
                success: false,
                error: "没有选该课的学生"
            })
        }
    })
}
//教师提交课程评价
exports.evaluation = function(req, res){
    var work_title = req.body.checkTitle;
    var course_title = req.body.checkCourse;
    var stu_name = req.body.checkName;
    var check_content = req.body.checkContent;
    console.log(check_content);

    var evaluation = new Evaluation({
        teacher:req.session.username,
        work_title: work_title,
        course_title: course_title,
        stu_name: stu_name,
        check_content: check_content
    });
    if(evaluation.teacher === "" || evaluation.work_title === ""
        || evaluation.course_title === "" || evaluation.stu_name === ""
        || evaluation.check_content === ""){
        return res.redirect('/teacher');
    } else {
        evaluation.save(function(err,con){
            req.flash("success","提交成功");
            return res.redirect('/teacher');
        })
    }
}


exports.doReg = function (req, res) {
    //检查密码
    if (req.body['password-repeat'] != req.body['password']) {
        //req.flash('error', '两次输入的密码不一致');
        return res.redirect('/reg');
    }

    //生成md5的密码
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        username: req.body.username,
        password: password,
        identity: req.body.identity
    });

    //检查用户名是否已经存在
    User.find({'username': newUser.username}, function (err, user) {
        if (user.length != 0) {
            //res.send(user.length);
            req.flash('error', "用户名已经存在");
            return res.redirect('/reg');
        }
        //如果不存在則新增用戶
        newUser.save(function (err) {
            if (err) {
                return res.redirect('/reg');
            }
            res.redirect('/login');
        });
    });
};
exports.login = function (req, res) {
    res.render('login', {
        title: '用户登录',
        navNum: 8,
        error: req.flash('error'),
        username: req.session.username,
        identity: req.session.identity
    });
};
exports.doLogin = function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.find({'username': req.body.username}, function (err, user) {
        //res.send(user);
        for (var i in user) {
            if (req.body.username == user[i].username
                && password == user[i].password
                && req.body.identity == user[i].identity) {
                req.session.username = req.body.username;
                req.session.identity = req.body.identity;

                return res.redirect('/');
            }
        }
        req.flash('error', "用户名或密码不对");
        res.redirect('/login');
    })

};
exports.logout = function (req, res) {
    req.session.username = null;
    req.session.identity = null;
    req.flash('success', '登出成功');
    res.redirect('/');
};


//exports.user = function (req, res) {
//    User.get(req.params.user, function (err, user) {
//        if (!user) {
//            req.flash('error', '用户不存在');
//            return res.redirect('/');
//        }
//        Post.get(user.name, function (err, posts) {
//            if (err) {
//                req.flash('error', err);
//                return res.redirect('/');
//            }
//            res.render('user', {
//                title: user.name,
//                posts: posts,
//                user: req.session.user,
//                success: req.flash('success').toString(),
//                error: req.flash('error').toString()
//            });
//        });
//    });
//};
//
//exports.post = function (req, res) {
//    var currentUser = req.session.user;
//    var post = new Post(currentUser.name, req.body.post);
//    post.save(function (err) {
//        if (err) {
//            req.flash('error', err);
//            return res.redirect('/');
//        }
//        req.flash('success', '发表成功');
//        res.redirect('/u/' + currentUser.name);
//    });
//};
//
//exports.reg = function (req, res) {
//    res.render('reg', {
//        title: '用户注册',
//        user: req.session.user,
//        success: req.flash('success').toString(),
//        error: req.flash('error').toString()
//    });
//};
//exports.nav = function (req, res) {
//    res.render('nav', {
//        title: '用户注册'
//    });
//};
// exports.reg = function (req, res) {
//    res.render('reg', {
//        title: '用户注册',
//        navNum:7;
//    });
// };