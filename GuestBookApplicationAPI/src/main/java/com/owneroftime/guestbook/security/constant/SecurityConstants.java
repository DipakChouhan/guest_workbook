package com.owneroftime.guestbook.security.constant;

public class SecurityConstants {

    private SecurityConstants() {}

    // JWT constant fields
    public static final String SECRET = "tooMuchSecret8064";
    public static final Long EXPIRATION_DAYS = 10L;
    public static final String TOKEN_PREFIX= "Bearer";
    public static final String HEADER_STRING = "Authorization";

    // Security module path definitions goes here
    public static final String PATH_SECURITY = "security";
    public static final String PATH_SIGNUP = "signUp";

    // Swagger Path
    public static final String PATH_SWAGGER_API_DOCS = "v2/api-docs";
    public static final String PATH_SWAGGER_WEBJARS = "webjars/**";
    public static final String PATH_SWAGGER_RESOURCES = "swagger-resources/**";
    public static final String PATH_SWAGGER_UI = "swagger-ui.html";

    // Bean names goes here
    public static final String BEAN_USER_DETAILS_SERVICE_IMPL = "userDetailsServiceImpl";
    public static final String BEAN_CUSTOM_ACCESS_DENIED_HANDLER = "customAccessDeniedHandler";
    public static final String BEAN_CUSTOM_AUTHENTICATION_ENTRY_POINT = "customAuthenticationEntryPoint";
    public static final String BEAN_PASSWORD_ENCODER = "passwordEncoder";
}
