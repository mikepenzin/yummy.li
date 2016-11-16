jQuery(function(){
  // Track downloads
  $('#download-master').click(function(){
    _trackEvent('Downloads', 'master');
  });
});

jQuery(document).ready(function($) {


  /* Run examples */
  $('.token-example-field').tokenfield();

  $('#tokenfield-1').tokenfield({
    delimiter: [',','-', '_'],
    limit: 4
  });

  $('#tokenfield-1').on('tokenfield:createtoken', function (event) {
	    var existingTokens = $(this).tokenfield('getTokens');
	    $.each(existingTokens, function(index, token) {
	        if (token.value === event.attrs.value)
	            event.preventDefault();
	    });
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

$('#tokenfield-2').on('tokenfield:createtoken', function (event) {
	    var existingTokens = $(this).tokenfield('getTokens');
	    $.each(existingTokens, function(index, token) {
	        if (token.value === event.attrs.value)
	            event.preventDefault();
	    });
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
  
  

$('#tokenfield-3').on('tokenfield:createtoken', function (event) {
	    var existingTokens = $(this).tokenfield('getTokens');
	    $.each(existingTokens, function(index, token) {
	        if (token.value === event.attrs.value)
	            event.preventDefault();
	    });
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

$('#tokenfield-4').on('tokenfield:createtoken', function (event) {
	    var existingTokens = $(this).tokenfield('getTokens');
	    $.each(existingTokens, function(index, token) {
	        if (token.value === event.attrs.value)
	            event.preventDefault();
	    });
	});
	
	$('#tokenfield-5').tokenfield({
    autocomplete: {
      source: [
      'Vegan','Ovo Vegan'
      ],
      delay: 100
    },
    showAutocompleteOnFocus: true,
    delimiter: [',','-', '_']

  });

$('#tokenfield-5').on('tokenfield:createtoken', function (event) {
	    var existingTokens = $(this).tokenfield('getTokens');
	    $.each(existingTokens, function(index, token) {
	        if (token.value === event.attrs.value)
	            event.preventDefault();
	    });
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