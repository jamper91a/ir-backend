#!/bin/sh
# Created by IntelliJ IDEA
cp -r -L /tmp/project_modules/node_modules /opt/project || (echo 'Can not copy node_modules from image, installing locally' && npm --no-bin-links install .)
node "$@"