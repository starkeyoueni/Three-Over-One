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
    money cart.total_price
  end
  
  def money(price, cents=false)
    if cents
      return number_to_currency price
    else
      return number_to_currency price, precision: 0, separator: ","
    end
  end
  
end
