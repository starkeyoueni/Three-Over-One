class HomeController < ApplicationController
  
  def index
    @slides = Slide.all
  end
  
end