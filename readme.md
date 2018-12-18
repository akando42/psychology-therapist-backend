# Running app localy

```
$ npm install
$ npm run start

```

# Database Script
* Database script its under datamodels/tod_databaseV2.sql **

# Deploying App
```
$ git commit -am "Deploy ready Code"
$ gcloud compute instances create tod_back_instance \
    --image-family=debian-9 \
    --image-project=debian-cloud \
    --machine-type=g1-small \
    --scopes userinfo-email,cloud-platform \
    --metadata app-location=$BOOKSHELF_DEPLOY_LOCATION \
    --metadata-from-file startup-script=gcloud/launch.sh \
    --zone us-central1-f \
    --tags http-server
```

# Update Sourecode
```
$ git commit -am "Add New Code"
$ gcloud compute instances update tod_back_instance --metadata-from-file startup-script=gcloud/launch.sh
```

# API Endpoints
** Live API: http://35.201.124.88/api-docs/ **

## Info
```
$ curl http://35.201.124.88/api/v1/status
```

## APIs
### Root 
```
$ curl localhost:8080/api/v1
```

### Admin
```
$ curl localhost:8080/api/v1/admins
```

### Authentication
```
## Sign Up
$ curl localhost:8080/api/v1/signup/provider

## Sign In
$ curl localhost:8080/api/v1/signin/provider

## Verify Email
$ curl localhost:8080/api/v1/verify-email/
```
