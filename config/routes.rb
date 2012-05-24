Too2::Application.routes.draw do
  resources :cart do
    collection do
      post :add
    end
  end

  resources :outfits

  resources :admin do
    collection do
      get :load_database
    end
  end
  
  resources :products

  resources :pages do
    collection do
      get :about
      get :products
    end
  end
  
  match 'design'             => 'home#design'
  match 'login'              => 'login#index',        :as => :login
  match 'login/authenticate' => 'login#authenticate', :as => :authenticate
  match 'login/finalize'     => 'login#finalize',     :as => :finalize
  match 'login/logout'       => 'login#logout',       :as => :logout
  root :to                   => 'home#index'
end
