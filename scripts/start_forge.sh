#!/usr/bin/env bash
# Launch Forge with the same arguments used on container start
cd /workspace/stable-diffusion-webui || exit 1
source venv/bin/activate
nohup python launch.py --listen --port 3000 --api \
    --enable-insecure-extension-access --cuda-malloc --opt-sdp-attention \
    > /workspace/logs/forge.log 2>&1 &
deactivate

