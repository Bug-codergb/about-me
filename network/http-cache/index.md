# Http缓存策略
1. 缓存的原理是在首次请求后保存一份请求资源的响应副本，当用户再次发起相同的请求，如果判断缓存命中则拦截请求，将之前请求响应的副本返还给用户，从而避免重新向服务器发起资源请求。
### Http缓存
http缓存分为**强制缓存**和**协商缓存**
- **强制缓存**
    - 如果浏览器判断所请求的目标资源有效命中，则直接从强制缓存中返回请求响应，无需与服务器进行任何通信
    - ```expires```和```cache-control```
    - ```expires```会在浏览器发送请求时，与当前本地时间戳进行比较，如果本地时间小于expires则缓存未失效。反之失效，重新请求（对本地时间戳过分依赖，如果本地时间和服务端时间不一致，或者对客户端时间主动修改，缓存过期时间判断会出现差错）
    - ```cache-control```可以通过设置maxage,no-chache和no-store
    - public和private 表示是否可以有代理服务器进行缓存
- **协商缓存**
    - 使用本地缓存之前，向服务器发送一次GET请求，与之协商当前浏览器本地缓存是否过期。
    - ```last-modified```（响应头） 和 ```if-modified-since```(请求头)
    - 服务器发送GET请求，请求缓存有效性的协商GET请求中包含一个if-since-modified字段，其值正是上次响应头中last-modified中的字段值