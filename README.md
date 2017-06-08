# yummy.li
[![version tag](https://img.shields.io/badge/version-1.9.1-brightgreen.svg)](https://github.com/mikepenzin/yummy.li) [![license](https://img.shields.io/github/license/mikepenzin/yummy.li.svg)](https://github.com/mikepenzin/yummy.li) [![Build Status](https://travis-ci.org/mikepenzin/yummy.li.svg?branch=master)](https://travis-ci.org/mikepenzin/yummy.li) [![Coverage Status](https://coveralls.io/repos/github/mikepenzin/yummy.li/badge.svg?branch=master)](https://coveralls.io/github/mikepenzin/yummy.li?branch=master) 

Search recipes using ingredients you already have in the kitchen! Used amazing API of Food2Fork

Frontend: Bower, EJS, Bootstrap, jQuery, CSS

Backend: NodeJS, MongoDB, ExpressJS, PassportJS

Testing: Mocha, Chai, Istanbul, Coveralls

CI: Gulp, Travis CI, Github, Heroku

------------------------------------------------------------

## // Release Notes

#### v. 1.9.1 - Major bug fixed

- Major Personal page bug fixed

#### v. 1.9.0 - Added Trending recipes page and section inside Personal page

- Added Trending recipes page and section inside Personal page.
- Randomized data inside every section on Personal page.
- Added Cookies seesions, so person that logged in will remain loggedin for 2 month.
- Added Cookies info banner for EU users.
- Updated logo.
- Added major vulnerability tests, including Snyk.
- Major frontend bugs were fixed.

#### v. 1.8.0 - Added simple personal landing page

- Added simple personal landing page - Featured recipes and Wishlist items
- Added social links to show page
 

#### v. 1.7.4 - Increase coverage

- Full continuous integration using Travis CI
- Coverage improvement


#### v. 1.7.3 - Added Coverage and Automation Testing using Mocha and Chai

- Added Automation Testing using Mocha and Chai
- Added coverage using Istanbul and Coveralls
- Minor bug fixing


#### v. 1.7.2 - Added Gulp tasks to minify JavaScripts and CSS files

- Added Gulp tasks to minify JavaScripts and CSS files.
- CSS code refactoring.
- Minor bug fixing


#### v. 1.7.1 - Better file upload, via Filepicker

- Added file upload via Filepicker API.
- Added Bower for Frontend dependencies control


#### v. 1.6.1 - Code refactoring

- Code refactoring
- Minor frontend bugs were fixed


#### v. 1.6.0 - No results page added

- Added page for "no results" in recipes search
- Minor frontend bugs were fixed


#### v. 1.5.0 - Users password reset, frontend changes

- Added "Forgot password" functionality including mail notification
- Added user picture in nav bar 
- Old user picture deleted upon picture update
- changed footer to more relative
- Minor frontend bugs were fixed


#### v. 1.4.0 - Users profile update functionality

- Added User information update, including user picture update.


#### v. 1.3.0 - Users authentication and Wishlist functionality

- Lots of bugs were fixed! 
- Added Login/Signup functionality
- Added Wishlist to every user (including Add/Remove functionality)


#### v. 1.2.0 - Show recipes, design concept

- Major bugs were fixed
- Added show page for recipes by id
- Made major changes in design concept of all pages (transparent navbar and better css file structure)


#### v. 1.1.0 - API changes, pagination

- Added another API - Food2Fork - http://food2fork.com/about/api
- Added pagination for search results


#### v. 1.0.0 - Initial release

- Added recipepuppy API
- Added search refine and basic functionality



## // Tests

```js
npm run cover
```

## // Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.


## // Notes for future releases

- Create better DB with lots of recipes
- Add authentication with facebook, google
- Add analytics
- Add SEO
- Add sitemap

