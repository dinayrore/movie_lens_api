#
class CreateRatingsDataTable < ActiveRecord::Migration[5.0]
  def up
    create_table :ratings do |r|
      r.string :user_id, foreign_key: true
      r.string :movie_id, foreign_key: true
      r.string :score
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
