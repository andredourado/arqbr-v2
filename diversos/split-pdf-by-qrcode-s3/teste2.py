import boto3

spaces = boto3.resource('s3',
    endpoint_url="https://nyc3.digitaloceanspaces.com",
    aws_access_key_id="DO00MAJ2XJ3H2VP8NR7X",
    aws_secret_access_key="xhbBZloNZNx3IAC4xnnFbHl9vRfOY8kTD0JXTvSR66g" 
)

bucket = 'vamilly-arqbr'
prefix = 'arquivos-pdf-scanner/' # if no prefix, pass ''

def get_keys_from_prefix(bucket, prefix):
    '''gets list of keys for given bucket and prefix'''
    keys_list = []
    paginator = spaces.meta.client.get_paginator('list_objects_v2')
    # use Delimiter to limit search to that level of hierarchy
    for page in paginator.paginate(Bucket=bucket, Prefix=prefix, Delimiter='/'):
        keys = [content['Key'] for content in page.get('Contents')]
        print('keys in page: ', len(keys))
        keys_list.extend(keys)
    return keys_list

keys_list = get_keys_from_prefix(bucket, prefix)

print(keys_list)