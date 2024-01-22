const {CacheSingle} = require('@mozeyinedu/cache')

const dir = 'store';
const file = 'config.json';
const rootDir = __rootdir;
const defaultData = {
    "unverified_user_lifespan": 259200, // 72hours in seconds
    "currency": "NGN",
    "referral_bonus": 500,
    "referral_bonus_limit": 1
}

const cache = new CacheSingle(rootDir, dir, file, defaultData);

1. get data
`const data = await cache.get()`

2. update data
has 3 steps

```
    // 1. get the config data
    let initialData = await cache.get();

    // 2. create update
    // await cache.createUpdate([initialData], [key], [value], [data type]);
    // data type such as number, string etc is optional

    await cache.createUpdate(initialData, 'currency', "USD");
    await cache.createUpdate(initialData, 'unverified_user_lifespan', "200", "number);

    // update this data
    const returnedData = await cache.update(initialData)
```

