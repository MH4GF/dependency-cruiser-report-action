#!/bin/bash

read -r NODE_VERSION _ <<< "$(node -v)"

if [ -z "$NODE_VERSION" ]; then
    echo "No node installed. Please use \"actions/setup-node\" or install node manually"

    ret=1
else
    echo "Running using node $NODE_VERSION"

    node --unhandled-rejections=strict "$GITHUB_ACTION_PATH/dist/index.js"

    ret=$?
fi

exit $ret