cd massage-on-demand-backend
git pull origin master
mysql -u root -p < datamodels/massage_demand.sql
killall node
nohup npm start &