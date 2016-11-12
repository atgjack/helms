# Helms

A *deep* object copy/compare/merge library.

```
npm install helms
```

### Usage
----
##### Compare

`compare(a: Any, b: Any) -> Boolean`

Does a deep comparison of `a` to `b`.  It will short-circuit on same pointers and inequal prototypes, so be aware that similar properties on different classes are not equal.

--------
##### Copy

`copy(a: Any) -> Any`

Does a deep clone of `a`. If as is a literal it will return that, otherwise it will create a new object that is completely idependent of `a`. It will create native object types like Dates and Regexp but not new class instances.

--------
##### Merge

`merge(a: Object, b: Object) -> Void`

Deep merges `b` into `a`. This is idempotent. It will never delete properties unless an object property is being replaced with a literal. Arrays will be updated in place by index.



--------
#### Examples
```
import { merge, copy, compare } from 'helms';

const array = ['frodo', 'peregrin', 'merry', 'fatty', 'samwise']
const first = {
  name: 'fellowship',
  hobbits: array,
  date: new Date("29 July 1954")
}

merge(first, { hobbits: [,,,,,'bilbo'] });
// Array will be ['frodo', 'peregrin', 'merry', 'fatty', 'samwise', 'bilbo']

compare(first.hobbits, array);
// True

const second = copy(first);
merge(second, { book: 'towers', date: new Date("11 November 1954") });
// A new object with different book and date fields.

compare(first, second);
// False

second.hobbits[5] = undefined;
// The new object's array is not the original array.

compare(second.hobbits, array);
//False
```

#### Bugs
--------

If you can find any problems or native object type that do not work, please submit an issue.
