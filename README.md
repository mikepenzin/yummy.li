![yummy.li logo](https://yummy.li/img/Logo_1497186262201.png)

[![version tag](https://img.shields.io/badge/version-1.12.2-brightgreen.svg)](https://github.com/mikepenzin/yummy.li) [![license](https://img.shields.io/github/license/mikepenzin/yummy.li.svg)](https://github.com/mikepenzin/yummy.li) [![Build Status](https://travis-ci.org/mikepenzin/yummy.li.svg?branch=master)](https://travis-ci.org/mikepenzin/yummy.li) [![Coverage Status](https://coveralls.io/repos/github/mikepenzin/yummy.li/badge.svg?branch=master)](https://coveralls.io/github/mikepenzin/yummy.li?branch=master)

----------------------------

Search recipes using ingredients you already have in the kitchen! Used amazing API of Food2Fork

----------------------------

## // 📕 Table of Content
- [Release Notes](#--release-notes)
- [Tests](#--tests)
- [Contributing](#--contributing)
- [Notes for future releases](#--notes-for-future-releases)


----------------------------
Frontend: Bower, EJS, Bootstrap, jQuery, CSS

Backend: NodeJS, MongoDB, ExpressJS, PassportJS

Testing: Mocha, Chai, Istanbul, Coveralls, Snyk

CI: Gulp, Travis CI, Github, Heroku

------------------------------------------------------------

## // 🍒 Release Notes

#### v. 1.12.2 - Front-End code refactoring

- Front-End code refactoring

#### v. 1.12.1 - Google search update

- Added google search update.
- Updated user model for better use.
- Added seeds folder for seed functiality for user that don't have essential data.

#### v. 1.12.0 - Added monthly updates email

- Added monthly updates email - including email templating.
- Added ability to subscribe/unsubscribe in user profile update page.
- Vunerability updates.
- Updated user scheme with Registration date&time and Last login date&time.
- Updated to latest NodeMailer to v.4
- Lots of Bugs were fixed


#### v. 1.11.1 - Upgrade Node.js version

- Upgrade Node.js version - due to vulnerablity issues
- Add more video formats in Home page (better browser compatibility)
- Add window size detection and image use if needed.


#### v. 1.10.0 - Added flash notifications

- Added flash notifications
- Minor bugs fixes


#### v. 1.9.5 - Critical Bug Fix

- Critical Bug Fix
- Minor front-end bug fixes
- Support in case of limit reached in Food2Fork API.


#### v. 1.9.4 - Vulnerability updates

- Vulnerability updates
- Minor bugs were fixed


#### v. 1.9.3 - Added welcome mail

- Added welcome mail on signup
- Updated signup page, including form validation
- Minor bugs fixed


#### v. 1.9.2 - Added robots.txt route

- Added robots.txt route
- Minor bugs fixed


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

[🔼 Back to Top](#--table-of-content)

## // 🥞 Tests

```js
npm run cover
```

[🔼 Back to Top](#--table-of-content)


## // 🍲 Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.


[🔼 Back to Top](#--table-of-content)


## // 🍳 Notes for future releases

- Create better DB with lots of recipes.
- Add more personalized emails with holidays emails as cron jobs.
- Add authentication with facebook, google.

[🔼 Back to Top](#--table-of-content)

<br>
<br>
<p style="text-align: center;">made with <span>&#10084;</span> by Mike Penzin</p>

