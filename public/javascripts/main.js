var eventHandler = (function () {

    return {
        init: function () {
            var self = this;
            //用户注册的函数
            self.checkForm();
            self.changeInput();
            //用户登录的函数
            self.checkLogin();
            //学生页面
            self.requestData();
            self.checkTab();
            self.getCheck();
            self.submitWork();
            // 教师页面
            self.getCourse();
            self.checkJob();
            self.submitTeacher();
            self.submitEvaluation();



        },
        checkForm: function () {

            $('#form-submit').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var passwordRepeat = $('#password-repeat').val();
                var identity = $('#dLabel').val();
                var obj = $('#empty');
                if (username == '' || password == '') {
                    obj.addClass('in');
                    return false;
                } else {
                    obj.removeClass('in');
                }
                if (!identity) {
                    obj.addClass('in');
                    obj.text('请选择您的身份');
                    return false;
                } else {
                    obj.removeClass('in');
                }
                if (password != passwordRepeat) {
                    obj.addClass('in');
                    obj.text('两次输入的密码不一致');
                    return false;
                } else {
                    obj.removeClass('in');
                }
            })

        },
        changeInput: function () {

            $('#identity a').on('click', function () {
                $("#dLabel").val($(this).text());
            })
        },
        checkLogin: function () {
            $('#login-reg').on('click', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var obj = $('#empty');
                if (username == '' || password == '') {
                    obj.addClass('in');
                    return false;
                } else {
                    obj.removeClass('in');
                }
            })
        },
        requestData: function (url) {
            var self = this;
            $.ajax({
                url: url,
                type: 'post',
                success: function (data) {
                    var _data = data;
                    var str = '';
                    var obj = $('#home .list-group');
                    for (var i = 0; i < _data.length; i++) {
                        str += '<li class="list-group-item j-list-one clearfix" data_id = "' + _data[i].id + '" data_course="' + _data[i].name + '">'
                            + '<span class="fl">' + _data[i].name
                            + '</span><span class="fl cou-teacher">' + _data[i].teacher + '</span>'
                            + '<a href="###" class="fr">添加</a>'
                            + '</li>';
                    }
                    obj.html(str);
                    self.addCourse();
                }
            })
        },
        /**
         * @param<object> obj 点击的对象
         * @param<String> url 提交的地址
         * @param<booleam> isRemove 是否是删除**/
        synData: function (obj, url,isRemove) {
            for (var i = 0; i < obj.length; i++) {
                $(obj[i]).on('click', function (e) {
                    var indexNum = $(e.target).parent().attr('data_id');
                    var course = $(e.target).parent().attr('data_course');
                    var teacher = $(e.target).prev('span').text();
                    console.log(indexNum + '  ' + course);
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: {index_id: indexNum, course: course, teacher:teacher},
                        success: function (data) {
                            alert(data);
                            if(isRemove){
                                $(e.target).parent().hide();
                            }
                        }
                    })
                })
            }
        },
        addCourse: function () {
            var self = this;
            var obj = $('.j-list-one a');
            self.synData(obj, '/student/add');
        },
        removeCourse: function () {
            var obj = $('.j-list-two a');
            eventHandler.synData(obj,'/student/remove',true);
        },
        checkTab: function () {
            var self = this;
            $('#checked').on('click', function () {
                var stuNmae = $('#userName').text();
                console.log(stuNmae);
                $.ajax({
                    url: '/student/chosed',
                    type: 'post',
                    data: {stuName: stuNmae},
                    success: function (data) {
                        var _data = data.con;
                        var status = data.success;
                        var str = '';
                        var obj = $('#profile .student-course .list-group');
                        if (status) {
                            for (var i = 0; i < _data.length; i++) {
                                str += '<li class="list-group-item j-list-two clearfix" data_id = "' + _data[i].id + '" data_course="' + _data[i].course_name + '">' +
                                    '<span class="fl j-course">' + _data[i].course_name
                                    + '</span>'
                                    +'<span class="fl cou-teacher">'+_data[i].teac_name+'</span>' +
                                    '<span class="fr show" id="show-work">查看作业</span><a href="###" class="fr">删除</a>'
                                    + '</li>';
                            }
                        } else {
                            str += _data;
                        }
                        obj.html(str);
                        self.removeCourse();
                        self.showWork();
                    }
                })
            })
        },
        showWork:function(){
            $('#show-work').on('click',function(){
                var obj = $(this).parent();
                var teacher = obj.find('.cou-teacher').text();
                var course = obj.find('.j-course').text();
                var content = $('.student-work');
                var str = '';
                $.ajax({
                    url:'/show_work',
                    type:'get',
                    data:{teacher:teacher,course:course},
                    success:function(data){
                        var _data = data.con;
                        if(data.success){
                            for(var i= 0;i<_data.length;i++){
                                str += '<div class="panel-body panael-list"> ' +
                                    '<div>作业标题：'+_data[i].work_title+'</div> ' +
                                    '<div>作业要求：'+_data[i].require+'</div> ' +
                                    '</div>';
                            }
                        } else {
                            str += data.error;
                        }
                        content.html(str);
                    }
                })
            })
        },
        getCourse:function(){
            var obj = $("#home-teacher .list-group");
            var str = '';
            $.ajax({
                url: '/teacher/course',
                type: 'get',
                success: function (data) {
                    var _data = data.con;
                    var status = data.success;
                    if(status){
                        for (var i = 0; i < _data.length; i++) {
                            str += '<li class="list-group-item j-list-two getCourse" data_id = "' + _data[i].id + '" data_course="'
                                + _data[i].name + '" data_teacher="' + _data[i].teacher + '">' + _data[i].name
                                + '<a href="###" class="fr">查看选该课程的学生</a><div class="show-detail"></div>'
                                + '</li>';
                        }
                    } else {
                        str += '<li>'+data.error+'</li>'
                    }
                    obj.html(str);
                    eventHandler.getCourseDetial();
                }
            })
        },
        getCourseDetial:function(){
            $('.getCourse').on('click',function(){
                var obj = $('.course-detail .panel-body');
                var courseName = $(this).attr('data_course');
                var teac_name = $(this).attr('data_teacher');
                var str = '';
                $.ajax({
                    url: '/teacher/course/list',
                    type: 'post',
                    data: {course_name: courseName,teac_name:teac_name},
                    success: function (data) {
                        var _data = data.con;
                        for (var i = 0; i < _data.length; i++) {
                            str += '<div class="course-one fl">' + _data[i].stu_name + '</div>';
                        }
                        obj.html(str);
                    }
                });
            });

        },
        checkJob:function(){
            $('#subWork-teacher').on('click',function(){
                var obj = $('#messages-teacher .list-group');
                var str = '';
                $.ajax({
                    url:'/teacher/check_job',
                    type:'get',
                    success:function(data){
                        var _data = data.con;
                        var success = data.success;
                        if(success){
                            for(var i = 0; i < _data.length; i++){
                                str += '<li class="list-group-item"><a href="teacher/job_detail?stu_name='+_data[i].stu_name+
                                    '&course_title='+_data[i].course_title+'" target="_blank">'+_data[i].course_title+'</a>' +
                                    '<span class="student-name">'+_data[i].stu_name+'</span></li>'
                            }
                            obj.html(str);
                        } else {
                            obj.html(data.error);
                        }
                    }
                })
            })
        },
        getCheck:function(){
            $('#seePingjia').on('click',function(){
                var obj = $('#settings .panel-body');
                var str = '';
                    $.ajax({
                    url:'/get_check',
                    type:'get',
                    success:function(data){
                        var _data = data.con;
                        if(data.success){
                            for(var i= 0; i< _data.length; i++){
                                str += '<div class="well"> ' +
                                    '<h4>课程名称：'+_data[i].course_title+'</h4> ' +
                                '<P>作业的标题：'+_data[i].work_title+'</P> ' +
                                '<p>评价的内容：'+_data[i].check_content+'</p> ' +
                                '</div>';
                            }
                        }
                        obj.html(str);
                    }
                })
            })
        },
        checkStudent:function(){
            var workTitle = $("#work-title").val();
            var courseTitle = $("#course-title").val();
            var courseTeacher = $("#course-teacher").val();
            var studentQuestion = $("#student-question").val();
            var studentAnswer = $("#student-answer").val();

            if(workTitle === "" || courseTitle === "" ||
                courseTeacher === "" || studentQuestion === "" || studentAnswer ===""){
                var json = {"border":"1px solid #ff0000"};
                $("#work-title").css(json);
                $("#course-title").css(json);
                $("#course-teacher").css(json);
                $("#student-question").css(json);
                $("#student-answer").css(json);
                return false;

            } else {
                return true;
            }
        },
        checkTeacher:function(){
            var workTitle = $('#work_title').val();
            var courseTitle = $('#course_title').val();
            var demand = $('#demand').val();
            if(workTitle === "" || courseTitle === "" || demand === ""){
                var json = {"border":"1px solid #ff0000"};
                $('#work_title').css(json);
                $('#course_title').css(json);
                $('#demand').css(json);
                return false;
            } else {
                return true;
            }
        },
        checkEvaluation:function(){
            var evaluationTitle = $('#evaluation-title');
            var evaluationCourse = $('#evaluation-course');
            var evaluationName = $('#evaluation-name');
            var evaluationContent = $('#evaluation-content');
            if( evaluationTitle.val() === "" || evaluationCourse.val() === ""
                || evaluationName.val() === "" ||evaluationContent.val() === "" ) {
                var json = {"border":"1px slolid #ff0000"};
                evaluationTitle.css(json);
                evaluationCourse.css(json);
                evaluationName.css(json);
                evaluationContent.css(json);
                return false;
            } else {
                return true;
            }
        },
        submitWork:function(){
            $("#submitWork").submit(function(){
                if(eventHandler.checkStudent()){
                    alert("提交成功");
                } else {
                    alert("请填写完数据再提交");
                }
            })
        },
        submitTeacher:function(){
            $("#work-teacher").submit(function(){
                if(eventHandler.checkTeacher()){
                    alert("提交成功");
                } else {
                    alert("请填完所有数据之后再提交");
                }
            })
        },
        submitEvaluation:function(){
            $("#evaluation").submit(function(){
                if(eventHandler.checkEvaluation()){
                    alert("提交成功");
                } else {
                    alert("请填完数据之后再提交");
                }
            })
        }
    }
})();

$(function () {
    eventHandler.init();
})
