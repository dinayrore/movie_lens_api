#
class CreateMovieDataTable < ActiveRecord::Migration[5.0]
  def up
    create_table :movies do |m|
      m.string :id
      m.string :title
    end
  end

  def down
    drop_table :movies
  end
end

def main
  action = (ARGV[0] || '').downcase.casecmp('down') == -1 ? :up : :down

  CreateMovieDataTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
