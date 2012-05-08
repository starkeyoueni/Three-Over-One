class AdminController < ApplicationController
  around_filter :shopify_session  
  
  def load_database
    @products = ShopifyAPI::Product.all
  end
end