require "spec_helper"

describe CartController do
  describe "routing" do

    it "routes to #index" do
      get("/cart").should route_to("cart#index")
    end

    it "routes to #new" do
      get("/cart/new").should route_to("cart#new")
    end

    it "routes to #show" do
      get("/cart/1").should route_to("cart#show", :id => "1")
    end

    it "routes to #edit" do
      get("/cart/1/edit").should route_to("cart#edit", :id => "1")
    end

    it "routes to #create" do
      post("/cart").should route_to("cart#create")
    end

    it "routes to #update" do
      put("/cart/1").should route_to("cart#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/cart/1").should route_to("cart#destroy", :id => "1")
    end

  end
end
