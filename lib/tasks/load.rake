ROOT = File.expand_path(File.dirname(__FILE__) + '/../..')
require File.join(ROOT, "/config/environment")

namespace :load do
  desc "Reloads the db from shopify"
  task :shopify do
    Product.import_from_shopify
  end
end