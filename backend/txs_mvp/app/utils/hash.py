import hashlib, time, random

hashlen=len('3272998df1d09267de0771143c0db5dc6047ede6b4a01f3b23c453cd506c3c687beecd0cdb5bb75830142a72cdcb5f5ef59fcf44007c04fbf70a01f0dd719033a258f8e')

def hash_from_string(s, n=8): 
    return int(
        str(int(hashlib.sha256(str(s).encode("utf-8")).hexdigest(), 16) % (10 ** n))+\
        str(int(hashlib.sha1(str(s).encode("utf-8")).hexdigest(), 16) % (10 ** n))+\
        str(int(hashlib.md5(str(s).encode("utf-8")).hexdigest(), 16) % (10 ** n))
    )

def new_hash(l=hashlen): 
    return d+'0'*(l-len(d)) if len(d:=hex(hash_from_string(str(time.time())+str(random.randint(0,100000000)),l+1))[2:]) else d

