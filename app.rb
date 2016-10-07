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

# POST /api/ - create a game, read request body as JSON
post '/api/' do
  variable = Class.create(column_name: params['input'])
  status 201
  variable.to_json
end

# PUT /api/game - update & read request body as JSON
put '/api/' do
  variable = Class.find_by(column_name: params['input'])
  variable.update(column_name: params['new_input'])
  status 201
  variable.to_json
end

# DELETE /api/characters - delete & return success/failure status code
delete '/api/game' do
  variable = Class.find_by(column_name: params['input']
  variable.destroy
end

# GET /api/hero - return individual/all as JSON
get '/api/' do
  variable = params['variable']

  if !variable.nil?
    thing = Class.where(column_name: variable)
  else
    thing = Class.all.order(column_name: :DESC)
  end

  thing.to_json
end
