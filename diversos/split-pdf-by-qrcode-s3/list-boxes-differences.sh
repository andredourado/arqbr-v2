#!/bin/bash

# Set variables for the S3 bucket and directories
BUCKET_NAME="your-bucket-name"
DIR1="path/to/first/directory"
DIR2="path/to/second/directory"

# Set the filter string for the file names
FILTER="your-filter-string"

# Get the list of files from the first directory
LIST1=$(aws s3 ls "s3://${BUCKET_NAME}/${DIR1}/" | grep "${FILTER}" | awk '{print $4}')

# Get the list of files from the second directory
LIST2=$(aws s3 ls "s3://${BUCKET_NAME}/${DIR2}/" | grep "${FILTER}" | awk '{print $4}')

# Create an array of the file names from the first directory
ARRAY1=($LIST1)

# Create an array of the file names from the second directory
ARRAY2=($LIST2)

# Initialize an empty array for the results
RESULTS=()

# Loop through the first array and check if each element is in the second array
for i in "${ARRAY1[@]}"
do
  if [[ ! " ${ARRAY2[@]} " =~ " ${i} " ]]; then
    RESULTS+=($i)
  fi
done

# Print the results
echo "Files in ${DIR1} but not in ${DIR2}:"
for i in "${RESULTS[@]}"
do
  echo "- ${i}"
done

