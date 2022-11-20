import hashlib, time

hash_from_string = lambda s, n=8: int(hashlib.sha1(str(s).encode("utf-8")).hexdigest(), 16) % (10 ** n)
new_hash = lambda: d+'1'*(15-len(d)) if len(d:=hex(hash_from_string(time.time(),16))[2:]) else d

