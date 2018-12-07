# Running app localy

```
$ npm install
$ npm run start

```


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


# API Endpoints
** Live API: http://35.239.142.252:8080/info **

## Info
```
$ curl localhost:3000/info
```

## APIs
### Root 
```
$ curl localhost:3000/api/v1
```

### Admin
```
$ curl localhost:3000/api/v1/admins
```

### Authentication
```
## Sign Up
$ curl localhost:3000/api/v1/signup/provider

## Sign In
$ curl localhost:3000/api/v1/signin/provider

## Verify Email
$ curl localhost:3000/api/v1/verify-email/
```
