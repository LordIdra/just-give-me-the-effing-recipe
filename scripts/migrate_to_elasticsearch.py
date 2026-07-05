# thanks le chat

import redis
from elasticsearch import Elasticsearch, helpers
import json

# Connect to Redis
r = redis.Redis(host='localhost', port=6371, db=0)

# Connect to Elasticsearch
es = Elasticsearch(['http://localhost:9200'])
index_name = 'recipes'

# Get all recipe IDs
recipe_ids = r.smembers('recipes')
recipe_ids = [int(id.decode('utf-8')) for id in recipe_ids]

# Prepare actions for bulk indexing
actions = []
for recipe_id in recipe_ids:
    # Fetch all STRING fields for the recipe
    recipe_data = {}
    string_fields = [
        'link', 'title', 'description', 'date', 'rating', 'rating_count',
        'prep_time_seconds', 'cook_time_seconds', 'total_time_seconds',
        'servings', 'calories', 'carbohydrates', 'cholesterol', 'fat',
        'fiber', 'protein', 'saturated_fat', 'sodium', 'sugar'
    ]
    for field in string_fields:
        key = f'recipe:{recipe_id}:{field}'
        value = r.get(key)
        if value:
            recipe_data[field] = value.decode('utf-8')

    # Fetch all LIST fields for the recipe
    list_fields = ['keywords', 'authors', 'images', 'ingredients', 'instructions']
    for field in list_fields:
        key = f'recipe:{recipe_id}:{field}'
        values = r.lrange(key, 0, -1)
        if values:
            recipe_data[field] = [v.decode('utf-8') for v in values]

    # Add recipe_id to the document
    recipe_data['id'] = recipe_id

    # Add to actions
    actions.append({
        "_index": index_name,
        "_id": recipe_id,
        "_source": recipe_data
    })

# Bulk index into Elasticsearch
helpers.bulk(es, actions)

print(f"Imported {len(actions)} recipes to Elasticsearch.")
