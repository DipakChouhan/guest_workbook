package com.owneroftime.guestbook.security.controller;

import com.owneroftime.guestbook.common.bean.BaseControllerBean;
import com.owneroftime.guestbook.common.constant.CommonConstant;
import com.owneroftime.guestbook.security.constant.SecurityConstants;
import com.owneroftime.guestbook.security.model.LoginModel;
import com.owneroftime.guestbook.security.model.UserModel;
import com.owneroftime.guestbook.security.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping(CommonConstant.PATH_ROOT + SecurityConstants.PATH_SECURITY + CommonConstant.PATH_ROOT  + "userDetails")
public class UserDetailsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsController.class);

    @Autowired
    private UserService userService;

    private BaseControllerBean baseControllerBean;

    @PostMapping("/register")
    public ResponseEntity<BaseControllerBean> register(@RequestBody UserModel userModel) {
        baseControllerBean = new BaseControllerBean();
        try {
            baseControllerBean.setPayloads(userService.createUser(userModel));
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("User Registered Successfully! Please login to to continue");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(true);
            baseControllerBean.getErrorMessages().add("FailedTo Register User");
            baseControllerBean.getErrorMessages().add(exception.getMessage());
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

    @PostMapping("/getUserDetails")
    public ResponseEntity<BaseControllerBean> getUserDetails(@RequestBody String emailID) {
        baseControllerBean = new BaseControllerBean();
        try {
            baseControllerBean.setPayloads(userService.getUserDetailsByEmail(emailID));
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("User details fetch successfully");
        } catch (Exception exception) {
            baseControllerBean.setSuccess(true);
            baseControllerBean.getErrorMessages().add("Failed to fetch user details");
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

    @PostMapping("/signIn")
    public ResponseEntity<BaseControllerBean> signIn(@RequestBody LoginModel loginModel) {
        baseControllerBean = new BaseControllerBean();
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<LoginModel> httpEntity = new HttpEntity<>(loginModel);
        try {
            ResponseEntity<Object> responseEntity = restTemplate.exchange("http://localhost:8080/login", HttpMethod.POST, httpEntity, Object.class);
            List<String> token = responseEntity.getHeaders().get(SecurityConstants.TOKEN_PREFIX);
            if (null != token && !token.isEmpty()) {
                baseControllerBean.setPayloads(SecurityConstants.TOKEN_PREFIX + CommonConstant.SINGLE_SPACE + token.get(0));
            }
            baseControllerBean.setSuccess(true);
            baseControllerBean.getInfoMessages().add("User Authenticated Successfully");
        } catch (HttpClientErrorException exception) {
            if (exception.getRawStatusCode() == HttpStatus.FORBIDDEN.value()) {
                baseControllerBean.setSuccess(false);
                baseControllerBean.getErrorMessages().add("Bad Credentials, Please check username and password");
                return new ResponseEntity<>(baseControllerBean, HttpStatus.FORBIDDEN);
            }
        }
        return new ResponseEntity<>(baseControllerBean, HttpStatus.OK);
    }

}
