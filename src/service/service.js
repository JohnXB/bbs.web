import config from "./config";
import {notification,message} from "antd";
import axios from "axios";

export default class Service {
    // 基服务
    static get businessService() {
        //创建axios的对象
        let service = axios.create({
            baseURL: `${config.service.url}`,
            headers: {
                'App-Version': '0.1.0',
                "Authorization":"Bearer " + window.localStorage.token
            }
        });

        service.defaults.timeout = 12000;
        //此处为一个全局的响应拦截器，关于拦截器的用法请查阅axios的文档
        service.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 400) {
                message.error( error.response.data.message,1);
            }
            if (error.response.status === 500) {
                message.warn( error.response.data.message,1);
            }
            if (error.code === 'ECONNABORTED' || !error.response) {
                notification.warning({
                    key: 'network error',
                    message: '很抱歉',
                    description: '请检查您的网络是否正常..'
                });
            }
            return Promise.reject(error);
        });

        return service;
    }

    static Bbs = class {
        //... spread操作符,这种写法为es6的语法,查阅相关文档（其实简单来说就是传递不定个数的参数）
        static Login =(data,params={})=>Service.businessService.post("/auth/login",data,params)
        static GetArticle = ( data,params = {}) => Service.businessService.get(`/common/article/${data}`);
        static GetUser = ( data,params = {}) => Service.businessService.post("/auth/userInfo");
        // static SignUp = ( data,params = {}) => Service.businessService.post("/User/SignUp", data, params);
        // static GetClassfications = (data, options = {}) => Service.businessService.get("/Classification/A01");
        // static GetQuestionnaire = (data, options = {}) => Service.businessService.get(`/Questionnaire/A01?id=${data}`);
        // static GetQuestionnaireById = (data, options = {}) => Service.businessService.get(`/Questionnaire/A03?id=${data}`);
        // static Create = ( data,params = {}) => Service.businessService.post("/Questionnaire/A02", data, params);
        // static FillIn = (data, params = {}) => Service.businessService.post("/Questionnaire/A07", data, params)
        // static GetUserQues = (data, params = {}) => Service.businessService.post("/Questionnaire/A09", data, params)
        // static DeleteQues = (data, params = {}) => Service.businessService.post("/Questionnaire/A06", data, params)
        // static visibleClose = (data, params = {}) => Service.businessService.post("/Questionnaire/A04", data, params)
        // static visibleOpen = (data, params = {}) => Service.businessService.post("/Questionnaire/A10", data, params)
    };


}