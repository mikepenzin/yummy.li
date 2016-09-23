jQuery(function(){
  // Track downloads
  $('#download-master').click(function(){
    _trackEvent('Downloads', 'master');
  });
});

jQuery(document).ready(function($) {

  /* Docs scrollspy */
  $('body').scrollspy({
    target: '.bs-sidebar',
    offset: 0
  })

  $(window).on('load', function () {
    $('body').scrollspy('refresh')
  })

  // back to top
  setTimeout(function () {
    var $sideBar = $('.bs-sidebar')

    $sideBar.affix({
      offset: {
        top: function () {
          var offsetTop      = $sideBar.offset().top
          var sideBarMargin  = parseInt($sideBar.children(0).css('margin-top'), 10)

          return (this.top = offsetTop - sideBarMargin)
        }
      , bottom: function () {
          return (this.bottom = $('.bs-footer').outerHeight(true))
        }
      }
    })
  }, 100)

  /* Run examples */
  $('.token-example-field').tokenfield();

  $('#tokenfield-1').tokenfield({
    autocomplete: {
      source: [
      'asparagus','apples','avacado','alfalfa','squash',
      'almond','arugala','artichoke','applesauce','noodles',
      'antelope','tuna','apple','avocado','bruscetta','bacon',
      'beans','bagels','BBQ','bison','barley','beer','bisque',
      'bluefish','bread','broccoli','buritto','babaganoosh','cabbage',
      'cake','carrots','celery','cheese','chicken','catfish','chips',
      'chocolate','chowder','clams','coffee','cookies','corn',
      'cupcakes','crab','curry','chimichanga','dates','dips',
      'duck','dumplings','donuts','eggs','enchilada','eggrolls',
      'muffins','edimame','fajita','falafel','fish','franks',
      'fondu','toast','dip','garlic','ginger','gnocchi','goose',
      'granola','grapes','beans','guancamole','gumbo','grits',
      'crackers','ham','halibut','hamburger','honey','haiku',
      'hummus','bread','jambalaya','jam','jerky','jalapeño',
      'kale','kabobs','ketchup','kiwi','kingfish','lobster',
      'lamb','linguine','lasagna','meatballs','moose','milk',
      'milkshake','ostrich','pizza','pepperoni','porter','pancakes',
      'quesadilla','quiche','reuben','spinach','spaghetti','toast',
      'venison','waffles','wine','walnuts','yogurt','ziti','zucchini'

      ],
      delay: 100
    },
    showAutocompleteOnFocus: false,
    delimiter: [',','-', '_']

  });

$('#tokenfield-2').tokenfield({
    autocomplete: {
      source: [
      'Poultry','Nuts','Meat','Gluten','Dairy',
      'Shellfish','Fish'
      ],
      delay: 100
    },
    showAutocompleteOnFocus: true,
    delimiter: [',','-', '_']

  });

$('#tokenfield-3').tokenfield({
    autocomplete: {
      source: [
      'Asian','Caribbean','Chinese','French','German',
      'Indian','Thai','Italian','Mediterranean','Mexican',
      'Tex-Mex','Irish','Greek','Japanese','Nordic','Portuguese','East European',
      'African','British','Turkish and Middle Eastern','Spanish'
      ],
      delay: 100
    },
    showAutocompleteOnFocus: true,
    delimiter: [',','-', '_']

  });


$('#tokenfield-4').tokenfield({
    autocomplete: {
      source: [
      'Breads','Breakfast','Cakes','Casseroles','Cookies',
      'Desserts','Dinner','Dips','Drinks','Fish Recipes',
      'Grilling','BBQ','Kid Friendly','Meat Recipes','Poultry Recipes',
      'Quick & Easy','Salad Dressing','Salads','Sandwiches','Sauces',
      'Seafood Recipes','Slow Cooker','Soups','Veggie Recipes'
      ],
      delay: 100
    },
    showAutocompleteOnFocus: true,
    delimiter: [',','-', '_']

  });



  var engine = new Bloodhound({
    local: [{value: 'red'}, {value: 'blue'}, {value: 'green'} , {value: 'yellow'}, {value: 'violet'}, {value: 'brown'}, {value: 'purple'}, {value: 'black'}, {value: 'white'}],
    datumTokenizer: function(d) {
      return Bloodhound.tokenizers.whitespace(d.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace
  });
  engine.initialize();

  $('#tokenfield-typeahead').tokenfield({
    typeahead: [null, { source: engine.ttAdapter() }]
  });

  $('#tokenfield-5')
    .on('tokenfield:createtoken', function (e) {
      var data = e.attrs.value.split('|')
      e.attrs.value = data[1] || data[0]
      e.attrs.label = data[1] ? data[0] + ' (' + data[1] + ')' : data[0]
    })
    .on('tokenfield:createdtoken', function (e) {
      // Über-simplistic e-mail validation
      var re = /\S+@\S+\.\S+/
      var valid = re.test(e.attrs.value)
      if (!valid) {
        $(e.relatedTarget).addClass('invalid')
      }
    })

    .on('tokenfield:edittoken', function (e) {
      if (e.attrs.label !== e.attrs.value) {
        var label = e.attrs.label.split(' (')
        e.attrs.value = label[0] + '|' + e.attrs.value
      }
    })
    .on('tokenfield:removedtoken', function (e) {
      if (e.attrs.length > 1) {
        var values = $.map(e.attrs, function (attrs) { return attrs.value });
        alert(e.attrs.length + ' tokens removed! Token values were: ' + values.join(', '))
      } else {
        alert('Token removed! Token value was: ' + e.attrs.value)
      }
    })
    .tokenfield()

});