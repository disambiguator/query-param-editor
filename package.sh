#!/bin/sh
set -euo pipefail

rm -rf extension/index.html
rm -rf extension/static


cp build/index.html extension/
cp -r build/static extension/

zip extension.zip extension/*
