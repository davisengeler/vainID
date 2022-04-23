from urllib.parse import urlparse
from math import gcd
import math
import hashlib

def to_base(n): 
    chars="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    base = len(chars)
    if not n: return "0"
    return to_base(n//base).lstrip("0") + chars[int(n%base)]

def create_generator(capacity, seed):
    hashed_seed = int(hashlib.sha256(seed.encode('utf-8')).hexdigest(), 16)
    generator = hashed_seed % math.floor(capacity*.8)  # Starting point
    while gcd(generator,capacity)!=1 and generator < capacity:  # We need a generator that's coprime to the capacity.
        generator += 1  # There may be a smarter way to find one, but I just increment by 1 each time until I find one.
    if gcd(generator,capacity)!=1:
        # Raise an error if one can't be found. 
        raise ValueError("Could not find a 'generator' that is relatively prime to the capacity ({capacity})")
    return generator

def generate_id(iteration, seed):
    # Determine required values
    try: # Determine the number of digits required for this iteration value
        required_digits = math.ceil(math.log(iteration+1)/math.log(62))
    except:
        required_digits = 1
    try: # Determine the capacity of the previous number of digits (how many are 'unavailable')
        unavailable = math.ceil(math.pow(62, required_digits-1))
        if unavailable == 1:
            unavailable = 0
    except:
        unavailable = 0
    capacity = max(62, math.ceil(math.pow(62, required_digits)) - unavailable)
    generator = create_generator(capacity, seed)
    # Calcuate the next id to generate and convert it to a base 62 alphanumeric string
    calc = ((iteration-unavailable)*generator) % capacity + unavailable
    id = to_base(calc)
    return id
