# Cache
## Description
Cache is a class use for local file storage of data to reduce the number of time database queried

### How to use Cache

```
    const Cache = require('@mozeyinedu/cache');
    const cachedProfileFilePath = path.join(__rootdir, 'src/profile/controls')
    const cachedProfileFileName = 'cache.json';
    const cache = new Cache(cachedProfileFilePath, cachedProfileFileName, 'user_id')

    // the different methods

    await cache.get([id, id, id])
    await cache.getAll()
    await cache.getOne(id)
    await cache.store(data)
    await cache.update(id)
    await cache.delete(id)
    await cache.remove(id)
```