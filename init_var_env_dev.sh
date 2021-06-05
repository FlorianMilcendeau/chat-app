#!/usr/bin/env bash

clear

ENV=.env

if [[ -f $ENV ]]
then
    RED='\033[0;31m'
    NC='\033[0m'
    printf "$RED The environment variables are already defined. $NC \n"
else
    read -p $'Enter the name of the database (default \'my_db\'): ' db_name
    read -p $'Enter username of the database (default \'$USER\'): ' db_user
    read -p $'Enter password of the database (default \'root\'): ' -s db_password
    read -p $'Enter password of the database (default \'root\'): ' -s db_root_password

    touch $ENV

    echo $'PORT=8080

# debug logger
DEBUG=api*\n' >> $ENV

    DATABASE="# Database
DB_ROOT_PASSWORD=${db_root_password:-root}
DEV_DB_NAME=${db_name:-my_db}
DEV_DB_USER=${db_user:-$USER}
DEV_DB_PASSWORD=${db_password:-root}

CI_DB_NAME=${db_name:-my_db}
CI_DB_USER=${db_user:-$USER}
CI_DB_PASSWORD=${db_password:-root}"

    echo "$DATABASE" >> $ENV

    if [ "$1" = 'prod' ]
    then
        node ./api/generateKeyPair.js
            
        make ENV=prod start
    elif [ "$1" = 'test' ]
    then
        node ./api/generateKeyPair.js
            
        make ENV=test start
    else
        node ./api/generateKeyPair.js
            
        make ENV=dev start
    fi
fi