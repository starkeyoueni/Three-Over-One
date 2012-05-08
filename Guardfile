guard 'bundler' do
  watch('Gemfile')
end

guard 'rails' do
  watch('Gemfile.lock')
  watch(%r{^(config|lib)/.*})
end

guard 'spork', :rspec_env => { 'RAILS_ENV' => 'test' } do
  watch('Gemfile')
  watch('Gemfile.lock')
  watch('config/application.rb')
  watch('config/environment.rb')
  watch('config/routes.rb')
  watch(%r{^config/environments/.+\.rb$})
  watch(%r{^config/initializers/.+\.rb$})
  watch(%r{^spec/factories/(.+)\.rb})
  watch('spec/factories.rb')
  watch('spec/spec_helper.rb') { :rspec }
  watch(%r{features/support/}) { :cucumber }
end

guard 'rspec', :version => 2, :cli => "--drb" do
  watch(%r{^spec/support/(.+)\.rb$})                  { "spec" }
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^lib/(.+)\.rb$})                          { |m| "spec/lib/#{m[1]}_spec.rb" }
  watch('spec/spec_helper.rb')                       { "spec" }
  watch('spec/factories.rb')                         { "spec" }
  watch(%r{^spec/factories/(.+)\.rb})                { |m| "spec/models/#{m[1]}_spec.rb" }
  watch(%r{^spec/helpers/(.+)_spec\.rb})             { |m| "spec/helpers/#{m[1]}_spec.rb" }

  # Rails example
  watch(%r{^app/(.+)\.rb})                            { |m| "spec/#{m[1]}_spec.rb" }
  watch(%r{^app/(.*)(\.erb|\.haml)$})                 { |m| "spec/#{m[1]}#{m[2]}_spec.rb" }
  
  watch(%r{^app/controllers/(.+)_(controller)\.rb})  do |m|
    ["spec/routing/#{m[1]}_routing_spec.rb",
    "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb",
    "spec/acceptance/#{m[1]}_spec.rb"]
  end
  
  watch('config/routes.rb')                           { "spec/routing" }
  watch('app/controllers/application_controller.rb')  { "spec/controllers" }
  # Capybara request specs
  watch(%r{^app/views/(.+)/.*\.(erb|haml)$})          { |m| "spec/requests/#{m[1]}_spec.rb" }
end
