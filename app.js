/**

 * Module dependencies.

 * 模块依赖.

 */

var express = require('express');
var bodyParser = require('body-parser');//用于解析post提交参数的模块
var http = require('http');
var routes = require('./routes');
var partials = require('express-partials');
var flash = require('connect-flash');
var formidable = require('formidable');//文件上传插件
var fs = require('fs');  //node.js核心的文件处理模块
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});


var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use(partials());
    app.use(flash());

    app.use(express.favicon());
    app.use(express.logger('dev'));
    //app.use(express.bodyParser());
    //app.use(express.methodOverride());

    app.use(express.cookieParser());//应用session

    app.use(express.session({
    	secret :  'secret_meteoric',
    	cookie : {
    		maxAge : 60000 * 20	//20 minutes
    	},
    	//store : sessionStore
    }));

    //app.use(app.router);
    app.use(express.static(__dirname + '/public'));//加载静态资源
});

app.configure('development', function () {
    app.use(express.errorHandler());
});


//路径解析

app.get('/', routes.index);
// app.get('/u/:user', routes.user);
// app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', urlencodedParser, routes.doReg);
app.get('/login', routes.login);
app.post('/login', urlencodedParser, routes.doLogin);
app.get('/logout', routes.logout);
app.get('/center_teacher', routes.centerTeacher);
app.get('/institutional_settings', routes.institutionalSettings);
app.get('/introduction', routes.introduction);
app.get('/news', routes.news);
app.get('/school_system', routes.schoolSystem);
app.get('/laboratory_sys', routes.laboratorySys);
app.get('/teach_ideas', routes.teachingIdeas);
app.get('/course_overview', routes.courseOverview);
app.get('/teach_source', routes.teachSource);
app.get('/laboratory_list', routes.laboratoryList);
app.get('/equipment', routes.equipment);
app.get('/download_center', routes.downloadCenter);
app.get('/home', routes.home);
app.get('/student',routes.student);
app.post('/student',routes.getDataOne);
app.post('/student/add', urlencodedParser, routes.addCourse);
app.post('/student/remove',urlencodedParser,routes.removeCourse);
app.post('/student/chosed',urlencodedParser,routes.courseChosed);
app.post('/upload',urlencodedParser,routes.upload);
app.post('/upload_teacher',urlencodedParser,routes.uploadTeacher);
app.get('/teacher',routes.teacher);
app.get('/teacher/check_job',routes.checkJob);
app.get('/teacher/course',routes.getCourse);
app.post('/teacher/course/list',urlencodedParser,routes.courseList);
app.get('/teacher/job_detail',urlencodedParser,routes.workDetail);
app.get('/get_student',routes.courseList);
app.post('/teacher/evaluation',urlencodedParser,routes.evaluation);
app.get('/get_check',urlencodedParser,routes.getCheck);
app.get('/show_work',urlencodedParser,routes.showWork);

//启动及端口


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

