package com.owneroftime.guestbook.security.config;

import com.owneroftime.guestbook.common.constant.CommonConstant;
import com.owneroftime.guestbook.security.constant.SecurityConstants;
import com.owneroftime.guestbook.security.filter.AuthenticationFilter;
import com.owneroftime.guestbook.security.filter.AuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableWebMvc
public class SecurityConfiguration extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    @Autowired
    @Qualifier(value = SecurityConstants.BEAN_USER_DETAILS_SERVICE_IMPL)
    private UserDetailsService userDetailsService;

    @Autowired
    @Qualifier(value = SecurityConstants.BEAN_CUSTOM_ACCESS_DENIED_HANDLER)
    private AccessDeniedHandler customAccessDeniedHandler;

    @Autowired
    @Qualifier(value = SecurityConstants.BEAN_CUSTOM_AUTHENTICATION_ENTRY_POINT)
    private AuthenticationEntryPoint customAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.authorizeRequests()
                .antMatchers(CommonConstant.PATH_ROOT + SecurityConstants.PATH_SECURITY + CommonConstant.PATH_ROOT + "/userDetails/register",
                        CommonConstant.PATH_ROOT + SecurityConstants.PATH_SWAGGER_API_DOCS,
                        "/security/userDetails/signIn",
                        CommonConstant.PATH_ROOT + SecurityConstants.PATH_SWAGGER_UI,
                        CommonConstant.PATH_ROOT + SecurityConstants.PATH_SWAGGER_RESOURCES,
                        CommonConstant.PATH_ROOT + SecurityConstants.PATH_SWAGGER_WEBJARS)
                .permitAll()
                .anyRequest().authenticated()
        .and()
                    .addFilter(getAuthenticationFilter())
                    .addFilter(getAuthorizationFilter())
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//                .and()
//                    .exceptionHandling()
//                        .authenticationEntryPoint(customAuthenticationEntryPoint);
////                        .accessDeniedHandler(customAccessDeniedHandler);

        http.headers().frameOptions().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean(name = SecurityConstants.BEAN_PASSWORD_ENCODER)
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public AuthenticationFilter getAuthenticationFilter() throws Exception {
        return new AuthenticationFilter(authenticationManager());
    }

    public AuthorizationFilter getAuthorizationFilter() throws Exception {
        return new AuthorizationFilter(authenticationManager());
    }
}