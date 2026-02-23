import csv
import time
import random
import string
from sqids import Sqids
start_time = time.perf_counter()
count = 0

def generate_random_alphabet():
    characters = list(string.ascii_letters + string.digits)
    
    random.shuffle(characters)
    rand_str = ''.join(characters)

    return rand_str

rand_alphabet = generate_random_alphabet()


sqids = Sqids(
    min_length=8,
    alphabet=rand_alphabet
)
with open('suffix_file.tsv', mode='w', newline='') as tsv_file:
    tsv_writer = csv.writer(tsv_file, delimiter='\t')
    while count <= 5_000_000:
        suffix = sqids.encode([count])
        tsv_writer.writerow([suffix,'free'])
        count += 1
        #print(f"Sample suffix: {suffix}")

end_time = time.perf_counter()

elapsed_time = end_time - start_time
print(f"Execution time: {elapsed_time:.4f} seconds")