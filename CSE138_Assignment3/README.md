# Assignment 3 README


## Team Contributions

Darren - View requests + updating endpoints to broadcast changes and update vector clocks.

David - Network down detection. Heartbeat Endpoints. Node discovery.

Simon - Broadcasting requests. Logic related to vector clocks and causal dependencies. Prototype for request retries

## Acknowledgements
None

## Citations
[Express API Reference](https://expressjs.com/en/5x/api.html)  
[Express Middleware](https://expressjs.com/en/guide/writing-middleware.html)

## Mechanism Description

### Causal Dependencies
Our system tracks causal dependencies by defining a vector clock within each replica. Each vector clock contains the counters of itself and all other connected replicas. 

When a client provides no causal metadata, the request is processed and the replica's vector clock is returned to the client. 

If the client provides a vector clock causal metadata, the provided clock would be compared with the replica's vector clock to ensure these three conditions are met:

1. The metadata must contain a counter for every socket the local clock describes
2. For some socket, the local vector clock's counter at that socket >= metadata's value
3. If the request was a broadcast from a sender socket, the local vector clock's counter for that socket must be exactly one less than the metadata's value for the same socket

Once the three conditions are met, the causal dependencies are met.


### Network Detection
The system detects when a replica goes down by having each Node monitor the health of its neighbor. Each node sends a "heartbeat" network request to a neighbor node, and if any issues are found, it then notifies the rest of the network.
