/*jshint esversion: 6 */
const {check} = require('express-validator');
const topics = [
"Phòng Công tác học sinh sinh viên (CTHSSV)",
"Phòng Đại học", 
"Phòng Sau đại học", 
"Phòng điện toán và máy tính", 
"Phòng khảo thí và kiểm định chất lượng", 
"Phòng tài chính", 
"TDT Creative Language Center", 
"Trung tâm tin học", 
"Trung tâm đào tạo phát triển xã hội (SDTC)", 
"Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ (ATEM)", 
"Trung tâm hợp tác doanh nghiệp và cựu sinh viên", 
"Khoa Luật", 
"Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa", 
"Viện chính sách kinh tế và kinh doanh", 
"Khoa Mỹ thuật công nghiệp", 
"Khoa Điện – Điện tử", 
"Khoa Công nghệ thông tin", 
"Khoa Quản trị kinh doanh", 
"Khoa Môi trường và bảo hộ lao động", 
"Khoa Lao động công đoàn", 
"Khoa Tài chính ngân hàng", 
"Khoa giáo dục quốc tế"
];

exports.login = () => [
    check('username')
        .exists().withMessage('Không đủ dữ liệu yêu cầu!')
        .notEmpty().withMessage('Vui lòng nhập username!'),

    check('password')
        .exists().withMessage('Không đủ dữ liệu yêu cầu!')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu!')
];

exports.create = () => [
    check('username')
        .exists().withMessage('Không đủ dữ liệu yêu cầu!')
        .notEmpty().withMessage('Vui lòng nhập username!'),

    check('password')
        .exists().withMessage('Không đủ dữ liệu yêu cầu!')
        .notEmpty().withMessage('Vui lòng nhập mật khẩu!')
        .trim().isLength({
            min:6, 
            max:20
        }).withMessage('Mật khẩu phải từ 6 tới 20 kí tự.'),

    check('selectedTopics')
        .exists().withMessage('Không đủ dữ liệu yêu cầu!')
        .notEmpty().withMessage('Vui lòng chọn ít nhất 1 chuyên mục.')
        .custom(value => {
            for (const topic of value.split(',')) {
                if (topics.indexOf(topic) === -1) {
                    return false;
                }
            }
            return true;
        })
        .withMessage('Chuyên mục lựa chọn không hợp lệ!')
];

exports.update = () => {
    return req.session.role===2?[
        check('oldPassword')
            .exists().withMessage('Không đủ dữ liệu yêu cầu!')
            .notEmpty().withMessage('Vui lòng nhập lại mật khẩu hiện tại!'),
        
        check('newPassword')
            .exists().withMessage('Không đủ dữ liệu yêu cầu!')
            .notEmpty().withMessage('Vui lòng nhập lại mật khẩu mới!'),
        
        check('newPassword_confirm')
            .exists().withMessage('Không đủ dữ liệu yêu cầu!')
            .notEmpty().withMessage('Vui lòng nhập lại mật khẩu mới!')
            .custom((value, {req, loc, path}) => {
                if (value !== req.body.newPassword) {
                    return false;
                } else {
                    return true;
                }
            }).withMessage('Mật khẩu xác nhận không trùng khớp!')
    ]:[
        
    ];    
};