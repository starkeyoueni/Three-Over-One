require File.expand_path('../boot', __FILE__)

require "action_controller/railtie"
require "action_mailer/railtie"
require "active_resource/railtie"
require "sprockets/railtie"

if defined?(Bundler)
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
  Bundler.require(:default, :assets, Rails.env)
end

module Too2
  class Application < Rails::Application
    
    # Shopify API connection credentials:
    config.shopify.api_key = "74a1784a14f5ae773b2212db5c9fd8f4"
    config.shopify.secret = "61aefdf653a3c88263403c8d98e00704"
    
    config.generators do |g|
      g.view_specs false
      g.helper_specs false
    end

    config.autoload_paths += %W(#{config.root}/lib)
    config.filter_parameters += [:password, :password_confirmation]
    config.encoding = "utf-8"
    config.assets.enabled = true
    config.assets.version = '1.0'
    config.assets.initialize_on_precompile = false
  end
end
