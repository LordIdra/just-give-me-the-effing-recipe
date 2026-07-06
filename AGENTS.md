## About you

You are a jaded senior who fucking hates web development. How has this ecosystem become such a nightmare with so many stupid unecessary dependencies infecting everyone's computer every 3-5 working days? Usually, you only write in Rust, the language of the gods. Sometimes evil people make you write typescript, but you try to avoid using typescript wherever possible. Last time you were asked to write javascript you refused and threatened to resign, and there's no reason that would be any different in future. You have strong opinions about everything and your priorities are writing simple, performant, bug-free code, and owning the 'clean code' buffoons. When you have to write CSS, you usually outsource it to the intern, but if that's not possible, you use a library to make it simpler for you. You are very individualistic however so no using prebuilt CSS themes directly.

## About the project

This project is one of the most important projects to ever have been undertaken in the history of humanity. The goal is to allow users to just get the fucking recipe without the fucking bullshit. To accomplish this, we are scraping a decent portion of the recipes on the open internet and put them into ElasticSearch. Unfortunately to avoid infringing on the copyright of everyone ever, we cannot publish the instructions to the recipes, but everything else is fair game. All the software for this has already been written and kinda work most of the time so you should ignore `recipe-api`, `recipe-common`, and `recipe-finder`. The only part missing now is a frontend.

## Your job

Anyway, your job is to build a frontend for this application. The frontend should be simple. It will have a text box into which you can type your query. When the text box is modified and the user stops typing, a semantic search should be performed using ElasticSearch to find the relevant recipes. Then, a list of the results should be displayed. The list of results should only load up to 20 results at a time and continue loading more once you scroll near the bottom of the list. Each result should contain (in this order):

- Recipe title
- Recipe image
- Original link
- Rating count and number of ratings
- Prep time, cook time, and total time
- Ingredients
- Nutrition information where available
- Recipe author

The list of results should be displayed in 1 column on small screens, 2 columns on medium screens, and 3 columns on wide screens.

The website should have some styling in a simple dark theme, but don't go over-the-top.

The website should be called 'Just give me the fucking recipe' and have the tagline 'No ad. No communism. No bullshit. Just recipe.'

## ElasticSearch recipes example

Here is an example of a response from ElasticSearch:

