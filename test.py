from __init__ import generate_id

# Define test
def run_test(seed, iterations=100):
    used_ids = []
    dupes = []
    consecutive_dupes = 0
    max_consecutive_dupes = 0
    test_num = iterations

    for i in range(0, test_num):
        id = generate_id(i, seed)
        if id in used_ids:
            print(f"DUPLICATE: {id}")
            print(f"Current atomic_iterator = {i}")
            print(id)
            dupes.append(id)
            consecutive_dupes += 1
        else:
            print(f"No collision for id {id} at iterator = {i}")
            if max_consecutive_dupes < consecutive_dupes:
                max_consecutive_dupes = consecutive_dupes
            consecutive_dupes = 0
            used_ids.append(id)

    print(f"Collision on {len(dupes)}/{test_num} ({(len(dupes)/test_num)*100}%)")
    print(f"Max consecutive collisions: {max_consecutive_dupes}")

# Run tests
test_seed = "abc123"
run_test(test_seed, 70)
# print(generate_id(14776336, test_seed))