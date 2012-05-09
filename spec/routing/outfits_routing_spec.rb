require "spec_helper"

describe OutfitsController do
  describe "routing" do

    it "routes to #index" do
      get("/outfits").should route_to("outfits#index")
    end

    it "routes to #new" do
      get("/outfits/new").should route_to("outfits#new")
    end

    it "routes to #show" do
      get("/outfits/1").should route_to("outfits#show", :id => "1")
    end

    it "routes to #edit" do
      get("/outfits/1/edit").should route_to("outfits#edit", :id => "1")
    end

    it "routes to #create" do
      post("/outfits").should route_to("outfits#create")
    end

    it "routes to #update" do
      put("/outfits/1").should route_to("outfits#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/outfits/1").should route_to("outfits#destroy", :id => "1")
    end

  end
end
