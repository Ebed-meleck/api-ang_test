#!/bin/bash

# bash script mode
set -o pipefail

echo "[build]"
echo "Building Database"

set -a
source './.env'
set +a

# set build timeout
TIMEOUT=${BUILD_TIMEOUT:-8}

fout=/dev/null



# build the test database
mysql -u $DB_USER -p$DB_PASS -e "DROP DATABASE IF EXISTS $DB_NAME ;"
mysql -u $DB_USER -p$DB_PASS -e "CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "[build] database schema"
mysql -u $DB_USER -p$DB_PASS $DB_NAME < migration/schema.sql


echo "[build] default data"
mysql -u $DB_USER -p$DB_PASS $DB_NAME < migration/default.sql

echo "[/build]"
