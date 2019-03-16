# Stable Serialize

Consistent stringify and hash for deeply equal objects.

# Usage

```
const serialize = require('stable-serialize');

let object1 = {};
let object2 = {};
object1.a = 'a';
object2.b = 'b';
object1.b = 'b';
object2.a = 'a';

expect(JSON.stringify(object1)).not.toBe(JSON.stringify(object2));
expect(serialize.stringify(object1)).toBe(serialize.stringify(object2));
expect(serialize.hash(object1)).toBe(serialize.hash(object2));
```