import boto3

spaces = boto3.resource('s3',
    endpoint_url="https://nyc3.digitaloceanspaces.com",
    aws_access_key_id="DO00MAJ2XJ3H2VP8NR7X",
    aws_secret_access_key="xhbBZloNZNx3IAC4xnnFbHl9vRfOY8kTD0JXTvSR66g" 
)

bucket_name = 'vamilly-arqbr'
directory_name = 'arquivos-pdf-scanner/'

bucket = spaces.Bucket(bucket_name)

for obj in bucket.objects.filter(Prefix=directory_name):
    print(obj.key)
