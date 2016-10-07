require 'active_record'
#
class Movie < ActiveRecord::Base
  validates :title, presence: true
end
