# vainID: Vanity ID Generator

This is a python package for generating short, auto-growing, and visually-random unique IDs with no collisions or limits. 

## How to use

To use the package, import the `generate_id` function from `__init__.py`. The function takes two parameters: `iteration` and `seed`. `iteration` is the current iteration number, and `seed` is a string used to seed the generator. 

Example usage:

```python
from vainid import generate_id

id = generate_id(0, "myseed") # Generate an ID for iteration 0 with seed "myseed"
```

## Implementation details

The `generate_id` function works by using a generator function to produce a sequence of unique IDs. The generator function is based on modular arithmetic and the fact that any sequence of numbers modulo a prime number will eventually cycle through all possible values.

The generator function takes two parameters: `capacity` and `seed`. `capacity` is the maximum number of unique IDs that can be generated, and `seed` is used to generate a starting point for the sequence. The generator function uses a hashing function to convert the `seed` into a 256-bit integer, which is then used as the starting point for the sequence. The function then iteratively finds a generator that is coprime to the `capacity` and uses it to generate each subsequent ID in the sequence.

The `generate_id` function takes the iteration number and `seed` as input and uses the generator function to produce the corresponding ID. It first calculates the number of digits required to represent the ID (using base 62), based on the iteration number. It then uses the capacity of the previous number of digits (i.e., the number of IDs that are unavailable) to calculate the capacity for the current number of digits. It then uses the generator function to generate the ID for the current iteration number.

## Testing

The `test.py` file contains a test function run_test that tests the generate_id function for collisions. It generates a sequence of IDs with a given seed and checks for duplicates. If a duplicate is found, it prints an error message and stops the test.

To run the tests, run `python test.py`.

## Contributors

This package was created by Davis Engeler. This README was generated by ChatGPT.
