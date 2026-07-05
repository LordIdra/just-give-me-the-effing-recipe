# Looks through all domains in waiting_links_by_domain:* and adds every domain to link:waiting_domains

import redis

r = redis.Redis(
    host='localhost', 
    port=6381, 
    db=0,
)

links = r.scan_iter("link:waiting_links_by_domain:*")
for link in links:
    print(link.removeprefix("link:waiting_links_by_domain:"))

