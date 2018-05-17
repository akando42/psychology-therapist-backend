export class DataModel{
    public static tables= {

        users:{
            table:"USERS",
            id:"UserID",
            firstName:"FirstName",
            lastName:"LastName",
            email:"EmailID",
            password:"Password",
            phone:"Phone",
            image:"ProfileImage",
            gender:"Gender",
            status:"AccountStatus"
        },
        providers:{
            table:"PROVIDERS",
            id:"ProviderID",
            firstName:"FirstName",
            lastName:"LastName",
            email:"EmailID",
            password:"Password",
            phone:"Phone",
            image:"ProfileImage",
            experience:"Experience",
            qualifications:"Qualifications",
            resume:"Resume",
            status:"AccountStatus",
        },
        providersDoc:{
            table:"PROVIDERDOCS",
            id:"ProviderDocID",
            providerID:"ProviderID",
            docTitle:"DocTitle",
            DocContent:"DocContent"
        },

        userAddress:{
            table:"USERADDRESS",
            id:"AddressID",
            userID:"UserID",
            name:"AddressName",
            latitude:"Lattitude",
            longitude:"Longitude",
            address:"Address",
            parkingLatitude:"ParkingLattitude",
            parkingLongitude:"ParkingLongitude",
            parkingAddress:"ParkingAddress"
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
            amount:"Amount",
            transactionId:"TransactionID"
        }
    }
    public static accountStatus={
        waiting:0,
        accepted:1,
        blocked:2,
        declined:3,
        deleted:4,

        //Different Phase Statuses foe providers
        phaseOne:11,
        phaseTwo:12,
        phaseOneRejected:13,
        phaseTwoRejected:14,
        phaseOneDocSubmitted:15,
        phaseTwoDocSubmitted:16,

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

        addressError:545,

        paymentError:555,

        bookingError:565,

        profileError:575,
    }

    public static providerResponse={
        success:200,
        account_token_error:513,
        success_token_error:514,
        originError:515,
        inputError:516,
        serverError:517,

        loginError:525,
        registerError:535,

        addressError:545,

        paymentError:555,

        bookingError:565,

        profileError:575,
    }
}
