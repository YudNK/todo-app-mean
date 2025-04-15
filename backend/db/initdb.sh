#!/bin/bash
set -eu

mongosh <<EOF
use ${DB_NAME}
db.createCollection("${DB_TABLE_NAME}")
db.createUser(
    {
        user: "${DB_USER_NAME}",
        pwd: "${DB_USER_PWD}",
        roles: [
            { role: "readWrite", db: "${DB_NAME}" }
        ]
    }
)
EOF