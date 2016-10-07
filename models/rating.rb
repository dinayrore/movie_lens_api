require 'active_record'
#
class Rating < ActiveRecord::Base
  validates :user_id, :movie_id, :score, presence: true
end
