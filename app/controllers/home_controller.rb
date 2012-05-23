class HomeController < ApplicationController
  
  def index
    @slides = Product.limit(50)
  end
  
end