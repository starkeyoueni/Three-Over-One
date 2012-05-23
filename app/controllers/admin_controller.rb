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
  
  def get_products_json
    data = Curl::Easy.http_get("http://three-over-one.myshopify.com/admin/products.json")
    @products_json = data.body_str
    file = File.open("data/products.json", "w")
    file.write(@products_json)
    file.close
  end
end