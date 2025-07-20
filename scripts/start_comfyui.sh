#!/usr/bin/env bash
# Launch ComfyUI with the same arguments used on container start
cd /workspace/comfyui || exit 1
source venv/bin/activate
nohup python main.py --listen 0.0.0.0 --port 7860 \
    --extra-model-paths-config /workspace/comfyui/extra_model_paths.yaml \
    --highvram --cuda-malloc > /workspace/logs/comfyui.log 2>&1 &
deactivate

