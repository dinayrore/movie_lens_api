require 'active_record'
require 'CSV'
require_relative 'models/user'
require_relative 'models/movie'
require_relative 'models/rating'

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])

#
class UserData
  def initialize(filename)
    @filename = filename
  end

  def load_from_file
    CSV.foreach(@filename, encoding: 'iso-8859-1', col_sep: '|') do |line|
      id = line[0].to_i
      age = line[1].to_i
      gender = line[2]
      occupation = line[3]
      zip_code = line[4]

      User.create(id: id, age: age, gender: gender, occupation: occupation, zip_code: zip_code)
    end
  end
end
#
class MovieData
  def initialize(filename)
    @filename = filename
  end

  def load_from_file
    CSV.foreach(@filename, encoding: 'iso-8859-1', col_sep: '|') do |line|
      id = line[0].to_i
      title = line[1]

      Movie.create(id: id, title: title)
    end
  end
end
#
class RatingsData
  def initialize(filename)
    @filename = filename
  end

  def load_from_file
    # counter = 0

    CSV.foreach(@filename, col_sep: "\t") do |line|
      # counter += 1

      # if counter < 1000
        user_id = line[0].to_i
        movie_id = line[1].to_i
        score = line[2].to_i

        Rating.create(user_id: user_id, movie_id: movie_id, score: score)
      # end
    end
  end
end

def main
  user_data = UserData.new('data/u.user')

  user_data.load_from_file

  movie_data = MovieData.new('data/u.item')

  movie_data.load_from_file

  ratings_data = RatingsData.new('data/u.data')

  ratings_data.load_from_file
end

main if __FILE__ == $PROGRAM_NAME
