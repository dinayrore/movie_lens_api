# MovieLens

To run our application, please visit the heroku link:

## Getting Started

The instructions below will help you retrieve a copy of the project to run on your local machine through the Terminal application. Please see deployment for notes on how to deploy the project on a live system.  The instructions provided are for macbook users.

### Prerequisities

You may need to install or update the following software.

Find Terminal - to run program
  1. Open Finder. Finder is available in the Dock.
  2. Select Applications from the side bar menu.  Then unfold the Utilities folder.
  3. Double click on Terminal to initialize.

Install Homebrew - to store program files properly
  1. Open up Terminal.
  2. Run```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
  3. Run```brew doctor```

Install rbenv & ruby-build - to install and compile different versions of Ruby code language
  1. Open up Terminal
  2. Run```brew install ruby-build rbenv```
  3. Run```echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile```

Install ruby 2.3.1 - the latest version of Ruby
  1. Close and reopen Terminal.```rbenv install 2.3.1```
  2. After quite some time, run:```rbenv global 2.3.1```
Once you have completed the above installation processes your system should be ready to launch the program!

Download postgresql
  1. Go to http://postgresapp.com/
  2. Move the app to the `/Applications` file.
  3. Double Click on app to run the program.

Download postico from:
  1. Go to https://eggerapps.at/postico/
  2. Move the app to the `/Applications` file.
  3. Double Click on app to run the program.

Download postman from:
  1. Go to https://www.getpostman.com/
  2. Move the app to the `/Applications` file.
  3. Double Click on app to run the program.

## Deployment

Please complete the following procedure to run the program on a live system:
  1. Open Terminal.
  2. Change your directory to the one that which you have saved this zip file.`cd folder_name`
  3. Run `gem install bundler` and then run `bundle` or `bundle install` to run the Gemfile on your machine.
  4. Open postgresql and create your database using the following code: `CREATE DATABASE dbname;` or run `rake db:create`
  5.  Back in Terminal input `export DATABASE_URL=postgres://YOURUSER@localhost:5432/SQLDATABASENAME` (replace YOURUSER with your username and SQLDATABASENAME with the database you created).
  6. Run `bundle exec rake db:migrate` to create the necessary tables for the database.
  7. Then, run `bundle exec ruby seeds.rb` to populate the data tables with the appropriate information.

## Running Web app

  1. Still in Terminal, run `bundle exec shotgun app.rb` to run the app utilizing sinatra, while allowing changes to be made to the code for testing purposes.
  2. Go to your web browser, enter the localhost:9393/index.html
  3. READ all instructions BEFORE adding input.

## Built With

* Atom

## Authors

* **Leigh Bryant**
* **Timothy Hsieh**
* **Marliana Lara**
* **Kristine Teichmann**

## Acknowledgments

* The Iron Yard - Durham
* Bryce Darling

* F. Maxwell Harper and Joseph A. Konstan. 2015. The MovieLens Datasets:
History and Context. ACM Transactions on Interactive Intelligent
Systems (TiiS) 5, 4, Article 19 (December 2015), 19 pages.
DOI=http://dx.doi.org/10.1145/2827872
