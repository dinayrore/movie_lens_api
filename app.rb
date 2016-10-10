require 'sinatra'
require 'active_record'
require 'yaml'
require_relative 'models/movie'
require_relative 'models/rating'
require_relative 'models/user'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])

before do
  content_type :json
end

after do
  ActiveRecord::Base.connection.close
end

# POST /api/ - create, read request body as JSON
post '/api/movies' do
  movie = Movie.create(title: params['title'])
  status 201
  movie.to_json
end

# GET /api/ - return individual/all as JSON
get '/api/movies' do
  Movie.all.order(title: :ASC).to_json
end

# PUT /api/ - update & read request body as JSON
put '/api/movies' do
  movie = Movie.find_by(title: params['title'])
  movie.update(title: params['new_title'])
  status 201
  movie.to_json
end

# DELETE /api/ - delete & return success/failure status code
delete '/api/movies' do
  movies = Movie.find_by(title: params['title'])
  movies.destroy
end

# POST /api/ - create, read request body as JSON
post '/api/users' do
  user = User.create(
    age: params['age'],
    gender: params['gender'],
    occupation: params['occupation'],
    zip_code: params['zip_code']
  )

  status 201
  user.to_json
end

# PUT /api/ - update & read request body as JSON
put '/api/users/:id' do |id|
  age = params['age']
  gender = params['gender']
  occupation = params['occupation']
  zip_code = params['zip_code']

  user = User.find_by_id(id)

  user.update(age: age) unless age.nil?
  user.update(gender: gender) unless gender.nil?
  user.update(occupation: occupation) unless occupation.nil?
  user.update(zip_code: zip_code) unless zip_code.nil?

  status 200
  user.to_json
end

# DELETE /api/ - delete & return success/failure status code
delete '/api/users/:id' do |id|
  user = User.find_by_id(id)
  user.destroy
end

# POST /api/ - create, read request body as JSON
post '/api/ratings' do
  rating = Rating.create(
    user_id: params[:user_id],
    movie_id: params[:movie_id],
    score: params[:score]
  )
  status 201
  rating.to_json
end

# PUT /api/ - update & read request body as JSON
put '/api/ratings/:id' do |id|
  user_id = params['user_id']
  movie_id = params['movie_id']
  score = params['score']

  rating = Rating.find_by_id(id)

  rating.update(user_id: user_id) unless user_id.nil?
  rating.update(movie_id: movie_id) unless movie_id.nil?
  rating.update(score: score) unless score.nil?

  status 200
  rating.to_json
end

# DELETE /api/ - delete & return success/failure status code
delete '/api/ratings/:id' do |id|
  rating = Rating.find_by_id(id)
  rating.destroy
end

# GET /api/ - return individual/all as JSON
get '/api/ratings' do
  user_id = params['user_id']
  movie_id = params['movie_id']
  score = params['score']

  if !user_id.nil?
    rating = Rating.where(user_id: user_id)
  elsif !movie_id.nil?
    rating = Rating.where(movie_id: movie_id)
  elsif !score.nil?
    rating = Rating.where(score: score)
  else
    rating = Rating.all
    # TODO: rating = Rating.top 10.sort_by(avg_score: score they want)
  end

  rating.to_json
end

get '/api/top_rated_movies' do
  average_ratings = []

  movies = Movie.all

  movies.each do |movie|
    ratings = Rating.where(movie_id: movie.id)

    if ratings.length >= 5
      average_rating = ratings.map(&:score).sum.to_f / ratings.length

      average_ratings << {
        average_rating: average_rating,
        movie: movie
      }
    end
  end

  average_ratings.sort_by! { |hash| -hash[:average_rating] }

  average_ratings[0..10].to_json
end
