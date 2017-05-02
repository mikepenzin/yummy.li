
(function($) {
    $('#search').tokenfield({
      autocomplete: {
        source: [
        'Apples','Applesauce','Asparagus','Avocados','Bacon','Bagels','Baked beans',
        'Baking powder','Bananas','Basil','BBQ sauce','Beef','Beer','Berries','Black pepper',
        'Bleu cheese','Bouillon cubes','Bread crumbs','Breakfasts','Broccoli','Broth','Brownie mix',
        'Buns','Burritos','Butter','Cake','Cake Decorations','Cake mix','Candy','Carrots','Catfish',
        'Cauliflower','Celery','Cereal','Champagne','Cheddar','Cherries','Chicken','Chili','Chip dip',
        'Chocolate chips','Cilantro','Cinnamon','Cocoa','Coffee','Cookies','Corn','Cottage cheese','Crab','Crackers',
        'Cream cheese','Croissants','Cucumbers','Donuts','Dried fruit','Eggs','English muffins','Feta',
        'Fish sticks','Flour','Fresh bread','Fries','Fruit','Fruit juice','Garlic','Gin','Ginger','Goat cheese',
        'Granola','Grapefruit','Grapes','Gravy','Ground beef','Ham','Honey','Hot dogs','Hot sauce','Hummus',
        'Ice cream','Instant potatoes','Jam','Juice','Juice concentrate','Ketchup','Kiwis','Lemon juice','Lemons',
        'Lettuce','Limes','Lobster','Lunchmeat','Margarine','Mayonnaise','Melon','Milk','Mint','Mixers','Mozzarella',
        'Mushrooms','Mussels','Mustard','Nectarines','Nuts','Oatmeal','Olive oil','Olives','Onions','Oranges',
        'Oregano','Oysters','Pancake / Waffle mix','Paprika','Parmesan cheese','Parsley','Pasta','Pasta sauce',
        'Peaches','Peanut butter','Pears','Peppers','Pickles','Pie','Pita bread','Pizza','Pizza Rolls','Plums',
        'Popcorn','Popsicles','Pork','Potato chips','Potatoes','Pretzels','Provolone cheese','Ready-bake breads',
        'Red pepper','Relish','Rice','Ricotta cheese','Rum','Saké','Salad dressing','Salmon','Salsa','Salt',
        'Sandwich slices cheese','Sausage','Shortening','Shrimp','Sliced bread','Soda','Soda pop','Soup','Sour cream',
        'Soy sauce','Spinach','Sports drink','Squash','Steak sauce','Sugar','Sugar substitute','Swiss cheese','Syrup',
        'Tater tots','Tea','Tilapia','Tinned meats','Tofu','Tomatoes','Tortillas','Tuna','Turkey','Vanilla extract',
        'Vegetable oil','Vegetables','Veggies','Vinegar','Vodka','Whipped cream','Whiskey','Wine','Worcestershire sauce',
        'Yeast','Yogurt','Zucchini'
        ],
        delay: 100
      },
      showAutocompleteOnFocus: false,
      delimiter: [',','-', '_'],
      limit: 4
    });
  
    $('#search').on('tokenfield:createtoken', function (event) {
  	    var existingTokens = $(this).tokenfield('getTokens');
  	    $.each(existingTokens, function(index, token) {
  	        if (token.value === event.attrs.value)
  	            event.preventDefault();
  	    });
  	});
})(jQuery);  