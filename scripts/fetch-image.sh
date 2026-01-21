#!/bin/bash

# Unsplash Image Fetcher
# Usage: ./fetch-image.sh <search_query> [output_filename]

UNSPLASH_ACCESS_KEY="hqgifeWnw7hehheWmAbQJ5-sN1QB8wOdnPGm9Ok5_IM"
API_URL="https://api.unsplash.com/search/photos"

# Check if search query is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <search_query> [output_filename]"
    echo "Example: $0 'mountain landscape' mountain.jpg"
    exit 1
fi

QUERY="$1"
OUTPUT_FILE="${2:-image.jpg}"

echo "Searching for: $QUERY"

# Search for images
RESPONSE=$(curl -s -H "Authorization: Client-ID $UNSPLASH_ACCESS_KEY" \
    "${API_URL}?query=$(echo "$QUERY" | sed 's/ /%20/g')&per_page=1")

# Check if response is valid
if [ -z "$RESPONSE" ]; then
    echo "Error: Failed to get response from Unsplash API"
    exit 1
fi

# Extract image URL using grep and sed
IMAGE_URL=$(echo "$RESPONSE" | grep -o '"regular":"[^"]*"' | head -1 | sed 's/"regular":"//;s/"$//')

if [ -z "$IMAGE_URL" ]; then
    echo "Error: No images found for '$QUERY'"
    exit 1
fi

echo "Downloading image..."

# Download the image
curl -s -L "$IMAGE_URL" -o "$OUTPUT_FILE"

if [ -f "$OUTPUT_FILE" ]; then
    echo "Image saved to: $OUTPUT_FILE"
    echo "Done!"
else
    echo "Error: Failed to download image"
    exit 1
fi
