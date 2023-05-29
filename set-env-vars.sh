#!/bin/bash

while IFS='=' read -r key value
do
  if [[ ! -z "$key" ]]; then
    echo "Setting $key to $value"
    netlify env:set "$key" "$value"
    echo "netlify env:set exit status: $?"
  fi
done < .env
