#!/usr/bin/env bash
# Setup script — run once after cloning the repo.
# Usage: bash scripts/setup.sh

set -e

echo "=== Remotion Studio — Full Setup ==="

# 1. Node dependencies
echo "[1/3] Installing Node dependencies..."
npm install

# 2. Python venv + Earshot + librosa
echo "[2/3] Setting up Python venv (Earshot + librosa)..."
if [ ! -d ".earshot-venv" ]; then
  python -m venv .earshot-venv
fi

# Detect OS for venv activation path
if [ -f ".earshot-venv/Scripts/python.exe" ]; then
  PY=".earshot-venv/Scripts/python"
else
  PY=".earshot-venv/bin/python"
fi

$PY -m pip install --upgrade pip -q
$PY -m pip install earshot librosa -q
echo "  ✓ Earshot + librosa installed"

# 3. Clone video-shotcraft reference (motion recipes)
echo "[3/3] Fetching video-shotcraft motion recipes..."
if [ ! -d ".vendor/video-shotcraft" ]; then
  mkdir -p .vendor
  git clone --depth 1 https://github.com/Vincentwei1021/video-shotcraft.git .vendor/video-shotcraft
  echo "  ✓ video-shotcraft cloned to .vendor/"
else
  echo "  ✓ video-shotcraft already present"
fi

echo ""
echo "=== Setup complete ==="
echo "Run 'npm start' to open Remotion Studio."
