
# URL Shortener

Systems Design Journey 01: A Url shortener that is able to handle 10k+ qps.

## Stack

Sveltekit - Gain insight into how the backend works. 
PostgreSQL - A strong versatile engine that meets BOE requirements
Redis - Look aside caching

## Notes

There are two ways to do this when considering scalability. 

First: 
- We can genereate the short url suffix at
long url at insertion time while. 
- We suffix is made from the encoded keys so we avoid collisions
- Long url is mapped to a specific suffix to avoid dedupe.

Second:
- We seed a lot of short urls beforehand and distribute them to postres
replicas
- Now we're not generating a suffix at time of long url insertion. Instead
we look through the db to find the first availble pre-seeded suffix and map 
to the long url.
- We need to be careful on how we pre-seed, don't want to create billions of
suffixes right off the bat
- Also need to give consideration on how we shard the data.