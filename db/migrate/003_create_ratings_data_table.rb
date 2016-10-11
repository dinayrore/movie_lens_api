require 'active_record'
#
class CreateRatingsDataTable < ActiveRecord::Migration[5.0]
  def up
    create_table :ratings do |r|
      r.belongs_to :user, index: true, foreign_key: true
      r.belongs_to :movie, index: true, foreign_key: true
      r.integer :score
    end
  end

  def down
    drop_table :ratings
  end
end

def main
  action = (ARGV[0] || '').downcase.casecmp('down') == -1 ? :up : :down

  CreateRatingsDataTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
