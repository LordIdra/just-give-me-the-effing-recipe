# Looks through all domains in waiting_links_by_domain:* and adds every domain to link:waiting_domains

import redis

r = redis.Redis(
    host='localhost', 
    port=6381, 
    db=0,
)

keys = []
cursor = 0
while True:
    cursor, batch = r.scan(cursor, match="link:waiting_links_by_domain:*")
    keys.extend(batch)
    if cursor == 0:
        break

for key in keys:
    print(key.decode('utf-8').removeprefix("link:waiting_links_by_domain:"))
    r.sadd("link:waiting_domains", key)
