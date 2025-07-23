#!/usr/bin/env bash

# Force ANSI color output in Forge logs (for pretty symbols and colors)
export PYTHONUNBUFFERED=1
export FORCE_COLOR=1
export NODE_DISABLE_COLORS=0
export TERM=xterm-256color


# Set default and overrideable arguments
: "${DEFAULT_C_ARGS:=--listen 0.0.0.0 --port 7860 --extra-model-paths-config /workspace/comfyui/extra_model_paths.yaml}"
: "${C_ARGS:=}"
FINAL_COMFY_ARGS="$DEFAULT_C_ARGS $C_ARGS"

# Launch ComfyUI with the same arguments used on container start
cd /workspace/comfyui || exit 1
source venv/bin/activate
nohup python main.py $FINAL_COMFY_ARGS &> /workspace/logs/comfyui.log &
echo "ComfyUI started with arguments: $FINAL_COMFY_ARGS"
deactivate
