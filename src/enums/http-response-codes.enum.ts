


export enum HttpResponseCodes {
    success = 200,
    account_token_error = 513,
    session_token_error = 514,
    originError = 515,
    inputError = 516,
    serverError = 517,
    accessError = 518,
    emailError = 519,
    totalAPICallsExceeded = 520,

    loginError = 525,
    registerError = 535,

    hrError = 545,
    hrActionError = 546,
    adminError = 547,
    adminActionError = 548,

    paymentError = 555,

    bookingError = 565,
    checkInError = 570,

    profileError = 575,

    passwordResetError = 585,
    listUserError = 590,
}
