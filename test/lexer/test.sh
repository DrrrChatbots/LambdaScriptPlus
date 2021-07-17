#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

RED='\033[0;31m'
GRE='\033[0;32m'
NC='\033[0m'

no=0

for fn in `ls ${SCRIPT_DIR}/*.js`;do

  node test-lexer.js $fn 2> /dev/null 1>&2

  if [ "$?" == "0" ];then
    printf "No.%2d ${GRE}`basename ${fn}` ✔${NC}\n" $no
  else
    printf "No.%2d ${RED}`basename ${fn}` ✗${NC}\n" $no
  fi

  no=$((no+1))
done
