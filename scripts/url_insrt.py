import psycopg
import os 
from dotenv import load_dotenv

print("psycopg version: ",psycopg.__version__)

load_dotenv()

DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USERNAME')
DB_HOST = os.getenv('DB_HOST')
DB_PASS = os.getenv('DB_PASSWORD')
DB_PORT = os.getenv('DB_PORT')



with psycopg.connect(
    host=DB_HOST,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
    port=DB_PORT
) as conn:
    with conn.cursor() as cur:
        with open("suffix_file.tsv", 'r', encoding='utf-8') as f:
            with cur.copy("COPY urlmappings (short_url, status) FROM STDIN (FORMAT CSV, DELIMITER E'\\t')") as copy:
                for line in f:
                    copy.write(line)
        
