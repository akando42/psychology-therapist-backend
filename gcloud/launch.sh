## Set Bash Script Settings
set -v


## Add Project ID and Repo as Enviroment Variables ** only need these for google source
PROJECT_ID = $(curl -s "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
REPO = "tod_backend"


## Install and Start Google FLuent Logging Monitor
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &


## Install APT dependencies


### Updating existing system packages
apt-get update

### Packages Installed Are
apt-get install -yq ca-certificates git build-essential supervisor
### - ca-cetificates -- "Certificate Authority Certification"
### - git -- "Github - Source Monitor" 
### - build-essential -- "Essential Build Package "  
### - supervisor -- "Process Controller System" 


## Install NodeJS and NPM
### Create NodeJS directory
mkdir opt/nodejs

### Download and Install
curl https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1

### Create symlink to Node and NPM
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm


## Download sourcecode from remote source
export HOME=/root
git config --global credential.helper gcloud.sh
git clone https://troydo42:Iwbaussi2042!@github.com/troydo42/TOD-backend.git opt/app

## Install App NPM packages
cd opt/app
npm install 

## Create System User inside Instance Enviroment

### Add User tod_back
useradd -m -d /home/tod_back tod_back

### Setting user tod_back as owner of directory /opt/app
chown -R tod_back:tod_back /opt/app


## Config and Start SuperVisor

### SuperVisor setting inside tod_back.conf
cat >/etc/supervisor/conf.d/tod_back.conf << EOF
[program:tod_back]
directory=/opt/app
command=npm start
autostart=true
autorestart=true
user=tod_back
environment=HOME="/home/tod_back",USER="tod_back",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

### Reread new file and restart SuperVisor
supervisorctl reread
supervisorctl update
