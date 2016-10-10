require 'active_record'
#
class Movie < ActiveRecord::Base
  validates :title, presence: true

  def average_rating
    self.ratings.average.to_f.round(1)
  end
end
