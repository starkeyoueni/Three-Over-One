require 'rubygems'
require 'spork'
require 'capybara/rspec'

#uncomment the following line to use spork with the debugger
# require 'spork/ext/ruby-debug'

Spork.prefork do
  # This file is copied to spec/ when you run 'rails generate rspec:install'
  ENV["RAILS_ENV"] ||= 'test'
  require File.expand_path("../../config/environment", __FILE__)
  require 'rspec/rails'
  require 'rspec/autorun'
  
  Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

  RSpec.configure do |config|
    config.filter_run_excluding :slow => true
    config.infer_base_class_for_anonymous_controllers = false
    config.before(:suite) do
      DatabaseCleaner.strategy = :truncation
      DatabaseCleaner.orm = "mongoid"
    end

    config.before(:each) do
      DatabaseCleaner.clean
    end
  end
end

Spork.each_run do
  require 'factory_girl_rails'
  require 'capybara/rspec'
  
  Dir.glob(File.join(File.dirname(__FILE__), '../../spec/factories/*.rb')).each {|f| require f }

  Dir[Rails.root.join("lib/**/*.rb")].each {|f| require f}
end




