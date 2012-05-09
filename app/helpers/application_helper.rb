module ApplicationHelper
  def category_link(category)
    link_to category.name, collection_path(:params => {:category_key => category.key})
  end
  # 
  # - if link.active
  #   class="active"
  #   - endif
  #   >#{link.title | link_to: link.url}
  
end
