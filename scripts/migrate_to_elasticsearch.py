# thanks le chat

import redis
from elasticsearch import Elasticsearch, helpers
from multiprocessing import Pool, cpu_count
import itertools
import time

# --- Config ---
REDIS_HOST = 'localhost'
ES_HOST = 'http://loalhost:9200'
INDEX_NAME = 'recipes'
BATCH_SIZE = 1000  # Adjust based on your system
NUM_WORKERS = cpu_count() * 2  # Use all CPU cores

# --- Connect to Redis and Elasticsearch ---
r = redis.Redis(host=REDIS_HOST, port=6381, db=0)
es = Elasticsearch([ES_HOST])

# --- Define fields to fetch ---
STRING_FIELDS = [
    'link', 'title', 'description', 'date', 'rating', 'rating_count',
    'prep_time_seconds', 'cook_time_seconds', 'total_time_seconds',
    'servings', 'calories', 'carbohydrates', 'cholesterol', 'fat',
    'fiber', 'protein', 'saturated_fat', 'sodium', 'sugar'
]
LIST_FIELDS = ['keywords', 'authors', 'images', 'ingredients', 'instructions']

# --- Fetch all recipe IDs ---
recipe_ids = [int(id.decode('utf-8')) for id in r.smembers('recipes')]
total_recipes = len(recipe_ids)
print(f"Found {total_recipes} recipes to import.")

# --- Helper: Fetch a single recipe ---
def fetch_recipe(recipe_id):
    pipe = r.pipeline()
    for field in STRING_FIELDS:
        pipe.get(f'recipe:{recipe_id}:{field}')
    for field in LIST_FIELDS:
        pipe.lrange(f'recipe:{recipe_id}:{field}', 0, -1)
    results = pipe.execute()

    recipe_data = {'id': recipe_id}
    for i, field in enumerate(STRING_FIELDS):
        value = results[i]
        if value:
            recipe_data[field] = value.decode('utf-8')
    for i, field in enumerate(LIST_FIELDS, len(STRING_FIELDS)):
        values = results[i]
        if values:
            recipe_data[field] = [v.decode('utf-8') for v in values]
    return recipe_data

# --- Parallel fetch ---
def fetch_recipes_batch(ids_batch):
    with Pool(NUM_WORKERS) as p:
        return p.map(fetch_recipe, ids_batch)

# --- Batch and index ---
def index_recipes(recipes_batch):
    actions = [{
        "_index": INDEX_NAME,
        "_id": recipe['id'],
        "_source": recipe
    } for recipe in recipes_batch]
    helpers.bulk(es, actions)

# --- Main loop with progress tracking ---
start_time = time.time()
processed = 0

for batch in itertools.batched(recipe_ids, BATCH_SIZE):
    batch_start = time.time()
    recipes_batch = fetch_recipes_batch(batch)
    index_recipes(recipes_batch)
    processed += len(recipes_batch)

    # --- Progress tracking ---
    elapsed = time.time() - start_time
    batch_elapsed = time.time() - batch_start
    remaining = total_recipes - processed
    if processed > 0:
        rate = processed / elapsed
        eta = remaining / rate if rate > 0 else 0
        eta_str = f"{eta:.0f}s" if eta < 60 else f"{eta/60:.1f}m"
        print(f"Progress: {processed}/{total_recipes} ({processed/total_recipes:.1%}) | "
              f"Rate: {rate:.1f} recipes/sec | "
              f"ETA: {eta_str}")
    else:
        print(f"Progress: {processed}/{total_recipes} (0.0%) | Starting...")

print(f"Done! Imported {processed} recipes in {elapsed:.1f} seconds.")
