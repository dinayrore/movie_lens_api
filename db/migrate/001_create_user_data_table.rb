require 'active_record'
#
class CreateUserDataTable < ActiveRecord::Migration[5.0]
  def up
    create_table :users do |u|
      u.integer :age
      u.string :gender
      u.string :occupation
      u.string :zip_code
    end
  end

  def down
    drop_table :users
  end
end

def main
  action = (ARGV[0] || '').downcase.casecmp('down') == -1 ? :up : :down

  CreateUserDataTable.migrate(action)
end

main if __FILE__ == $PROGRAM_NAME
