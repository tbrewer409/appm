#!/usr/bin/env bash

: "${DEFAULT_F_ARGS:=--listen --port 3000 --enable-insecure-extension-access}"
: "${F_ARGS:=}"
FINAL_FORGE_ARGS="$DEFAULT_F_ARGS $F_ARGS"

# Launch Forge with the same arguments used on container start
cd /workspace/stable-diffusion-webui || exit 1
source venv/bin/activate
nohup python launch.py $FINAL_FORGE_ARGS &> /workspace/logs/forge.log &
echo "Forge started with arguments: $FINAL_FORGE_ARGS"
deactivate
