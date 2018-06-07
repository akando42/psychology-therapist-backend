export class DataModel{
    public static tables= {

        users:{
            table:"USERS",
            id:"UserID",
            firstName:"UserFirstName",
            lastName:"UserLastName",
            email:"UserEmailID",
            password:"UserPassword",
            phone:"UserPhone",
            image:"UserProfileImage",
            gender:"UserGender",
            accountStatus:"UserAccountStatus"
        },
        providers:{
            table:"PROVIDERS",
            id:"ProviderID",
            hrAcceptanceID:"HRID",
            firstName:"ProviderFirstName",
            lastName:"ProviderLastName",
            email:"ProviderEmailID",
            password:"ProviderPassword",
            phone:"ProviderPhone",
            image:"ProviderProfileImage",
            experience:"ProviderExperience",
            qualifications:"ProviderQualifications",
            lattitude:"ProviderLattitude",
            longitude:"ProviderLongitude",
            resume:"ProviderResume",
            accountStatus:"ProviderAccountStatus",
        },
        providersDoc:{
            table:"PROVIDERDOCS",
            id:"ProviderDocID",
            providerID:"ProviderID",
            docTitle:"ProviderDocTitle",
            docContent:"ProviderDocContent"
        },
        providerNotifications:{
            table:"PROVIDERNOTIFICATION",
            id:"ProviderNotificationID",
            providerID:"ProviderID",
            content:"ProviderNotificationContent",
            dateTime:"ProviderNotificationDT",
            isRead:"ProviderNotificationReadStatus"
        },

        userAddress:{
            table:"USERADDRESS",
            id:"AddressID",
            userID:"UserID",
            name:"UserAddressName",
            latitude:"UserLattitude",
            longitude:"UserLongitude",
            address:"UserAddress",
            parkingInfo:"UserParkingAddress"
        },

        sessions:{
            table:"SESSIONS",
            id:"SessionID",
            userID:"UserID",
            providerID:"ProviderID",
            addressID:"AddressID",
            massageType:"MassageType",
            preferredGender:"PreferredGender",
            massageLength:"MassageLength",
            dateTime:"SessionDateTime",
            equipements:"Equipements",
            pets:"Pets",
            medicalInformation:"MedicalInformation"
        },

        payments:{
            table:"PAYMENTS",
            id:"PaymentID",
            sessionID:"SessionID",
            amount:"PaymentAmount",
            transactionId:"PaymentTransactionID"
        },

        admin:{
            table:"ADMINTABLE",
            id:"AdminID",
            firstName:"AdminFirstName",
            lastName:"AdminLastName",
            email:"AdminEmailID",
            password:"AdminPassword",
            image:"AdminImageLink",
            phone:"AdminPhone",
            owner:"AdminOwnerStatus",  //Default 0. Only one of the the admin can be the owner
            accountStatus:"AdminAccountStatus"
        },

        hr:{
            table:"HRTABLE",
            id:"HRID",
            adminCreatedRefID:"AdminID",
            firstName:"HRFirstName",
            lastName:"HRLastName",
            email:"HREmailID",
            password:"HRPassword",
            image:"HRImageLink",
            phone:"HRPhone",
            accountStatus:"HRAccountStatus"
        }
    }

    public static userTypes={
        hr:"HR",
        moderator:"Moderator",
        admin:"Admin",
        provider:"Provider"
    }
    public static accountStatus={
        waiting:0,
        accepted:1,
        blocked:2,
        declined:3,
        deleted:4,

        //Different Phase Statuses foe providers
        phaseOne:11,
        phaseOneRejected:13,
        phaseOneDocSubmitted:15,

        //Document Status
        docUploaded:50,
        docApproved:51,
        docReRequested:52,
        docIgnored:53,
    }
    public static userResponse={
        success:200,
        tokenError:513,        
        originError:514,
        inputError:515,
        idError:516,

        loginError:525,

        registerError:535,
        emailError:536,

        addressError:545,

        paymentError:555,

        bookingError:565,

        profileError:575,
    }

    public static providerResponse={
        success:200,
        account_token_error:513,
        session_token_error:514,
        originError:515,
        inputError:516,
        serverError:517,

        loginError:525,
        registerError:535,

        hrError:545,
        hrActionError:546,

        paymentError:555,

        bookingError:565,

        profileError:575,
    }

    public static imageTypes={
        docs:"docs",
        profileImage:"profile-images",
        resume:"resume"
    }
    
}