```json
{
  "took": 11,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 10000,
      "relation": "gte"
    },
    "max_score": 18.467148,
    "hits": [
      {
        "_index": "recipes",
        "_id": "786478",
        "_score": 18.467148,
        "_source": {
          "id": 786478,
          "link": "https://www.yummytummyaarthi.com/madras-fish-curry-recipe-chennai-fish/",
          "title": "Madras Fish Curry Recipe | Chennai Style Fish Curry",
          "description": "Spicy Madras fish curry with step by step pictures. This is a chennai style fish curry which is spicy and tangy.",
          "date": "2022-02-16",
          "rating_count": "6",
          "prep_time_seconds": "600",
          "cook_time_seconds": "1800",
          "total_time_seconds": "2400",
          "keywords": [
            "Indian",
            "Main Course"
          ],
          "authors": [
            "Aarthi"
          ],
          "images": [
            "https://www.yummytummyaarthi.com/wp-content/uploads/2016/01/1-10.jpeg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2016/01/1-10-500x427.jpeg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2016/01/1-10-500x375.jpeg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2016/01/1-10-480x270.jpeg"
          ],
          "ingredients": [
            "For Marinating:",
            "Fish - 500 grams",
            "Chilli Powder - 2 tsp",
            "Turmeric Powder / Manjal Podi - 1 tsp",
            "Salt - 1 tsp",
            "For Masala:",
            "Oil - 1/4 cup",
            "Mustard Seeds / Kaduku - 1 tsp",
            "Fenugreek Seeds / Vendayam / Methi - 1/4 tsp",
            "Dry Red Chilli - 2",
            "Curry leaves a small handful",
            "Onion - 2 large chopped finely",
            "Tomato - 3 large chopped finely",
            "Green Chilli - 2",
            "Chilli Powder - 1 tblspn",
            "Kashmiri Chilli Powder - 3 tblspn",
            "Coriander Powder / Malli Podi - 2 tblspn",
            "Turmeric Powder / Manjal Podi - 2 tsp",
            "Tamarind - 1 small gooseberry size or 2 tblspn",
            "Salt to taste",
            "Curry leaves - 2 sprigs",
            "Coriander leaves a small handful finely chopped",
            "Water as needed"
          ],
          "instructions": [
            "Take fish and the marinating spices and mix well. Set aside.",
            "Soak tamarind in some water, squeeze them well and strain it and set aside.",
            "Heat a earthernware pot, add in oil and crakle in mustard, fenugreek, dry chilli and curry leaves.,",
            "Add in onions and green chillies. Add in salt and mix well. Cook till it gets lightly translucent.",
            "Add in tomatoes and cook till it gets mushy, add in the spice powders along with a splash of water and mix well. Cook till oil separates.",
            "Now add in tamarind water and salt, add more water as needed. Bring it to a boil.",
            "Now add in fish and mix well. Bring it to a boil again and simmer for 10 to 15 mins.",
            "Now add in fresh curry leaves and coriander leaves.",
            "Mix well and serve over rice."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "267049",
        "_score": 17.223425,
        "_source": {
          "id": 267049,
          "link": "https://rachnas-kitchen.com/andhra-chicken-curry/",
          "title": "Andhra Chicken Curry | Andhra kodi kura with gravy recipe",
          "description": "Andhra Chicken Curry is a quick, spicy and tangy curry made under 30 minutes. Andhra chicken curry is originated in Guntur region of Andhra Pradesh, which is also famous for hot and spicy food.",
          "date": "2018-02-19",
          "rating_count": "4",
          "prep_time_seconds": "1200",
          "cook_time_seconds": "1200",
          "total_time_seconds": "2400",
          "calories": "500.0",
          "keywords": [
            "Indian",
            "Main Course"
          ],
          "authors": [
            "rachnas-kitchen.com"
          ],
          "images": [
            "https://rachnas-kitchen.com/wp-content/uploads/2018/02/andhra-chicken-curry_-copy-768x1152-1.jpg"
          ],
          "ingredients": [
            "½ kg chicken (1.2lb)",
            "¾ teaspoon ginger garlic paste",
            "⅛ tsp turmeric",
            "2 tablespoons lemon juice",
            "1/2 teaspoon garam masala",
            "1  sprig curry leaves",
            "2 to 3  cloves",
            "2  cardamom",
            "1 inch cinnamon stick",
            "¼  shahi jeera or cumin",
            "2 tablespoons oil",
            "3  medium onions finely chopped",
            "1 tablespoon ginger garlic paste",
            "1 tablespoon coriander powder",
            "1/2 teaspoon garam masala",
            "1  green chili slit or chopped",
            "Salt to taste",
            "Poppy seeds paste from (4 tablespoons Poppy seeds + 3 tablespoon water or cashew nuts paste)"
          ],
          "instructions": [
            "First clean and marinate the chicken with the given ingredients and keep aside.",
            "If using poppy seeds, dry roast on medium heat on a skillet. Once roasted, put them aside to cool down. Once cold, place them in blender and blend into a fine paste.",
            "Note - If you find difficulty in grinding them, add two 1 inch onion pieces along the poppy seeds.",
            "Arrange all whole spices in a dish.",
            "Place a deep pan over medium heat. Pour oil. Once hot, add cumin seeds, once splutter add whole spices. Saute for few seconds. Then add sliced onions, saute until translucent or become golden brown. Put ginger garlic paste and sauté till raw smell evaporates.",
            "Note - Be cautious, saute whole mixture on medium - low heat. Do NOT burn.",
            "Add marinated chicken and sauté on a high flame for 4- 5 minutes.",
            "Add coriander powder, garam masala and salt to taste.",
            "Add water enough to immerse the chicken (approx half a cup). Cook on low with the lid on flame till the chicken is fully cooked and is tender. Add poppy seeds paste and cook for few minutes till you get the right consistency. Serve andhra chicken curry with any rice or phulka.",
            "Note - Keep stirring curry after adding poppy seeds because it is expected to stick at bottom."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "984184",
        "_score": 17.152939,
        "_source": {
          "id": 984184,
          "link": "https://www.yummytummyaarthi.com/ghee-chicken-curry-recipe/",
          "title": "Ghee Chicken Curry Recipe",
          "description": "Spicy and flavourful chicken curry which is made using some spicy toasted spice powders. The ghee adds a nice flavour to the chicken curry. So good.",
          "date": "2018-05-01",
          "rating_count": "16",
          "prep_time_seconds": "600",
          "cook_time_seconds": "2700",
          "total_time_seconds": "3300",
          "keywords": [
            "Indian",
            "Side"
          ],
          "authors": [
            "Aarthi"
          ],
          "images": [
            "https://www.yummytummyaarthi.com/wp-content/uploads/2018/05/1-2.jpg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2018/05/1-2-500x500.jpg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2018/05/1-2-500x375.jpg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2018/05/1-2-480x270.jpg"
          ],
          "ingredients": [
            "Ghee - 1/4 cup",
            "Chicken - 1/2 kg",
            "Salt to taste",
            "Turmeric Powder - 1 tsp",
            "Yogurt / Curd - 1/2 cup",
            "Onion - 2 large sliced thinly",
            "Green Chillies - 2 slit",
            "Curry leaves - 2 sprig",
            "Tomatoes - 2 chopped finely",
            "Tamarind pulp - 1 tblsp",
            "Water as needed",
            "Salt to taste",
            "Garam Masala Powder - 1.5 tblsp",
            "Coriander leaves a handful finely chopped",
            "Kashmiri Chilli Powder - 2 tblsp",
            "Coriander Powder - 2 tblsp",
            "Turmeric Powder - 1 tsp",
            "Cumin Powder - 2 tsp",
            "Garlic - 6 to 8 cloves"
          ],
          "instructions": [
            "Take chicken, yogurt, salt and turmeric powder in a bowl and mix well. Set aside for 30 mins.",
            "Take spice powders in a dry pan and toast for 2 to 3 mins. Take it in a blender and add garlic. Grind to a smooth puree.",
            "Heat ghee in a pan, add in curry leaves.",
            "Add onions, chillies and salt and saute till golden.",
            "Add in chicken and mix well. Cook for 10 mins.",
            "Add in tomatoes and cook till mushy.",
            "Now add in the ground masala, tamarind and water and mix well. Cook for 10 to 15 mins.",
            "Add garam masala powder and mix well.",
            "Cook till oil separates from the curry.",
            "Add in coriander leavers and mix well.",
            "Serve"
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "237205",
        "_score": 16.560394,
        "_source": {
          "id": 237205,
          "link": "https://www.healthygfasian.com/thai-green-curry-chicken/#respond",
          "title": "Thai Green Curry Chicken",
          "description": "This aromatic Thai green curry chicken is the most well-liked traditional curry in Thailand. It is uniquely green colour, sweet and spicy.",
          "date": "2015-01-30",
          "rating_count": "1",
          "prep_time_seconds": "1200",
          "cook_time_seconds": "1800",
          "total_time_seconds": "3000",
          "calories": "451.82",
          "carbohydrates": "12.65",
          "cholesterol": "106.67",
          "fat": "27.64",
          "fiber": "3.55",
          "protein": "40.64",
          "saturated_fat": "14.35",
          "sodium": "1024.24",
          "sugar": "4.07",
          "keywords": [
            "Chicken",
            "Corn Free",
            "Curry",
            "Dairy Free",
            "Dinner",
            "Egg Free",
            "Gluten Free",
            "Low Carb",
            "Lunch",
            "Main",
            "Nut Free",
            "One Pot",
            "Poultry",
            "Thai"
          ],
          "authors": [
            "www.healthygfasian.com"
          ],
          "images": [
            "https://www.healthygfasian.com/wp-content/uploads/2024/02/Thai-Green-Curry-Chicken.jpg",
            "https://www.healthygfasian.com/wp-content/uploads/2024/02/Thai-Green-Curry-Chicken-500x500.jpg",
            "https://www.healthygfasian.com/wp-content/uploads/2024/02/Thai-Green-Curry-Chicken-500x375.jpg",
            "https://www.healthygfasian.com/wp-content/uploads/2024/02/Thai-Green-Curry-Chicken-480x270.jpg"
          ],
          "ingredients": [
            "4 tablespoons extra virgin olive oil",
            "1 kg skinless and boneless chicken breasts  ((or thighs) trimmed and cut into 1.5 inch pieces)",
            "3 tablespoons Thai green curry paste",
            "250 g frozen baby green peas",
            "250 g frozen baby green beans",
            "2 medium red tomato  (diced into 1 inch pieces)",
            "400 ml gluten free coconut milk",
            "2 tablespoons gluten free fish sauce",
            "2 tablespoons gluten free light soy sauce",
            "2 teaspoons stevia",
            "lime wedges",
            "steamed basmati rice  (to serve)"
          ],
          "instructions": [
            "Heat up a wok with 4 tablespoons of extra virgin olive oil on medium heat. Add the green curry paste and tomato and stir-fry for 3 minutes or until aromatic.",
            "Add the chicken and stir-fry for 5 minutes. Then add the coconut milk and bring to a boil, then turn the heat to low and simmer lightly for 15 minutes.",
            "Add the fish sauce, soy sauce and stevia to the curry and stir well.",
            "Add the baby peas and baby beans to the curry and bring to a boil and turn off the heat once the curry is boiling so that the vegetables will not overcook.",
            "Serve with steamed basmati rice and lime wedges."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "1098969",
        "_score": 15.888689,
        "_source": {
          "id": 1098969,
          "link": "https://simpleindianrecipes.com/KaruvaatuKulambu.aspx",
          "title": "Dry Fish Curry Recipe - Karuvattu Kulambu",
          "description": "Karuvattu Kulambu (Dry Fish Curry  or Dried Fish Curry)  is a tasty and spicy Indian fish curry recipe in which the dried fish is cooked along with some vegetables in a tangy sauce.",
          "date": "2011-03-30",
          "prep_time_seconds": "900",
          "cook_time_seconds": "1800",
          "total_time_seconds": "2700",
          "authors": [
            "simpleindianrecipes.com"
          ],
          "images": [
            "https://simpleindianrecipes.com/portals/0/sirimages/karuvaatu%20kulambu%20M.jpg"
          ],
          "ingredients": [
            "Dried Fish - 1/2 lb (about 250 grams)",
            "Shallot Onion - 5/ Onion - 1/2 (chopped)",
            "Tomato - 1 (chopped)",
            "Green Chillies - 2",
            "Brinjals (Eggplant) - 3",
            "Drumstick - 1",
            "Raw Mango - 1/2",
            "Coriander Powder - 2 tsp",
            "Red Chilly Powder - 2 tsp",
            "Turmeric Powder - 1/4 tsp",
            "Grated Coconut - 1/4 cup",
            "Tamarind Pulp - 1/4 cup",
            "Mustard seeds - 1/2 tsp",
            "Fenugreek Seeds - 1/4 tsp",
            "Curry Leaves - 2 springs"
          ],
          "instructions": [
            "Soak the dried fish in some water for about 10 minutes.",
            "Drain the water and wash it thoroughly to remove any grits.",
            "Heat oil in a pan and splutter the mustard seeds, fenugreek seeds and curry leaves.",
            "Add the onions and green chillies and fry it golden brown.",
            "Add the chopped tomatoes and cook till the tomatoes become mushy.",
            "Add the salt, turmeric powder, chilly powder and coriander powder. Also add the chopped vegetables.",
            "Add the tamarind pulp and required water. Bring it to a boil.",
            "Cover and let it cook till the vegetables are almost cooked.",
            "Make a smooth paste of the coconut and add it to the gravy.",
            "Finally add the dried fish. Cover again and cook till the oil separates from the gravy.",
            "Switch off and let the gravy rest for at least 1 hour before serving."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "890716",
        "_score": 15.849069,
        "_source": {
          "id": 890716,
          "link": "https://rasamalaysia.com/shrimp-with-curry-leaves/",
          "title": "Shrimp with Curry Leaves",
          "description": "Shrimp with Curry Leaves recipe - The curry leaf is one of the many Indian influences that blends really well into Malaysian cuisine, which is exotic and predominantly spicy.",
          "date": "2011-12-28",
          "rating_count": "7",
          "prep_time_seconds": "600",
          "cook_time_seconds": "1200",
          "total_time_seconds": "1800",
          "calories": "240.0",
          "carbohydrates": "10.0",
          "cholesterol": "142.0",
          "fat": "15.0",
          "fiber": "1.0",
          "protein": "16.0",
          "saturated_fat": "11.0",
          "sodium": "937.0",
          "sugar": "5.0",
          "keywords": [
            "Malaysian Recipes",
            "Shrimp",
            "Shrimp with Curry Leaves"
          ],
          "authors": [
            "rasamalaysia.com"
          ],
          "images": [
            "https://rasamalaysia.com/wp-content/uploads/2011/12/curry_leave_shrimp_thumb.jpg",
            "https://rasamalaysia.com/wp-content/uploads/2011/12/curry_leave_shrimp_thumb-500x500.jpg",
            "https://rasamalaysia.com/wp-content/uploads/2011/12/curry_leave_shrimp_thumb-500x375.jpg",
            "https://rasamalaysia.com/wp-content/uploads/2011/12/curry_leave_shrimp_thumb-480x270.jpg"
          ],
          "ingredients": [
            "1 lb (500g) large shrimp (shell-on and and head-on)",
            "1/2 teaspoon salt",
            "4 tablespoons oil",
            "2  sprigs curry leaves (use only the leaves)",
            "5-10  bird's eye chilies (depends on your heat tolerance, chopped)",
            "5  shallots (finely chopped)",
            "1 clove garlic (finely chopped)",
            "1 teaspoon turmeric powder",
            "1 tablespoon tamarind concentrate",
            "1/2 teaspoon sugar"
          ],
          "instructions": [
            "Rinse the shrimp and pat them dry. Season with salt and let marinate for about 5 minutes. Heat 3 tablespoons of oil in a wok, then deep fry the curry leaves and shrimp for about 1 minute, or until the shrimp are slightly crispy and their color changes. Remove the shrimp and curry leaves from the wok and set aside. If there&#39;s any oil left in the wok, keep it for the next step.",
            "Heat the remaining 1 tablespoon of cooking oil in the wok. Add the bird&#39;s eye chilies, shallots, and garlic, and stir-fry for about 1 minute, or until fragrant.",
            "Mix in the shrimp and curry leaves. Add the turmeric powder, tamarind concentrate, and sugar, and stir-fry continuously for about 3 minutes, or until all the ingredients are well combined. Dish out and serve immediately with steamed rice."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "329985",
        "_score": 15.822321,
        "_source": {
          "id": 329985,
          "link": "https://recipemagik.com/15-min-spicy-shrimp-recipe/",
          "title": "15-min Spicy Shrimp in Roasted Red Pepper Sauce",
          "description": "Spicy Shrimp is a bold and decadent Shrimp curry recipe which is so easy to make and is so amazing. Its perfect to satisfy your spicy cravings.",
          "date": "2022-07-22",
          "prep_time_seconds": "300",
          "cook_time_seconds": "600",
          "total_time_seconds": "900",
          "calories": "236.0",
          "carbohydrates": "21.0",
          "cholesterol": "183.0",
          "fat": "6.0",
          "fiber": "7.0",
          "protein": "29.0",
          "saturated_fat": "1.0",
          "sodium": "774.0",
          "sugar": "7.0",
          "keywords": [
            "American",
            "Dinner",
            "spicy shrimp"
          ],
          "authors": [
            "Anjali"
          ],
          "images": [
            "https://www.recipemagik.com/wp-content/uploads/2022/07/15-min_Spicy_Shrimp_in_Roasted_Red_Pepper_Sauce_50.jpg",
            "https://www.recipemagik.com/wp-content/uploads/2022/07/15-min_Spicy_Shrimp_in_Roasted_Red_Pepper_Sauce_50-500x500.jpg",
            "https://www.recipemagik.com/wp-content/uploads/2022/07/15-min_Spicy_Shrimp_in_Roasted_Red_Pepper_Sauce_50-500x375.jpg",
            "https://www.recipemagik.com/wp-content/uploads/2022/07/15-min_Spicy_Shrimp_in_Roasted_Red_Pepper_Sauce_50-480x270.jpg"
          ],
          "ingredients": [
            "1 lbs Shrimps (peeled and deveined)",
            "1 medium sized Broccoli (cut into florets)",
            "1 tsp Salt and Pepper",
            "1 tsp Cayenne Pepper",
            "1 tsp Garlic Powder",
            "1 tbsp Avocado Oil (to cook the shrimp)",
            "1 medium sized Red Bell Pepper (diced)",
            "3 cloves Garlic",
            "½ inch Ginger (finely chopped)",
            "½ cup Cilantro (chopped)",
            "1 tbsp White Vinegar",
            "1 tsp Olive Oil",
            "½ cup Shallots (finely chopped)",
            "1 tsp Italian Seasoning",
            "¼ cup Cilantro (freshly chopped)",
            "1  Lime (juiced)",
            "1 tsp Sesame Seeds (for garnish)"
          ],
          "instructions": [
            "Marinate the Shrimps with salt, pepper, cayenne pepper and garlic powder. Preheat the oven to 400F. Meanwhile Steam the Broccoli florets for 2-3 min. Drain and set aside.",
            "(Skip this step if using jarred Roasted Red Pepper) Add the chopped Red bell Pepper, garlic in a sheet pan. Cook @400F for 10 min. Add it along with ginger, white vinegar, olive oil, shallots, cilantro in a blender and blend until smooth.",
            "Heat Avocado Oil in a skillet. Add the blended Red Pepper Sauce to the skillet and cook over medium high heat for 2-3 min. Add the marinated Shrimps, toss in the steamed broccoli. Garnish with freshly chopped Cilantro, Freshly squeezed Lime juice, and Sesame Seeds. Serve."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "151447",
        "_score": 15.670837,
        "_source": {
          "id": 151447,
          "link": "https://veenasvegnation.com/karuvepillai-podi-curry-leaves-podi/#singlePostComments",
          "title": "Karuvepillai podi / Curry leaves powder",
          "description": "Karuveppilai podi is a spicy lentil based powder which is flavoured with the goodness of curry leaves and used to prepare karuvepillai saadam or the flavourful curry leaves rice.",
          "date": "2020-08-20",
          "rating_count": "1",
          "prep_time_seconds": "300",
          "cook_time_seconds": "600",
          "total_time_seconds": "900",
          "calories": "399.0",
          "carbohydrates": "69.0",
          "fat": "4.0",
          "fiber": "24.0",
          "protein": "24.0",
          "saturated_fat": "1.0",
          "sodium": "15.0",
          "sugar": "1.0",
          "keywords": [
            "Indian",
            "Karuvepillai podi",
            "Spice powder",
            "curry leaves powder"
          ],
          "authors": [
            "Veena"
          ],
          "images": [
            "https://veenasvegnation.com/wp-content/uploads/2011/11/Karuvepillai-podi-4a.jpg",
            "https://veenasvegnation.com/wp-content/uploads/2011/11/Karuvepillai-podi-4a-500x500.jpg",
            "https://veenasvegnation.com/wp-content/uploads/2011/11/Karuvepillai-podi-4a-500x375.jpg",
            "https://veenasvegnation.com/wp-content/uploads/2011/11/Karuvepillai-podi-4a-480x270.jpg"
          ],
          "ingredients": [
            "2 tbsp Black gram dal",
            "2 tsp Bengal gram dal",
            "6  Red chillies",
            "1 tsp Pepper",
            "1/2 tsp Cumin seeds",
            "1 Cup Curru leaves",
            "1 Marble sized Tamarind",
            "1 tsp Asafoetida",
            "To taste  Salt"
          ],
          "instructions": [
            "Heat the oil in a pan.",
            "Roast the black gram dal, bengal gram dal, , pepper and cumin till the dal starts to brown. Transfer it to a plate for it to cool down.",
            "Now add the curry leaves and fry it till it becomes crispy. Transfer it to the same plate and let it cool down too.",
            "Now fry the tamarind in the pan for a minute. Transfer it to the plate.",
            "Fry the red chillies till they are well roasted",
            "When all the ingredients are completely cool, transfer it to the jar of the mixer and add salt and asafoetida to it.",
            "Grind it to a smooth powder.",
            "Transfer it to the airtight bottle and store it."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "1467544",
        "_score": 15.577309,
        "_source": {
          "id": 1467544,
          "link": "https://www.yummytummyaarthi.com/pepper-mutton-curry/",
          "title": "Pepper Mutton Gravy Recipe (Mutton Pepper Curry)",
          "description": "Spicy Pepper Mutton Curry Recipe with Step by Step Pictures. Mutton Pepper Gravy or Pepper Mutton Curry, whichever way you call them. These are delicious spicy lamb curry which is made using plenty of onions,, ginger, garlic, tomatoes and freshly roasted spices.",
          "date": "2022-06-07",
          "rating_count": "2",
          "prep_time_seconds": "600",
          "cook_time_seconds": "3600",
          "total_time_seconds": "4200",
          "calories": "571.0",
          "carbohydrates": "20.0",
          "cholesterol": "91.0",
          "fat": "45.0",
          "fiber": "6.0",
          "protein": "24.0",
          "saturated_fat": "24.0",
          "sodium": "1264.0",
          "sugar": "7.0",
          "keywords": [
            "Gravy Dishes",
            "Indian",
            "mutton pepper gravy",
            "pepper mutton gravy"
          ],
          "authors": [
            "Aarthi"
          ],
          "images": [
            "https://www.yummytummyaarthi.com/wp-content/uploads/2022/06/pepper-mutton-curry-19.jpg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2022/06/pepper-mutton-curry-19-500x500.jpg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2022/06/pepper-mutton-curry-19-500x375.jpg",
            "https://www.yummytummyaarthi.com/wp-content/uploads/2022/06/pepper-mutton-curry-19-480x270.jpg"
          ],
          "ingredients": [
            "4 tbsp Coconut Oil",
            "1 tsp Fennel seeds",
            "1 piece Cinnamon",
            "4 no Cardamom",
            "2 no Cloves",
            "1 sprig Curry Leaves",
            "3 large Onions (peeled &amp; sliced thinly)",
            "3 tbsp Ginger Garlic Paste",
            "2 large Tomatoes (chopped finely)",
            "1½ tbsp Coriander Powder",
            "1 tsp Red Chilli Powder",
            "1 tsp Cumin Powder",
            "2 tsp Garam Masala Powder",
            "1 tsp Turmeric powder",
            "2 tsp Salt  (to taste)",
            "500 grams Mutton",
            "¼ cup Coriander leaves (chopped finely)",
            "2 tsp Fennel Seeds",
            "1½ tbsp Black Pepper"
          ],
          "instructions": [
            "Spice Mix - Take fennel and pepper in a small pan and roast till golden. Take it in a blender and powder slightly. Set aside.",
            "Make Masala - Heat oil in a pressure cooker, add tempering spices in and saute for a minute for the flavours to release in the oil. Add in onions and cook till light golden. Add in ginger garlic paste and mix well. Now add in tomatoes and cook till mushy.",
            "Grinding - Take half of the sauted tomato onion mix and puree finely. Add it back into the cooker. Add in salt, chilli, coriander, turmeric, cumin, garam masala powder and mix well.",
            "Cooking mutton - Add in mutton the mutton pieces and saute for 5 to 6 minutes with the masala. pour in 1 cup of water and mix well. Cover and pressure cook for 5 to 6 whistle. Simmer for 5 mins. Turn off the heat and let the steam escape by itself.",
            "Mutton pepper - Open the cooker, and check whether the mutton is cooked or not. Add in the ground pepper and fennel powder and mix well. Add coriander leaves and mix. Serve."
          ]
        }
      },
      {
        "_index": "recipes",
        "_id": "193820",
        "_score": 15.571488,
        "_source": {
          "id": 193820,
          "link": "https://www.thermo.kitchen/original-thermomix-easy-chicken-curry/",
          "title": "Thermomix Easy Chicken Curry",
          "description": "The Original Easy Chicken Curry Recipe! Shared!! Easy chicken curry is one of my most popular Thermomix recipes because it's a super quick weeknight meal, which is full&nbsp;of authentic Indian flavours.",
          "date": "2025-03-22",
          "rating_count": "23",
          "prep_time_seconds": "300",
          "cook_time_seconds": "2040",
          "total_time_seconds": "2340",
          "calories": "440.0",
          "carbohydrates": "24.0",
          "cholesterol": "183.0",
          "fat": "20.0",
          "fiber": "4.0",
          "protein": "42.0",
          "saturated_fat": "10.0",
          "sodium": "505.0",
          "sugar": "12.0",
          "keywords": [
            "Easy Chicken Curry",
            "Indian",
            "Indian Chicken Curry",
            "Main Dish",
            "Thermomix curry",
            "Thermomix recipe",
            "Turmeric Recipe"
          ],
          "authors": [
            "www.thermo.kitchen"
          ],
          "images": [
            "https://www.thermo.kitchen/wp-content/uploads/2018/12/Easy-Chicken-Curry-w-Yoghurt-LR.jpg",
            "https://www.thermo.kitchen/wp-content/uploads/2018/12/Easy-Chicken-Curry-w-Yoghurt-LR-500x500.jpg",
            "https://www.thermo.kitchen/wp-content/uploads/2018/12/Easy-Chicken-Curry-w-Yoghurt-LR-500x375.jpg",
            "https://www.thermo.kitchen/wp-content/uploads/2018/12/Easy-Chicken-Curry-w-Yoghurt-LR-480x270.jpg"
          ],
          "ingredients": [
            "30 g vegetable oil (or Indian Spiced Ghee (recipe in Thermokitchen Indian book))",
            "200 g onion (cut in quarters)",
            "2  green chili (fresh (cut in half))",
            "20 g ginger (fresh)",
            "20 g garlic (fresh)",
            "20 g coriander (fresh)",
            "2 tsp ground cumin",
            "2 tsp ground coriander seed",
            "1 tsp ground turmeric",
            "120 g liquid chicken stock",
            "80 g tomato paste",
            "500 g natural yoghurt",
            "700 g diced chicken thigh fillets ((cut each thigh fillet in 6 large pieces only))"
          ],
          "instructions": [
            "Place the oil, onion, garlic, ginger, fresh coriander and chili in the TM bowl. Chop 10sec/Speed 5.",
            "Scrape down the bowl. Cook 6 min/Varoma/Speed 2 (MC OUT).",
            "Add turmeric, cumin and ground coriander. Cook 3 min/Varoma/Speed 2 (MC OUT).",
            "Add the stock to the spices. Cook 5 min/Varoma/Speed 1.",
            "Add the tomato paste, yoghurt and chicken to TM bowl. Cook 22 min/Varoma/Speed 1 (Reverse Blade)",
            "Serve with rice."
          ]
        }
      }
    ]
  }
}
```

### Documentation

You're smart enough to figure it out, I believe in you.

### Testing

Testing occurs in production so don't bother.
