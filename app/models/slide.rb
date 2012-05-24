class Slide
  def self.all
    cur_dir = Dir.getwd
    Dir.chdir(File.join(Rails.root, 'app', 'assets', 'images', 'slides'))
    slides = Dir.glob('*.jpg')
    Dir.chdir(cur_dir)
    slides
  end
end