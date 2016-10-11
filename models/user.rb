require 'active_record'
#
class User < ActiveRecord::Base
  validates :age, :gender, :occupation, :zip_code, presence: true
end
