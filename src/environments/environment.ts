export const environment = {
    production: false,
    url: "http://localhost:8081/"
    // url: "https://emsbynarsing.up.railway.app/"
};

export const endpoints = {
    apiUrl: environment.url + "api/v1",
    loginUrl: environment.url + "api/v1/auth/login",
    baseUrl: environment.url + "api/v1/employees",
    postUrl: environment.url + "api/v1/empl",
    refreshUrl: environment.url + "api/v1/auth/refresh",
    logoutUrl: environment.url + "api/v1/auth/logout",
    forgotPassword: environment.url + "api/v1/password/forgot-password",
    signUpUrl: environment.url + "api/v1/auth/signup",
    sendOtpUrl: environment.url + "api/v1/otp/send-phone",
    verifyOtpUrl: environment.url + "api/v1/otp/verify-phone",
    emailSentOtpUrl: environment.url + "api/v1/otp/send-email",
    emailverifyOtpUrl: environment.url + "api/v1/otp/verify-email"
};
