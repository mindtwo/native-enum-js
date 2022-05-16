# native-enum-js

Create enums in JS.

Create your own enums or use the ones served by our composer package mindtwo/native-enum

## Usage BaseEnum

Create an Enum by simply extending the BaseEnum class:

```
class ExampleEnum extends BaseEnum {
  // put cases here
}
```

At position `// put cases here` declare static variables:

```
static Case1 = 10;
static Case2 = 20;
static Case3 = 30;
...
```

`Case1` can then be accessed via `ExampleEnum.Case1`. `console.log(ExampleEnum.Case1)` will print `10` in the console. A case should
always start with an uppercase letter.

## Methods

### cases()

Get all cases from enum. Since we may want to have class/instance variables, we filter the cases out ouf all class variables by checking if the name
starts with an uppercase letter. 

### names()

Get all case names as array.

### values()

Get all values as array.

## ServedEnum

A ServedEnum has basically access to all methods declared in BaseEnum but it adds the methods `fromString`, `fromArray` and `fromMap` which will return
an instance of ServedEnum. This instance can then be used like other Enums.

### fromArray(array)

Takes an array of objects representing cases. The objects must contain `name, value` and my contain `localized_name`.

### fromMap(object)

Takes a map of objects where `key -> case representing object`. The objects must contain `name, value` and my contain `localized_name`.

### fromString(path)

Takes a string which represents a path inside an object divided by `.`

It will try to find that path inside the global `window` object. An example for the string may be: `enums.ExampleServed` which will
make the method return `window.enums.ExampleServed` which will return an instance or `null` depending on whether we find that entry or not.

### enum(array|object|string)

This helper will check the type of the parsed value and calls the correct method from above.

## TODO

- [ ] localiztion
