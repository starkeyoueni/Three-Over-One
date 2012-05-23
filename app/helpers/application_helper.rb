module ApplicationHelper
  def category_link(category)
    link_to category.name, collection_path(:params => {:category_key => category.key})
  end
  def cart_count
    count = cart.item_count
    items = 'item'
    items.pluralize if count > 1 || count == 0
    "#{count} #{items}"
  end
  
  def cart_total
    "$#{cart.total_price}"
  end
end
