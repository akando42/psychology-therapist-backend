/**
 * 
 * @api {post} /admin/login Admin Login
 * @apiDescription This is used for login into different user types(admin/sales/hr)
 * @apiGroup admin
 * @apiVersion  0.1.0
 * 
 * 
 * @apiParam  {String} accountToken This is the account token generated by web/token endpoint
 * 
 * @@apiSuccess (200) {String} sessionToken Use this token for all the other requests for HRs
 * @@apiSuccess (200) {String} role admin/hr/sales
 * @apiSuccess (200) {String} image Base64 Image
 * 
 * @apiParamExample  {type} Request-Example:
 * {
        accountToken:<>
        email:admin@therapyondemand.io
        password:Admin@12345
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
       data:{
            sessionToken:<>
            role:"admin",
            fullName:<>
            firstName:<>
            lastName:<>
            email:<>
            image:<>
            phone:<>
        }
        message:""
 * }
 * 
 * 
 */


 /**
  * 
  * @api {post} /get/profile My Profile Details
  * @apiDescription This Api is used to get the logged in users profile details
  * @apiGroup universal
  * @apiVersion  0.1.0
  * 
  * 
  * @apiParam  {String} accountToken This is the account token generated by web/token endpoint
  * @apiParam  {String} sessionToken This is the token which u=you get while calling the admin/login apis
  *
  * @apiSuccess (200) {String} role Role of the user (admin/hr/sales)
  * 
  * @apiParamExample  {type} Request-Example:
  * {
        accountToken:<>
        sessionToken:<>
  * }
  * 
  * 
  * @apiSuccessExample {type} Success-Response:
  * {
        data:{
            role:<>
            fullName:<>
            firstName:<>
            lastName:<>
            email:<>
            image:<>
            phone:<>
        }
        message:"Successfully fetched the profile details"
  * }
  * 
  * 
  */

  /**
  * 
  * @api {post} /admin/decode/email Decode the email code
  * @apiDescription It is used to decode the code send with the redirect url
  * @apiGroup admin
  * @apiVersion  0.1.0
  * 
  * 
  * @apiParam  {String} accountToken This is the account token generated by web/token endpoint
  * @apiParam  {String} code This is the code that was sent to the email as a get request parameter
  * @apiParam  {String} email Email is also sent as a get paramter in the link sent
  *
  * @apiSuccess (200) {String} role Role of the user (admin/hr/sales)
  * 
  * @apiParamExample  {type} Request-Example:
  * {
        accountToken:<>
        code:<>
        email:<>
  * }
  * 
  * 
  * @apiSuccessExample {type} Success-Response:
  * {
        data:{
            email:<The email Address>
            firstName:<>
            lastName:<>
            role:<>
            registerToken:<Use this token to register the User in the Next API calls>
        }
  * }
  * 
  * 
  */
  