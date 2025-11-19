#!/bin/bash
cd /home/kavia/workspace/code-generation/warehouse-rental-platform-207004-207020/frontend_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

