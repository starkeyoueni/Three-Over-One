require 'spec_helper'

describe Product do
  describe "when created" do
    before do
      Product.delete_all
      @product = Product.create(:title => "Test")
    end
    it "is retrievable from the database" do
      retrieved = Product.first
      retrieved.title.should == @product.title
    end
    
    describe "with string of tags" do
      before do
        @tags = %w(red green blue)
        @tag_string = @tags.join(", ")
      end
      it "converts to an array" do
        converted = Product.tags_from_string(@tag_string)
        converted.should == @tags
      end
    end
  end
  
end
