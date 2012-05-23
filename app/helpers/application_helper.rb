module ApplicationHelper
  def category_link(category)
    link_to category.name, collection_path(:params => {:category_key => category.key})
  end
end
