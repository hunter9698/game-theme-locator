#!/bin/bash

# --- COLORS ---
GREEN='\033[1;32m'
BLUE='\033[1;34m'
RED='\033[1;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}    NEXUS LOCATOR - INSTALLER         ${NC}"
echo -e "${BLUE}========================================${NC}"

# Check for root
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[!] Error: Please run as root (sudo ./install.sh)${NC}"
  exit 1
fi

BASE_DIR=$(pwd)
BIN_PATH="/usr/local/bin/locator"

# Install dependencies check
echo -e "${GREEN}[*] Checking dependencies...${NC}"
for cmd in node npm curl; do
  if ! command -v $cmd &> /dev/null; then
    echo -e "${RED}[!] Error: $cmd is not installed. Please install it first.${NC}"
    exit 1
  fi
done

# Setup permissions
echo -e "${GREEN}[*] Setting permissions...${NC}"
chmod +x "$BASE_DIR/locator"

# Create symlink
echo -e "${GREEN}[*] Creating global command 'locator'...${NC}"
ln -sf "$BASE_DIR/locator" "$BIN_PATH"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  INSTALLATION SUCCESSFUL!              ${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e " You can now run the tool from anywhere:"
echo -e " ${BLUE}sudo locator${NC}"
echo -e ""
echo -e " Optional: Force tunnel generation:"
echo -e " ${BLUE}sudo locator --tunnel${NC}"
echo -e "========================================\n"
