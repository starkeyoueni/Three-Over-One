class AdminController < ApplicationController
  around_filter :shopify_session  
  
  def welcome
    current_host = "#{request.host}#{':' + request.port.to_s if request.port != 80}"
    @callback_url = "http://#{current_host}/login/finalize"
  end
  
  def load_database
    Product.import_from_shopify
    redirect_to products_path
  end
end