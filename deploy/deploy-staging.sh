#!/bin/bash
set -e

### Configuration ###

SERVER=devhk
APP_DIR=/var/www/corning-hefei
KEYFILE=
REMOTE_SCRIPT_PATH=/var/www/corning-hefei/deploy.sh


### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}


### Automation steps ###

if [[ "$KEYFILE" != "" ]]; then
  KEYARG="-i $KEYFILE"
else
  KEYARG=
fi

run meteor bundle package.tar.gz
run scp $KEYARG package.tar.gz $SERVER:$APP_DIR/
run scp $KEYARG deploy/staging.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on remote server ----"
run ssh $KEYARG $SERVER bash $REMOTE_SCRIPT_PATH
